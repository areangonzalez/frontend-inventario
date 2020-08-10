import { Injectable } from '@angular/core';
import { ApiService } from "./api.service";
import { Resolve } from "@angular/router";
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  constructor( private _http: ApiService) { }

  guardar(param: Object) {
    return this._http.post('/inventarios', param);
  }

  buscar(params: any) {
    let httpParams = new HttpParams();
    httpParams = this._http.formatParams(httpParams, params);

    return this._http.get('/egresos', httpParams);
  }

  resolve() {
    return this._http.get('/inventarios');
  }
}
