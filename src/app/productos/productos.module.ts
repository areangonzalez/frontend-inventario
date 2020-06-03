import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductosComponent } from './productos.component';
import { ListaComponent } from './lista/lista.component';
import { ProductosRoutingModule } from './productos-routing.module';
import { SharedModule } from '../shared';
import { MenuComponent } from './menu/menu.component';
import { StockComponent } from './menu/vista/stock/stock.component';
import { IngresoComponent } from './menu/vista/ingreso/ingreso.component';
import { EgresoComponent } from './menu/vista/egreso/egreso.component';



@NgModule({
  declarations: [ProductosComponent, ListaComponent, MenuComponent, StockComponent, IngresoComponent, EgresoComponent],
  imports: [
    CommonModule,
    SharedModule,
    ProductosRoutingModule
  ]
})
export class ProductosModule { }
