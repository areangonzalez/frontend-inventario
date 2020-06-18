import { Injectable } from '@angular/core';
import { Resolve } from "@angular/router";
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {

  constructor(private http: ApiService) { }

  resolve() {
    return this.http.get('/marcas');
  }
}
