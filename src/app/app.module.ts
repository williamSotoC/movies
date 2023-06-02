import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';





// ! ng-bootstrap
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';

// ! ng-bootstrap



// !Angular material
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


// !Angular material




// ! componenti
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SliderComponent } from './slider/slider.component';
import { FilmDetailComponent } from './film-detail/film-detail.component';
import { FilmsListComponent } from './films-list/films-list.component';
import { CercareFilmComponent } from './cercare-film/cercare-film.component';
import { CastComponent } from './cast/cast.component';
import { FilmSimilariComponent } from './film-similari/film-similari.component';
import { VideoYouTubeComponent } from './video-you-tube/video-you-tube.component';
import { FiltroYouTubePipe } from './pipes/filtro-you-tube.pipe';
import { FiltroImgPipe } from './pipes/filtro-img.pipe';
import { LoginComponent } from './login/login.component';
import { CreaAccountComponent } from './crea-account/crea-account.component';
import { ContattiComponent } from './contatti/contatti.component';
import { RegistrazioneTokenComponent } from './registrazione-token/registrazione-token.component';
import { LoginTokenComponent } from './login-token/login-token.component';
import { FilmsAcquistatiComponent } from './films-acquistati/films-acquistati.component';
import { PopPupComponent } from './pop-pup/pop-pup.component';
import { FiltroImgBackgroundPipe } from './pipes/filtro-img-background.pipe';
// ! componenti




@NgModule({
    declarations: [
        AppComponent,
        FooterComponent,
        HeaderComponent,
        HomeComponent,
        NotFoundComponent,
        SliderComponent,
        FilmDetailComponent,
        FilmsListComponent,
        CercareFilmComponent,
        CastComponent,
        FilmSimilariComponent,
        VideoYouTubeComponent,
        FiltroYouTubePipe,
        FiltroImgPipe,
        LoginComponent,
        CreaAccountComponent,
        ContattiComponent,
        RegistrazioneTokenComponent,
        LoginTokenComponent,
        FilmsAcquistatiComponent,
        PopPupComponent,
        FiltroImgBackgroundPipe,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatIconModule,
        HttpClientModule,
        MatButtonModule,
        MatCardModule,
        FormsModule,
        NgbRatingModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        MatCheckboxModule,
        MatSelectModule,
        MatDialogModule,
        MatProgressSpinnerModule,

    ],
    entryComponents: [PopPupComponent],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }


