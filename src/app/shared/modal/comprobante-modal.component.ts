import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

/**
 * Componente que muestra el contenido del modal
 */
@Component({
  selector: 'comprobante-modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">{{titulo}}</h4>
      <button type="button" class="close" aria-label="Close" (click)="cerrarModal()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <form-comprobante></form-comprobante>
      <form-producto [listadoDeProducto]="listaProductos" [listadoDeCategoria]="listaCategorias" [listadoDeUnidadMedida]="listaUnidadMedida" [listadoDeMarcas]="listaMarcas" (obtenerListadoDestock)="crearListadoDeStock($event)"></form-producto>
      <shared-lista-producto [stock]="listadoDeStock" ></shared-lista-producto>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-success" (click)="cerrarModal()"><i class="fas fa-save"></i> Guardar</button>
    </div>
  `
})
export class ComprobanteModalContent {
  @Input("titulo") public titulo: string;
  @Input("listaProductos") public listaProductos: any; // Listado de productos
  @Input("listaCategorias") public listaCategorias: any; // Listado de productos
  @Input("listaUnidadMedida") public listaUnidadMedida: any; // Listado de unidad de medida
  @Input("listaMarcas") public listaMarcas: any; // Listado de unidad de medida
  public listadoDeStock: any = [];

  constructor( private _ativeModal: NgbActiveModal ) { }

  cerrarModal() {
    this._ativeModal.close('close');
  }

  crearListadoDeStock(stock: any) {
    this.listadoDeStock.push(stock);
  }
}

/**
 * Componente que contiene el boton para abrir el modal
 */
@Component({
  selector: 'abrir-comprobante-modal',
  templateUrl: './comprobante-modal.component.html',
  styleUrls: ['./comprobante-modal.component.scss']
})
export class ComprobanteModalComponent {
  @Input("titulo") public titulo: string;
  @Input("productos") public productos: any; // listado de productos
  @Input("categorias") public categorias: any; // listado de categorías
  @Input("unidadMedida") public unidadMedida: any; // listado de unidad de medida
  @Input("marcas") public marcas: any; // listado de marcas


  constructor( private _modalService: NgbModal ) { }

  open() {
    const modalRef = this._modalService.open(ComprobanteModalContent, { size: 'lg' });
    modalRef.componentInstance.titulo = this.titulo;
    modalRef.componentInstance.listaProductos = this.productos;
    modalRef.componentInstance.listaCategorias = this.categorias;
    modalRef.componentInstance.listaUnidadMedida = this.unidadMedida;
    modalRef.componentInstance.listaMarcas = this.marcas;
  }

}
