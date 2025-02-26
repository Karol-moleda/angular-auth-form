import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { authGuard, loginGuard, welcomeGuard } from './guards/auth.guard';

export const routes: Routes = [
  { 
    path: '', 
    component: WelcomeComponent,
    canActivate: [welcomeGuard] // Use welcome guard to redirect authenticated users
  },
  { 
    path: 'home', 
    component: HomeComponent,
    canActivate: [authGuard] // Protect home - only for authenticated users
  },
  { 
    path: 'login', 
    component: LoginComponent,
    canActivate: [loginGuard] // Protect login - only for unauthenticated users
  },
  { path: '**', redirectTo: '' }
];
