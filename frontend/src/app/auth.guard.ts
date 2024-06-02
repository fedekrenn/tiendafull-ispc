import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const isAdmin = sessionStorage.getItem('isAdmin') === 'true';
  const isAuthenticated = sessionStorage.getItem('token') !== null;
  if (isAuthenticated && isAdmin) {
    return true;
  } else {
    alert('Acceso no autorizado. Debe iniciar sesión como administrador.');
    return false;
  }
};

export const loginGuard: CanActivateFn = (route, state) => {
  const isAuthenticated = sessionStorage.getItem('token') !== null;
  if (isAuthenticated) {
    return true;
  } else {
    alert('Debes estar logueado para acceder a esta sección');
    return false;
  }
};
