import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FilmService } from '../services/film.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ICast, ICrew } from '../interfaccia/cast';
import swiper, { Navigation, Pagination, Autoplay } from 'swiper';

// ! Per le versioni più recenti di Angular devo per forza scrivere lo seguente:
swiper.use([
    Navigation,
    Pagination,
    Autoplay
    // ! ATTENZIONE: essi devono iniziare con la lettera maiuscola e li devo importare sopra

]);

@Component({
    selector: 'app-cast',
    templateUrl: './cast.component.html',
    styleUrls: ['./cast.component.css']
})
export class CastComponent implements OnInit, AfterViewInit {

    isCastEsiste?: boolean;


    valoreSegnaposto?: string;

    arrayDiOggettiCast: ICast[] = [];
    // arrayDiOggettiCrew: ICrew[] = [];


    @Input()
    titoloFilm?: string;


    private ilMioSwiperCast?: swiper;
    // ! "swiper" è un'interfaccia nativa della libreria "swiper.js" per cui lo importo sopra




    constructor(private filmService: FilmService, private route: ActivatedRoute, private router: Router) {



    };//! funzione CREATA constructor







    ngOnInit(): void {

        this.prendereCast();






    };//! funzione CREATA ngOnInit






    ngAfterViewInit(): void {
        this.ilMioSwiperCast = new swiper(".swiper.s1", {
            // ! "swiper" è una classe nativa della libreria SWIPER che ho installato
            // ! ".swiper" rappresenta la classe css legato al componente "slider.component.html"
            // loop: true,
            // ! "loop" è una proprietà che mi permette di far scorre lo slider a destra o sinistra

            observer: true,//! esso mi permette di andare avanti e indietro quando clicco sui button destra/sinistra
            // observeParents: true,
            speed: 1000,//! mi dice la velocità in millesecondi con cui passo da una foto all'altra
            // parallax:true,
            slidesPerView: 5,//! mi dice la il numero di foto che voglio mostrare in prima pagina cioè senza aver cliccato sui button
            spaceBetween: 20,
            // direction: "horizontal",
            //   loop:true,
            autoplay: {
                delay: 1000//! deve coincide con il valore di speed per avere una "dolce" transizione
            },
            //   simulateTouch:true,
            //   navigation: {
            //     nextEl: '.swiper-button-next',
            //     prevEl: '.swiper-button-prev',
            //   },

            pagination: {
                el: ".swiper-pagination",
                type: "progressbar",
                // type: "fraction",
                // type: "custom",
                // clickable: true//! in questo modo i bullets diventano cliccabili
            },


        })




    };//! funzione CREATA ngAfterViewInit







    indietroSliderCast() {
        this.ilMioSwiperCast?.slidePrev();
        // ! "slidePrev" è un metodo della libreria "swiper" che ho installato che mi permette di andare a destra quando clicco sul button destro del mio slider
        // ! "ilMioSwiper" puo esistere oppure non esistere cioè "ilMioSwiper" puo avere come valore null o diverso da null
        // ! mettendo il punto esclamarivo sto dicendo ad Angular: tranquillo io sono sicuro che esiste il valore di "ilMioSwiper" cioè sono sicuro che il valore di "ilMioSwiper" è diverso da null
        // ! mettendo il punto interrogativo sto dicendo ad Angular: nel caso "ilMioSwiper" non esiste cioè nel caso "ilMioSwiper" ha come valore null allora tale verra convertito a undefined

    };//! funzione CREATA indietroSlider


    avantiSliderCast() {
        this.ilMioSwiperCast?.slideNext();

    };//! funzione CREATA avantiSlider



    prendereCast() {

        this.route.params.subscribe(
            (segnaPosto) => {//! "segnaPosto" è uno oggetto.Tale oggetto ha come proprietà "testo"(cioè quello che ho scritto nel "path")
                // console.log(segnaPosto);

                // console.log(segnaPosto["id"]);//! IMPORTANTE: usare la notazione quadre(array) per prendere il valore di tale proprietà perchè il valore di tale proprietà proviene dall'html
                this.valoreSegnaposto = segnaPosto["id"];


                this.filmService.prendereCast(this.valoreSegnaposto!).subscribe(
                    {
                        next: (data) => {
                            // console.log(data);
                            // console.log(data.cast);
                            if (data == null) {
                                this.router.navigate(["home"])
                                // return

                            }
                            else {//! al posto del else potevo usare il return dentro if
                                this.arrayDiOggettiCast = data.cast;
                                // console.log(data.cast);//!esso  mi puo ritornare un array di oggetti oppure un array vuoto

                                // this.arrayDiOggettiCrew = data.crew;


                                if (data.cast.length == 0) {
                                    this.isCastEsiste = false;
                                    // ! se mi ritorna un array vuoto allora non faccio vedere Lo slider del cast nella view

                                }
                                else {// ! se mi ritorna un array di oggetti allora faccio vedere Lo slider del cast nella view
                                    this.arrayDiOggettiCast = data.cast;
                                    this.isCastEsiste = true;


                                }

                            }





                        }
                    }
                )


            }
        )











    };//! funzione CREATA prendereCast










};//! componente(classe) CastComponent
