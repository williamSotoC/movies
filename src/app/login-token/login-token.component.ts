import { Component, OnInit } from '@angular/core';
import { LoginDto } from '../interfaccia/utenteToken';
import { AutenticazioneUtenteService } from '../services/autenticazione-utente.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login-token',
    templateUrl: './login-token.component.html',
    styleUrls: ['./login-token.component.css']
})
export class LoginTokenComponent implements OnInit {

    messaggio?: string;
    miaEmail?: string;
    mioToken?: string;


    modello: LoginDto = new LoginDto("", "");


    constructor(private autenticazioneUtenteService: AutenticazioneUtenteService, private router: Router) {



    };//! funzione CREATA constructor
    
    
    ngOnInit(): void {


        if (localStorage.getItem('accessToken') != null) {
            //! se esiste l'item chiamato "accessToken" nel localStorage significa che abbiamo fatto già l'accesso e ci siamo autenticati rilasciando alla fine una coppia chiave-valore nel localstorage
            this.router.navigate(['films-acquistati', localStorage.getItem('accessToken')])
        }



        
    };//! funzione CREATA ngOnInit






    inviareUtenteLoggatoAlServerLocale() {
        // console.log(this.modello);//! mi ritorna uno oggetto con i dati inseriti dentro i campi della form

        this.autenticazioneUtenteService.inviareUtenteLoggatoAlServerLocale(this.modello).subscribe(
            {
                next: (data) => {
                    // console.log(data);//! "data" è un singolo oggetto ed è responseDelServerLocale

                    //let data = {
                    //     "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBpcHBvQGdtYWlsLmNvbSIsImlhdCI6MTY4NDQxMDk2MSwiZXhwIjoxNjg0NDE0NTYxLCJzdWIiOiIxIn0.tSfsgciU4ubipduEzAIKvmel3ql8F50TmMB4tUqgKqg",
                    //     "user": {
                    //         "email": "pippo@gmail.com",
                    //         "nome": "pippo",
                    //         "id": 1
                    //     }
                    // }

                    this.autenticazioneUtenteService.inserireResponseDelServerLocaleNelLocalStorage(data);
                    // ! In questo modo SOSTITUISCO nel local Storage, la responseDelServerLocale dovuta alla registrazione , con la responseDelServerLocale dovuta alla login    


                    this.autenticazioneUtenteService.prendereNomeUtenteLOggato(data.user.nome);
                    // ! per inserire il nome dell'utente loggato nella navBar



                    // ! messaggio che compare nella view
                    // *opzione 1
                    // this.messaggio = `L'utente con Email: ${this.modello.email} è autenticato con il seguente Token: ${data.accessToken}`;
                    // *opzione 1
                    

                    // *opzione 2
                    this.miaEmail = this.modello.email;
                    this.mioToken = data.accessToken;
                    // *opzione 2
                    // ! messaggio che compare nella view



                    setTimeout(() => {

                        this.autenticazioneUtenteService.impostareTrueOFalseUtenteLoggato(true);

                        this.router.navigate(["films-acquistati", data.accessToken]);

                    }, 4000)//! dopo 4 secondi vado nella rotta dashboard "films-acquistati"




                    // ! pulisco la form
                    this.modello = new LoginDto("", "");
                    // ! pulisco la form



                    this.messaggio = undefined
                    // ! ad esempio quando scrivo email o password sbagliata

                },
                error: (error) => {
                    // console.log(error);


                    // ! In caso di errore assegno il valore false alla proprietà "isUtenteLoggato"- Per fare ciò chiamo la funzione "impostareTrueOFalseUtenteLoggato()" che si trova nel SERVIZIO "LoggareUtenteService"
                    this.autenticazioneUtenteService.impostareTrueOFalseUtenteLoggato(false);


                    this.messaggio = "Si è verificato un errore.Insirisci i tuoi dati correttamente";
                    // ! ad esempio quando scrivo email o password sbagliata
                },
                complete: () => {
                    console.log("Processo terminato");
                }
            }
        )





    };//! funzione CREATA inviaUtenteLoggatoAlServerLocale

};//! classe(componente) LoginTokenComponent
