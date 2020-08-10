import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  LoaderService, AlertService, UtilService, ConfiguracionParaPaginarService, BreadcrumbsService, ApiService, ProductoService, CategoriaService,
  UnidadMedidaService, MarcaService, InventarioService, ComprobanteService, EgresoService, LocalidadService, InventarioActaService
 } from "./service";


@NgModule({
  declarations: [
    LoaderService, AlertService, UtilService, ConfiguracionParaPaginarService, BreadcrumbsService, ApiService, ProductoService, CategoriaService,
    UnidadMedidaService, MarcaService, InventarioService, ComprobanteService, EgresoService, LocalidadService, InventarioActaService
  ],
  imports: [
    CommonModule
  ]
})
export class CoreModule { }
