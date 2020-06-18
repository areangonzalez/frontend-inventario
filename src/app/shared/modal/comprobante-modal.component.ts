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
      <form-producto [listadoDeProducto]="listaProductos" ></form-producto>
      <shared-lista-producto></shared-lista-producto>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-success" (click)="cerrarModal()"><i class="fas fa-save"></i> Guardar</button>
    </div>
  `
})
export class ComprobanteModalContent {
  @Input("titulo") public titulo: string;
  @Input("listaProductos") public listaProductos: any;

  constructor( private _ativeModal: NgbActiveModal ) { }

  cerrarModal() {
    this._ativeModal.close('close');
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
  @Input("productos") public productos: any;

  constructor( private _modalService: NgbModal ) { }

  open() {
    const modalRef = this._modalService.open(ComprobanteModalContent, { size: 'lg' });
    modalRef.componentInstance.titulo = this.titulo;
    modalRef.componentInstance.listaProductos = this.productos;
  }

}
