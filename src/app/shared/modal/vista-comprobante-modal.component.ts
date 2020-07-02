import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

/**
 * Componente que muestra el contenido del modal
 */
@Component({
  selector: 'vista-comprobante-modal-content',
  template: `
    <div class="modal-header d-flex justify-content-between">
      <!-- <div><strong>{{datos.nro_remito}}</strong></div>
      <div>R</div>
      <div>{{datos.fecha_emision | date: 'dd/MM/yyyy'}}</div> -->
      <!-- <button type="button" class="close" aria-label="Close" (click)="cerrarModal()">
        <span aria-hidden="true">&times;</span>
      </button> -->
    </div>
    <div class="modal-body">
    <!-- {{datos | json}} -->
      <p>Aquí va la tabla de productos</p>
      <p>Descripción del producto</p>
    </div>
    <div class="modal-footer d-flex justify-content-between">
      <button type="button" class="btn btn-outline-danger" (click)="confirmar(false)"><i class="fas fa-ban"></i> No</button>
      <button type="button" class="btn btn-outline-success" (click)="confirmar(true)"><i class="fas fa-save"></i> Si</button>
    </div>
  `
})
export class VistaComprobanteModalContent {
  @Input("idComprobante") public idComprobante: any;

  constructor( private _ativeModal: NgbActiveModal ) { }

  cerrarModal() {
    this._ativeModal.close('close');
  }

  confirmar(confirmacion:boolean) {
    //this.listado.splice(this.id, 1);
    this._ativeModal.close('close');
  }
}

@Component({
  selector: 'abrir-vista-comprobante-modal',
  templateUrl: './vista-comprobante-modal.component.html',
  styleUrls: ['./vista-comprobante-modal.component.scss']
})
export class VistaComprobanteModalComponent {
  @Input("datosComprobante") public datos: any;

  constructor( private _modalService: NgbModal ) { }

  open() {
    const modalRef = this._modalService.open(VistaComprobanteModalContent);
    modalRef.componentInstance.datos = this.datos;
  }



}
