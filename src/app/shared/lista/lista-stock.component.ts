import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'shared-lista-stock',
  templateUrl: './lista-stock.component.html',
  styleUrls: ['./lista-stock.component.scss']
})
export class ListaStockComponent implements OnInit {
  @Input("listadoStock") public listadoStock: any;
  @Input("tipoTabla") public tipoTabla: string;
  @Input("configPaginacion") public configPaginacion:any;
  @Input("sort") public sort: string;
  @Output("cambioDePagina") public cambioDePagina = new EventEmitter();
  @Output("productoSeleccionado") public productoSeleccionado = new EventEmitter();
  @Output("ordenarTabla") public ordenarTabla = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * Se resta la cantidad del producto seleccionado por el real.
   * Generando un nuevo listado de productos.
   * @param cantidad valor de la cantidad de un producto
   * @param producto objeto que se desea modificar
   */
  nuevaCantidad(cantidad, producto) {
    let productoSel = Object.assign({}, producto);
    // resto la cantidad seleccionada con la cantidad real del producto
    producto["cantidad"] = parseInt(producto["cantidad"]) - parseInt(cantidad);
    // guardo la cantidad en el nuevo objeto
    productoSel["cantidad"] = cantidad;
    // envio los datos del producto seleccionado al componente padre
    this.productoSeleccionado.emit(productoSel);
  }

  cambioPagina(pagina:number){
    this.cambioDePagina.emit(pagina);
  }

  guardarProductoDefectuoso(producto: object) {
    this.productoSeleccionado.emit(producto);
  }

  ordernar(tituloTabla:string) {
    switch (tituloTabla) {
      case 'cantidad':
          this.sort = (this.sort == 'cantidad') ? '-cantidad' : 'cantidad';
        break;
      case 'producto':
        this.sort = (this.sort == 'producto') ? '-producto' : 'producto';
        break;
      case 'categoriaid':
        this.sort = (this.sort == 'categoriaid') ? '-categoriaid' : 'categoriaid';
        break;
      case 'fecha_vencimiento':
        this.sort = (this.sort == 'fecha_vencimiento') ? '-fecha_vencimiento' : 'fecha_vencimiento';
        break;
    }
    this.ordenarTabla.emit(this.sort);

  }

}
