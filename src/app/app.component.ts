import { Component, HostListener } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'movies';


    private coordinataYLimite = 1500;
    
    isButtonCompare: boolean = false;


    @HostListener("window:scroll")
    buttonSu() {
        // console.log('hola');


        let coordinataYAttuale = (document.documentElement.scrollTop || document.body.scrollTop);
        // ! "document.documentElement.scrollTop" è quello che funziona nel browser Chrome .Invece l'altra espressione funziona in altri browser come firebox edge ecc
        // console.log(coordinataYAttuale);
        
        // ! "coordinataYAttuale" mi ritorna la coordinata Y partendo dal top della barra di scorrimento verticale



        if (coordinataYAttuale > this.coordinataYLimite) {

            this.isButtonCompare = true;
            
        }
        else {
            this.isButtonCompare = false;
        }
    };//! funzione CREATA buttonSu

    // ! il decoratore @HostListener ha il compito di ascoltare un evento che si verifica nel DOM EX: evento scroll
    // ! Inoltre tale decoratore ci fornisce un metodo(che lo posso chiamare come voglio) dentro il quale scrivo la logica cioè cosa voglio che succeda quando si verifica tale evento nel DOM

    vaiSu() {

        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;



    };//! funzione CREATA vaiSu




};//! classe(componente)AppComponent
