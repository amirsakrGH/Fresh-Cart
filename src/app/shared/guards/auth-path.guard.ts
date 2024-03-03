import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authPathGuard: CanActivateFn = (route, state) => {

  let _Router = inject(Router)

  if(localStorage.getItem('token') !== null){ //userloged
    return true;
  }else{
    _Router.navigate(['/login']);
    return false;
  }
};
