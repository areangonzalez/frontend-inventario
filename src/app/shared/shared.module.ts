import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListaStockComponent, ListaProductoComponent } from './lista';
import { AlertComponent } from './alert/alert.component';
import { ComprobanteComponent, ProductoComponent } from './formulario';


@NgModule({
  declarations: [ListaStockComponent, AlertComponent, ComprobanteComponent, ProductoComponent, ListaProductoComponent],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    NgbModule,

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    NgbModule,
    ListaStockComponent, AlertComponent
  ]
})
export class SharedModule { }
