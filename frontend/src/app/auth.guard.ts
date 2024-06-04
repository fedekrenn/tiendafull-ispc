import { CanActivateFn } from '@angular/router';
import Cookies from 'universal-cookie';

export const authGuard: CanActivateFn = (route, state) => {
  const cookies = new Cookies();
  const isAdmin = cookies.get('isAdmin');
  const isAuthenticated = cookies.get('token');
  if (isAuthenticated && isAdmin) {
    return true;
  } else {
    alert('Acceso no autorizado. Debe iniciar sesión como administrador.');
    return false;
  }
};

export const loginGuard: CanActivateFn = (route, state) => {
  const cookies = new Cookies();
  const isAuthenticated = cookies.get('token');
  if (isAuthenticated) {
    return true;
  } else {
    alert('Debes estar logueado para acceder a esta sección');
    return false;
  }
};
