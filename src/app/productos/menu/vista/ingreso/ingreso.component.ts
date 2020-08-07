import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfiguracionParaPaginarService, ComprobanteService, AlertService } from 'src/app/core/service';
import { ConfigurarPagina } from 'src/app/core/model';

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.component.html',
  styleUrls: ['./ingreso.component.scss'],
  providers: [ConfiguracionParaPaginarService]
})
export class IngresoComponent implements OnInit {
  public listadoProductos: any; // listado de productos
  public listadoCategorias: any; // listado de categorias
  public listadoUnidadMedida: any; // listado de unidad de medidas
  public listadoMarcas: any; // listado de marcas
  public listadoIngreso: any; // listado de los comrpobantes de ingreso
  public configPaginacion: ConfigurarPagina = new ConfigurarPagina(); // obteiene el objeto de configuracion de rango y paginado de comprobantes
  public filtradoBusqueda: any = {};

  constructor(
    private _route: ActivatedRoute,
    private _configurarPaginacion: ConfiguracionParaPaginarService,
    private _comprobanteService: ComprobanteService,
    private _mensaje: AlertService
  ) { }

  ngOnInit(): void {
    this.prepararListadoingreso(this._route.snapshot.data['ingreso'], 1);
    this.listadoProductos = this._route.snapshot.data["productos"];
    this.listadoCategorias = this._route.snapshot.data["categorias"];
    this.listadoUnidadMedida = this._route.snapshot.data["unidadMedida"];
    this.listadoMarcas = this._route.snapshot.data["marcas"];
  }

  prepararListadoingreso(listado:any, pagina: number) {
    // preparo la variable con la configuracion para el paginado
    this.configPaginacion = this._configurarPaginacion.config(listado, pagina);

    this.listadoIngreso = listado.resultado;
  }
  /**
   * Solicito el cambio de pagina
   * @param pagina numero de pagina
   */
  cambiarPagina(pagina:any) {
    this.buscar(this.filtradoBusqueda, pagina);
  }

  /**
   * Configurar busqueda avanzada para mostrar listado
   * @param params [object] parametros que se filtraran en la busqueda
   * @param page [number] Es el numero de pagina menos 1
   */
  buscar(params:any, page:number) {
    Object.assign(params, {page: page-1});
    console.log(params);
    this.filtradoBusqueda = params;
    this._comprobanteService.buscar(params).subscribe(
      respuesta => {
        this.prepararListadoingreso(respuesta, page);
    }, error => { this._mensaje.cancelado(error); });
  }

  limpiarCampos(e: boolean) {
    this.buscar({}, 1);
  }

}
