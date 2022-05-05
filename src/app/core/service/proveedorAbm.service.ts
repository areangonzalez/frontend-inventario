import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Resolve } from "@angular/router";
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ProveedorAbmService implements Resolve<any> {

  constructor(private _api: ApiService) { }

  /**
   * buscador de proveedores según su parametro
   * @param params parametros a buscar
   */
   public buscar(params:object) {
    let httpParams = new HttpParams();
    httpParams = this._api.formatParams(httpParams, params);

    return this._api.get('/proveedors',httpParams);
  }

  resolve() {
    let httpParams = new HttpParams();
    httpParams = this._api.formatParams(httpParams, { pagesize: 20, page: 0 });
    return this._api.get('/proveedors', httpParams);
  }
}

