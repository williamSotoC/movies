import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';
import { IFilmAcquistato, IResponse, Ifilm } from '../interfaccia/filmsList';
import { environment } from 'src/environments/environment';
import { IResponseFilmDetail } from '../interfaccia/filmDetail';
import { IResponseCredits } from '../interfaccia/cast';
import { IResponseVideo } from '../interfaccia/videoYouTube';
import { AutenticazioneUtenteService } from './autenticazione-utente.service';

@Injectable({
    providedIn: 'root'
})
export class FilmService {

    private filmPagina = 1;
    caricamento: boolean = true;
    caricamentoSerch: boolean = true;


    constructor(private http: HttpClient, private autenticazioneUtenteService: AutenticazioneUtenteService) {


    };//! funzione CREATA constructor



    get params() {
        // ! uso il getter per poter trasformare un metodo in una proprietà

        return {//! tali proprietà lo vedo in Postman
            api_key: environment.FILM_API_KEY,
            language: "it-IT",
            page: this.filmPagina.toString()

        }
    }



    prendereFilms(): Observable<IResponse> {

        // ! urlFilmsList = "https://api.themoviedb.org/3/movie/popular?&api_key={api_key}&language=it-IT&page=1&include_adult=false"
        this.caricamentoSerch = false;



        if (this.filmPagina >= 7) {
            this.caricamento = false;//! faccio scomparire lo spinner
            return of()//! in questo modo dico al broswer di non ritornarmi niente
            // ! dato che la funzione "prendereFilms()" mi deve riotrnare un Observable allora tale return mi deve per forza ritornare anche un Observable per cui uso l'operatore rxjs "of"
            // ! "of()" mi ritorna un Observable di never
            // ! Grazie a tale return  esco IMMEDIATAMENTE dalla funzione e quello che c'è sotto non viene eseguito e quindi non avviene la chiamata al server API filmList

        }



        return this.http.get<IResponse>(environment.FILM_API_BASE_URL + "/movie/popular?", { params: this.params })
            .pipe(


                tap(() => {

                    // console.log(this.filmPagina);


                    this.filmPagina = this.filmPagina + 1;//! mi permette di caricare la pagina 2 , 3 e cosi via fino alla pagina 7 escluso

                   

                })

            )

    };//! funzione CREATA prendereFilms



    resetRitornoAllaPrimaPagina() {
        this.filmPagina = 1;//! perche quando cambiavo rotta e poi ritornavo alla rotta del componente "home.component" venivano caricati i film dell'ultima pagina.Io voglio che vengano caricati i film della prima pagina per cui scrivo: "this.filmPagina = 1"



    };//! funzione CREATA resetRitornoAllaPrimaPagina




    private filmPaginaCercare = 1;


    get paramsSerch() {
        // ! uso il getter per poter trasformare un metodo in una proprietà



        return {//! tali proprietà lo vedo in Postman
            api_key: environment.FILM_API_KEY,
            language: "it-IT",
            page: this.filmPaginaCercare.toString(),//! l'URL di serchFilm  ha come parametro "page"
            include_adult: false


        }
    }



    cercareFilm(testo: string): Observable<IResponse> {
        // ! let urlSerch =  "https://api.themoviedb.org/3/search/movie?api_key={api_key}&language=it-IT&query=mercoledi&page=1&include_adult=false"

        this.caricamento = false;
        


        if (this.filmPaginaCercare >= 4) {//! Quindi verrà caricata solo pagina 1 e man mano che scrollo e supero il limite massimo di scroll , verrà caricata la pagina 2 e poi la pagina 3 e basta
            // ! la pagina 4 NON verrà caricata

            this.caricamentoSerch = false;

            return of()//! in questo modo dico al broswer di non ritornarmi niente

        }




        return this.http.get<IResponse>(environment.FILM_API_BASE_URL + "/search/movie?&query=" + testo, { params: this.paramsSerch })
            .pipe(


                tap(() => {


                    this.filmPaginaCercare = this.filmPaginaCercare + 1;
                 

                })
            );


    };//! funzione CREATA prendereFilms




