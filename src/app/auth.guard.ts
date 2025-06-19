import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
   const isLoggedIn = !!localStorage.getItem('seller');

  if (isLoggedIn) {
    return true;
  } else {
    // Redirect to login/signup
    window.alert('Access denied! Please log in first.');
    return false;
  }
};
