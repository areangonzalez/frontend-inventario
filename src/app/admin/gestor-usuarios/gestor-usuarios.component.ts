import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfiguracionListados, ConfigurarPagina } from 'src/app/core/model';
import { AlertService, ConfiguracionParaPaginarService, UsuarioService } from 'src/app/core/service';


@Component({
  selector: 'app-gestor-usuarios',
  templateUrl: './gestor-usuarios.component.html',
  styleUrls: ['./gestor-usuarios.component.scss']
})
export class GestorUsuariosComponent implements OnInit {
  public listas = {} as ConfiguracionListados;
  public busqueda: any = {};
  public configPaginacion: ConfigurarPagina = new ConfigurarPagina();
  public tamanioPagina: number = 20;

  constructor(private _route: ActivatedRoute, private _usuarioService: UsuarioService, private _configPagina: ConfiguracionParaPaginarService, private _msj: AlertService) { }

  ngOnInit() {
    this.prepararListadoUsuario(this._route.snapshot.data["usuarios"], 1);
    this.listas.permisos = this._route.snapshot.data["permisos"];
    this.listas.roles = this._route.snapshot.data["roles"];
    this.listas.localidades = this._route.snapshot.data["localidades"];

  }
  /**
   * @function buscar busca en listado
   * @param apiBusqueda parametros de filtracion
   */
  public realizarBusqueda(apiBusqueda:any, page: number) {
    // Agrego la paginacion a la busqueda avanzada
    Object.assign(apiBusqueda, {page: page-1, pagesize: this.tamanioPagina, sort:"-create_at"});
    // agrego la busqueda en la nueva variable
    this.busqueda = apiBusqueda;
    // configuro para que se dirija a la primera pagina
    this.configPaginacion.page = 1;
    // realizo la busqueda
    this._usuarioService.buscar(apiBusqueda).subscribe(
      respuesta => {
        this.prepararListadoUsuario(respuesta, page);
      }, error => { this._msj.cancelado(error); }
    )
  }
  prepararListadoUsuario(listado:any, pagina: number) {
    // preparo la variable con la configuracion para el paginado
    this.configPaginacion = this._configPagina.config(listado, pagina);

    this.listas.usuarios = listado.resultado;
    this.listas.tamanioPagina = [{size: 10}, {size: 20}, {size: 50}, {size: 100}];
  }
  /**
   * Solicito el cambio de pagina
   * @param pagina numero de pagina
   */
  cambiarPagina(pagina:any) {
    this.realizarBusqueda(this.busqueda, pagina);
  }

  cambiarTamanioPagina(size: number) {
    this.tamanioPagina = size;
    this.realizarBusqueda(this.busqueda, this.configPaginacion.page);
  }
}

