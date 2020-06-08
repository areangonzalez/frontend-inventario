import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaStockComponent } from './lista';
import { AlertComponent } from './alert/alert.component';


@NgModule({
  declarations: [ListaStockComponent, AlertComponent],
  imports: [
    CommonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    CommonModule,
    ListaStockComponent, AlertComponent
  ]
})
export class SharedModule { }
