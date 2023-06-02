import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filtroImgBackground'
})
export class FiltroImgBackgroundPipe implements PipeTransform {

    transform(valorePoster_pathOProfile_path: string): string {

        const URL_BASE_IMAGE = 'https://image.tmdb.org/t/p/w500';//! url base per prendere l'immagine che si trova nel dataBAse "tmdb"

        if (valorePoster_pathOProfile_path != null) {
            // ! In Postman posso vedere che alcuni valori di "poster_path" e di "profile_path" sono uguale a null

            return URL_BASE_IMAGE + valorePoster_pathOProfile_path;

        }
        else {

            return '../assets/multimedia/imgBackgroundNotFound.png';//! tale immagine lo trovo dentro la cartella "assets" del mio progetto



        }




    }

}
