import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService, MarcaAbmService, UtilService } from 'src/app/core/service';

@Component({
  selector: 'admin-marca-form',
  templateUrl: './marca-form.component.html',
  styleUrls: ['./marca-form.component.scss']
})
export class MarcaFormComponent implements OnInit {
  @Input("datosMarca") public datosMarca: any | undefined;
  @Output("cancelarForm") public cancelarForm = new EventEmitter();
  public datosForm: FormGroup;
  public submitted: boolean = false;

  constructor(private _fb: FormBuilder, private _util: UtilService, private _msj: AlertService, private _proveedorAbmService: MarcaAbmService) {
    this.datosForm = _fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      cuit: ['', [Validators.required]],
      telefono: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.datosMarca) {
      this.datosForm.patchValue(this.datosMarca);
    }
  }

  /**
   * cancela el formulario
   */
   cancelar() {
    this.cancelarForm.emit(true);
  }
  /**
   * valida los datos del formulario
   * si los campos no han sido compoletados muestra un mensaje de error y los campos resaltados.
   * si se han completado los campos correctamente se aplica el guardado de datos, y se notifica si se ha guardado correctamete
   */
  validarForm() {
    this.submitted = true;
    if (this.datosForm.invalid) { // verifico la validación en los campos del formulario
      this._msj.cancelado("Campos sin completar!!");
      return;
    }else{ // si pasa la validación
      let params = this.datosForm.value;
      if (this.datosMarca) {
        params["id"] = this.datosMarca.id;
        params["activo"] = this.datosMarca.activo;
        this.guardarUsuario(params, this.datosMarca.id);

      } else {
        this.guardarUsuario(params);
      }
    }
  }
  /**
   * guardado de usuario al completar y ser validado del formulario
   * @param params valores utilizados para el guardado de un usuario
   */
  public guardarUsuario(params: object, id?: number) {
    if (id !== undefined) {
      this._proveedorAbmService.guardar(params, id).subscribe(
        respuesta => {
          this._msj.exitoso("Se ha editado el proveedor con exito.");
          this.cancelarForm.emit(false);
        }, error => {
          this._msj.cancelado(error);
        });
    }else{
      this._proveedorAbmService.guardar(params).subscribe(
        respuesta => {
          this._msj.exitoso("Se ha guardado el provedor con exito.");
          this.cancelarForm.emit(false);
        }, error => {
          this._msj.cancelado(error);
        });
    }
  }

  /**
   * @function soloNumero valida que los datos ingresados en un input sean solo numeros.
   * @param datos objeto que contiene los datos de un input.
   */
   public soloNumero(datos:any){
    if (!this._util.validarNumero(datos.value)) {
      datos.value = datos.value.substring(0,datos.value.length - 1);
    }
  }
}
