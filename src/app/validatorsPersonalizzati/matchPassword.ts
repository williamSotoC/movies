import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

// ! "AbstractControl" è una superclasse della classe FormControl e FormGroup
// ! "ValidationErrors" è un tipo di valore nativo di Angular
// ! "ValidatorFn" è interfaccia nativa  di Angular


// ! "AbstractControl" è un tipo di valore 
// ! "AbstractControl" è la classe astratta PADRE del FormGroup ed è la classe astratta PADRE del FormControl 
// ! Le classi astratte sono delle classi che NON si possono ISTANZIARE ma si possono SOLO SURCLASSARE


// *opzione1

export function matchPassword(password: string, confermaPassword: string) {

    // ! CREO UNA FUNZIONE ANONIMA:
    return function(form: AbstractControl) {
        let valuePassword = form.get(password)?.value;
        // ! al posto del punto esclamativo potevo mettere il punto interrogativo e il tutto continua a funzionare
        // ! se non metto ne ! ne ? mi da il segunete errore: Object is possibly 'null'
        let valueConfermaPassword = form.get(confermaPassword)?.value;

        if (valuePassword == valueConfermaPassword) {
            return null;

        }
        return {erroreMatchPassword: true}
    }

}
// *opzione1



//* opzione2 
// export let matchPassword: ValidatorFn = (form: AbstractControl): ValidationErrors | null => {
//     // ! il valore ritornato lo assegno alla variabile "matchPassword"
//     // ! la variabile "matchPassword" avrà come valore una funzione freccia
//     // ! devo per forza usare "ValidatorFn" e "ValidationErrors" altrimenti vsCode mi da errore



//     let valuePassword = form.get("password")?.value;
//     // ! al posto del punto esclamativo potevo mettere il punto interrogativo e il tutto continua a funzionare
//     // ! se non metto ne ! ne ? mi da il segunete errore: Object is possibly 'null'
//     let valueConfermaPassword = form.get("confermaPassword")?.value;

//     if (valuePassword == valueConfermaPassword) {
//         return null;

//     }
//     return { erroreMatchPassword: true };//!mi ritorna per forza un oggetto


// }
//* opzione2
