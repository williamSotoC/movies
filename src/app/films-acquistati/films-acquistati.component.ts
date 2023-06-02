import { Component, OnInit } from '@angular/core';
import { FilmService } from '../services/film.service';
import { IFilmAcquistato, Ifilm } from '../interfaccia/filmsList';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PopPupComponent } from '../pop-pup/pop-pup.component';
import { AutenticazioneUtenteService } from '../services/autenticazione-utente.service';

@Component({
    selector: 'app-films-acquistati',
    templateUrl: './films-acquistati.component.html',
    styleUrls: ['./films-acquistati.component.css']
})
export class FilmsAcquistatiComponent implements OnInit {

    arrayDiOggettiFilmsAcquistati: IFilmAcquistato[] = [];


    arrayDiOggettiFilmsPreferiti: IFilmAcquistato[] = [];



    constructor(private filmService: FilmService, private config: NgbRatingConfig, private router: Router, private route: ActivatedRoute, public matDialog: MatDialog, public autenticazioneUtenteService: AutenticazioneUtenteService) {
        // ! "MatDialog" è un servizio(classe iniettabile) nativo di Angular Material
        // ! "matDialog" è l'istanza di "MatDialog"

        config.max = 10;
        config.readonly = true;



    };//! funzione CREATA constructor

    myParam: any


    ngOnInit(): void {

        this.prendereFilmsAcquistatiDalServerLocale();
        this.prendereFilmsPreferitiDalServerLocale();


        this.myParam = this.route.snapshot.params['accessToken'] //! utilizzo la proprietà snapshot del Service ActivatedRoute
        // console.log(this.myParam)//! esso mi ritorna il token che ho  preso dal segnaposto "token"



        if (this.myParam != null) {//! cioè se c'è il token nel segnaposto "token" allora tale token lo inserisco nel "localStorage"

            //!  tale token lo inserisco nel "localStorage" del browser
            localStorage.setItem('accessToken', this.myParam)

        }




    };//! funzione CREATA ngOnInit







    prendereFilmsAcquistatiDalServerLocale() {


        

        this.filmService.prendereFilmsAcquistatiDalServerLocale().subscribe(
            {
                next: (data) => {

                    // console.log(data);//! mi ritorna un array di oggetti di tipo  "IFilmAcquistato[]"
                    // ! l'elememntoIEssimo di tale array è: {userId: 3, film: {…}, id: 1}

                    this.arrayDiOggettiFilmsAcquistati = data;
                        


                }
            }
        )



    };//! funzione CREATA prendereFilmsAcquistatiDalServerLocale







    prendereFilmsPreferitiDalServerLocale() {
        

        this.filmService.prendereFilmsPreferitiDalServerLocale().subscribe(
            {
                next: (data) => {

                    // console.log(data);//! mi ritorna un array di oggetti di tipo  "IFilmAcquistato[]"
                    // ! l'elememntoIEssimo di tale array è: {userId: 3, film: {…}, id: 1}


                   

                    this.arrayDiOggettiFilmsPreferiti = data;
                        
                  






                    


                }
            }
        )



    };//! funzione CREATA prendereFilmsAcquistatiDalServerLocale




    restituisciFilmAcquistato(valoreIdIFilmAcquistato: number, titoloFilm: string, enterAnimationDuration: string, exitAnimationDuration: string) {

        this.filmService.popUp("restituisceFilmAcquistato");


        const dialogRef = this.matDialog.open(PopPupComponent, {
            // ! "open()" è un metodo dove il primo argomento(OBBGLIGATORIO) è il nome del mio componente popPup mentre il secondo argomento(OPZIONALE) è SEMPRE uno oggetto
            // ! Tale oggetto può avere diverse proprietà tra cui "data"
            data: titoloFilm,
            width: "50%",
            enterAnimationDuration,//! mi dice quanti ms deve durare l'effetto di comparire della popup
            exitAnimationDuration,//! mi dice quanti ms deve durare l'effetto di Scomparire della popup

        });

        dialogRef.afterClosed().subscribe((response) => {

            // console.log(response);//! esso mi ritorna true se faccio click sul button "SI".Invece mi ritorna indefined se faccio click sul button "NO" perchè non gli ho passato nessun parametro alla funzione "clickSuButtonNo()"

            if (response == true) {

                // if (confirm("Sei sicuro?") == true) {
                console.log(valoreIdIFilmAcquistato);

                this.filmService.restituisciFilmAcquistato(valoreIdIFilmAcquistato)?.subscribe(
                    {
                        next: (data) => {

                            // console.log(data);//! mi ritorna un singolo oggetto vuoto {}

                            // this.prendereFilmsAcquistatiDalServerLocale();//!  carico un'altra volta(cioè agisco sul ngOnInit un' altra volta) il componente "FilmsAcquistatiComponent" in questo modo il film restituito scompare appena faccio click sul bottone "RESTITUISCI FILM", SENZA CAMBIARE ROTTA E SENZA AGGIORNARE LA MIA INTERA PAGINA WEB



                            this.filmService.prendereFilmsAcquistatiDalServerLocale().subscribe(
                                {
                                    next: (data) => {

                                        // console.log(data);//! mi ritorna un array di oggetti di tipo  "IFilmAcquistato[]"
                                        // ! l'elememntoIEssimo di tale array è: {userId: 3, film: {…}, id: 1}

                                        if (data.length == 0) {

                                            this.router.navigate(["home"]);

                                        }
                                        else {
                                            this.arrayDiOggettiFilmsAcquistati = data;

                                        }




                                    }
                                }
                            )





                        }
                    }
                )

                // }


            }



        })






    };//! funzione CREATA restituisciFilmAcquistato








