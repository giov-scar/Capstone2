import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeroComponent } from './components/hero/hero.component';
import { NavComponent } from './components/nav/nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { Page404Component } from './pages/page404/page404.component';
import { PhotographyComponent } from './pages/photography/photography.component';
import { PaintingComponent } from './pages/painting/painting.component';
import { SculptureComponent } from './pages/sculpture/sculpture.component';
import { InstallationComponent } from './pages/installation/installation.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { WorkComponent } from './pages/work/work.component';
import { ArtistComponent } from './pages/artist/artist.component';
import { FeaturedComponent } from './components/featured/featured.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideStorage,getStorage } from '@angular/fire/storage';

@NgModule({
    declarations: [
        AppComponent,
        HeroComponent,
        FooterComponent,
        HomeComponent,
        AboutComponent,
        ContactComponent,
        Page404Component,
        PhotographyComponent,
        PaintingComponent,
        SculptureComponent,
        InstallationComponent,
        ProjectsComponent,
        WorkComponent,
        ArtistComponent,
        FeaturedComponent,
        LoginComponent,
        RegisterComponent,


    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgbModule,
        NavComponent,
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAuth(() => getAuth()),
        provideDatabase(() => getDatabase()),
        provideStorage(() => getStorage())
    ]
})
export class AppModule { }
