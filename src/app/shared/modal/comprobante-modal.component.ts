import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

/**
 * Componente que muestra el contenido del modal
 */
@Component({
  selector: 'comprobante-modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Hi there!</h4>
      <button type="button" class="close" aria-label="Close" (click)="cerrarModal()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <form-comprobante></form-comprobante>
      <form-producto></form-producto>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="cerrarModal()">Close</button>
    </div>
  `
})
export class ComprobanteModalContent {

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

  constructor( private _modalService: NgbModal ) { }

  open() {
    const modalRef = this._modalService.open(ComprobanteModalContent, { size: 'lg' });
    //modalRef.componentInstance.algunAtributo = 'algo';
  }

}
