import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
    name: 'filtroYouTube'
   
})
export class FiltroYouTubePipe implements PipeTransform {

    constructor(private domSanitizer: DomSanitizer) {



    };//! funzione CREATA constructor

    transform(valoreKey: string) {
        const URL_BASE_YOUTUBE = "https://www.youtube-nocookie.com/embed/";
        // ! "valoreKey" rapprsenta il valore chiave di ogni film



        return this.domSanitizer.bypassSecurityTrustResourceUrl(URL_BASE_YOUTUBE + valoreKey + "?origin=your_origin_here");
        // ! "bypassSecurityTrustResourceUrl" mi permette di passare i controli di 

    }

};//!pipe filtroYouTube
