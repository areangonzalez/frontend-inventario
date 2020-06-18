import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  AlertService, UtilService, BreadcrumbsService, ApiService, ProductoService, CategoriaService
 } from "./service";


@NgModule({
  declarations: [
    AlertService, UtilService, BreadcrumbsService, ApiService, ProductoService, CategoriaService
  ],
  imports: [
    CommonModule
  ]
})
export class CoreModule { }
