import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from '../../../core/service';

@Component({
  selector: 'admin-agregar-editar-marca-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">{{(marcaEditar === undefined) ? "Agregar": "Editar"}} Proveedor</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.close('closed')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <admin-marca-form [datosMarca]="marcaEditar" (cancelarForm)="cancelarModal($event)" ></admin-marca-form>
    </div>
  `
})
export class AgregarEditarMarcaContent {
  @Input("marcaEditar") public marcaEditar: any | undefined;

  constructor(public activeModal: NgbActiveModal) {}

  cancelarModal(cancelar: boolean) {
    this.activeModal.close((cancelar) ? 'closed' : 1);
  }
}

@Component({
  selector: 'admin-agregar-editar-marca-modal',
  templateUrl: './agregar-editar-marca.component.html',
  styleUrls: ['./agregar-editar-marca.component.scss']
})
export class AgregarEditarMarcaComponent{
  /**
   * @var datosMarca {number} identificador de un usuario
   */
   @Input("datosMarca") public datosMarca: any | undefined;
   @Output("confirmarGuardado") public confirmarGuardado = new EventEmitter
 
   constructor(
     private modalService: NgbModal, private _msj: AlertService, private config: NgbModalConfig
   ) {
     config.backdrop = 'static';
     config.keyboard = false;
   }
 
     abrirModal() {
       const modalRef = this.modalService.open(AgregarEditarMarcaContent);
       modalRef.componentInstance.proveedorEditar = this.datosMarca;
       modalRef.result.then(
         (result) => {
             if (result == 'closed'){
             }else{
               // obtengo el resultado de la operacion y reseteo el listado a la pagina 1.
               return this.confirmarGuardado.emit(result);
             }
         }
       )
     }
 
 }
