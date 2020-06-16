import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  AlertService, UtilService, BreadcrumbsService
 } from "./service";


@NgModule({
  declarations: [
    AlertService, UtilService, BreadcrumbsService
  ],
  imports: [
    CommonModule
  ]
})
export class CoreModule { }
