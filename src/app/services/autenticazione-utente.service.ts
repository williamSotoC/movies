import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResponseDalServerLocale, LoginDto, RegistrazioneDto } from '../interfaccia/utenteToken';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AutenticazioneUtenteService {

    private isUserLoggato: boolean = false;



    constructor(private http: HttpClient) {


    };//! funzione CREATA constructor

    inviareUtenteRegistratoAlServerLocale(utenteRegistrato: RegistrazioneDto) : Observable<IResponseDalServerLocale>{

        return this.http.post<IResponseDalServerLocale>(environment.UTENTE_API_BASE_URL + "register", utenteRegistrato)


    };//! funzione CREATA inviareUtenteRegistratoAlServerLocale




    inserireResponseDelServerLocaleNelLocalStorage(responseDelServerLocale: IResponseDalServerLocale) {
        localStorage.setItem("utente", JSON.stringify(responseDelServerLocale));
        // ! "utente" è il nome della chiave.SEMPRE stringa
        // ! "JSON.stringify(responseDelServerLocale)" è il VALORE della chiave.SEMPRE stringa
        // ! per fare il logout possiamo o cancellare la chiave o azzerare(stringa vuota) il valore della chiave


    };//! funzione CREATA inserireResponseDelServerLocaleNelLocaleStorage



    inviareUtenteLoggatoAlServerLocale(utenteLoggato : LoginDto): Observable<IResponseDalServerLocale> {

        return this.http.post<IResponseDalServerLocale>(environment.UTENTE_API_BASE_URL + "login", utenteLoggato);


    };//! funzione CREATA inviareUtenteLoggatoAlServerLocale


    prendereRispostaDelServerLocaleDalLocalStorage(): IResponseDalServerLocale | null {

        let rispostaServerLocaleLocalStorageStringa = localStorage.getItem("utente");

        if (rispostaServerLocaleLocalStorageStringa != null) {

            let rispostaServerLocaleLocalStorageJson: IResponseDalServerLocale = JSON.parse(rispostaServerLocaleLocalStorageStringa);

            return rispostaServerLocaleLocalStorageJson;
            // ! posso anche inserire nella view in alto(tipo Netflix) il nome dell'utente loggato
            
        }
        else {
            return null;//! se mi torna null vuoledire che NON c'è nessun utente loggato
        }


    };//! funzione CREATA prendereRispostaDelServerLocaleDalocalStorage




    impostareTrueOFalseUtenteLoggato(valore: boolean) {
        // console.log(valore);
        
        this.isUserLoggato = valore;



    };//! funzione CREATA isUtenteLoggato


    isUtenteLoggato() : boolean {
        return this.isUserLoggato;

    };//! funzione CREATA isUtenteLoggato



    nomeUtenteLoggato?: string;
    prendereNomeUtenteLOggato(nomeUtente: string) {

        this.nomeUtenteLoggato = nomeUtente;

    };//! funzione CREATA prendereNomeUtenteLOggato



    



};//! servizio AutenticazioneUtenteService
