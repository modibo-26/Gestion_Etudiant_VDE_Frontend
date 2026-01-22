import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';

export const authGuard: CanActivateFn = (route, state) => {
  const service = inject(Auth)

  const router = inject(Router)

  const isLogged = service.isLoggedIn();

  if (isLogged === false) {
    router.navigateByUrl('login')
    return false
  }

  const role = service.getRole();
  const requiredRoles = route.data['roles'] as string[]

  if(role) {
    if (requiredRoles && !requiredRoles.includes(role)) {
      router.navigateByUrl(`/${role.toLocaleLowerCase()}`);
      return false;
    }
  }

  return true;
};
