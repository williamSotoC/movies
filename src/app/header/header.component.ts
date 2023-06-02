import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FilmService } from '../services/film.service';
import { AutenticazioneUtenteService } from '../services/autenticazione-utente.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent  {

    

    constructor(private router: Router, private filmService: FilmService, public autenticazioneUtenteService: AutenticazioneUtenteService) {


    };//! funzione CREATA constructor
    


    modello = {
        nome: ""
    }
    
    
    prendereTestoDigitato(cercaFilm: string) {

        this.filmService.reset();

        // console.log(cercaFilm);
        let cercaFilmPulito = this.modello.nome.trim();//! per eliminare gli spazi VUOTI a destra e sinistra del testo

        if (cercaFilmPulito.length == 0) {

            return;//! quando NON inserisco nessun carattere nel campo della serch, ESCO immediatamente dalla funzione "prendereTestoDigitato()" e nella view NON SUCCCEDE NIENTE
            
        }

        // ! invece se ho scritto qualcosa ,mi reindirizzo al path "cercare-film/:testo".E in quel precisso  momento verrà caricato il componente "CercareFilmComponent"
        this.router.navigate(["cercare-film", cercaFilmPulito]);



        
        document.documentElement.scrollTop = 0;//! In questo modo quando distruggo il home.component, verrà mostrato la parte più in alto del nuovo componente
        document.body.scrollTop = 0;//! In questo modo quando distruggo il home.component, verrà mostrato la parte più in alto del nuovo componente


        // ! pulisco il campo dell' input cercare nome film
        this.modello = {
            nome: ""

        }
        // ! pulisco  il campo dell' input 



    };//! funzione CREATA prendereTestoDigitato



    vaiAPopularMovie() {
         // ! valido per browser chrome
         document.documentElement.scrollTop = 1750;//! in questo modo ogni volta che viene rendirizzato il componente "home.component",verrà mostrato la parte più in alto di tale componente
         console.log(document.documentElement.scrollTop);
         // ! valido per browser chrome
         // ! valido per altri browser
         document.body.scrollTop = 1750;
         // ! valido per altri browser
 


    };//! funzione CREATA vaiAPopularMovie






};//! classe(componente) HeaderComponent







