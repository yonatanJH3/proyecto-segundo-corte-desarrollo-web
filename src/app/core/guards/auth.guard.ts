import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const AuthGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  // Solo evaluar tokens en el navegador
  if (isPlatformBrowser(platformId)) {
    if (auth.isLoggedIn()) return true;
    return router.createUrlTree(['/auth/login']);
  }

  // En el servidor, no decidir sesión → permitir carga parcial
  return true;
};


export const GuestGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  // Si ya tiene sesión → no permitir acceso al login
  if (auth.isLoggedIn()) {
    return router.createUrlTree(['/dashboard']);  // redirige al dashboard
  }

  return true; // si NO está logueado → sí puede entrar al login
};