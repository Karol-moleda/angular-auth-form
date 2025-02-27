import { inject } from '@angular/core';
import { Router, CanActivateFn, UrlTree } from '@angular/router';

/**
 * Checks if the user is authenticated
 * @returns Boolean indicating if user is authenticated
 */
const isAuthenticated = (): boolean => {
  return !!localStorage.getItem('authToken');
};

export const authGuard: CanActivateFn = (): boolean | UrlTree => {
  const router = inject(Router);
  return isAuthenticated() ? true : router.createUrlTree(['/login']);
};

export const loginGuard: CanActivateFn = (): boolean | UrlTree => {
  const router = inject(Router);
  return !isAuthenticated() ? true : router.createUrlTree(['/home']);
};

export const welcomeGuard: CanActivateFn = (): boolean | UrlTree => {
  const router = inject(Router);
  return isAuthenticated() ? router.createUrlTree(['/home']) : true;
};
