import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

/**
 * Componente que muestra el contenido del modal
 */
@Component({
  selector: 'confirmar-borrado-producto-modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Confirmar eliminación de {{texto}}</h4>
      <button type="button" class="close" aria-label="Close" (click)="cerrarModal()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>¿Esta seguro que desea eliminar este {{texto}}?</p>
    </div>
    <div class="modal-footer d-flex justify-content-between">
      <button type="button" class="btn btn-outline-danger" (click)="confirmar(false)"><i class="fas fa-ban"></i> No</button>
      <button type="button" class="btn btn-outline-success" (click)="confirmar(true)"><i class="fas fa-save"></i> Si</button>
    </div>
  `
})
export class ConfirmarBorradoProductoModalContent {
  @Input("texto") public texto:string;
  @Input("listado") public listado:any;
  @Input("id") public id: number;

  constructor( private _ativeModal: NgbActiveModal ) { }

  cerrarModal() {
    this._ativeModal.close(false);
  }

  confirmar(confirmacion:boolean) {
    if (confirmacion) {
      this.listado.splice(this.id, 1);
    }
    this._ativeModal.close(confirmacion);
  }
}

@Component({
  selector: 'abrir-confirmacion-borrado-producto-modal',
  templateUrl: './confirmar-borrado-producto-modal.component.html',
  styleUrls: ['./confirmar-borrado-producto-modal.component.scss']
})
export class ConfirmarBorradoProductoModalComponent {
  @Input("texto") public texto:string;
  @Input("listado") public listado:any;
  @Input("indexListado") public index: number;
  @Output("borrarProducto") public borrarProducto = new EventEmitter();

  constructor( private _modalService: NgbModal ) { }

  open() {
    const modalRef = this._modalService.open(ConfirmarBorradoProductoModalContent);
    modalRef.componentInstance.texto = this.texto;
    modalRef.componentInstance.listado = this.listado;
    modalRef.componentInstance.id = this.index;
    modalRef.result.then(
      (result) => {
        if (result !== false) {
          return this.borrarProducto.emit(result);
        }
      });
  }

}
