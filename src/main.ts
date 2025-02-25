import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { WelcomeComponent } from './app/welcome/welcome.component';

const routes = [
  { path: '', component: WelcomeComponent },
  { 
    path: 'login',
    loadComponent: () => import('./app/login/login.component').then(m => m.LoginComponent)
  }
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideAnimations()
  ]
}).catch(err => console.error(err));
