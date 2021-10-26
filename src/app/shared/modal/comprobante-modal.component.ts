import { Component, OnInit, Input, Output, EventEmitter, AfterContentInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { InventarioService, AlertService, ComprobanteService, UtilService } from 'src/app/core/service';
import { ConfiguracionListados } from 'src/app/core/model';
import { map } from 'rxjs/operators';

/**
 * Componente que muestra el contenido del modal
 */
@Component({
  selector: 'comprobante-modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">{{titulo}}</h4>
      <button type="button" class="close" aria-label="Close" (click)="cerrarModal(false)">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <form-comprobante [comprobante]="comprobanteForm" [submitted]="submitted" ></form-comprobante>
      <form-producto [listados]="listados" (obtenerListadoDestock)="crearListadoDeStock($event)"></form-producto>
      <shared-lista-producto [stock]="listadoDeStock" [submitted]="submitted" [borrar]="true" [vista]="false" ></shared-lista-producto>
      <hr style="border: solid 1px #eee;">
      <div [formGroup]="comprobanteForm" class="form-group">
        <label for="descripcion">Observación:</label>
        <textarea class="form-control" id="descripcion" formControlName="descripcion" rows="1" placeholder="Descripción..."></textarea>
      </div>
    </div>
    <div class="modal-footer d-flex justify-content-between">
    <button type="button" class="btn btn-outline-danger" (click)="cerrarModal(false)"><i class="fas fa-ban"></i> Cancelar</button>
      <button type="button" class="btn btn-outline-success" (click)="guardar()"><i class="fas fa-save"></i> Guardar</button>
    </div>
  `
})
export class ComprobanteModalContent implements OnInit {
  @Input("titulo") public titulo: string;
  @Input("listados") public listados: ConfiguracionListados;
  @Input("comprobanteid") public comprobanteid: any; // id del comprobante
  public listadoDeStock: any = [];
  public comprobanteForm: FormGroup;
  public submitted: boolean = false;

  constructor(
    private _ativeModal: NgbActiveModal, private _fb: FormBuilder,
    private _inventarioService: InventarioService, private _mensaje: AlertService,
    private _comprobanteService: ComprobanteService, private _util: UtilService
  ) {
    this.comprobanteForm = _fb.group({
      nro_remito: '',
      nroComprobantePrincipal: ['', Validators.required],
      nroComprobanteFinal: ['', Validators.required],
      fechaEmision: null,
      fecha_emision: '',
      descripcion: '',
      falta: false,
      defectuoso: false
    });
  }

  ngOnInit(): void {
    if (this.comprobanteid !== undefined) {
      this.buscarComprobante(this.comprobanteid);
    }
  }

  buscarComprobante(id: number) {
      this._comprobanteService.buscarPorId(id).pipe(
        map((data) => {
          let datos = {
            nro_remito: '', nroComprobantePrincipal: '', nroComprobanteFinal: '', fechaEmision: null, fecha_emision: '',
            descripcion: ''
          };

          datos.nro_remito = data["nro_remito"];
          let nroComprobante = data["nro_remito"].split("-");

          // verifico que al separarse tenga dos elementos
          if (nroComprobante.length == 2) {
            datos.nroComprobantePrincipal = nroComprobante[0];
            datos.nroComprobanteFinal = nroComprobante[1];
          }
          datos.fecha_emision = data["fecha_emision"];
          datos.fechaEmision = this._util.fechaTextoAobjeto(data["fecha_emision"]);
          datos.descripcion = data["descripcion"];
          datos["lista_producto"] = data["lista_producto"];

          return datos;
        })
      )
      .subscribe(
        resultado => {
          console.log(resultado);

          this.comprobanteForm.patchValue(resultado);
          this.listadoDeStock = resultado["lista_producto"];
        }, error => { this._mensaje.cancelado(error); }
      )
  }

  cerrarModal(guardar: boolean) {
    if (guardar) {
      this._ativeModal.close(true);
    } else {
      this._ativeModal.close('close');
    }
  }

  guardar() {
    this.submitted = true;

    if (this.comprobanteForm.invalid) {
      return;
    } else {
      let parametros = this.comprobanteForm.value;
      if (this.listadoDeStock.length == 0) {
        this._mensaje.cancelado("El listado NO puede estar vacio!!");
        return false;
      }else{
        parametros["lista_producto"] = this.listadoDeStock;
        if (this.comprobanteid !== undefined){
          this._inventarioService.guardar(parametros, this.comprobanteid).subscribe(
            respuesta => {
              this._mensaje.exitoso("El comprobante ha sido guardado con éxito!");
              this.cerrarModal(true);
            }, error => { this._mensaje.cancelado(error.message); });
        }else{
          this._inventarioService.guardar(parametros).subscribe(
            respuesta => {
              this._mensaje.exitoso("El stock ha sido guardado con éxito!");
              this.cerrarModal(true);
            }, error => { this._mensaje.cancelado(error.message); });
          }
        }
    }
  }

  crearListadoDeStock(stock: any) {
    this.listadoDeStock.push(Object.assign({}, stock));
  }
}

/**
 * Componente que contiene el boton para abrir el modal
 */
@Component({
  selector: 'abrir-comprobante-modal',
  templateUrl: './comprobante-modal.component.html',
  styleUrls: ['./comprobante-modal.component.scss']
})
export class ComprobanteModalComponent {
  @Input("titulo") public titulo: string;
  @Input("listados") public listados: ConfiguracionListados;
  @Input("tipoForm") public tipoForm: string; // tipo de formulario "agregar/editar"
  @Input("comprobanteid") public comprobanteid: number;
  @Output("seGuardo") public seGuardo = new EventEmitter();


  constructor( private _modalService: NgbModal) { }

  open() {
    const modalRef = this._modalService.open(ComprobanteModalContent, { size: 'lg' });
    modalRef.componentInstance.titulo = this.titulo;
    modalRef.componentInstance.listados = this.listados;
    modalRef.componentInstance.comprobanteid = this.comprobanteid;
    modalRef.result.then(
      (result) => {
          if (result == 'close') {
          } else {
              return this.seGuardo.emit(result);
          }
      }
    );
  }

}
