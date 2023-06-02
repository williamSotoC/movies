import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { FilmService } from '../services/film.service';
import { Ifilm } from '../interfaccia/filmsList';
import { Router } from '@angular/router';
import { PopPupComponent } from '../pop-pup/pop-pup.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {



    arrayDiOggettiFilmsPoster: Ifilm[] = [];

    arrayDiOggettiFilmsGenereAnimazione: Ifilm[] = [];

    arrayDiOggettiFilmsGenereHorror: Ifilm[] = [];

    arrayDiOggettiFilmsGenereFantascienza: Ifilm[] = [];

    arrayDiOggettiFilmsGenereRomance: Ifilm[] = [];




    // @HostListener("window:scroll", ["$event"])//! esso vuoledire che quando si verifica l'evento scroll nel Dom fai quello che c'è scritto dentro le graffe del metodo "scroll()" 
    // // ! "HostListener" è un decoratore e lo devo importare sopra
    // // ! "window_scroll" è il nome del evento che vogliamo ascoltare nel DOM
    // // ! ["$event"] l' uso per PRENDERE le informazioni di quell'evento
    // scroll(){
    //     // ! tale decoratore è legato alla funzione che chiamo ad esempio "scroll()"
    //     // console.log("stai scrollando");
    //     let coordinataYAttuale = (document.documentElement.scrollTop || document.body.scrollTop) + 1000;
    //     // ! "coordinataYAttuale" mi ritorna la coordinata Y partendo dal top della barra di scorrimento verticale
    //     let coordinataYMassimaContenutoDOM = (document.documentElement.scrollHeight || document.body.scrollHeight);
    //     // ! "coordinataYMassimaContenutoDOM" mi riotrna la cordinata Y massima che occupa il contenuto del DOM

    //     // console.log(coordinataYAttuale, coordinataYMassimaContenutoDOM);

    //     if (coordinataYAttuale > (coordinataYMassimaContenutoDOM)) {

    //         // this.filmService.superoLimiteScrollare("limite");

    //         this.filmService.prendereFilms().subscribe(
    //             {
    //                 next: (data) => {
    //                     // console.log(data);

    //                     let arrayResults = data.results;

    //                     this.arrayDiOggettiFilmsPoster.push(...arrayResults)


    //                 }
    //             }
    //         )

    //     }




    // };//! funzione CREATA scroll


    constructor(private filmService: FilmService, private router: Router, public matDialog: MatDialog) {


    };//! funzione CREATA constructor




    ngOnInit(): void {

        this.filmService.prendereFilms().subscribe(
            {
                next: (data) => {
                    // console.log(data);
                    // console.log(data.results);

                    this.arrayDiOggettiFilmsPoster = data.results;


                }
            }
        )



        // ! valido per browser chrome
        document.documentElement.scrollTop = 0;//! in questo modo ogni volta che viene rendirizzato il componente "home.component",verrà mostrato la parte più in alto di tale componente
        // console.log(document.documentElement.scrollTop);
        // ! valido per browser chrome
        // ! valido per altri browser
        document.body.scrollTop = 0;
        // ! valido per altri browser





        // this.prendereFilms();
        this.prendereGenereAnimazione();
        this.prendereGenereHorror();
        this.prendereGenereRomance();
        this.prendereGenereFantascienza();



    };//! funzione CREATA ngOnInit


    


    @HostListener("window:scroll")//! esso vuoledire che quando si verifica l'evento scroll nel Dom fai quello che c'è scritto dentro le graffe del metodo "scroll()" 
    // ! "HostListener" è un decoratore e lo devo importare sopra
    // ! "window_scroll" è il nome del evento che vogliamo ascoltare nel DOM
    // ! ["$event"] l' uso per PRENDERE le informazioni di quell'evento
    scroll() {
        // ! tale decoratore è legato alla funzione che chiamo ad esempio "scroll()"
        // console.log("stai scrollando");
        let coordinataYAttuale = (document.documentElement.scrollTop || document.body.scrollTop) + 1000;
        // ! "coordinataYAttuale" mi ritorna la coordinata Y partendo dal top della barra di scorrimento verticale
        let coordinataYMassimaContenutoDOM = (document.documentElement.scrollHeight || document.body.scrollHeight);
        // ! "coordinataYMassimaContenutoDOM" mi riotrna la cordinata Y massima che occupa il contenuto del DOM

        // console.log(coordinataYAttuale, coordinataYMassimaContenutoDOM);

        if (coordinataYAttuale > (coordinataYMassimaContenutoDOM)) {

            // this.filmService.superoLimiteScrollare("limite");

            this.filmService.prendereFilms().subscribe(
                {
                    next: (data) => {
                        // console.log(data);

                        let arrayResults = data.results;

                        this.arrayDiOggettiFilmsPoster.push(...arrayResults)
                        // ! uso lo spread operator: Esso serve per UNIRE gli elementi di piu array in unico array o UNIRE le proprietà di più oggetti in unico oggetto



                    }
                }
            )

        }




    };//! funzione CREATA scroll




    vediDettaglioFilmPoster(elementoIessimoOggettoFilmPoster: Ifilm) {
        // console.log(elementoIessimoOggettoFilmPoster.id);


        // * opzione1
        this.router.navigate(["film-detail", elementoIessimoOggettoFilmPoster.id])
        // ! IMPORTANTE: il path devr per forza COINCIDERE PERFETTAMENTE o con il valore di "routerLink" oppure con l'argomento del metodo "navigate"
        // * opzione1
        // * opzione2
        // usare routerLink
        // * opzione2



    };//! funzione CREATA vediDettaglioFilmPoster


    ngOnDestroy(): void {
        // ! ogni volta che CAMBIO rotta il componente viene distrutto
        // ! Per cui quando il componente "home.component" viene distrutto viene eseguito quello che c'è scritto dentro le graffe del metodo "ngOnDestroy()"

        // console.log("componente home distrutto");

        this.filmService.resetRitornoAllaPrimaPagina();//! In questo modo quando il componente "home.component" viene distrutto, mi ritornerano i film partendo dalla pagina 1


        // document.documentElement.scrollTop = 0;//! In questo modo quando distruggo il home.component, verrà mostrato la parte più in alto del nuovo componente
        // document.body.scrollTop = 0;//! In questo modo quando distruggo il home.component, verrà mostrato la parte più in alto del nuovo componente
        // console.log(document.documentElement.scrollTop);

    };//! funzione CREATA ngOnDestroy



    prendereGenereAnimazione() {

        this.filmService.prendereGenereAnimazione().subscribe(
            {
                next: (data) => {
                    // console.log(data);
                    // console.log(data.results);

                    this.arrayDiOggettiFilmsGenereAnimazione = data.results


                }
            }
        )

    };//! funzione CREATA prendereGenereAnimazione



    prendereGenereHorror() {

        this.filmService.prendereGenereHorror().subscribe(
            {
                next: (data) => {
                    // console.log(data);
                    // console.log(data.results);

                    this.arrayDiOggettiFilmsGenereHorror = data.results


                }
            }
        )

    };//! funzione CREATA prendereGenereHorror



    prendereGenereFantascienza() {

        this.filmService.prendereGenereFantascienza().subscribe(
            {
                next: (data) => {
                    // console.log(data);
                    // console.log(data.results);

                    this.arrayDiOggettiFilmsGenereFantascienza = data.results


                }
            }
        )

    };//! funzione CREATA prendereGenereFantascienza



    prendereGenereRomance() {

        this.filmService.prendereGenereRomance().subscribe(
            {
                next: (data) => {
                    // console.log(data);
                    // console.log(data.results);

                    this.arrayDiOggettiFilmsGenereRomance = data.results


                }
            }
        )

    };//! funzione CREATA prendereGenereRomance


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





};//! classe(componente) HomeComponent
