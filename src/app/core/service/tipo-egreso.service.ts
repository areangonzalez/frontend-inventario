import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Resolve } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TipoEgresoService {

  constructor( private _http: ApiService ) { }

  resolve() {
    return this._http.get('/tipo-egresos');
  }
}
