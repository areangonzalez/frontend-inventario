import { Injectable } from '@angular/core';
import { ApiService } from "./api.service";
import { Resolve } from "@angular/router";
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InventarioActaService implements Resolve<any> {

  constructor( private _http: ApiService) { }

  guardar(param: Object) {
    return this._http.post('/inventarios', param);
  }

  buscar(params: any) {
    let httpParams = new HttpParams();
    httpParams = this._http.formatParams(httpParams, params);

    return this._http.get('/inventarios', httpParams);
  }

  resolve() {
    let httpParams = new HttpParams();
    httpParams = this._http.formatParams(httpParams, {pagesize: 8});
    return this._http.get('/inventarios', httpParams);
  }
}
