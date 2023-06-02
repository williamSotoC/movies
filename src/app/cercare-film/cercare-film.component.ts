import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilmService } from '../services/film.service';
import { Ifilm } from '../interfaccia/filmsList';

@Component({
    selector: 'app-cercare-film',
    templateUrl: './cercare-film.component.html',
    styleUrls: ['./cercare-film.component.css']
})
export class CercareFilmComponent implements OnInit, OnDestroy {


    caricamento: boolean = true;


    arrayDiOggettiCercare: Ifilm[] = [];
    isFilmEsiste: boolean = true;




    constructor(private route: ActivatedRoute, private filmService: FilmService) {



    };//! funzione CREATA constructor


    valoreSegnaposto?: string




    ngOnInit(): void {


        // document.documentElement.scrollTop = 0;//! In questo modo quando distruggo il home.component, verrà mostrato la parte più in alto del nuovo componente
        // document.body.scrollTop = 0;//! In questo modo quando distruggo il home.component, verrà mostrato la parte più in alto del nuovo componente

        this.route.params.subscribe(
            (segnaPosto) => {//! "segnaPosto" è uno oggetto.Tale oggetto ha come proprietà "testo"(cioè quello che ho scritto nel "path")
                // console.log(segnaPosto);

                // console.log(segnaPosto["testo"]);//! IMPORTANTE: usare la notazione quadre(array) per prendere il valore di tale proprietà perchè il valore di tale proprietà proviene dall'html
                this.valoreSegnaposto = segnaPosto["testo"];

                // this.filmService.reset();


                this.filmService.cercareFilm(this.valoreSegnaposto!).subscribe(
                    {
                        next: (data) => {
                            // console.log(data);//! mi ritorna un singolo oggetto
                            // console.log(data.results);//! mi ritorna array vuoto se il nome del film digitato dall'utente, NON è presente nell database dell'APISerch
        
                           
        
        
        
                            // ! se il film esiste NON esiste nell' APISerch allora mi ritorna un array VUOTO.Esso lo vedo nella console
                            if (data.results.length == 0) {
                                this.isFilmEsiste = false;
        
                            }
                            else {
                                this.arrayDiOggettiCercare = data.results;
        
        
                                this.isFilmEsiste = true;
        
        
        
                            }
        
        
                            this.caricamento = false;
        
        
        
        
                        }
                    }
                )
        
        


                
            }
        )

        

        
        




    };//! funzione CREATA ngOnInit


    @HostListener("window:scroll")//! esso vuoledire che quando si verifica l'evento scroll nel Dom fai quello che c'è scritto dentro le graffe del metodo "scroll()" 
    // ! "HostListener" è un decoratore e lo devo importare sopra
    // ! "window_scroll" è il nome del evento che vogliamo ascoltare nel DOM
    // ! ["$event"] l' uso per PRENDERE le informazioni di quell'evento
    scroll() {
        // ! tale decoratore è legato alla funzione che chiamo ad esempio "scroll()"
        // console.log("stai scrollando");
        let coordinataYAttuale = (document.documentElement.scrollTop || document.body.scrollTop) + 1000 ;
        // ! "coordinataYAttuale" mi ritorna la coordinata Y partendo dal top della barra di scorrimento verticale
        let coordinataYMassimaContenutoDOM = (document.documentElement.scrollHeight || document.body.scrollHeight);
        // ! "coordinataYMassimaContenutoDOM" mi riotrna la cordinata Y massima che occupa il contenuto del DOM

        // console.log(coordinataYAttuale, coordinataYMassimaContenutoDOM);

        if (coordinataYAttuale > (coordinataYMassimaContenutoDOM)) {

            // this.filmService.superoLimiteScrollare("limite");
            // this.filmService.reset();

            this.filmService.cercareFilm(this.valoreSegnaposto!).subscribe(
                {
                    next: (data) => {
                        // console.log(data);
                        let arrayResults = data.results;

                        this.arrayDiOggettiCercare.push(...arrayResults);
                        // ! uso lo spread operator: Esso serve per UNIRE gli elementi di piu array in unico array o UNIRE le proprietà di più oggetti in unico oggetto


                    }
                }
            )

        }
    }




    ngOnDestroy(): void {
        this.filmService.reset();//! in questo modo quando supero lo scroll limite quando faccio click sull' immgine di un film(per andare al dettaglio) e poi torno indietro(click freccia sinistra in alto della pagina web), allora in quel caso riesco a vedere il film cercato precedentemente  appartenente SEMPRE alla PAGINA 1  




    };//! funzione CREATA ngOnDestroy



};//! classe(componente) CercareFilmComponent
