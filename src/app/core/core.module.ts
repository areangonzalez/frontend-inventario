import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  AlertService, UtilService, BreadcrumbsService, ApiService
 } from "./service";


@NgModule({
  declarations: [
    AlertService, UtilService, BreadcrumbsService, ApiService
  ],
  imports: [
    CommonModule
  ]
})
export class CoreModule { }
