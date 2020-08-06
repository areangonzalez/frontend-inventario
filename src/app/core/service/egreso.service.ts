import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ApiService } from './api.service';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EgresoService {

  constructor(private _http: ApiService) { }

  guardar(params: Object) {
    return this._http.post('/egresos', params);
  }


  buscarPorId(id:number) {
    return this._http.get('/egresos/' + id);
  }

  resolve() {
    return this._http.get('/egresos');
  }
}
