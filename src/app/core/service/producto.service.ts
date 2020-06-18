import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Resolve } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductoService implements Resolve<any> {

  constructor( private http: ApiService) { }

  resolve() {
    return this.http.get('/productos')
  }

}
