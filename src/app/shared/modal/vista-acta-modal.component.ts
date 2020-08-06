import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService, EgresoService } from 'src/app/core/service';


/**
 * Componente que muestra el contenido del modal
 */
@Component({
  selector: 'vista-acta-modal-content',
  template: `
    <div class="modal-header d-flex justify-content-center" *ngIf="(datos !== undefined)">
      <div><h4>ACTA DE ENTREGA N°: {{datos.nro_acta}}</h4></div>
    </div>
    <div class="modal-body" *ngIf="(datos !== undefined)">
      <div class="card mb-3">
        <div class="card-body">
          <div class="row d-flex justify-content-end">
            <div>{{datos.fecha | date: 'dd'}} de {{datos.fecha | date: 'MMMM' : 'es'}} del {{datos.fecha | date: 'yyyy'}}</div>
          </div>
          <div class="row">
            <div class="col-md-12 mt-1 mb-2">
              <strong>Para:</strong> {{datos.destino_nombre}}
            </div>
            <div class="col-md-12 mt-1 mb-2">
              <strong>De:</strong> {{datos.origen}}
            </div>
            <div class="col-md-6 mt-1 mb-2">
              <strong>asunto:</strong> {{datos.tipo_egreso}}
            </div>
            <div class="col-md-6 mt-1 mb-2">
              <strong>Localidad:</strong> {{datos.destino_localidad}}
            </div>
          </div>
          <shared-lista-acta [listadoActa]="datos.lista_producto" [borrar]="false"></shared-lista-acta>
        </div>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-secondary" (click)="confirmar(true)"><i class="fas fa-times"></i> Cerrar</button>
    </div>
  `,
  styleUrls: ['./vista-comprobante-modal.component.scss']
})
export class VistaActaModalContent implements OnInit {
  @Input("idActa") public idActa: any;
  public datos: any;
  public listado: any = [];
  constructor( private _ativeModal: NgbActiveModal, private _egresoService: EgresoService, private _mensaje: AlertService ) { }

  ngOnInit() {
   this.buscarActa(this.idActa);
  }

  cerrarModal() {
    this._ativeModal.close('close');
  }

  confirmar(confirmacion:boolean) {
    //this.listado.splice(this.id, 1);
    this._ativeModal.close('close');
  }

  buscarActa(id:number) {
    this._egresoService.buscarPorId(id).subscribe(
      respuesta => {
        console.log(respuesta);
        this.datos = respuesta;
      }, error => { this._mensaje.cancelado(error.message); })
  }
}

@Component({
  selector: 'abrir-vista-acta-modal',
  templateUrl: './vista-acta-modal.component.html',
  styleUrls: ['./vista-acta-modal.component.scss']
})
export class VistaActaModalComponent {
  @Input("idActa") public idActa: any;

  constructor( private _modalService: NgbModal ) { }

  open() {
    const modalRef = this._modalService.open(VistaActaModalContent, { size: 'lg' });
    modalRef.componentInstance.idActa = this.idActa;
  }
}
