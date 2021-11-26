import { Injectable } from '@angular/core';
import { Resolve } from "@angular/router";
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService implements Resolve<any>{

  constructor( private http: ApiService) { }

  resolve() {
    return this.http.get('/categorias')
  }
}
