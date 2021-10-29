import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgbTooltipModule, NgbDatepickerModule, NgbCollapseModule, NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';

import { CabeceraComponent } from './layout';
import { ListaStockComponent, ListaProductoComponent, ListaActaComponent } from './lista';
import { AlertComponent } from './alert/alert.component';
import { ComprobanteComponent, ProductoComponent, EgresoComponent } from './formulario';
import {
  ComprobanteModalContent, ComprobanteModalComponent, ConfirmarBorradoProductoModalComponent, ConfirmarBorradoProductoModalContent,
  VistaComprobanteModalComponent, VistaComprobanteModalContent, FaltaProductoModalComponent, FaltaProductoModalContent, DevuelveProductoModalContent,
  DevuelveProductoModalComponent, CrearActaModalContent, CrearActaComponent, ArmarListadoActaModalContent, ArmarListadoActaModalComponent,
  AgregarCantidadProductoComponent, AgregarCantidadMaximaModalContent, ConfirmarArmadoModalContent, VistaActaModalContent,
  VistaActaModalComponent, ProductoDefectuosoModalContent, ProductoDefectuosoModalComponent, EditarDescripcionModalComponent, EditarDescripcionModalContent
} from './modal';
import { AutocompletarComponent } from './autocompletar/autocompletar.component';
import { FocusOnShowDirective } from './directive/focus-on-show.directive';


@NgModule({
  declarations: [
    CabeceraComponent,
    ListaStockComponent, AlertComponent, ComprobanteComponent, ProductoComponent, ListaProductoComponent, ComprobanteModalContent, ComprobanteModalComponent,
    AutocompletarComponent, FocusOnShowDirective, ConfirmarBorradoProductoModalContent, ConfirmarBorradoProductoModalComponent, VistaComprobanteModalComponent,
    VistaComprobanteModalContent, FaltaProductoModalComponent, FaltaProductoModalContent, DevuelveProductoModalContent, DevuelveProductoModalComponent,
    EgresoComponent, CrearActaModalContent, CrearActaComponent, ArmarListadoActaModalContent, ArmarListadoActaModalComponent, ListaActaComponent,
    AgregarCantidadMaximaModalContent, AgregarCantidadProductoComponent, ConfirmarArmadoModalContent, VistaActaModalContent, VistaActaModalComponent,
    ProductoDefectuosoModalContent, ProductoDefectuosoModalComponent, EditarDescripcionModalComponent, EditarDescripcionModalContent ],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule, HttpClientModule, RouterModule,
    NgbTooltipModule, NgbDatepickerModule, NgbCollapseModule, NgbPaginationModule, NgbTypeaheadModule,

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    NgbTooltipModule, NgbDatepickerModule, NgbCollapseModule, NgbPaginationModule, NgbTypeaheadModule,
    CabeceraComponent,
    ListaStockComponent, AlertComponent, ListaActaComponent,
    ComprobanteModalContent, ComprobanteModalComponent, EgresoComponent,
    AutocompletarComponent,
    ConfirmarBorradoProductoModalContent, ConfirmarBorradoProductoModalComponent,
    VistaComprobanteModalContent, VistaComprobanteModalComponent,
    FaltaProductoModalContent, FaltaProductoModalComponent,
    DevuelveProductoModalContent, DevuelveProductoModalComponent,
    CrearActaModalContent, CrearActaComponent,
    ArmarListadoActaModalContent, ArmarListadoActaModalComponent,
    AgregarCantidadMaximaModalContent, AgregarCantidadProductoComponent,
    ConfirmarArmadoModalContent,
    VistaActaModalContent, VistaActaModalComponent,
    ProductoDefectuosoModalContent, ProductoDefectuosoModalComponent,
    EditarDescripcionModalComponent, EditarDescripcionModalContent
  ]
})
export class SharedModule { }
