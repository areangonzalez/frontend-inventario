import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UsuarioService, AlertService } from './../../../core/service';

@Component({
  selector: 'admin-usuario-permiso-lista',
  templateUrl: './usuario-permiso-lista.component.html',
  styleUrls: ['./usuario-permiso-lista.component.scss']
})
export class UsuarioPermisoListaComponent implements OnInit {
  @Input("listaUsuarioPermisos") public listaUsuarioPermisos: any;
  @Output("editarPermisoUsuario") public editarPermisoUsuario = new EventEmitter();

  constructor(private _usuarioService: UsuarioService, private _msj: AlertService) { }

  ngOnInit(): void {
  }
  /**
   * borra los permisos del programa que le pertenecen al usuario
   * @param datos objeto que contiene los datos del programa con sus permisos
   * @param confirmacion confirmacion de parte del usuario para dar o no acceso al borrado
   */
  borrarDato(datos: any, confirmacion: boolean) {
    if (confirmacion) {
      let idUsuario = datos.usuarioid;
      this._usuarioService.borrarAsignacion(datos).subscribe(
        repsuesta => {
          this._msj.exitoso("Se han borrado los permisos.");
          this.actualizarListado(idUsuario);
        }, error => { this._msj.cancelado(error); }
      );
    }
  }
  /**
   * Actuliza el listado de los permisos
   * @param idUsuario identificador del usuario que sirve para obtener el listado del mismo
   */
  actualizarListado(idUsuario: number) {
    this._usuarioService.listarAsignacion(idUsuario).subscribe(
      listado => { this.listaUsuarioPermisos = listado; },
      error => { this._msj.cancelado(error); }
    )
  }

  editarPermiso(permisos:any){
    this.editarPermisoUsuario.emit(permisos);
  }

}