    restituisciFilmPreferito(valoreIdIFilmPreferito: number, titoloFilm: string, enterAnimationDuration: string, exitAnimationDuration: string) {

        this.filmService.popUp("restituisceFilmPreferito");


        const dialogRef = this.matDialog.open(PopPupComponent, {
            // ! "open()" è un metodo dove il primo argomento(OBBGLIGATORIO) è il nome del mio componente popPup mentre il secondo argomento(OPZIONALE) è SEMPRE uno oggetto
            // ! Tale oggetto può avere diverse proprietà tra cui "data"
            data: titoloFilm,
            width: "50%",
            enterAnimationDuration,//! mi dice quanti ms deve durare l'effetto di comparire della popup
            exitAnimationDuration,//! mi dice quanti ms deve durare l'effetto di Scomparire della popup

        });

        dialogRef.afterClosed().subscribe((response) => {

            // console.log(response);//! esso mi ritorna true se faccio click sul button "SI".Invece mi ritorna indefined se faccio click sul button "NO" perchè non gli ho passato nessun parametro alla funzione "clickSuButtonNo()"

            if (response == true) {

                // if (confirm("Sei sicuro?") == true) {
                console.log(valoreIdIFilmPreferito);

                this.filmService.restituisciFilmPreferito(valoreIdIFilmPreferito)?.subscribe(
                    {
                        next: (data) => {

                            // console.log(data);//! mi ritorna un singolo oggetto vuoto {}

                            // this.prendereFilmsAcquistatiDalServerLocale();//!  carico un'altra volta(cioè agisco sul ngOnInit un' altra volta) il componente "FilmsAcquistatiComponent" in questo modo il film restituito scompare appena faccio click sul bottone "RESTITUISCI FILM", SENZA CAMBIARE ROTTA E SENZA AGGIORNARE LA MIA INTERA PAGINA WEB



                            this.filmService.prendereFilmsPreferitiDalServerLocale().subscribe(
                                {
                                    next: (data) => {

                                        // console.log(data);//! mi ritorna un array di oggetti di tipo  "IFilmAcquistato[]"
                                        // ! l'elememntoIEssimo di tale array è: {userId: 3, film: {…}, id: 1}

                                        if (data.length == 0) {

                                            this.router.navigate(["home"]);

                                        }
                                        else {
                                            this.arrayDiOggettiFilmsPreferiti = data;

                                        }




                                    }
                                }
                            )





                        }
                    }
                )

                // }


            }



        })






    };//! funzione CREATA restituisciFilmAcquistato




    logout(enterAnimationDuration: string, exitAnimationDuration: string) {

        this.filmService.popUp("logout");



        const dialogRef = this.matDialog.open(PopPupComponent, {
            // ! "open()" è un metodo dove il primo argomento(OBBGLIGATORIO) è il nome del mio componente popPup mentre il secondo argomento(OPZIONALE) è SEMPRE uno oggetto
            // ! Tale oggetto può avere diverse proprietà tra cui "data"

            width: "50%",
            enterAnimationDuration,//! mi dice quanti ms deve durare l'effetto di comparire della popup
            exitAnimationDuration,//! mi dice quanti ms deve durare l'effetto di Scomparire della popup

        });

        dialogRef.afterClosed().subscribe((response) => {

            // console.log(response);//! esso mi ritorna true se faccio click sul button "SI".Invece mi ritorna undefined se faccio click sul button "NO" perchè non gli ho passato nessun parametro alla funzione "clickSuButtonNo()"

            if (response == true) {//! quando faccio click sul button "SI" del popUp

                // if (confirm("Sei sicuro?") == true) {

                this.autenticazioneUtenteService.prendereNomeUtenteLOggato("utente scollegato")


                if (localStorage.getItem('accessToken') != null) {
                    // ! cioè se c'è l' accessToken nel "localStorage" allora RIMUOVI tale token dal "localStorage"

                    localStorage.removeItem("accessToken")//!Quindi quando faccio il logout ,scompare AUTOMATICAMENTE dal localStorage sia il nome della chiave ("accessToken")che il suo valore
                    // ! e poi indirizzarmi nel login
                    this.router.navigate(['LoginToken'])//! per potermi loggare un'altra volta e quindi inserire un nuovo valore di accessToken nella barra ri ricerca del mio BROWSER.Poi Al caricamento dell'area riservata(films-acquistati) ,tale  valore di accessToken verra preso e inserito nel localStorage cioè nel localStorage avrò: "accessToken": "valoreDelAccessToken"
                }
                else {
                    this.router.navigate(['not-found'])
                }
                

            }

        }
        )


    };//! funzione CREATA logout



    vediDettaglio(valoreId: number) {

        this.router.navigate(["film-detail", valoreId]);

    };//! funzione CREATA vediDettaglio


};//! classe(componente) FilmsAcquistatiComponent
