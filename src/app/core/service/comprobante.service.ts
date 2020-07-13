import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ComprobanteService {

  constructor(private _http: ApiService) { }

  buscarPorId(id:number) {
    return this._http.get("/comprobantes/" + id);
  }

  actualizarProductoFaltante(id:number, params: object) {
    return this._http.put("/comprobantes/registrar-producto-faltante/" + id, params);
  }
}
