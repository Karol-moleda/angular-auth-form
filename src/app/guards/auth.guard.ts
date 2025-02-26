import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  
  // Check if token exists in localStorage
  const isAuthenticated = !!localStorage.getItem('authToken');
  
  if (isAuthenticated) {
    return true;
  }
  
  // Not authenticated, redirect to login
  router.navigate(['/login']);
  return false;
};

export const loginGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  
  // Check if token exists in localStorage
  const isAuthenticated = !!localStorage.getItem('authToken');
  
  if (!isAuthenticated) {
    return true;
  }
  
  // Already authenticated, redirect to home
  router.navigate(['/home']);
  return false;
};

export const welcomeGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  
  // Check if token exists in localStorage
  const isAuthenticated = !!localStorage.getItem('authToken');
  
  if (isAuthenticated) {
    // If authenticated, redirect to home
    router.navigate(['/home']);
    return false;
  }
  
  // Not authenticated, allow access to welcome page
  return true;
};
