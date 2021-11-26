import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UtilService } from 'src/app/core/service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

/**
 * Componente que muestra el contenido del modal
 */
@Component({
  selector: 'devuelve-producto-modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Cantidad de Producto a Devolver </h4>
      <button type="button" class="close" aria-label="Close" (click)="cerrarModal()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body" [formGroup]="form">
      <div class="form-group row">
        <label class="col-sm-2 col-form-label" for="cantidad">Cantidad:</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" id="cantidad" formControlName="cantidad" (keyup)="validarCantidad($event.target)" placeholder="Cantidad Máxima: {{cantidadProductoMaximo}}">
        </div>
      </div>
      <div *ngIf="(form.get('cantidad').invalid && submitted)" class="text-danger text-center">
        Por favor ingrese una cantidad.
      </div>
      <div *ngIf="(cantidadMaxima && submitted)" class="text-danger text-center">
        La cantidad no puede ser mayor a {{cantidadProductoMaximo}}.
      </div>
      <div class="form-group row">
        <label class="col-sm-3 col-form-label" for="vencimiento">Vencimiento:</label>
        <div class="col-sm-9 input-group">
          <input class="form-control" placeholder="dd/mm/yyyy"
                name="dp" formControlName="fechaVencimiento" ngbDatepicker #d="ngbDatepicker" [ngClass]="{'is-invalid': (form.get('fechaVencimiento').invalid && submitted)}"
                (ngModelChange)="formatearFecha($event)">
          <div class="input-group-append">
            <button class="btn" [ngClass]="(form.get('fechaVencimiento').invalid && submitted) ? 'btn-outline-danger' : 'btn-outline-info'" (click)="d.toggle()" type="button"><i class="fas fa-calendar-alt" ></i></button>
          </div>
        </div>
      </div>
      <div *ngIf="(form.get('fechaVencimiento').invalid && submitted)" class="text-danger">
        <span>Por favor seleccione una fecha de vencimiento.</span>
      </div>
    </div>
    <div class="modal-footer d-flex justify-content-between">
      <button type="button" class="btn btn-outline-danger" (click)="cerrarModal()"><i class="fas fa-ban"></i> Cancelar</button>
      <button type="button" class="btn btn-outline-success" (click)="guardar()"><i class="fas fa-save"></i> Guardar</button>
    </div>
  `
})
export class DevuelveProductoModalContent {
  @Input("producto") public producto:any;
  @Input("cantidadProductoMaximo") public cantidadProductoMaximo;
  public submitted: boolean = false;
  public form: FormGroup;
  public cantidadMaxima = false;

  constructor( private _ativeModal: NgbActiveModal, private _util: UtilService, private _fb: FormBuilder ) {
    this.form = _fb.group({
      cantidad: ['', Validators.required],
      fechaVencimiento: ['', Validators.required],
      fecha_vencimiento: ['']
    });
  }

  /**
   * Formatea la fecha para una variable del formulario
   * @param obj [any] objecto de fecha
   * @param keyFecha [string] nombre de la variable que sera seteada
   */
  public formatearFecha(fecha:any){
    if (fecha !== null){
      this.form.controls.fecha_vencimiento.setValue(this._util.formatearFecha(fecha.day, fecha.month, fecha.year, "yyyy-MM-dd"));
    }else{
      this.form.controls.fecha_vencimiento.setValue('');
    }
  }
  /**
   * cierra el modal
   */
  cerrarModal() {
    this._ativeModal.close('close');
  }
  /**
   * valida la cantidad si es un numero
   * @param numero este valor puede ser un string o numero
   */
  validarCantidad(numero:any) {
    if (!this._util.validarNumero(numero.value)) {
      numero.value = numero.value.substring(0,numero.value.length - 1);
      this.form.get("cantidad").patchValue(numero.value);
    }
  }

  /**
   * guarda los valores modificados del producto a dar de alta.
   */
  guardar() {
    this.submitted = true;
    this.cantidadMaxima = false;
    if (this.form.invalid) {
      return;
    }else{
      if (parseInt(this.form.get('cantidad').value) > parseInt(this.cantidadProductoMaximo)) {
        return this.cantidadMaxima = true;
      }else {
        let productoDuplicado =  Object.assign({}, this.producto);
        productoDuplicado['cantidad'] = this.form.get('cantidad').value;
        productoDuplicado['fecha_vencimiento'] = this.form.get('fecha_vencimiento').value;
        productoDuplicado['falta'] = false;
        // envio producto
        this._ativeModal.close(productoDuplicado);
      }
    }
  }
}

@Component({
  selector: 'agregar-cantidad-devolucion-producto-modal',
  templateUrl: './devuelve-producto-modal.component.html',
})
export class DevuelveProductoModalComponent {
  @Input("producto") public producto: any;
  @Input("cantidadProductoMaximo") public cantidadProductoMaximo;
  @Output("productoDevolucion") public productoDevolucion = new EventEmitter();

  constructor( private _modalService: NgbModal ) { }

  open() {
    const modalRef = this._modalService.open(DevuelveProductoModalContent);
    modalRef.componentInstance.producto = this.producto;
    modalRef.componentInstance.cantidadProductoMaximo = this.cantidadProductoMaximo
    modalRef.result.then(
      (result) => {
          if (result == 'close') {
          } else {
              return this.productoDevolucion.emit(result);
          }
      }
    );
  }

}
