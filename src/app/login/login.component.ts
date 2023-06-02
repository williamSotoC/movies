import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {

    isMessaggio: boolean = false;
    miaEmail?: string;

    laMiaForm = new FormGroup(
        {
            email: new FormControl("", [Validators.required, Validators.pattern(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)]),
            password: new FormControl("", [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)]),
            checked: new FormControl(true)

        }
    )




    // get prendereEmail() :FormControl {

    


    controllo(name: string) :AbstractControl | null{

        return this.laMiaForm.get(name);
        //   "get()" mi doverbbe ritorna come tipo di valore "FormGroup" ma invece mi ritorna un "AbstractControl".Questo è docuto al fatto che dentro un FormGroup possono esserci altri FormGroup o FormControl. L' "AbstractControl" è una super classe sia della classe FormGroup che della classe FormControl
        //   "AbstractControl" è un tipo di valore 
        //   "AbstractControl" è la classe astratta PADRE del FormGroup ed è la classe astratta PADRE del FormControl 
        //   Le classi astratte sono delle classi che NON si possono ISTANZIARE ma si possono SOLO SURCLASSARE

        // ! scrivendo in coda "as FormControl"  sto dicendo ad ANgular che sono sicuro che tale get() mi ritornera un "FormControl"

    };//!funzione CREATA controllo



    inviaForm() {

        // console.log(this.laMiaForm.value);//!mi ritorna uno oggetto

        if (this.laMiaForm.valid == true) {
            this.isMessaggio = true;

            this.miaEmail = this.laMiaForm.get("email")!.value!


            // ! pulisco la form.Uso patchValue perchè solo voglio pulire alcuni campi della form.Nel caso voglia pulire TUTTI i campi della form  uso setValue({})
            this.laMiaForm.patchValue({
                email: "",
                password: ""

            })
            // ! pulisco la form
            
        }
        else {
            this.isMessaggio = false;

        }

        
        

    };//!funzione CREATA inviaForm

};//! classe(componente) LoginComponent



