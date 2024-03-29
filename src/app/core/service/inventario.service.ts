import { Injectable } from '@angular/core';
import { ApiService } from "./api.service";
import { Resolve } from "@angular/router";
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InventarioService implements Resolve<any>{

  constructor( private _http: ApiService) { }

  buscar(params: any) {
    let httpParams = new HttpParams();
    httpParams = this._http.formatParams(httpParams, params);

    return this._http.get('/inventarios', httpParams);
  }

  defectuoso(params: Object) {
    return this._http.post('/inventarios/set-defectuoso', params);
  }

  resolve() {
    let httpParams = new HttpParams();
    httpParams = this._http.formatParams(httpParams, { sort: '-fecha_vencimiento', page: 0 });
    return this._http.get('/inventarios', httpParams);
  }
}
