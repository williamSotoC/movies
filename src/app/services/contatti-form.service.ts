import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IComune, IProvincia, IRegione } from '../interfaccia/contattiForm';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ContattiFormService {

    constructor(private http: HttpClient) {

    };//! funzione CREATA constructor


    prendereRegioni(): Observable<IRegione[]> {

        let urlRegioni = "http://sviluppo.zetra.it/ws_example/cf/regioni.php";

        return this.http.get<IRegione[]>(urlRegioni)


    };//! funzione CREATA constructor





    prendereProvince(idRegione: string): Observable<IProvincia[]> {

        // ! "http://sviluppo.zetra.it/ws_example/cf/province.php?idRegione=1"  .Per prendere le province in base all' "id" della regione, dal webServis(API)


        let urlProvinceBase = "http://sviluppo.zetra.it/ws_example/cf/province.php?";

        let paramasProvince = {
            idRegione: idRegione
        }


        return this.http.get<IProvincia[]>(urlProvinceBase, { params: paramasProvince });


    };//! funzione CREATA constructor



    prendereComuni(idProvincia: string) : Observable<IComune[]>{

        //! http://sviluppo.zetra.it/ws_example/cf/comuni.php?idProvincia=1


        let urlComuniBase = "http://sviluppo.zetra.it/ws_example/cf/comuni.php?";

        let paramasProvince = {
            idProvincia: idProvincia
        }


        return this.http.get<IComune[]>(urlComuniBase, {params: paramasProvince});





    };//! funzione CREATA prendereComuni




};//! servizio ContattiFormService
