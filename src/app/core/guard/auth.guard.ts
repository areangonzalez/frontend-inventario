import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';

import { AutenticacionService } from '../service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private _router: Router,
        private _auth: AutenticacionService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      let autorizacion = this._auth.loggedIn;
      const roles = route.data['rol'];
      let cont = 0;
      if (roles && autorizacion) {
          for (const rol of roles) {
            if ( rol === autorizacion.rol) {
              cont++;
            }
          }
          return autorizacion && cont > 0;
      }
      if (autorizacion) { return true; }
      // not logged in so redirect to login page with the return url

      this._router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false;
    }

    canActiveChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : boolean {
      return this.canActivate(route, state);
    }
}
