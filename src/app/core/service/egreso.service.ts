import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ApiService } from './api.service';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EgresoService implements Resolve<any> {

  constructor(private _http: ApiService) { }

  guardar(params: Object) {
    return this._http.post('/egresos', params);
  }

  buscar(params: Object) {
    let httpParams = new HttpParams();
    httpParams = this._http.formatParams(httpParams, params);
    return this._http.get('/egresos', httpParams);
  }

  buscarPorId(id:number) {
    return this._http.get('/egresos/' + id);
  }

  resolve() {
    return this._http.get('/egresos');
  }

  descargarPdf(id:number) {
    let headers = new Headers();
    let httpParams = new HttpParams();
    httpParams = this._http.formatParams(httpParams, {id:id});
    headers.append('Content-type', 'aplication/json');
    headers.append('Accept', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

    let options: object = {
      responseType: 'blob',
      params: httpParams,
    };
    return this._http.getFile('/export/acta-egreso', options);
  }
}
