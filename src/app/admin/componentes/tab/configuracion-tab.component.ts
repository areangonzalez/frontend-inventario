import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AlertService, UsuarioService } from './../../../core/service';

@Component({
  selector: 'admin-configuracion-tab',
  templateUrl: './configuracion-tab.component.html',
  styleUrls: ['./configuracion-tab.component.scss']
})
export class ConfiguracionTabComponent implements OnInit {
  @Input("datosUsuario") public datosUsuario: any;
  @Input("configListas") configListas: any;
  public usuario: FormGroup;
  public submitted: boolean = false;
  public usuarioBaja: boolean = false;
  private idUsuario: number;

  constructor(private _fb: FormBuilder, private _usuarioService: UsuarioService, private _msj: AlertService) {
    this.usuario = _fb.group({
        personaid: '',
        rol: ['', [Validators.required]],
        username: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
        localidadid: '',
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPass: ['', [Validators.required]]
      }, { validators:  this.checkPasswords })
  }

  ngOnInit() {
    this.prepararFormulario(this.datosUsuario);
  }

  /**
   * Checkea la comparacion de las contraseñas para validar
   * @param group formulario que contiene los valores a comparar
   */
  checkPasswords(group: AbstractControl): { invalid: boolean } { // here we have the 'passwords' group
    if ( group.get('password').value !== group.get('confirmPass').value ) {
      return { invalid: true };
    }
  }
  /**
   * Completa el formulario del usuario
   * @param datos datos del usuario
   */
  public prepararFormulario(datos: object){
    this.usuario.patchValue(datos['usuario']);
    this.idUsuario = datos['usuario']['id'];
    this.usuarioBaja = datos['usuario']['baja'];
  }

  /**
   * funcion que valida el formulario y el cambio de contraseña
   */
  public cambiarPass() {
    this.submitted = true;
    if (this.usuario.invalid) {
      this._msj.cancelado("¡Campos sin completar!");
      return;
    } else {
      let datos = this.usuario.value;

      this.cambiarDatosUsuario(datos, this.idUsuario);
    }
  }
  private cambiarDatosUsuario(datos: object, id: number) {
    this._usuarioService.actualizarUsuario(datos, id).subscribe(
      respuesta => {
        this._msj.exitoso("Los datos del usuario han sido actualizados correctamente.");
        this.usuario.patchValue({"password": ""});
        this.usuario.patchValue({"confirmPass": ""});
      }, error => { this._msj.cancelado(error); }
    );
  }
}
