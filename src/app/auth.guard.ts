import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "./core/auth.service";


export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  if (authService.isLoggedIn()) {
    return true;
  }
  router.navigate(['/login']).then(() => {
    console.log('Navigation to login page complete');
  }).catch(error => {
    console.error('Navigation error:', error);
  });
  return false;
};
