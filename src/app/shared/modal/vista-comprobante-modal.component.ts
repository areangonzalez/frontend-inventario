import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ComprobanteService } from 'src/app/core/service/comprobante.service';
import { AlertService } from 'src/app/core/service';

/**
 * Componente que muestra el contenido del modal
 */
@Component({
  selector: 'vista-comprobante-modal-content',
  template: `
    <div class="modal-header d-flex justify-content-between" *ngIf="(datos !== undefined)">
      <div><strong>N°: {{datos.nro_remito}}</strong></div>
      <div><strong>R</strong></div>
      <div><strong>{{datos.fecha_emision | date: 'dd/MM/yyyy'}}</strong></div>
    </div>
    <div class="modal-body" *ngIf="(datos !== undefined)">
      <shared-lista-producto [stock]="datos.lista_producto" [submitted]="false" [borrar]="false" [vista]="true" [idComprobante]="idComprobante" ></shared-lista-producto>
      <div class="card">
        <div class="card-header d-flex justify-content-between">
          <div class="pt-1" >Observación:</div>
          <div>
            <modal-editar-descripcion [comprobante]="datos" (confirmarGuardado)="actualizarDatos($event)" ></modal-editar-descripcion>
          </div>
        </div>
        <div *ngIf="(datos.descripcion != '')" class="card-body">
          <p>{{datos.descripcion}}<p>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-secondary" (click)="confirmar(true)"><i class="fas fa-times"></i> Cerrar</button>
    </div>
  `,
  styleUrls: ['./vista-comprobante-modal.component.scss']
})
export class VistaComprobanteModalContent implements OnInit {
  @Input("idComprobante") public idComprobante: any;
  public datos: any;

  constructor( private _ativeModal: NgbActiveModal, private _comprobanteService: ComprobanteService, private _mensaje: AlertService ) { }

  ngOnInit() {
    this.buscarComprobante(this.idComprobante);
  }

  cerrarModal() {
    this._ativeModal.close('close');
  }

  confirmar(confirmacion:boolean) {
    //this.listado.splice(this.id, 1);
    this._ativeModal.close('close');
  }

  buscarComprobante(id:number) {
    this._comprobanteService.buscarPorId(id).subscribe(
      respuesta => {
        this.datos = respuesta;
      }, error => { this._mensaje.cancelado(error.message); })
  }

  actualizarDatos(confirmacion: boolean) {
    if (confirmacion) {
      this.buscarComprobante(this.datos.id);
    }
  }
}

@Component({
  selector: 'abrir-vista-comprobante-modal',
  templateUrl: './vista-comprobante-modal.component.html',
  styleUrls: ['./vista-comprobante-modal.component.scss']
})
export class VistaComprobanteModalComponent {
  @Input("idComprobante") public idComprobante: any;

  constructor( private _modalService: NgbModal ) { }

  open() {
    const modalRef = this._modalService.open(VistaComprobanteModalContent, { size: 'lg' });
    modalRef.componentInstance.idComprobante = this.idComprobante;
  }
}
