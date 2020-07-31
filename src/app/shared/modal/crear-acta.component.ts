import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { UtilService, AlertService } from 'src/app/core/service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

/**
 * Componente que muestra el contenido del modal
 */
@Component({
  selector: 'crear-acta-modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Acta de entrega</h4>
      <button type="button" class="close" aria-label="Close" (click)="cerrarModal()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <shared-form-egreso [formEgreso]="formEgreso" [submitted]="submitted" ></shared-form-egreso>

      <armar-listado-acta-modal [listaActa]="listadoActa" [listaInventario]="listaInventario" (obtenerListadoActa)="armarListadoActa($event)"></armar-listado-acta-modal>
      <div class="mt-3">
        <shared-lista-acta [listadoActa]="listadoActa" [borrar]="false"></shared-lista-acta>
      </div>

    </div>
    <div class="modal-footer d-flex justify-content-between">
      <button type="button" class="btn btn-outline-danger" (click)="cerrarModal()"><i class="fas fa-ban"></i> Cancelar</button>
      <button type="button" class="btn btn-outline-success" (click)="guardar()"><i class="fas fa-save"></i> Guardar</button>
    </div>
  `
})
export class CrearActaModalContent {
  @Input("listaInventario") public listaInventario: any;
  @Input("localidad") public localidad: any;
  @Input("tipoEgreso") public tipoEgreso: any;
  public submitted: boolean = false;
  public listadoActa: any = [];
  public formEgreso: FormGroup;

  constructor( private _fb: FormBuilder, private _ativeModal: NgbActiveModal, private _util: UtilService, private _mensaje: AlertService ) {
    this.formEgreso = _fb.group({
      fecha_acta: ['', Validators.required],
      fecha: '',
      destino_nombre: ['', Validators.required],
      destino_localidadid: ['', Validators.required],
      nro_acta: ['', Validators.required],
      tipo_egreso: ['', Validators.required],
      origen: ['', Validators.required],
      suscrito: ['', Validators.required],
      descripcion: ''
    });
  }

  /**
   * Cierra el modal
   */
  cerrarModal() {
    this._ativeModal.close('close');
  }
  /**
   * guarda los atributos modificados de un producto
   */
  guardar() {
    this.submitted = true;
    if (this.formEgreso.invalid) {
      return;
    }else{
      if (this.listadoActa.length == 0) {
        this._mensaje.cancelado("El acta NO puede tener el listado sin productos.");
      } else {

      }

        /* let productoDuplicado =  Object.assign({}, this.producto);
        productoDuplicado['cantidad'] = this.form.get('cantidad').value;
        productoDuplicado['falta'] = true;
        // envio producto
        this._ativeModal.close(productoDuplicado); */
    }
  }
  /**
   * armo el listado con los productos que representaran el acta
   * @param listado lista de productos
   */
  armarListadoActa(listado: any) {
    Object.assign(this.listadoActa, listado);
  }
}

@Component({
  selector: 'crear-acta-modal',
  templateUrl: './crear-acta.component.html',
  styleUrls: ['./crear-acta.component.scss']
})
export class CrearActaComponent {
  @Input("listaInventario") public listaInventario: any;
  @Input("listaLocalidad") public listaLocalidad: any;
  @Input("listaTipoEgreso") public listaTipoEgreso: any;
  // @Output("productoFaltante") public productoFaltante = new EventEmitter();

  constructor( private _modalService: NgbModal ) { }

  open() {
    const modalRef = this._modalService.open(CrearActaModalContent, { size: 'lg' });
    modalRef.componentInstance.localidad = this.listaLocalidad;
    modalRef.componentInstance.tipoEgreso = this.listaTipoEgreso;
    modalRef.componentInstance.listaInventario = this.listaInventario;
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
