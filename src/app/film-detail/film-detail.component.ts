import { Component, OnInit } from '@angular/core';
import { FilmService } from '../services/film.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IResponseFilmDetail } from '../interfaccia/filmDetail';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { ICrew } from '../interfaccia/cast';

@Component({
    selector: 'app-film-detail',
    templateUrl: './film-detail.component.html',
    styleUrls: ['./film-detail.component.css']
})
export class FilmDetailComponent implements OnInit {

    caricamento: boolean = true;

   

    valoreSegnaposto?: string;

    istrailerVisible: boolean = false;

    isCrewvisible: boolean = false;

    isCrewEsiste: boolean = false;



    arrayDiOggettiCrew: ICrew[] = []


    oggettoFilmDetail?: IResponseFilmDetail

    constructor(private filmService: FilmService, private route: ActivatedRoute, private router: Router, private config: NgbRatingConfig) {
        // ! "NgbRatingConfig" è un servizio(classe iniettabile) nativo della libreria "ng-boostrap" per cui lo devo importare sopra.In piu tale servizio nativo si trova dentro il modulo "NgbRatingModule" per cui tale modulo lo devo anche importare dentro il file "app-module.ts"(cioè dentro il modulo principale del mio progetto).In questo modo il tag <ng-rating sarà attivo dentro il file "film-detail.component.html" e dentro TUTTI i file ".html"


        config.max = 10;//! numero massimo di stelline che voglio
        config.readonly = true;//! in questo modo tali stelline non reagiranno a nessun evento scatenato dall'utente


    };//! funzione CREATA constructor

    ngOnInit(): void {
        this.prendereFilmDetail();
        this.prendereCrew();

       


    };//! funzione CREATA constructor


    prendereFilmDetail() {
        this.route.params.subscribe(
            (segnaPosto) => {//! "segnaPosto" è uno oggetto.Tale oggetto ha come proprietà "testo"(cioè quello che ho scritto nel "path")
                // console.log(segnaPosto);

                // console.log(segnaPosto["id"]);//! IMPORTANTE: usare la notazione quadre(array) per prendere il valore di tale proprietà perchè il valore di tale proprietà proviene dall'html
                this.valoreSegnaposto = segnaPosto["id"];


                this.filmService.prendereFilmDetail(this.valoreSegnaposto!).subscribe(
                    {
                        next: (data) => {
                            // console.log(data);//! esso mi ritorna un SINGOLO oggetto


                            if (data == null) {


                                this.router.navigate(["home"]);

                            }
                            else {
                                this.oggettoFilmDetail = data;

                            }

                            this.caricamento = false;






                        }
                    }
                )


            }
        )






    };//! funzione CREATA prendereFilmDetail



    vediYoutube(titolo: string) {
        // *opzione1 usando il path assoluto
        // this.router.navigate([`/film-detail/${this.valoreSegnaposto}/youTube`]);
        // ! "/film-detail/${this.valoreSegnaposto}" è la rotta padre.Si parte SEMPRE dal dominio in poi cioè:  DOMINIO/rottaPadre/rottaFiglio
        // ! "/youTube" è la rotta figlia
        // ! uso SEMPRE uno slash iniziale e uno slash che separa la rotta padre e figlio
        // *opzione1
        // *opzione2 usando il path relativo
        this.router.navigate(["youTube"], { relativeTo: this.route });
        // ! "youTube".Dentro le quadre scrivo la rotta figlia e basta senza nessun slash
        // ! il secondo argomento sarà SEMPRE: {relativeTo: this.route}
        // *opzione2


        this.filmService.titoloFilmYoutube(titolo);

        this.istrailerVisible = !this.istrailerVisible;


    };//! funzione CREATA vediYoutube


    prendereCrew() {
        this.filmService.prendereCast(this.valoreSegnaposto!).subscribe(
            {
                next: (data) => {
                    // console.log(data);
                    if (data == null) {
                        this.router.navigate(["home"])
                        // return

                    }
                    else {//! al posto del else potevo usare il return dentro if
                        // this.arrayDiOggettiCrew = data.crew;
                        // console.log(data.crew);//!esso  mi puo ritornare un array di oggetti oppure un array vuoto


                        if (data.crew.length == 0) {
                            this.isCrewEsiste = false;
                            // ! se mi ritorna un array vuoto allora non faccio vedere Lo slider del cast nella view

                        }
                        else {// ! se mi ritorna un array di oggetti allora faccio vedere Lo slider del cast nella view
                            this.arrayDiOggettiCrew = data.crew;
                            this.isCrewEsiste = true;


                        }
                    }


                    
                }
            }
        )

    }



    vediCrew() {
        // this.prendereFilmDetail();
        this.prendereCrew()



        this.isCrewvisible = !this.isCrewvisible;//! toggle booliano




    }




};//! classe(componente) FilmDetailComponent
