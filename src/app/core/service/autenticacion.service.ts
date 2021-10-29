import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators'
import { ApiService } from './api.service'
import { JwtService } from './jwt.service'
import { Usuario } from '../model';


@Injectable({ providedIn: 'root' })
export class AutenticacionService {
  constructor( private _http: ApiService, private _jwtService: JwtService ) { }

  /**
   * verifico si esta logueado el usuario
   */
   public get loggedIn(): Usuario {
    let user: Usuario = this._jwtService.getToken();
    return user;
  }

  login(params) {
    return this._http.post('/usuarios/login', { username: params.username, password_hash: params.password })
            .pipe(map(user => {
              console.log(user);

              // login successful if there's a jwt token in the response
              if (user && user.access_token) {
                  this._jwtService.saveToken(user);
                  return true;
                }
            }));
  }

  logout() {
    // remove user from local storage to log user out
    this._jwtService.destroyToken();
  }
  // obtiene el nombre del usuario
  getUserName() {
    let userLogin = this._jwtService.getToken();
    return userLogin.username;
  }
}
