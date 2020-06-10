import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  AlertService, UtilService
 } from "./service";


@NgModule({
  declarations: [
    AlertService, UtilService
  ],
  imports: [
    CommonModule
  ]
})
export class CoreModule { }
