import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AutenticazioneUtenteService } from './autenticazione-utente.service';

@Injectable({
    providedIn: 'root'
})
export class AutorizzazioneGuard implements CanActivate {

    constructor(private autenticazioneUtenteService: AutenticazioneUtenteService, private router: Router) {


    };//! funzione CREATA constructor




    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {



        let valoreRitornato = this.autenticazioneUtenteService.isUtenteLoggato();
        console.log(valoreRitornato);//! esso mi ritorna o true o false

        if (valoreRitornato == true) {
            console.log("rotta permessa")
            return true;
        }
        else {
            console.log("rotta NON permessa")
            this.router.navigate(["LoginToken"]);
            return false;
        }







    }

};//! servizio(guard) AutorizzazioneGuard
