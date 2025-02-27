import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { authGuard, loginGuard, welcomeGuard } from './guards/auth.guard';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
  { 
    path: '', 
    component: WelcomeComponent,
    canActivate: [welcomeGuard] 
  },
  { 
    path: 'home', 
    component: HomeComponent,
    canActivate: [authGuard] 
  },
  { 
    path: 'login', 
    component: LoginComponent,
    canActivate: [loginGuard] 
  },
  { path: '**', redirectTo: '' }
];
