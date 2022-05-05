import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'admin-alta-baja-provedor-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Confirmar {{(esActivo == 1) ? "Baja" : "Alta"}} de Proveedor</h4>
      <button type="button" class="close" aria-label="Close" (click)="cerrarModal()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p> ¿Está seguro que desea dar de {{ (esActivo == 1) ? "baja" : "alta" }} a este proveedor?</p>

    </div>
    <div class=modal-footer>
    <button type="button" class="btn btn-danger" (click)="confirmar(false)"><span class="oi oi-ban" title="Cancelar" aria-hidden="true"></span> No</button>
    <button type="button" class="btn btn-success" (click)="confirmar(true)"><i class="fa fa-arrow-down"></i> Si</button>
    </div>
  `,
})
export class AltaBajaProvedorContent {
  @Input("esActivo") public esActivo: number;

  constructor(public _activeModal: NgbActiveModal) {}


  confirmar(confirmacion: boolean) {
    this._activeModal.close(confirmacion);
  }

  cerrarModal() {
    this._activeModal.dismiss('closed');
  }

}

@Component({
  selector: 'admin-alta-baja-provedor-modal',
  templateUrl: './alta-baja-provedor.component.html',
  styleUrls: ['./alta-baja-provedor.component.scss']
})
export class AltaBajaProvedorComponent {
  @Input("esActivo") public esActivo: number;
  @Output("confirmacion") public confirmacion = new EventEmitter();
  constructor(
    private modalService: NgbModal,
    private config: NgbModalConfig
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  abrirModal() {
    const modalRef = this.modalService.open(AltaBajaProvedorContent, {  centered: true });
    modalRef.componentInstance.esActivo = this.esActivo;
    modalRef.result.then(
      (result) => {
        if (result == 'closed'){
        }else{
          // obtengo el resultado de la operacion.
          return this.confirmacion.emit(result);
        }
      }
    );
  }

}
