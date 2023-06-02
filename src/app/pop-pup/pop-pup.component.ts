import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FilmService } from '../services/film.service';

@Component({
    selector: 'app-pop-pup',
    templateUrl: './pop-pup.component.html',
    styleUrls: ['./pop-pup.component.css']
})
export class PopPupComponent {


    acquistareFilm : boolean = false;

    constructor(public matDialogRef: MatDialogRef<PopPupComponent>, @Inject(MAT_DIALOG_DATA) public data: string, public filmService: FilmService) {
        // ! "MatDialogRef" è un servizio nativo di Angular MAterial
        // ! "matDialogRef" è l'istanza di "MatDialogRef"
        // ! "@Inject" è un decoratore.Esso ha come argomento una costante chiamata "MAT_DIALOG_DATA"
        // ! "MAT_DIALOG_DATA" è una costante
        // ! Sappiamo che che un decoratore è SEMPRE accompagnato da una proprietà: In quasto caso tale proprietà lo chiamo come voglio ad esempio: "data"

        // ! "data" tale proprietà serve per passare dati da componente principale("films-acquistati.component.ts") verso il componente "pop-pup.component.ts"

    };//! funzione CREATA constructor




    clickSuButtonNo() {
        this.matDialogRef.close();//! chiudo ip popPup e basta



    };//! funzione CREATA clickSuButtonNo

    clickSuButtonEsci() {
        this.matDialogRef.close();//! chiudo ip popPup e basta

    }

};//! classe/componente) PopPupComponent
