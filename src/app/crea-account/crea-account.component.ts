import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { matchPassword } from '../validatorsPersonalizzati/matchPassword';





@Component({
    selector: 'app-crea-account',
    templateUrl: './crea-account.component.html',
    styleUrls: ['./crea-account.component.css']
})
export class CreaAccountComponent {

    isMessaggio: boolean = false;
    miaEmail: string = "";

    regExEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/

    laMiaForm = new FormGroup(
        {
            email: new FormControl("", [Validators.required, Validators.pattern(this.regExEmail)]),
            password: new FormControl("", [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)]),
            confermaPassword: new FormControl("", [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)]),

        },
        // *opzione1
        [matchPassword("password", "confermaPassword")]//! chiamo la funzione che ho CRFEATO dentro il file "matchPassword.ts"
        // ! "matchPassword" lo devo importare sopra
        // ! "matchPassword" è il nome della funzione che ho CREATO dentro il file "matchPassword.ts"
        // le graffe le posso anche eliminare
        // *opzione1


        // *opzione2 usando come tipi di valore nativo Angular "ValidatorFn" e "ValidationErrors"
        // {
        //     validators: matchPassword
        //     // ! "matchPassword" è il nome della funzione che ho CREATO
        //     // ! "validators" deve per forza essere scritto cosi perchè "AbstractControlOptions" ha come proprietà "validators"
        // }
        // *opzione2
        
    )




    inviaForm() {
        // console.log(this.laMiaForm.value);//! mi ritorna uno OGGETTO con le proprietà email, pasword, confermaPassword e i valori inseriti nei rispettivi campi della form
        // console.log(this.laMiaForm.get("email")!.value);
        

        if (this.laMiaForm.valid == true) {
            this.isMessaggio = true


            this.miaEmail = this.laMiaForm.get("email")!.value!

            // ! pulisco la form.Uso setValue perchè solo voglio pulire TUTTI i campi della form.Nel caso voglia pulire solo alcuni campi della form  uso patchValue({})
            this.laMiaForm.setValue({
                email: "",
                password: "",
                confermaPassword: ""
            })
            // ! pulisco la form
            
        }
        else {
            this.isMessaggio = false
        }


        
       
        

    }



    
    

};//! classe(componente) LoginComponent



