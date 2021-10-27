import { NgbModal, NgbActiveModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComprobanteService, AlertService } from './../../core/service';

@Component({
  selector: 'shared-modal-editar-descripcion-content',
  template: `
    <div class="modal-header">
      <h2>Editar observación</h2>
    </div>
    <div class="modal-body" [formGroup]="data">
      <div class="col-md-12">
        <div class="form-group">
          <label for="observacion">Observación:</label>
            <textarea class="form-control" id="observacion" rows="3" formControlName="descripcion"></textarea>
            <div *ngIf="(data.get('descripcion').invalid && submitted)" class="text-danger">
              <span>Por favor agregue una observación.</span>
            </div>
        </div>
      </div>
    </div>
    <div class="modal-footer d-flex justify-content-between">
      <button type="button" class="btn btn-outline-danger" (click)="confirmarEdicion(false)"><i class="fas fa-times"></i> Cancelar</button>
      <button type="button" class="btn btn-outline-success" (click)="confirmarEdicion(true)"><i class="fas fa-save"></i> Guardar</button>
    </div>
  `,
  styleUrls: ['./editar-descripcion-modal.component.scss']
})
export class EditarDescripcionModalContent implements OnInit{
  @Input("comprobante") public comprobante: any;
  public data: FormGroup;
  public submitted: boolean = false;

  constructor(private _ativeModal: NgbActiveModal, private _fb: FormBuilder, private _comprobanteService: ComprobanteService, private _msj: AlertService) {
    this.data = this._fb.group({
      descripcion: ['', Validators.required]
    });

  }

  ngOnInit() {
    // si ya existe un mensaje lo puedo editar o seguir rellenando el campo
    this.data.patchValue({'descripcion': this.comprobante.descripcion});
  }

  public confirmarEdicion(confirmacion: boolean) {
    if (confirmacion) {
      let params = this.data.value;
      // mando los parametros a guardar
      this._comprobanteService.guardarObservacion(params, this.comprobante.id).subscribe(
        resultado => {
          this._msj.exitoso("Se ha editado con exito.");
          this._ativeModal.close(true);
        }, error => { this._msj.cancelado(error); }
      );
    }else { this._ativeModal.close(false); } // no se realizo el guardado

  }

}

@Component({
  selector: 'modal-editar-descripcion',
  templateUrl: './editar-descripcion-modal.component.html',
  styleUrls: ['./editar-descripcion-modal.component.scss']
})
export class EditarDescripcionModalComponent {
  @Input("comprobante") public comprobante: any;
  @Output("confirmarGuardado") public confirmarGuardado = new EventEmitter();

  constructor( private _modalService: NgbModal, _config: NgbModalConfig ) {
    _config.backdrop = 'static';
    _config.keyboard = false;
  }

  open() {
    const modalRef = this._modalService.open(EditarDescripcionModalContent);
    modalRef.componentInstance.comprobante = this.comprobante;
    modalRef.result.then(
      (result) => {
        if (result) {
          this.confirmarGuardado.emit(result);
        }
      }
    )
  }

}
