import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfiguracionParaPaginarService, ComprobanteService, AlertService } from 'src/app/core/service';
import { ConfigurarPagina, ConfiguracionListados } from 'src/app/core/model';

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.component.html',
  styleUrls: ['./ingreso.component.scss'],
  providers: [ConfiguracionParaPaginarService]
})
export class IngresoComponent implements OnInit {
  public configurarListas: ConfiguracionListados = {}; // Array de obejtos de listas
  public configPaginacion: ConfigurarPagina = new ConfigurarPagina(); // obteiene el objeto de configuracion de rango y paginado de comprobantes
  public filtradoBusqueda: any = {};
  public sort: string = '-nro_remito';

  constructor(
    private _route: ActivatedRoute,
    private _configurarPaginacion: ConfiguracionParaPaginarService,
    private _comprobanteService: ComprobanteService,
    private _mensaje: AlertService
  ) { }

  ngOnInit(): void {
    this.prepararListadoingreso(this._route.snapshot.data['ingreso'], 1);
    this.configurarListas.productos = this._route.snapshot.data["productos"];
    this.configurarListas.categorias = this._route.snapshot.data["categorias"];
    this.configurarListas.unidad_medida = this._route.snapshot.data["unidadMedida"];
    this.configurarListas.marcas = this._route.snapshot.data["marcas"];
  }

  prepararListadoingreso(listado:any, pagina: number) {
    // preparo la variable con la configuracion para el paginado
    this.configPaginacion = this._configurarPaginacion.config(listado, pagina);

    this.configurarListas.comprobantes = listado.resultado;
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
    this._comprobanteService.buscar(params).subscribe(
      respuesta => {
        this.prepararListadoingreso(respuesta, page);
    }, error => { this._mensaje.cancelado(error); });
  }

  limpiarCampos(e: boolean) {
    this.sort = '-nro_remito';
    this.buscar({}, 1, this.sort);
  }

  ordenarTabla(ordenar:string) {
    this.sort = ordenar;
    this.buscar(this.filtradoBusqueda, this.configPaginacion.page, this.sort);
  }

}
