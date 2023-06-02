import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContattiFormService } from '../services/contatti-form.service';
import { IComune, IProvincia, IRegione } from '../interfaccia/contattiForm';

@Component({
    selector: 'app-contatti',
    templateUrl: './contatti.component.html',
    styleUrls: ['./contatti.component.css']
})
export class ContattiComponent implements OnInit {

    isMessaggio: boolean = false;
    mioNome?: string;
    mioCognome?: string;

    // messaggioOk?: string

    arrayDiOggettiRegioni: IRegione[] = [];

    arrayDiOggettiProvince: IProvincia[] = [];

    arrayDiOggettiComuni: IComune[] = [];



    constructor(private contattiFormService: ContattiFormService) {

    };//! funzione CREATA ngOnInit




    ngOnInit(): void {


        this.provincia.disable();//! in questo modo disabilito il campo delle province al caricamento del componente "ContattiComponent"
        this.comune.disable();


        this.prendereRegioni();

        this.prendereProvince();


        this.prendereComuni();







    };//! funzione CREATA ngOnInit





    regExNome = /^[ a-zA-ZàèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ'`'\-]+$/
    regExEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    regExTelefono = /^((\+|00)?39)?3\d{2}\d{6,7}$/

    laMiaForm = new FormGroup(
        {
            nome: new FormControl("", [Validators.required, Validators.minLength(2), Validators.pattern(this.regExNome)]),
            cognome: new FormControl("", [Validators.required, Validators.minLength(2), Validators.pattern(this.regExNome)]),
            email: new FormControl("", [Validators.required, Validators.pattern(this.regExEmail)]),
            telefono: new FormControl("", [Validators.required, Validators.pattern(this.regExTelefono)]),
            descrizione: new FormControl("", [Validators.required, Validators.minLength(10)]),
            checked: new FormControl(true)



        }
    )

    regione = new FormControl("", [Validators.required]);
    provincia = new FormControl("", [Validators.required]);
    comune = new FormControl("", [Validators.required]);




    prendereRegioni() {

        this.contattiFormService.prendereRegioni().subscribe(
            {
                next: (data) => {
                    // console.log(data);
                    this.arrayDiOggettiRegioni = data



                }
            }
        )




    };//! funzione CREATA prendereRegioni





    prendereProvince() {
        this.regione.valueChanges.subscribe(
            (idRegione) => {

                // console.log(idRegione);//! esso mi ritorna il valore della proprieta "id" della regione sottoforma di stringa


                this.provincia.enable({ emitEvent: false });//! in questo modo ABILITO il campo delle provincie quando seleziono una regione
                // ! se scrivo solo "this.provincia.enable()" e se poi seleziono una regione allora il browser fa una chiamta a vuoto per prendere i comuni(tale chiamata a vuoto lo vedo se vado in network e se clicco nella voce Fetch/XHR)
                // !per soluzionafre tale problema devo svrivere dentro le tonde del metodo enable() , un OGGETTO cioè : {emitEvent: false}
    



                this.contattiFormService.prendereProvince(idRegione!).subscribe(
                    {
                        next: (data) => {
                            // console.log(data);
                            this.arrayDiOggettiProvince = data;



                        }
                    }
                )

            }
        )


    };//! funzione CREATA prendereProvince





    prendereComuni() {

        this.provincia.valueChanges.subscribe(
            (idProvincia) => {
                // console.log(idProvincia);//! esso mi ritorna il valore della proprieta "id" della provincia sottoforma di stringa

                this.comune.enable({ emitEvent: false });


                this.contattiFormService.prendereComuni(idProvincia!).subscribe(
                    {
                        next: (data) => {
                            // console.log(data);

                            this.arrayDiOggettiComuni = data;
                            

                        }
                    }
                )
                

            }

        )


    };//! funzione CREATA prendereComuni




    inviaForm() {
        // console.log(this.laMiaForm.value);
        // console.log(this.regione.value);
        // console.log(this.provincia.value);
        // console.log(this.comune.value);

        // console.log(this.regione.invalid);
        


        // console.log(this.laMiaForm.valid);
        // console.log(this.laMiaForm.get("nome")!.value);

        if (this.laMiaForm.valid == true) {
            this.isMessaggio = true;
            // this.messaggioOk = "I suoi dati sono stati correttamente inviati"

            this.mioNome = this.laMiaForm.get("nome")!.value!
            this.mioCognome = this.laMiaForm.get("cognome")!.value!


            // ! pulisco la form.Uso patchValue perchè solo voglio pulire alcuni campi della form
            this.laMiaForm.patchValue({//! FormGroup
                nome: "",
                cognome: "",
                email: "",
                telefono: "",
                descrizione: "",
            })

            this.regione.setValue("");//! FormControl
            this.provincia.setValue("");//! FormControl
            this.comune.setValue("");//! FormControl
            // ! pulisco la form
            
        }
        else {
            this.isMessaggio = false;
        }
        




    };//! funzione CREATA inviaForm

};//!classe(componente) ContattiComponent
