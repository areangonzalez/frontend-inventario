import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ApiService } from './api.service';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EgresoService {

  constructor(private _http: ApiService) { }

  resolve() {
    return this._http.get('/egresos');
  }
}
