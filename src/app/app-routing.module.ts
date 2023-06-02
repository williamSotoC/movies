import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { FilmDetailComponent } from './film-detail/film-detail.component';
import { CercareFilmComponent } from './cercare-film/cercare-film.component';
import { LoginComponent } from './login/login.component';
import { CreaAccountComponent } from './crea-account/crea-account.component';
import { ContattiComponent } from './contatti/contatti.component';
import { RegistrazioneTokenComponent } from './registrazione-token/registrazione-token.component';
import { LoginTokenComponent } from './login-token/login-token.component';
import { FilmsAcquistatiComponent } from './films-acquistati/films-acquistati.component';
import { AutorizzazioneGuard } from './services/autorizzazione.guard';
import { VideoYouTubeComponent } from './video-you-tube/video-you-tube.component';

const routes: Routes = [

    {
        path: "home",
        component: HomeComponent
    },
    {
        path: "login",
        component: LoginComponent
    },
    {
        path: "creaAccount",
        component: CreaAccountComponent
    },
    {
        path: "contatti",
        component: ContattiComponent
    },
    {
        path: "registrazioneToken",
        component: RegistrazioneTokenComponent
    },
    {
        path: "LoginToken",
        component: LoginTokenComponent
        
    },
    {
        path: "films-acquistati/:accessToken",//! "accessToken" è il valore del token che ricevo dal server locale(JWT)
        component: FilmsAcquistatiComponent,
        canActivate: [AutorizzazioneGuard]//! nome della guard che è un injectable class(cioè un SERVIZIO)
    },

    {
        path: "",
        redirectTo: "/home",
        pathMatch: "full"
    },
    {
        path: "film-detail/:id",
        component: FilmDetailComponent,


        children: [

            {
                path: "youTube",
                component: VideoYouTubeComponent

            }
            
        ]
    },
    {
        path: "cercare-film/:testo",
        component: CercareFilmComponent

    },
    {
        path: "**",
        component: NotFoundComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
