import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  LoaderService, AlertService, UtilService, ConfiguracionParaPaginarService, BreadcrumbsService, ApiService, ProductoService, CategoriaService,
  UnidadMedidaService, MarcaService, InventarioService, ComprobanteService, EgresoService, LocalidadService, InventarioActaService, AutenticacionService,
  UsuarioService, RolService, JwtService, TitleService, ProveedorService, ProveedorAbmService, MarcaAbmService
 } from "./service";


@NgModule({
  declarations: [
    LoaderService, AlertService, UtilService, ConfiguracionParaPaginarService, BreadcrumbsService, ApiService, ProductoService, CategoriaService,
    UnidadMedidaService, MarcaService, InventarioService, ComprobanteService, EgresoService, LocalidadService, InventarioActaService, AutenticacionService,
    UsuarioService, RolService, JwtService, TitleService, ProveedorService, ProveedorAbmService, MarcaAbmService
  ],
  imports: [
    CommonModule
  ]
})
export class CoreModule { }
