import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Ifilm } from '../interfaccia/filmsList';
import { FilmService } from '../services/film.service';
import { Router } from '@angular/router';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { PopPupComponent } from '../pop-pup/pop-pup.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-films-list',
    templateUrl: './films-list.component.html',
    styleUrls: ['./films-list.component.css']
})
export class FilmsListComponent implements OnInit {


    @Input()
    arrayDiOggettiFilmsPosterr?: Ifilm[];

    constructor(public filmService: FilmService, private router: Router, config: NgbRatingConfig, public matDialog: MatDialog) {

        config.max = 10;
        config.readonly = true;


    };//! funzione CREATA constructor



    ngOnInit(): void {
        // this.arrayDiOggettiFilmsPoster();
        // console.log(this.arrayDiOggettiFilmsPosterr);



    }





    vediDettaglioFilmPoster(elementoIessimoOggettoFilmPoster: Ifilm) {
        // console.log(elementoIessimoOggettoFilmPoster.id);


        // * opzione1
        this.router.navigate(["film-detail", elementoIessimoOggettoFilmPoster.id])
        // ! IMPORTANTE: il path devr per forza COINCIDERE PERFETTAMENTE o con il valore di "routerLink" oppure con l'argomento del metodo "navigate"
        // * opzione1
        // * opzione2
        // usare routerLink
        // * opzione2


        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;



    };//! funzione CREATA vediDettaglioFilmPoster




    inserireFilmAcquistatoNelServerLocale(elementoIessimoOggettoFilm: Ifilm, enterAnimationDuration: string, exitAnimationDuration: string) {

        this.filmService.prendereFilmsAcquistatiDalServerLocale().subscribe(
            {
                next: (data) => {
                    // console.log(data);

                    let primoElementoIessimoOggettoTrovato = data.find((elementoIessimoOggetto) => {
                        // console.log(elementoIessimoOggetto.film.id);


                        return (elementoIessimoOggetto.film.id == elementoIessimoOggettoFilm.id);
                    })

                    if (primoElementoIessimoOggettoTrovato == undefined) {

                        this.filmService.inserireFilmAcquistatoNelServerLocale(elementoIessimoOggettoFilm)?.subscribe(
                            {
                                next: (data) => {

                                    // console.log(data);//! mi ritorna un singolo oggetto: {userId: 3, film: {…}, id: 1}


                                    setTimeout(() => {
                                        this.router.navigate(["LoginToken"]);
                                        // ! ATTENZION: se vado nella "LoginToken" posso vedere DIRETTAMENTE i film che ho acquistato. Questo è vero solo se mi sono loggato prima altrimenti NON vedrò i film che ho acquistato, vedrò solo i campi di email e password per potermi loggare un' altra volta


                                    }, 1000)


                                }
                            }
                        )

                    }


                    else {


                        this.filmService.popUp("messaggioHaiGiaAcquistatoFilm");





                        const dialogRef = this.matDialog.open(PopPupComponent, {
                            // ! "open()" è un metodo dove il primo argomento(OBBGLIGATORIO) è il nome del mio componente popPup mentre il secondo argomento(OPZIONALE) è SEMPRE uno oggetto
                            // ! Tale oggetto può avere diverse proprietà tra cui "data"
                            data: elementoIessimoOggettoFilm.title,
                            width: "50%",
                            enterAnimationDuration,//! mi dice quanti ms deve durare l'effetto di comparire della popup
                            exitAnimationDuration,//! mi dice quanti ms deve durare l'effetto di Scomparire della popup



                        });
                    }


                }
            }
        )

       

    };//! funzione CREATA acquistaFilm



    inserireFilmPreferitoNelServerLocale(elementoIessimoOggettoFilm: Ifilm, enterAnimationDuration: string, exitAnimationDuration: string) {


        this.filmService.prendereFilmsPreferitiDalServerLocale().subscribe(
            {
                next: (data) => {
                    // console.log(data);

                    let primoElementoIessimoOggettoTrovato = data.find((elementoIessimoOggetto) => {
                        // console.log(elementoIessimoOggetto.film.id);


                        return (elementoIessimoOggetto.film.id == elementoIessimoOggettoFilm.id);
                    })

                    if (primoElementoIessimoOggettoTrovato == undefined) {

                        this.filmService.inserireFilmPreferitotoNelServerLocale(elementoIessimoOggettoFilm)?.subscribe(
                            {
                                next: (data) => {

                                    // console.log(data);//! mi ritorna un singolo oggetto: {userId: 3, film: {…}, id: 1}


                                    setTimeout(() => {
                                        this.router.navigate(["LoginToken"]);
                                        // ! ATTENZION: se vado nella "LoginToken" posso vedere DIRETTAMENTE i film che ho acquistato. Questo è vero solo se mi sono loggato prima altrimenti NON vedrò i film che ho acquistato, vedrò solo i campi di email e password per potermi loggare un' altra volta


                                    }, 1000)


                                }
                            }
                        )

                    }


                    else {


                        this.filmService.popUp("messaggioHaiGiaMessoAPreferitiQuestoFilm");





                        const dialogRef = this.matDialog.open(PopPupComponent, {
                            // ! "open()" è un metodo dove il primo argomento(OBBGLIGATORIO) è il nome del mio componente popPup mentre il secondo argomento(OPZIONALE) è SEMPRE uno oggetto
                            // ! Tale oggetto può avere diverse proprietà tra cui "data"
                            data: elementoIessimoOggettoFilm.title,
                            width: "50%",
                            enterAnimationDuration,//! mi dice quanti ms deve durare l'effetto di comparire della popup
                            exitAnimationDuration,//! mi dice quanti ms deve durare l'effetto di Scomparire della popup



                        });
                    }


                }
            }
        )



    }




};//! classe(componente) FilmsListComponent
