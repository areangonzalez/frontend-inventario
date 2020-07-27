import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'shared-lista-stock',
  templateUrl: './lista-stock.component.html',
  styleUrls: ['./lista-stock.component.scss']
})
export class ListaStockComponent implements OnInit {
  @Input("listadoStock") public listadoStock: any;
  @Input("tipoTabla") public tipoTabla: string;
  @Output("productoSeleccionado") public productoSeleccionado = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }


  nuevaCantidad(cantidad, producto) {
    let productoSel = Object.assign({}, producto);

    productoSel["cantidad"] = cantidad;

    this.productoSeleccionado.emit(productoSel);

  }


}
