import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductosComponent } from './productos.component';
import { ProductosRoutingModule } from './productos-routing.module';
import { SharedModule } from '../shared';
import { MenuComponent, StockComponent, IngresoComponent, EgresoComponent, BaStockComponent, BaIngresoComponent, BaEgresoComponent } from './menu';

@NgModule({
  declarations: [ProductosComponent, MenuComponent, StockComponent, IngresoComponent, EgresoComponent, BaStockComponent, BaIngresoComponent, BaEgresoComponent],
  imports: [
    CommonModule,
    SharedModule,
    ProductosRoutingModule
  ]
})
export class ProductosModule { }
