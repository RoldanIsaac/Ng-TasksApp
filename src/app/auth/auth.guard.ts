import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { of } from 'rxjs';

export const AuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const isAuthenticated = false;

  return isAuthenticated ? of(true) : of(router.parseUrl('/sign-in'));
};
