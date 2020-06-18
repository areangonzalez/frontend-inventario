import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  AlertService, UtilService, BreadcrumbsService, ApiService, ProductoService, CategoriaService,
  UnidadMedidaService
 } from "./service";


@NgModule({
  declarations: [
    AlertService, UtilService, BreadcrumbsService, ApiService, ProductoService, CategoriaService,
    UnidadMedidaService
  ],
  imports: [
    CommonModule
  ]
})
export class CoreModule { }
