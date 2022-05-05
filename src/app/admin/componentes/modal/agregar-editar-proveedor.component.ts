import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from '../../../core/service';
import { ConfiguracionListados } from '../../../core/model';

@Component({
  selector: 'admin-agregar-editar-proveedor-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Agregar Proveedor</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.close('closed')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <admin-proveedor-form [datosProveedor]="proveedorEditar" (cancelarForm)="cancelarModal($event)" ></admin-proveedor-form>
    </div>
  `
})
export class AgregarEditarProveedorContent {
  @Input("proveedorEditar") public proveedorEditar: any;

  constructor(public activeModal: NgbActiveModal) {}

  cancelarModal(cancelar: boolean) {
    this.activeModal.close((cancelar) ? 'closed' : 1);
  }
}

@Component({
  selector: 'admin-agregar-editar-proveedor-modal',
  templateUrl: './agregar-editar-proveedor.component.html',
  styleUrls: ['./agregar-editar-proveedor.component.scss']
})
export class AgregarEditarProveedorComponent {
  /**
   * @var datosProveedor {number} identificador de un usuario
   */
  @Input("datosProveedor") public datosProveedor: any | undefined;
  @Output("confirmarGuardado") public confirmarGuardado = new EventEmitter

  constructor(
    private modalService: NgbModal, private _msj: AlertService, private config: NgbModalConfig
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

    abrirModal() {
      const modalRef = this.modalService.open(AgregarEditarProveedorContent);
      modalRef.componentInstance.proveedorEditar = this.datosProveedor;
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
