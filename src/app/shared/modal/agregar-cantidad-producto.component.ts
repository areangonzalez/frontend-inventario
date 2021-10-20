import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UtilService } from 'src/app/core/service';

/**
 * Componente que muestra el contenido del modal
 */
@Component({
  selector: 'agregar-cantidad-modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Agregar cantidad del producto</h4>
      <button type="button" class="close" aria-label="Close" (click)="cerrarModal()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <div class="form-group">
        <label for="cantidad">Cantidad (<b class="text-danger">*</b>):</label>
        <input type="text" class="form-control" id="cantidad" (keyup)="validarNumero($event.target)" [(ngModel)]="cantidad" placeholder="Ej.: 1000" [ngClass]="{'is-invalid': (msgError)}" >
        <div *ngIf="(msgError)" class="text-danger">
          <span>La cantidad permitida es de {{cantidadMaxima}}.</span>
        </div>
      </div>
    </div>
    <div class="modal-footer d-flex justify-content-between">
      <button type="button" class="btn btn-outline-danger" (click)="cerrarModal()"><i class="fas fa-ban"></i> Cancelar</button>
      <button type="button" class="btn btn-outline-success" (click)="guardar()"><i class="fas fa-save"></i> Guardar</button>
    </div>
  `
})
export class AgregarCantidadMaximaModalContent {
  @Input("cantidadMaxima") public cantidadMaxima: number;
  public cantidad: number;
  public msgError: boolean = false;

  constructor( private _ativeModal: NgbActiveModal, private _util: UtilService ) { }
  /**
   * cierro el modal
   */
  cerrarModal() {
    this._ativeModal.close('close');
  }
  /**
   * valido si lo que se tipea es numero
   * @param numero objeto que tiene el valor del campo
   */
  validarNumero(numero: any) {
    if (!this._util.validarNumero(numero.value)) {
      numero.value = numero.value.substring(0,numero.value.length - 1);
    }
  }
  /**
   * guardo la cantidad del producto seleccionado,
   * validando que no sea mayor a la cantidad real ni menor a 0.
   */
  guardar() {
    if (this.cantidad <= this.cantidadMaxima && this.cantidad > 0) {
      this._ativeModal.close(this.cantidad);
    }else {
      this.msgError = true;
    }
  }
}

@Component({
  selector: 'agregar-cantidad-producto-modal',
  templateUrl: './agregar-cantidad-producto.component.html',
  styleUrls: ['./agregar-cantidad-producto.component.scss']
})
export class AgregarCantidadProductoComponent {
  @Input("cantidadMaxima") public cantidadMaxima: number;
  @Output("obtenerCantidad") public obtenerCantidad = new EventEmitter();

  constructor( private _modalService: NgbModal ) { }

  open() {
    const modalRef = this._modalService.open(AgregarCantidadMaximaModalContent);
    modalRef.componentInstance.cantidadMaxima = this.cantidadMaxima;
    modalRef.result.then(
      (result) => {
          if (result == 'close') {
          } else {
              return this.obtenerCantidad.emit(result);
          }
      }
    );
  }

}

