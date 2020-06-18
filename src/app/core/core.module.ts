import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  AlertService, UtilService, BreadcrumbsService, ApiService, ProductoService
 } from "./service";


@NgModule({
  declarations: [
    AlertService, UtilService, BreadcrumbsService, ApiService, ProductoService
  ],
  imports: [
    CommonModule
  ]
})
export class CoreModule { }
