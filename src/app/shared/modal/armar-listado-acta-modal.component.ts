import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { NgbActiveModal, NgbModal, ModalDismissReasons, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { UtilService, AlertService } from 'src/app/core/service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AbstractWebDriver } from 'protractor/built/browser';

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
      <div class="mt-2">
        <shared-lista-stock [listadoStock]="inventario.resultado" [tipoTabla]="'seleccionar_producto'" (productoSeleccionado)="obtenerProducto($event)" ></shared-lista-stock>
      </div>
      <div class="mt-2">
        <shared-lista-acta [listadoActa]="listadoActa" [borrar]="true"></shared-lista-acta>
      </div>
    </div>
    <div class="modal-footer d-flex justify-content-between">
      <button type="button" class="btn btn-outline-danger" (click)="cerrarModal()"><i class="fas fa-ban"></i> Cancelar</button>
      <button type="button" class="btn btn-outline-success" (click)="guardar()"><i class="fas fa-save"></i> Guardar</button>
    </div>
  `
})
export class ArmarListadoActaModalContent {
  @Input("inventario") public inventario: any;
  public listadoActa: any = [];
  public global_param: string = '';

  constructor( private _ativeModal: NgbActiveModal, private _util: UtilService, private _mensaje: AlertService ) {}
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
   * guarda los productos con las cantidades especificadas
   */
  guardar() {
    if (this.listadoActa.length == 0) {
      this._mensaje.cancelado("El Acta debe tener al menos un producto agregado!!");
      return;
    }else{
        this._ativeModal.close(this.listadoActa);
    }
  }

  obtenerProducto(producto: any) {
    this.listadoActa.push(producto);
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
  @Input("listaActa") public listaActa: any;
  @Output("obtenerListadoActa") public obtenerListadoActa = new EventEmitter();

  constructor( private _modalService: NgbModal, private _mensaje: AlertService ) { }

  open() {
    if (this.listaActa.length > 0) {
      const modalRef2 = this._modalService.open(ConfirmarArmadoModalContent, { windowClass: 'red-modal' });
      modalRef2.result.then(
        (result) => {
          if (result == false) {
          } else {
            this.abrirModal();
          }
        });
    }else{
      this.abrirModal();
    }
  }

  abrirModal() {
    const modalRef = this._modalService.open(ArmarListadoActaModalContent, { size: 'lg' });
    modalRef.componentInstance.inventario = this.listaInventario;
    modalRef.result.then(
      (result) => {
        if (result == 'close') {
        } else {
          console.log(result)
          return this.obtenerListadoActa.emit(result);
        }
      });
  }
}

@Component({
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Importante</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss(false)">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>Se reinicia la lista de productos del acta.</p>
    </div>
    <div class="modal-footer d-flex justify-content-between">
      <button type="button" class="btn btn-outline-danger" (click)="activeModal.close(false)">Cancelar</button>
      <button type="button" class="btn btn-outline-success" (click)="activeModal.close(true)">Continuar</button>
    </div>
  `,
  styleUrls: ['./armar-listado-acta-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ConfirmarArmadoModalContent {
  constructor(private modalService: NgbModal, public activeModal: NgbActiveModal, config: NgbModalConfig) {
    config.backdrop = 'static';
    config.keyboard = false;
  }
}
