import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListaStockComponent, ListaProductoComponent, ListaActaComponent } from './lista';
import { AlertComponent } from './alert/alert.component';
import { ComprobanteComponent, ProductoComponent, EgresoComponent } from './formulario';
import { ComprobanteModalContent, ComprobanteModalComponent, ConfirmarBorradoProductoModalComponent, ConfirmarBorradoProductoModalContent, VistaComprobanteModalComponent, VistaComprobanteModalContent, FaltaProductoModalComponent, FaltaProductoModalContent, DevuelveProductoModalContent, DevuelveProductoModalComponent, CrearActaModalContent, CrearActaComponent, ArmarListadoActaModalContent, ArmarListadoActaModalComponent, AgregarCantidadProductoComponent, AgregarCantidadMaximaModalContent } from './modal';
import { AutocompletarComponent } from './autocompletar/autocompletar.component';
import { FocusOnShowDirective } from './directive/focus-on-show.directive';


@NgModule({
  declarations: [ ListaStockComponent, AlertComponent, ComprobanteComponent, ProductoComponent, ListaProductoComponent, ComprobanteModalContent, ComprobanteModalComponent, AutocompletarComponent, FocusOnShowDirective, ConfirmarBorradoProductoModalContent, ConfirmarBorradoProductoModalComponent, VistaComprobanteModalComponent, VistaComprobanteModalContent, FaltaProductoModalComponent, FaltaProductoModalContent, DevuelveProductoModalContent, DevuelveProductoModalComponent, EgresoComponent, CrearActaModalContent, CrearActaComponent, ArmarListadoActaModalContent, ArmarListadoActaModalComponent, ListaActaComponent, AgregarCantidadMaximaModalContent, AgregarCantidadProductoComponent ],
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
    ListaStockComponent, AlertComponent, ListaActaComponent,
    ComprobanteModalContent, ComprobanteModalComponent, EgresoComponent,
    AutocompletarComponent,
    ConfirmarBorradoProductoModalContent, ConfirmarBorradoProductoModalComponent,
    VistaComprobanteModalContent, VistaComprobanteModalComponent,
    FaltaProductoModalContent, FaltaProductoModalComponent,
    DevuelveProductoModalContent, DevuelveProductoModalComponent,
    CrearActaModalContent, CrearActaComponent,
    ArmarListadoActaModalContent, ArmarListadoActaModalComponent,
    AgregarCantidadMaximaModalContent, AgregarCantidadProductoComponent
  ]
})
export class SharedModule { }
