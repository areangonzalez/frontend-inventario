import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { map } from 'rxjs/operators';
import { AlertService, UsuarioService } from 'src/app/core/service';

@Component({
  selector: 'admin-configurar-usuario-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Configurar Usuario</h4>
      <button type="button" class="close" aria-label="Close" (click)="cancelar()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <admin-configuracion-tab [datosUsuario]="datosUsuario" [configListas]="listados" ></admin-configuracion-tab>
    </div>
  `
})
export class ConfigurarUsuarioModalContent {
  @Input("listados") public listados: any;
  @Input("datosUsuario") public datosUsuario: any;

  constructor(public activeModal: NgbActiveModal) {}

  cancelar() {
    this.activeModal.close('closed');
  }

}

@Component({
  selector: 'admin-configurar-usuario-modal',
  templateUrl: './configurar-usuario-modal.component.html',
  styleUrls: ['./configurar-usuario-modal.component.scss']
})
export class ConfigurarUsuarioModalComponent {
  @Input("listasConfig") public listasConfig: any;
  @Input("usuarioid") public usuarioid: any;

  constructor(
    private modalService: NgbModal, private _msj: AlertService, private config: NgbModalConfig,
    private _usuarioService: UsuarioService
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  abrirModal(datosUsuario: any) {
    const modalRef = this.modalService.open(ConfigurarUsuarioModalContent, { size: 'lg' });
    modalRef.componentInstance.listados = this.listasConfig;
    modalRef.componentInstance.datosUsuario = datosUsuario;
  }

  configurarModal() {
    // pido usuario por api
    this._usuarioService.buscarPorId(this.usuarioid)
    .pipe(map(vDatos => {
      let vUsuario: any = {
        id: vDatos['personaid'],
        nombre: vDatos['nombre'],
        apellido: vDatos['apellido'],
        cuil: vDatos['cuil'],
        nro_documento: vDatos['nro_documento'],
        usuario: {
          id: vDatos['id'],
          personaid: vDatos['personaid'],
          username: vDatos['username'],
          rol: vDatos['rol'],
          email: vDatos['email'],
          localidad: vDatos['localidad'],
          localidadid: vDatos['localidadid'],
          created_at: vDatos['created_at'],
          fecha_baja: vDatos['fecha_baja'],
          baja: (vDatos['fecha_baja']) ? true : false,
          descripcion_baja: vDatos['descripcion_baja']
        }
      };
      return vUsuario;
    })).subscribe(
      datos => { this.abrirModal(datos); },
      error => { this._msj.cancelado(error)}
    );
  }

}