    reset() {
        this.filmPaginaCercare = 1;//! perchè altrimenti quando cambiavo rotta e poi tornavo alla rotta del componente "cercare.component", NON venivano caricati i film precedentemente cercati


    };//! funzione CREATA reset




    get paramsFilmDetail() {
        // ! uso il getter per poter trasformare un metodo in una proprietà



        return {//! tali proprietà lo vedo in Postman
            api_key: environment.FILM_API_KEY,
            language: "it-IT",
            // page: this.filmPaginaCercare.toString(),//! l'URL del film detail non ha come parametro "page"
            include_adult: false


        }
    }





    prendereFilmDetail(valoreId: string): Observable<IResponseFilmDetail | null> {

        // !let urlFilmDetail = "https://api.themoviedb.org/3/movie/{movie_id}?&api_key={api_key}&language=it-IT&page=1&include_adult=false";


        return this.http.get<IResponseFilmDetail>(environment.FILM_API_BASE_URL + "/movie/" + valoreId, { params: this.paramsFilmDetail })
            .pipe(
                catchError((error) => {
                    return of(null)
                })//! esso mi ritorna un Onservable di null
                // ! tale operatore entra in gioco quando avviene un errore ad esempio quando l'utente inserice un id che NON esiste direttamente nella barra di navigazione dell'Url.Esempio id= 00
            );



    };//! funzione CREATA prendereFilmDetail











    get paramsCast() {

        return {//! tali proprietà lo vedo in Postman
            api_key: environment.FILM_API_KEY,
            language: "it-IT",
            // page: this.filmPaginaCercare.toString(),//! l'URL del cast non ha come parametro "page"
            // include_adult: false//! l'URL del cast non ha come parametro "include_adult"


        }

    }



    prendereCast(valoreId: string): Observable<IResponseCredits | null> {

        // ! let urlCast = "https://api.themoviedb.org/3/movie/117207/credits?api_key=4f68b8e104ab864fab43653d664c9c25&language=it-IT"


        return this.http.get<IResponseCredits>(environment.FILM_API_BASE_URL + "/movie/" + valoreId + "/credits?", { params: this.paramsCast })
            .pipe(
                catchError(() => {
                    return of(null);
                })
            );



    };//! funzione CREATA prendereCast



    prendereFilmSimilari(valoreId: string): Observable<IResponse | null> {


        // ! let urlFilmSimilari = "https://api.themoviedb.org/3/movie/117207/similar?api_key=4f68b8e104ab864fab43653d664c9c25&language=it-IT&page=1"
        let paramsFilmSimilari = { ...this.params };

        return this.http.get<IResponse>(environment.FILM_API_BASE_URL + "/movie/" + valoreId + "/similar", { params: paramsFilmSimilari })
            .pipe(
                catchError(() => {
                    return of(null);
                })
            );





    };//! funzione CREATA prendereFilmSimilari




    prendereVideoYouTube(valoreId: string): Observable<IResponseVideo> {

        // ! let urlVideoYouTube = "https://api.themoviedb.org/3/movie/502356/videos?api_key=4f68b8e104ab864fab43653d664c9c25&language=it-IT"
        let paramsVideoYouTube = { ...this.params };

        return this.http.get<IResponseVideo>(environment.FILM_API_BASE_URL + "/movie/" + valoreId + "/videos?", { params: paramsVideoYouTube })



    };//! funzione CREATA prendereVideoYouTube






