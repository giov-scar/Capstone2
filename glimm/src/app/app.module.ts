import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { provideFirestore, getFirestore } from "@angular/fire/firestore"



import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UploadFormComponent } from './components/upload-form/upload-form.component';
import { UploadListComponent } from './components/upload-list/upload-list.component';
import { UploadDetailsComponent } from './components/upload-details/upload-details.component';
import { UploadWorkComponent } from './components/upload-work/upload-work.component';
import { ToastrModule } from 'ngx-toastr';
import { EditWorkModalComponent } from './components/edit-work-modal/edit-work-modal.component';
import { EditConfirmModalComponent } from './components/modals/edit-confirm-modal/edit-confirm-modal.component';
import { DeleteUserWorkModalComponent } from './components/modals/delete-user-work-modal/delete-user-work-modal.component';
import { EditProfilePictureModalComponent } from './components/modals/edit-profile-picture-modal/edit-profile-picture-modal.component';
import { ConfirmProfileUpdateModalComponent } from './components/modals/confirm-profile-update-modal/confirm-profile-update-modal.component';
import { EditCoverImageModalComponent } from './components/modals/edit-cover-image-modal/edit-cover-image-modal.component';
import { ConfirmCoverImageModalComponent } from './components/modals/confirm-cover-image-modal/confirm-cover-image-modal.component';
import { EditIntroModalComponent } from './components/modals/edit-intro-modal/edit-intro-modal.component';
import { ConfirmIntroModalComponent } from './components/modals/confirm-intro-modal/confirm-intro-modal.component';
import { ConfirmEducationComponent } from './components/modals/confirm-education/confirm-education.component';
import { EditEducationComponent } from './components/modals/edit-education/edit-education.component';
import { StepperComponent } from './components/stepper/stepper.component';
import { SearchComponent } from './components/search/search.component';
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
        UploadFormComponent,
        UploadListComponent,
        UploadDetailsComponent,
        EditWorkModalComponent,
        EditConfirmModalComponent,
        DeleteUserWorkModalComponent,
        EditProfilePictureModalComponent,
        ConfirmProfileUpdateModalComponent,
        EditCoverImageModalComponent,
        ConfirmCoverImageModalComponent,
        EditIntroModalComponent,
        ConfirmIntroModalComponent,
        ConfirmEducationComponent,
        EditEducationComponent,
        StepperComponent,
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgbModule,
        NavComponent,
        FormsModule,
        DashboardComponent,
        ReactiveFormsModule,
        HttpClientModule,
        UploadWorkComponent,
        SearchComponent,
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAuth(() => getAuth()),
        provideDatabase(() => getDatabase()),
        provideStorage(() => getStorage()),
        provideFirestore(() => getFirestore()),
        ToastrModule.forRoot()
    ]
})
export class AppModule { }
