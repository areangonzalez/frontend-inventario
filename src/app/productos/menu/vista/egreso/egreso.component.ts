import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfigurarPagina } from 'src/app/core/model';
import { ConfiguracionParaPaginarService, EgresoService, AlertService } from 'src/app/core/service';

@Component({
  selector: 'app-egreso',
  templateUrl: './egreso.component.html',
  styleUrls: ['./egreso.component.scss'],
  providers: [ConfiguracionParaPaginarService]
})
export class EgresoComponent implements OnInit {
  public listadoInventario: any;
  public listadoEgreso: any;
  public listadoLocalidad: any;
  public listadoTipoEgreso: any;
  public configPaginacion: ConfigurarPagina = new ConfigurarPagina(); // obteiene el objeto de configuracion de rango y paginado de comprobantes
  public filtradoBusqueda: any = {};
  public sort: string = '-nro_acta';

  constructor(
    private _route: ActivatedRoute, private _configurarPaginacion: ConfiguracionParaPaginarService,
    private _egresoService: EgresoService, private _mensaje: AlertService
  ) { }

  ngOnInit(): void {
    this.listadoInventario = this._route.snapshot.data["inventario"];
    this.listadoLocalidad = this._route.snapshot.data["localidad"];
    this.listadoTipoEgreso = this._route.snapshot.data["tipoEgreso"];
    this.prepararListadoEgreso(this._route.snapshot.data["egresos"], 1);
  }
  /**
   * preparo el listado para configurar el paginado
   * @param listado listado a configurar
   * @param pagina numero de pagina que se encuentra el listado
   */
  prepararListadoEgreso(listado:any, pagina: number) {
    // preparo la variable con la configuracion para el paginado
    this.configPaginacion = this._configurarPaginacion.config(listado, pagina);

    this.listadoEgreso = listado.resultado;
  }
  /**
   * Solicito el cambio de pagina
   * @param pagina numero de pagina
   */
  cambiarPagina(pagina:any) {
    this.buscar(this.filtradoBusqueda, pagina, this.sort);
  }
  /**
   * Configurar busqueda avanzada para mostrar listado
   * @param params [object] parametros que se filtraran en la busqueda
   * @param page [number] Es el numero de pagina menos 1
   */
  buscar(params:any, page:number, sort: string) {
    Object.assign(params, {page: page-1, sort: sort});
    this.filtradoBusqueda = params;
    this._egresoService.buscar(params).subscribe(
      respuesta => {
        this.prepararListadoEgreso(respuesta, page);
    }, error => { this._mensaje.cancelado(error); });
  }

  limpiarCampos(e: boolean) {
    this.sort = '-nro_acta';
    this.buscar({}, 1, this.sort);
  }

  ordenarTabla(ordenar: string) {
    this.sort = ordenar;
    this.buscar(this.filtradoBusqueda, this.configPaginacion.page, this.sort);

  }

}
