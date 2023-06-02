import { Component } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { RegistrazioneDto } from '../interfaccia/utenteToken';
import { AutenticazioneUtenteService } from '../services/autenticazione-utente.service';
import { Router } from '@angular/router';
import { UpperCasePipe } from '@angular/common';

@Component({
    selector: 'app-registrazione-token',
    templateUrl: './registrazione-token.component.html',
    styleUrls: ['./registrazione-token.component.css']
})
export class RegistrazioneTokenComponent {

    messaggio?: string;

    modello: RegistrazioneDto = new RegistrazioneDto("", "", "");


    constructor(private autenticazioneUtenteService: AutenticazioneUtenteService, private router: Router) {



    };//! funzione CREATA constructor





    inviaUtenteRegistratoAlServerLocale() {
        console.log(this.modello);//! mi ritorna uno oggetto con i dati inseriti dentro i campi della form

        this.autenticazioneUtenteService.inviareUtenteRegistratoAlServerLocale(this.modello).subscribe(
            {
                next: (data) => {
                    console.log(data);//! "data" è responseDelServerLocale

                      //let data = {
                    //     "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBpcHBvQGdtYWlsLmNvbSIsImlhdCI6MTY4NDQxMDk2MSwiZXhwIjoxNjg0NDE0NTYxLCJzdWIiOiIxIn0.tSfsgciU4ubipduEzAIKvmel3ql8F50TmMB4tUqgKqg",
                    //     "user": {
                    //         "email": "pippo@gmail.com",
                    //         "nome": "pippo",
                    //         "id": 1
                    //     }
                    // }

                    

                    this.autenticazioneUtenteService.inserireResponseDelServerLocaleNelLocalStorage(data);


                    
                    // ! messaggio che compare nella view
                    this.messaggio = `${this.modello.nome.toUpperCase()} ti sei registrato correttamente`;
                    // ! messaggio che compare nella view



                    setTimeout(() => {
                        this.router.navigate(["LoginToken"]);

                    }, 4000)



                    // ! pulisco la form
                    this.modello = new RegistrazioneDto("", "", "");
                    // ! pulisco la form

                    // this.messaggio = undefined;




                },
                error: (error) => {
                    // ! ad esempio quando mi registro con lo stesso nome o stessa email  della registrazione precedente
                    this.messaggio = "Si è verificato un errore.Prova a registrarti nuovamente";

                },
                complete: () => {
                    console.log("Processo terminato");
                    

                }
            }
        )






    };//! funzione CRETA inviaFormAlServerLocale



};//! classe(componente) RegistrazioneTokenComponent
