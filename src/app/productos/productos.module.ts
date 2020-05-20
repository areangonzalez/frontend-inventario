import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductosComponent } from './productos.component';
import { ListaComponent } from './lista/lista.component';
import { ProductosRoutingModule } from './productos-routing.module';
import { SharedModule } from '../shared';



@NgModule({
  declarations: [ProductosComponent, ListaComponent],
  imports: [
    CommonModule,
    SharedModule,
    ProductosRoutingModule
  ]
})
export class ProductosModule { }
