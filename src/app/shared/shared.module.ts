import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListaStockComponent, ListaProductoComponent } from './lista';
import { AlertComponent } from './alert/alert.component';
import { ComprobanteComponent, ProductoComponent } from './formulario';
import { ComprobanteModalContent, ComprobanteModalComponent, ConfirmarBorradoProductoModalComponent, ConfirmarBorradoProductoModalContent, VistaComprobanteModalComponent, VistaComprobanteModalContent, FaltaProductoModalComponent, FaltaProductoModalContent } from './modal';
import { AutocompletarComponent } from './autocompletar/autocompletar.component';
import { FocusOnShowDirective } from './directive/focus-on-show.directive';


@NgModule({
  declarations: [ ListaStockComponent, AlertComponent, ComprobanteComponent, ProductoComponent, ListaProductoComponent, ComprobanteModalContent, ComprobanteModalComponent, AutocompletarComponent, FocusOnShowDirective, ConfirmarBorradoProductoModalContent, ConfirmarBorradoProductoModalComponent, VistaComprobanteModalComponent, VistaComprobanteModalContent, FaltaProductoModalComponent, FaltaProductoModalContent ],
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
    ListaStockComponent, AlertComponent,
    ComprobanteModalContent, ComprobanteModalComponent,
    AutocompletarComponent,
    ConfirmarBorradoProductoModalContent, ConfirmarBorradoProductoModalComponent,
    VistaComprobanteModalContent, VistaComprobanteModalComponent,
    FaltaProductoModalContent, FaltaProductoModalComponent
  ]
})
export class SharedModule { }
