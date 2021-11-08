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

  guardarObservacion(params: object, id: number) {
    return this._http.put("/comprobantes/editar-observacion/" + id, params);
  }

  buscar(params:any) {
    let httpParams = new HttpParams();
    httpParams = this._http.formatParams(httpParams, params);

    return this._http.get('/comprobantes', httpParams);
  }

  guardar(param: Object, id?:number) {
    if (id !== undefined) {
      return this._http.put('/comprobantes/' + id, param);
    }else {
      return this._http.post('/comprobantes', param);
    }
  }

  resolve() {
    let httpParams = new HttpParams();
    httpParams = this._http.formatParams(httpParams, { sort: '-nro_remito', page: 0 });
    return this._http.get('/comprobantes', httpParams);
  }
}