    inserireFilmAcquistatoNelServerLocale(elementoIessimoOggettoFilm: Ifilm): Observable<IFilmAcquistato> | null {
        // console.log(elementoIessimoOggettoFilm.id);




        let rispostaServerLocaleDaLocalStorage = this.autenticazioneUtenteService.prendereRispostaDelServerLocaleDalLocalStorage();
        // ! chiamo la funzione "prendereRispostaDelServerLocaleDalLocalStorage()" che si trova nel SERVIZIO "AutenticazioneUtenteService"



        if (rispostaServerLocaleDaLocalStorage != null) {


            let httpOptionsFilmsAcquistatiPost = {
                // ! "httpOptionsFilmsAcquistati" è SEMPRE uno oggetto

                headers: new HttpHeaders(
                    // ! "HttpHeaders" è la classe nativa di Angular
                    // ! "headers" è l'istanza della classe "HttpHeaders"
                    {
                        "Authorization": "Bearer " + rispostaServerLocaleDaLocalStorage.accessToken
                        // !l'intestazione lo vedo nella documentazione del server locale

                    }
                )
            }





            let filmAcquistato: IFilmAcquistato = {

                id: undefined,//! in questo modo il server locale inserisce AUTOMATICAMENTE i valore dell'id ad OGNI film acquistato
                userId: rispostaServerLocaleDaLocalStorage.user.id,//! id dell'utente che si è loggato
                // ! "/films-acquistati*": "/640/films-acquistati$1".Quel 640 vuoledire che io posso modificare solo ed esclussivamente i film acquistati MIEI.Cioè Pippo può modificare solo ed esclussivamente i suoi film acquistati.Pluto può modificare solo ed esclussivamente i suoi film acquistati e NON può modificare i film acquistati da Pippo
                // ! "640" vuoledire che l'utente X puo modificare solo ed esclussivamente i film acquistati dall'utente X e NON i film acquistati dall'utente Y

                film: elementoIessimoOggettoFilm
            }
            // ! se il browser mi da errore 403 "forbidden" vuoledire ok ti ho autorizzato perche ti ho passato un token ma quella PARTICOLARE risorsa li PER TE SINGOLARMENTE  è negata, perche NON hai un "userId" e quindi NON riesco a riconoscerti
            // ! Quindi per soluzionare il problema del "forbidden" devo andare a crearmi il nome di variabile "filmAcquistato" che sara di tipo "IFilmAcquistato".Solo in questo modo il server locale riesce a riconoscermi, grazie alla proprietà "userId"

            // ! error 500 (internal server error) .E' un errore dovuto al server e non al lato client per cui in quel caso devo chiamare l'asistenza
            // ! error 401 unauthorized.E' dovuto a che il token è scaduto(quindi devo riloggarmi) o non gli ho passato proprio  il token nelle options, al server









            return this.http.post<IFilmAcquistato>(environment.UTENTE_API_BASE_URL + "films-acquistati", filmAcquistato, httpOptionsFilmsAcquistatiPost);

        }
        else {
            return null;
        }






    };//! funzione CREATA acquistaFilm









