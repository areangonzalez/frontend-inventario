import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'shared-lista-producto',
  templateUrl: './lista-producto.component.html',
  styleUrls: ['./lista-producto.component.scss']
})
export class ListaProductoComponent implements OnInit {
  @Input("stock") public stock:any;
  @Input("submitted") public submitted: boolean;
  @Input("borrar") public borrar: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  obtenerProductoFaltante(productoOrigen:any, indiceProductoOrigen:number, productoNuevo:any) {
    productoOrigen['cantidad'] = parseInt(productoOrigen['cantidad']) - parseInt(productoNuevo['cantidad']);
    // borro el producto origen si la cantidad es igual a cero
    if (productoOrigen['cantidad'] == 0){
      this.stock.splice(indiceProductoOrigen, 1);
    }

    this.stock.push(productoNuevo);
    console.log(productoOrigen,' ',productoNuevo);
  }

}
