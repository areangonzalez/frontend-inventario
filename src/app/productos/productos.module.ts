import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductosComponent } from './productos.component';
import { ListaComponent } from './lista/lista.component';



@NgModule({
  declarations: [ProductosComponent, ListaComponent],
  imports: [
    CommonModule
  ]
})
export class ProductosModule { }
