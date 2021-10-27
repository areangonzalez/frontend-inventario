import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { UtilService, AlertService, EgresoService } from 'src/app/core/service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConfiguracionListados } from 'src/app/core/model';

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
      <shared-form-egreso [formEgreso]="formEgreso" [submitted]="submitted" [listados]="listas" ></shared-form-egreso>

      <armar-listado-acta-modal [listaActa]="listadoActa" [listaInventario]="listas.stock" (obtenerListadoActa)="armarListadoActa($event)"></armar-listado-acta-modal>
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
  @Input("listas") public listas: ConfiguracionListados;
  public submitted: boolean = false;
  public listadoActa: any = [];
  public formEgreso: FormGroup;

  constructor( private _fb: FormBuilder, private _ativeModal: NgbActiveModal, private _util: UtilService, private _mensaje: AlertService, private _egresoService: EgresoService ) {
    this.formEgreso = _fb.group({
      fecha_acta: ['', Validators.required],
      fecha: '',
      destino_nombre: ['', Validators.required],
      destino_localidadid: ['', Validators.required],
      nro_acta: ['', Validators.required],
      tipo_egresoid: ['', Validators.required],
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
   * guarda los atributos modificados de un acta
   */
  guardar() {
    this.submitted = true;
    if (this.formEgreso.invalid) {
      return;
    }else{
      if (this.listadoActa.length == 0) {
        this._mensaje.cancelado("El acta NO puede tener el listado sin productos.");
      } else {
        let parametros = this.formEgreso.value;
        parametros['lista_producto'] = this.listadoActa;

        this._egresoService.guardar(parametros).subscribe(
          respuesta => {
            this._mensaje.exitoso("se ha guardado el acta exitosamente!!");
            this._ativeModal.close(true);
          }, error => { this._mensaje.cancelado(error); });
      }
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
  @Input("listados") public listados: ConfiguracionListados;
  @Output("confirmacion") public confirmacion = new EventEmitter();

  constructor(_config: NgbModalConfig, private _modalService: NgbModal ) {
    _config.backdrop = 'static';
    _config.keyboard = false;
  }

  open() {
    const modalRef = this._modalService.open(CrearActaModalContent, { size: 'lg' });
    modalRef.componentInstance.listas = this.listados;
    modalRef.result.then(
      (result) => {
        if (result !== 'close') {
          this.confirmacion.emit(true);
        }
      }
    )
  }
}
