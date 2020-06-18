import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  AlertService, UtilService, BreadcrumbsService, ApiService, ProductoService, CategoriaService,
  UnidadMedidaService, MarcaService
 } from "./service";


@NgModule({
  declarations: [
    AlertService, UtilService, BreadcrumbsService, ApiService, ProductoService, CategoriaService,
    UnidadMedidaService, MarcaService
  ],
  imports: [
    CommonModule
  ]
})
export class CoreModule { }
