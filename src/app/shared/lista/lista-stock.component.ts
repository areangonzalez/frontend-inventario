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
   * @param cantYdescripcion objeto con dos valore de la cantidad de un producto y su descripcion { cantidad: 100, descripcion: "texto" }
   * @param producto objeto que se desea modificar
   */
  nuevaCantidad(cantYdescripcion:any, producto: any) {
    let productoSel = Object.assign({}, producto);
    // resto la cantidad seleccionada con la cantidad real del producto
    producto["cantidad"] = parseInt(producto["cantidad"]) - parseInt(cantYdescripcion.cantidad);
    // guardo la cantidad en el nuevo objeto de productos seleccionados
    productoSel["cantidad"] = cantYdescripcion.cantidad;
    productoSel["descripcion"] = cantYdescripcion.descripcion;
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

  estadoProducto(por_vencer: boolean, defectuoso: boolean, vencido: boolean) {
    let msj:string = "";
    if (por_vencer && !(defectuoso)) {
      msj = "El producto esta por vencer";
    }
    if (vencido && !(defectuoso)) {
      msj = "El producto esta vencido";
    }
    if (defectuoso) {
      msj = "El producto esta defectuoso";
    }

    return msj;
  }

}
