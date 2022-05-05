import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService, ProveedorAbmService, UtilService } from 'src/app/core/service';

@Component({
  selector: 'admin-proveedor-form',
  templateUrl: './proveedor-form.component.html',
  styleUrls: ['./proveedor-form.component.scss']
})
export class ProveedorFormComponent implements OnInit {
  @Input("datosProveedor") public datosProveedor: any | undefined;
  @Output("cancelarForm") public cancelarForm = new EventEmitter();
  public datosForm: FormGroup;
  public submitted: boolean = false;

  constructor(private _fb: FormBuilder, private _util: UtilService, private _msj: AlertService, private _proveedorAbmService: ProveedorAbmService) {
    this.datosForm = _fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      cuit: ['', [Validators.required]],
      telefono: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.datosProveedor) {
      console.log("se edita un proveedor");
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
      if (this.datosProveedor) {
        params["id"] = this.datosProveedor.id;
        this.guardarUsuario(params, this.datosProveedor.id);

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
