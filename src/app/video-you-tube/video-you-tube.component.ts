import { Component, Input, OnInit } from '@angular/core';
import { FilmService } from '../services/film.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-video-you-tube',
    templateUrl: './video-you-tube.component.html',
    styleUrls: ['./video-you-tube.component.css']
})
export class VideoYouTubeComponent implements OnInit {

    caricamento: boolean = true;

   

    isVideoEsiste?: boolean;
    // ! Ho messo "?" perche in questo modo appena avviene il caricamento del componente "video-you-tube.component.html" NON compare la scritta " <h2>Il trailer del film <em>{{filmService.titoloFilm}}</em> non è disponibile</h2>"
    // ! alternativa 2 sarebbe usare proprietà animation


    valoreKeyVideoYouTube?: string;


    valoreSegnaposto?: string;


    // @Input()
    // titoloFilm?: string;

    // titoloFilm?: string;


    constructor(public filmService: FilmService, private route: ActivatedRoute, private router: Router) {


    };//! funzione CREATA constructor



    ngOnInit(): void {

        this.prendereVideoYouTube();



    };//! funzione CREATA ngOnInit





    prendereVideoYouTube() {
        // console.log("youtube");
        

        this.route.parent!.params.subscribe(
            // ! uso "parent" per poter prendere il parametro id riguardamnte il PADRE
            (segnaPosto) => {//! "segnaPosto" è uno oggetto.Tale oggetto ha come proprietà "testo"(cioè quello che ho scritto nel "path")
                // console.log(segnaPosto);

                // console.log(segnaPosto["id"]);//! IMPORTANTE: usare la notazione quadre(array) per prendere il valore di tale proprietà perchè il valore di tale proprietà proviene dall'html
                this.valoreSegnaposto = segnaPosto["id"];


                this.filmService.prendereVideoYouTube(this.valoreSegnaposto!).subscribe(
                    {
                        next: (data) => {
                            // console.log(data);
                            // console.log(data.cast);
                            if (data == null) {
                                this.router.navigate(["home"]);
                                // return

                            }
                            else {//! al posto del else potevo usare il return dentro if
                                // console.log(data.results);//!esso  mi puo ritornare un array di oggetti oppure un array vuoto
                                


                                if (data.results.length == 0) {
                                    this.isVideoEsiste = false;
                                    // ! se mi ritorna un array vuoto allora non faccio vedere il video youtube nella view
                                    
                                }
                                else {// ! se mi ritorna un array di oggetti allora faccio vedere il video youtube nella view
                                    this.valoreKeyVideoYouTube = data.results[0].key;
                                    // console.log(data.results[0].key);
                                    this.isVideoEsiste = true;


                                }


                            }


                            this.caricamento = false;





                        }
                    }
                )


            }
        )


    };//! funzione CREATA ngOnInit



};//! classe(componente) VideoYouTubeComponent
