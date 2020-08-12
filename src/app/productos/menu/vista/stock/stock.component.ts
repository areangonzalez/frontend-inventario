import { Component, OnInit } from '@angular/core';
import { AlertService, ConfiguracionParaPaginarService, InventarioService } from 'src/app/core/service';
import { ActivatedRoute } from '@angular/router';
import { ConfigurarPagina } from 'src/app/core/model';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss'],
  providers: [ConfiguracionParaPaginarService]
})
export class StockComponent implements OnInit {
  public configPaginacion: ConfigurarPagina = new ConfigurarPagina(); // obteiene el objeto de configuracion de rango y paginado de comprobantes
  public listadoStock: any = [];
  public filtradoBusqueda: any = {};
  public listadoCategoria: any = [];
  public listadoMarcas: any = [];
  public listadoUnidadMedida: any = [];


  constructor( private _mensaje: AlertService, private _route: ActivatedRoute, private _configurarPaginacion: ConfiguracionParaPaginarService, private _inventarioService: InventarioService ) { }

  ngOnInit(): void {
    this.prepararListadoStock(this._route.snapshot.data["inventario"], 1);
    this.listadoCategoria = this._route.snapshot.data["categorias"];
    this.listadoMarcas = this._route.snapshot.data["marcas"];
    this.listadoUnidadMedida = this._route.snapshot.data["unidadMedida"];
  }
  /**
   * preparo el listado para configurar el paginado
   * @param listado listado a configurar
   * @param pagina numero de pagina que se encuentra el listado
   */
  prepararListadoStock(listado:any, pagina: number) {
    // preparo la variable con la configuracion para el paginado
    this.configPaginacion = this._configurarPaginacion.config(listado, pagina);

    this.listadoStock = listado.resultado;
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
    this.filtradoBusqueda = params;
    this._inventarioService.buscar(params).subscribe(
      respuesta => {
        this.prepararListadoStock(respuesta, page);
    }, error => { this._mensaje.cancelado(error); });
  }

  limpiarCampos(e: boolean) {
    this.buscar({}, 1);
  }
}
