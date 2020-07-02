import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ComprobanteService {

  constructor(private _http: ApiService) { }

  buscarPorId(id:number) {
    return this._http.get("/comprobante/" + id);
  }
}
