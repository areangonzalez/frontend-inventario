import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductosComponent } from './productos.component';
import { ProductosRoutingModule } from './productos-routing.module';
import { SharedModule } from '../shared';
import { MenuComponent, StockComponent, IngresoComponent, EgresoComponent } from './menu';

@NgModule({
  declarations: [ProductosComponent, MenuComponent, StockComponent, IngresoComponent, EgresoComponent],
  imports: [
    CommonModule,
    SharedModule,
    ProductosRoutingModule
  ]
})
export class ProductosModule { }
