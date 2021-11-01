import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from './../../../core/service';
import { ConfiguracionListados } from './../../../core/model';

@Component({
  selector: 'admin-usuario-modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Agregar Usuario</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.close('closed')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <admin-datos-persona-form [localidades]="localidades" [roles]="roles" (cancelarForm)="cancelarModal($event)"></admin-datos-persona-form>
    </div>
  `
})
export class AgregarUsuarioModalContent {
  @Input("localidades") public localidades:any;
  @Input("roles") public roles:any;
  constructor(public activeModal: NgbActiveModal) {}

  cancelarModal(cancelar: boolean) {
    this.activeModal.close((cancelar) ? 'closed' : 1);
  }
}

@Component({
  selector: 'admin-agregar-usuario-modal',
  templateUrl: './agregar-usuario-modal.component.html',
  styleUrls: ['./agregar-usuario-modal.component.scss']
})
export class AgregarUsuarioModalComponent {
  /**
   * @var usuarioid {number} identificador de un usuario
   * @var listas {object} objeto que contiene listados
   */
  @Input("usuarioid") public usuarioid: number;
  @Input("listas") public listas: ConfiguracionListados;
  @Output("confirmarGuardado") public confirmarGuardado = new EventEmitter

  constructor(
    private modalService: NgbModal, private _msj: AlertService, private config: NgbModalConfig
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

    abrirModal() {
      const modalRef = this.modalService.open(AgregarUsuarioModalContent);
      modalRef.componentInstance.localidades = this.listas.localidades;
      modalRef.componentInstance.roles = this.listas.roles;
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
