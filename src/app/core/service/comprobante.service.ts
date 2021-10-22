import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ApiService } from './api.service';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ComprobanteService implements Resolve<any>{

  constructor(private _http: ApiService) { }

  buscarPorId(id:number) {
    return this._http.get("/comprobantes/" + id);
  }

  actualizarProductoFaltante(id:number, params: object) {
    return this._http.put("/comprobantes/registrar-producto-pendiente/" + id, params);
  }

  guardar(params: object, id: number) {
    return this._http.put("/comprobantes/" + id, params);
  }

  buscar(params:any) {
    let httpParams = new HttpParams();
    httpParams = this._http.formatParams(httpParams, params);

    return this._http.get('/comprobantes', httpParams);
  }

  resolve() {
    return this._http.get('/comprobantes');
  }
}
