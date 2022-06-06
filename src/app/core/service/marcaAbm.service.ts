import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Resolve } from "@angular/router";
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class MarcaAbmService implements Resolve<any> {

  constructor(private _api: ApiService) { }

  /**
   * buscador de marcas según su parametro
   * @param params parametros a buscar
   */
   public buscar(params:object) {
    let httpParams = new HttpParams();
    httpParams = this._api.formatParams(httpParams, params);

    return this._api.get('/marcas',httpParams);
  }
  /**
   *
   * @param param datos de marca
   * @param id numero de identifficacion de provedor es opcional (?)
   * @returns devuelve una respuesta del sistema de backend.
   */
  guardar(param: Object, id?:number) {
    if (id !== undefined) {
      return this._api.put('/marcas/' + id, param);
    }else {
      return this._api.post('/marcas', param);
    }
  }

  altaBajaMarca(id: number, params: object) {
    return this._api.put('/marcas/set-activo/' + id, params);
  }

  resolve() {
    let httpParams = new HttpParams();
    httpParams = this._api.formatParams(httpParams, { pagesize: 20, page: 0 });
    return this._api.get('/marcas', httpParams);
  }
}