    inserireFilmPreferitotoNelServerLocale(elementoIessimoOggettoFilm: Ifilm): Observable<IFilmAcquistato> | null {
        // console.log(elementoIessimoOggettoFilm.id);




        let rispostaServerLocaleDaLocalStorage = this.autenticazioneUtenteService.prendereRispostaDelServerLocaleDalLocalStorage();
        // ! chiamo la funzione "prendereRispostaDelServerLocaleDalLocalStorage()" che si trova nel SERVIZIO "AutenticazioneUtenteService"



        if (rispostaServerLocaleDaLocalStorage != null) {


            let httpOptionsFilmsPreferitiPost = {
                // ! "httpOptionsFilmsAcquistati" è SEMPRE uno oggetto

                headers: new HttpHeaders(
                    // ! "HttpHeaders" è la classe nativa di Angular
                    // ! "headers" è l'istanza della classe "HttpHeaders"
                    {
                        "Authorization": "Bearer " + rispostaServerLocaleDaLocalStorage.accessToken
                        // !l'intestazione lo vedo nella documentazione del server locale

                    }
                )
            }





            let filmpreferito: IFilmAcquistato = {

                id: undefined,//! in questo modo il server locale inserisce AUTOMATICAMENTE i valore dell'id ad OGNI film acquistato
                userId: rispostaServerLocaleDaLocalStorage.user.id,
                // ! "/films-acquistati*": "/640/films-acquistati$1".Quel 640 vuoledire che io posso modificare solo ed esclussivamente i film acquistati MIEI.Cioè Pippo può modificare solo ed esclussivamente i suoi film acquistati.Pluto può modificare solo ed esclussivamente i suoi film acquistati e NON può modificare i film acquistati da Pippo

                film: elementoIessimoOggettoFilm
            }
            // ! se il browser mi da errore 403 "forbidden" vuoledire ok ti ho autorizzato perche ti ho passato un token ma quella PARTICOLARE risorsa li PER TE SINGOLARMENTE  è negata, perche NON hai un "userId" e quindi NON riesco a riconoscerti
            // ! Quindi per soluzionare il problema del "forbidden" devo andare a crearmi il nome di variabile "filmAcquistato" che sara di tipo "IFilmAcquistato".Solo in questo modo il server locale riesce a riconoscermi, grazie alla proprietà "userId"

            // ! error 500 (internal server error) .E' un errore dovuto al server e non al lato client per cui in quel caso devo chiamare l'asistenza
            // ! error 401 unauthorized.E' dovuto a che il token è scaduto(quindi devo riloggarmi) o non gli ho passato proprio  il token nelle options, al server


            return this.http.post<IFilmAcquistato>(environment.UTENTE_API_BASE_URL + "films-preferiti", filmpreferito, httpOptionsFilmsPreferitiPost);

        }
        else {
            return null;
        }


    };//! funzione CREATA acquistaFilm








    prendereFilmsAcquistatiDalServerLocale(): Observable<IFilmAcquistato[]> {

        let rispostaServerLocaleDaLocalStorage = this.autenticazioneUtenteService.prendereRispostaDelServerLocaleDalLocalStorage();
        // ! chiamo la funzione "prendereRispostaDelServerLocaleDalLocalStorage()" che si trova nel SERVIZIO "AutenticazioneUtenteService"



        if (rispostaServerLocaleDaLocalStorage != null) {

            let httpOptionsFilmsAcquistatiGet = {
                // ! "httpOptionsFilmsAcquistati" è SEMPRE uno oggetto

                headers: new HttpHeaders(
                    // ! "HttpHeaders" è la classe nativa di Angular
                    // ! "headers" è l'istanza della classe "HttpHeaders"
                    {
                        "Authorization": "Bearer " + rispostaServerLocaleDaLocalStorage.accessToken
                        // !l'intestazione lo vedo nella documentazione del server locale

                    }
                )
            }


            return this.http.get<IFilmAcquistato[]>(environment.UTENTE_API_BASE_URL + "films-acquistati?userId=" + rispostaServerLocaleDaLocalStorage.user.id, httpOptionsFilmsAcquistatiGet)
            // !  scrivo "?userId=" + rispostaServerLocaleDaLocalStorage.user.id  , per far vedere nella view solo ed esclussivamente i film che ho acquistato io stesso utente loggato.E poi quando si logga Pippo , allora Pippo vedrà nella view solo i suoi film che ha acquistato lui e NON i film che ho acquistato io precdentemente quando mi sono loggato
            // !  "?userId=" lo vedo nella documentazione del server locale

            // ! Grazie alle interfacce  vsCode mi sugerisce ad esempio i nomi delle proprietà di un oggetto, dopo aver digitato il punto


        }
        else {
            return of([]);//! in questo modo mi ritorna un Observable vuoto
        }





    };//! funzione CREATA prendereFilmsAcquistati





