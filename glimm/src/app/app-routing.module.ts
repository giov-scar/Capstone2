import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { Page404Component } from './pages/page404/page404.component';
import { PhotographyComponent } from './pages/photography/photography.component';
import { PaintingComponent } from './pages/painting/painting.component';
import { SculptureComponent } from './pages/sculpture/sculpture.component';
import { InstallationComponent } from './pages/installation/installation.component';
import { WorkComponent } from './pages/work/work.component';
import { ArtistComponent } from './pages/artist/artist.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from './shared/guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'photography',
    component: PhotographyComponent
  },
  {
    path: 'painting',
    component: PaintingComponent
  },
  {
    path: 'sculpture',
    component: SculptureComponent
  },
  {
    path: 'installation',
    component: InstallationComponent
  },
  {
    path: 'work/:id',
    component: WorkComponent
  },
  {
    path: 'artist',
    component: ArtistComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate:[AuthGuard],
  },
  {
    path: '**',
    component: Page404Component
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
