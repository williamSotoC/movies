import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import swiper, { Navigation, Pagination } from "swiper"
import { FilmService } from '../services/film.service';
import { Ifilm } from '../interfaccia/filmsList';
import { Router } from '@angular/router';

// ! Per le versioni più recenti di Angular devo per forza scrivere lo seguente:
swiper.use([
    Navigation,
    Pagination,


]);

@Component({
    selector: 'app-slider',
    templateUrl: './slider.component.html',
    styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit, AfterViewInit {
    // ! "AfterViewInit" è un'interfaccia nativa di angular e quando implementiamo tale interfaccia al componente , viene automaticamente eseguito il metodo "ngAfterViewInit()"
    // ! una cosa importante è che tale metodo viene eseguito solo ed esclussivamente dopo che Angular abbia INIZIALIZZATO COMPLETAMENTE la vista(view) del componente
    // ! "AfterViewInit" è una fase  del ciclo di vita di un componente che viene dopo constructor e ngOnInit

    arrayDiOggettiFilmsSlider: Ifilm[] = [];


    private ilMioSwiper?: swiper;
    // ! "swiper" è un'interfaccia nativa della libreria "swiper.js" per cui lo importo sopra

    constructor(private filmService: FilmService, private router: Router) {



    };//! funzione CREATA constructor











    ngOnInit(): void {

        this.filmService.prendereFilms().subscribe(
            {
                next: (data) => {
                    // console.log(data);
                    // console.log(data.results);

                    this.arrayDiOggettiFilmsSlider = data.results;



                }
            }
        )




    };//! funzione CREATA ngOnInit


    ngAfterViewInit(): void {


        this.ilMioSwiper = new swiper(".swiper", {
            // // ! "swiper" è una classe nativa della libreria SWIPER che ho installato
            // // ! ".swiper" rappresenta la classe css legato al componente "slider.component.html"
            // // loop: true,
            // // ! "loop" è una proprietà che mi permette di far scorre lo slider a destra o sinistra

            // observer: true,//! esso mi permette di andare avanti e indietro quando clicco sui button destra/sinistra
            // // observeParents: true,
            // speed: 1000,//! mi dice la velocità in millesecondi con cui passo da una foto all'altra
            // // parallax:true,
            // slidesPerView: 1,//! mi dice la il numero di foto che voglio mostrare in prima pagina cioè senza aver cliccato sui button
            // //   loop:true,
            // pagination: {
            //     el: ".swiper-pagination",
            //     type: "bullets",
            //     clickable: true//! in questo modo i bullets diventano cliccabili
            // },
            // //   autoplay: true,
            // //   simulateTouch:true,
            // navigation: {
            //     nextEl: '.relatedproducts .swiper-button-next',
            //     prevEl: '.relatedproducts .swiper-button-prev',
            // },
            // // cardsEffect: {
            // //     rotate: true,
            // // }


            // ! "swiper" è una classe nativa della libreria SWIPER che ho installato
            // ! ".swiper" rappresenta la classe css legato al componente "slider.component.html"
            // loop: true,
            // ! "loop" è una proprietà che mi permette di far scorre lo slider a destra o sinistra

            observer: true,//! esso mi permette di andare avanti e indietro quando clicco sui button destra/sinistra
            // observeParents: true,
            speed: 3000,//! mi dice la velocità in millesecondi con cui passo da una foto all'altra
            // parallax:true,
            // slidesPerView: 5,//! mi dice la il numero di foto che voglio mostrare in prima pagina cioè senza aver cliccato sui button
            // spaceBetween: 15,
            // direction: "horizontal",
            //   loop:true,
            autoplay: {
                delay: 2000
            },//! mi permette di passare da una foto all' altra in modo automatico
            //   simulateTouch:true,
            //   navigation: {
            //     nextEl: '.swiper-button-next',
            //     prevEl: '.swiper-button-prev',
            //   },

            pagination: {
                el: ".swiper-pagination",
                // type: "progressbar",
                // type: "fraction",
                type: "bullets",
                // type: "custom",
                clickable: true//! in questo modo i bullets diventano cliccabili
            },




        })

        // console.log(this.ilMioSwiper);



    };//! funzione CREATA ngAfterViewInit


    indietroSlider() {
        this.ilMioSwiper?.slidePrev()
        // ! "slidePrev" è un metodo della libreria "swiper" che ho installato che mi permette di andare a destra quando clicco sul button destro del mio slider
        // ! "ilMioSwiper" puo esistere oppure non esistere cioè "ilMioSwiper" puo avere come valore null o diverso da null
        // ! mettendo il punto esclamarivo sto dicendo ad Angular: tranquillo io sono sicuro che esiste il valore di "ilMioSwiper" cioè sono sicuro che il valore di "ilMioSwiper" è diverso da null
        // ! mettendo il punto interrogativo sto dicendo ad Angular: nel caso "ilMioSwiper" non esiste cioè nel caso "ilMioSwiper" ha come valore null allora tale verra convertito a undefined

    };//! funzione CREATA indietroSlider


    avantiSlider() {
        this.ilMioSwiper?.slideNext()

    };//! funzione CREATA avantiSlider


    vediDettaglioFilmSlider(elementoIessimoOggettofilmSlider: Ifilm) {
        this.router.navigate(["film-detail", elementoIessimoOggettofilmSlider.id])


    };//! funzione CREATA avantiSlider









};//! classe(componente) SliderComponent