    prendereFilmsPreferitiDalServerLocale(): Observable<IFilmAcquistato[]> {

        let rispostaServerLocaleDaLocalStorage = this.autenticazioneUtenteService.prendereRispostaDelServerLocaleDalLocalStorage();
        // ! chiamo la funzione "prendereRispostaDelServerLocaleDalLocalStorage()" che si trova nel SERVIZIO "AutenticazioneUtenteService"



        if (rispostaServerLocaleDaLocalStorage != null) {

            let httpOptionsFilmsPreferitiGet = {
                // ! "httpOptionsFilmsAcquistati" è SEMPRE uno oggetto

                headers: new HttpHeaders(
                    // ! "HttpHeaders" è la classe nativa di Angular
                    // ! "headers" è l'istanza della classe "HttpHeaders"
                    {
                        "Authorization": "Bearer " + rispostaServerLocaleDaLocalStorage.accessToken
                        // !l'intestazione lo vedo nella documentazione del server locale

                    }
                )
            }


            return this.http.get<IFilmAcquistato[]>(environment.UTENTE_API_BASE_URL + "films-preferiti?userId=" + rispostaServerLocaleDaLocalStorage.user.id, httpOptionsFilmsPreferitiGet);
            // !  scrivo "?userId=" + rispostaServerLocaleDaLocalStorage.user.id  , per far vedere nella view solo ed esclussivamente i film che ho acquistato io stesso utente loggato.E poi quando si logga Pippo , allora Pippo vedrà nella view solo i suoi film che ha acquistato lui e NON i film che ho acquistato io precdentemente quando mi sono loggato
            // !  "?userId=" lo vedo nella documentazione del server locale

            // ! Grazie alle interfacce  vsCode mi sugerisce ad esempio i nomi delle proprietà di un oggetto, dopo aver digitato il punto


        }
        else {
            return of([]);//! in questo modo mi ritorna un Observable vuoto
        }





    };//! funzione CREATA prendereFilmsAcquistati




    restituisciFilmAcquistato(valoreIdIFilmAcquistato: number): Observable<{}> | null {
        // ! eliminiamo dal server locale, il film acquistato dall'utente loggato per cui faccio una DELETE



        let rispostaServerLocaleDaLocalStorage = this.autenticazioneUtenteService.prendereRispostaDelServerLocaleDalLocalStorage();
        // ! chiamo la funzione "prendereRispostaDelServerLocaleDalLocalStorage()" che si trova nel SERVIZIO "AutenticazioneUtenteService"



        if (rispostaServerLocaleDaLocalStorage != null) {

            let httpOptionsFilmsAcquistatiDelete = {
                // ! "httpOptionsFilmsAcquistati" è SEMPRE uno oggetto

                headers: new HttpHeaders(
                    // ! "HttpHeaders" è la classe nativa di Angular
                    // ! "headers" è l'istanza della classe "HttpHeaders"
                    {
                        "Authorization": "Bearer " + rispostaServerLocaleDaLocalStorage.accessToken
                        // !l'intestazione lo vedo nella documentazione del server locale

                    }
                )
            }

            return this.http.delete<{}>(environment.UTENTE_API_BASE_URL + "films-acquistati/" + valoreIdIFilmAcquistato, httpOptionsFilmsAcquistatiDelete);
            // ! Quando faccio la DELETE , il server locale mi ritorna un singolo oggetto vuoto per cui scrivo generix <{}>
            // !  "films-acquistati/" + valoreIdIFilmAcquistato .Esso lo vedo nella documentazione del server locale
            // ! scrivo "httpOptionsFilmsAcquistatiDelete" perchè solo io utente loggato posso eliminare i miei film che ho acquistato.Solo l'utente loggato Pippo puo eliminare i film che lui ha acquistato prima e cosi via


        }
        else {
            return null;
        }


    };//! funzione CREATA restituisciFilmAcquistato







