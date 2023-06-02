import { Component, Input, OnInit } from '@angular/core';
import { FilmService } from '../services/film.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Ifilm } from '../interfaccia/filmsList';

@Component({
    selector: 'app-film-similari',
    templateUrl: './film-similari.component.html',
    styleUrls: ['./film-similari.component.css']
})
export class FilmSimilariComponent implements OnInit {


    arrayDiOggettiFilmSimilari: Ifilm[] = [];

    isFilmSimilariEsiste: boolean = false;

    valoreSegnaposto?: string

    @Input()
    titoloFilmSimilari?: string

   



    constructor(private filmService: FilmService, private route: ActivatedRoute, private router: Router) {


    };//! funzione CREATA constructor




    ngOnInit(): void {

        this.prendereFilmSimilari();


    };//! funzione CREATA ngOnInit



    prendereFilmSimilari() {


        this.route.params.subscribe(
            (segnaPosto) => {//! "segnaPosto" è uno oggetto.Tale oggetto ha come proprietà "testo"(cioè quello che ho scritto nel "path")
                // console.log(segnaPosto);

                // console.log(segnaPosto["id"]);//! IMPORTANTE: usare la notazione quadre(array) per prendere il valore di tale proprietà perchè il valore di tale proprietà proviene dall'html
                this.valoreSegnaposto = segnaPosto["id"];


                this.filmService.prendereFilmSimilari(this.valoreSegnaposto!).subscribe(
                    {
                        next: (data) => {
                            // console.log(data);
                            // console.log(data.cast);
                            if (data == null) {
                                this.router.navigate(["home"])
                                // return

                            }
                            else {//! al posto del else potevo usare il return dentro if
                                // console.log(data.results);//! esso puo ritornare un array di oggetti oppure un array vuoto

                                if (data.results.length == 0) {
                                    this.isFilmSimilariEsiste = false;

                                }
                                else {
                                    this.arrayDiOggettiFilmSimilari = data.results;

                                    this.isFilmSimilariEsiste = true;
                                }

                            }





                        }
                    }
                )


            }
        )










    };//! funzione CREATA prendereFilmSimilari


    // vediDettaglioFilmSimilare(elementoIessimoOggettoFilmSimilare: Ifilm) {
    //     console.log(elementoIessimoOggettoFilmSimilare.id);

    //     this.router.navigate(["film-detail", elementoIessimoOggettoFilmSimilare.id])



    // };//! funzione CREATA vediDettaglioFilmSimilare





};//! classe(componente) FilmSimilariComponent
