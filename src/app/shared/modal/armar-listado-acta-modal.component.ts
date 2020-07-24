import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { UtilService } from 'src/app/core/service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

/**
 * Componente que muestra el contenido del modal
 */
@Component({
  selector: 'armar-listado-acta-modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Armar listado de productos para el acta</h4>
      <button type="button" class="close" aria-label="Close" (click)="cerrarModal()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <div class="form-group">
        <div class="input-group">
          <input type="text" class="form-control" [(ngModel)]="global_param" id="buscar-stock" placeholder="buscar por nombre de producto por Ej.: Azucar" (keyup.enter)="buscar()" >
          <div class="input-group-append btn-group">
            <button type="button" class="btn btn-outline-primary" (click)="buscar()"><i class="fas fa-search"></i></button>
            <button type="button" class="btn btn-outline-danger" (click)="limpiar()"><i class="fas fa-trash-alt"></i></button>
          </div>
        </div>
      </div>

      <shared-lista-stock [tipoTabla]="'seleccionar_producto'" ></shared-lista-stock>


    </div>
    <div class="modal-footer d-flex justify-content-between">
      <button type="button" class="btn btn-outline-danger" (click)="cerrarModal()"><i class="fas fa-ban"></i> Cancelar</button>
      <button type="button" class="btn btn-outline-success" (click)="guardar()"><i class="fas fa-save"></i> Guardar</button>
    </div>
  `
})
export class ArmarListadoActaModalContent {
  @Input("inventario") public inventario: any;
  public global_param: string = '';

  constructor( private _ativeModal: NgbActiveModal, private _util: UtilService ) {}
  /**
   * Cierra el modal
   */
  cerrarModal() {
    this._ativeModal.close('close');
  }
  /**
   * valida si la cantidad es un numero
   * @param numero este valor puede ser un string o numero
   */
  validarCantidad(numero:any) {
    if (!this._util.validarNumero(numero.value)) {
      numero.value = numero.value.substring(0,numero.value.length - 1);
      //this.form.get("cantidad").patchValue(numero.value);
    }
  }
  /**
   * guarda los atributos modificados de un producto
   */
  guardar() {
    /* this.submitted = true;
    if (this.form.invalid) {
      return;
    }else{ */
        /* let productoDuplicado =  Object.assign({}, this.producto);
        productoDuplicado['cantidad'] = this.form.get('cantidad').value;
        productoDuplicado['falta'] = true;
        // envio producto
        this._ativeModal.close(productoDuplicado); */
    // }
  }

  limpiar() {
  }

  buscar() {
  }
}

@Component({
  selector: 'armar-listado-acta-modal',
  templateUrl: './armar-listado-acta-modal.component.html',
  styleUrls: ['./armar-listado-acta-modal.component.scss']
})
export class ArmarListadoActaModalComponent {
  @Input("listaInventario") public listaInventario: any;
  // @Output("productoFaltante") public productoFaltante = new EventEmitter();

  constructor( private _modalService: NgbModal ) { }

  open() {
    const modalRef = this._modalService.open(ArmarListadoActaModalContent, { size: 'lg' });
    modalRef.componentInstance.inventario= this.listaInventario;
/*     modalRef.result.then(
      (result) => {
          if (result == 'close') {
          } else {
              return this.productoFaltante.emit(result);
          }
      }
    ); */
  }
}