    restituisciFilmPreferito(valoreIdIFilmPreferito: number): Observable<{}> | null {
        // ! eliminiamo dal server locale, il film acquistato dall'utente loggato per cui faccio una DELETE



        let rispostaServerLocaleDaLocalStorage = this.autenticazioneUtenteService.prendereRispostaDelServerLocaleDalLocalStorage();
        // ! chiamo la funzione "prendereRispostaDelServerLocaleDalLocalStorage()" che si trova nel SERVIZIO "AutenticazioneUtenteService"



        if (rispostaServerLocaleDaLocalStorage != null) {

            let httpOptionsFilmsPreferitiDelete = {
                // ! "httpOptionsFilmsAcquistati" è SEMPRE uno oggetto

                headers: new HttpHeaders(
                    // ! "HttpHeaders" è la classe nativa di Angular
                    // ! "headers" è l'istanza della classe "HttpHeaders"
                    {
                        "Authorization": "Bearer " + rispostaServerLocaleDaLocalStorage.accessToken
                        // !l'intestazione lo vedo nella documentazione del server locale

                    }
                )
            }

            return this.http.delete<{}>(environment.UTENTE_API_BASE_URL + "films-preferiti/" + valoreIdIFilmPreferito, httpOptionsFilmsPreferitiDelete);
            // ! Quando faccio la DELETE , il server locale mi ritorna un singolo oggetto vuoto per cui scrivo generix <{}>
            // !  "films-acquistati/" + valoreIdIFilmAcquistato .Esso lo vedo nella documentazione del server locale
            // ! scrivo "httpOptionsFilmsAcquistatiDelete" perchè solo io utente loggato posso eliminare i miei film che ho acquistato.Solo l'utente loggato Pippo puo eliminare i film che lui ha acquistato prima e cosi via


        }
        else {
            return null;
        }





    };//! funzione CREATA restituisciFilmAcquistato




    prendereGenereAnimazione(): Observable<IResponse> {

        // ! let urlGenereAnimazione = "https://api.themoviedb.org/3/discover/movie/?api_key=4f68b8e104ab864fab43653d664c9c25&language=it-IT&page=1&with_genres=27";

        let paramsAnimazione = { ...this.params, with_genres: 16, primary_release_year: 2022 };




        return this.http.get<IResponse>(environment.FILM_API_BASE_URL + "/discover/movie/?", { params: paramsAnimazione });



    };//! funzione CREATA prendereGenereAnimazione





    prendereGenereHorror(): Observable<IResponse> {

        // ! let urlGenereAnimazione = "https://api.themoviedb.org/3/discover/movie/?api_key=4f68b8e104ab864fab43653d664c9c25&language=it-IT&page=1&with_genres=27";

        let paramsHorror = { ...this.params, with_genres: 27, primary_release_year: 2022 };




        return this.http.get<IResponse>(environment.FILM_API_BASE_URL + "/discover/movie/?", { params: paramsHorror });



    };//! funzione CREATA prendereGenereHorror



    prendereGenereRomance(): Observable<IResponse> {

        // ! let urlGenereAnimazione = "https://api.themoviedb.org/3/discover/movie/?api_key=4f68b8e104ab864fab43653d664c9c25&language=it-IT&page=1&with_genres=27";

        let paramsDocumentario = { ...this.params, with_genres: 10749, primary_release_year: 2022 };




        return this.http.get<IResponse>(environment.FILM_API_BASE_URL + "/discover/movie/?", { params: paramsDocumentario });



    };//! funzione CREATA prendereGenereRomance


    prendereGenereFantascienza(): Observable<IResponse> {

        // ! let urlGenereAnimazione = "https://api.themoviedb.org/3/discover/movie/?api_key=4f68b8e104ab864fab43653d664c9c25&language=it-IT&page=1&with_genres=27";

        let paramsDocumentario = { ...this.params, with_genres: 878, primary_release_year: 2021 };




        return this.http.get<IResponse>(environment.FILM_API_BASE_URL + "/discover/movie/?", { params: paramsDocumentario });



    };//! funzione CREATA prendereGenereFantascienza




    titoloFilm?: string;

    titoloFilmYoutube(titolo: string) {

        this.titoloFilm = titolo;

    }; //! funzione CREATA titoloFilmYoutube




    valorePopUp?: string;
    popUp(valore: string) {

        this.valorePopUp = valore;

    }; //! funzione CREATA popUp





};//! servizio FilmService
