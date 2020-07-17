import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductosComponent } from './productos.component';
import { ProductosRoutingModule } from './productos-routing.module';
import { SharedModule } from '../shared';
import { MenuComponent, StockComponent, IngresoComponent, EgresoComponent, BaStockComponent, BaIngresoComponent, BaEgresoComponent, ListaIngresoComponent } from './menu';

@NgModule({
  declarations: [ProductosComponent, MenuComponent, StockComponent, IngresoComponent, EgresoComponent, BaStockComponent, BaIngresoComponent, BaEgresoComponent, ListaIngresoComponent],
  imports: [
    CommonModule,
    SharedModule,
    ProductosRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProductosModule { }
