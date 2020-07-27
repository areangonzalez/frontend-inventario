import { Injectable } from '@angular/core';
import { ApiService } from "./api.service";
import { Resolve } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  constructor( private _http: ApiService) { }

  guardar(param: Object) {
    return this._http.post('/inventarios', param);
  }

  resolve() {
    return this._http.get('/inventarios');
  }
}
