import { Component, OnInit } from '@angular/core';
import { AlertService, ConfiguracionParaPaginarService, InventarioService } from 'src/app/core/service';
import { ActivatedRoute } from '@angular/router';
import { ConfigurarPagina, ConfiguracionListados } from 'src/app/core/model';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss'],
  providers: [ConfiguracionParaPaginarService]
})
export class StockComponent implements OnInit {
  public configPaginacion: ConfigurarPagina = new ConfigurarPagina(); // obteiene el objeto de configuracion de rango y paginado de comprobantes
  public configurarListas: ConfiguracionListados = {}; // Array de obejtos de listas
  public filtradoBusqueda: any = {};
  public sort: string = '-fecha_vencimiento';


  constructor( private _mensaje: AlertService, private _route: ActivatedRoute, private _configurarPaginacion: ConfiguracionParaPaginarService, private _inventarioService: InventarioService ) { }

  ngOnInit(): void {
    this.prepararListadoStock(this._route.snapshot.data["inventario"], 1);
    this.configurarListas.categorias = this._route.snapshot.data["categorias"];
    this.configurarListas.marcas = this._route.snapshot.data["marcas"];
    this.configurarListas.unidad_medida = this._route.snapshot.data["unidadMedida"];
  }
  /**
   * preparo el listado para configurar el paginado
   * @param listado listado a configurar
   * @param pagina numero de pagina que se encuentra el listado
   */
  prepararListadoStock(listado:any, pagina: number) {
    // preparo la variable con la configuracion para el paginado
    this.configPaginacion = this._configurarPaginacion.config(listado, pagina);

    this.configPaginacion.cantidad_vencidos = listado.cantidad_vencidos;
    this.configPaginacion.cantidad_faltantes = listado.cantidad_faltantes;
    this.configPaginacion.cantidad_defectuosos = listado.cantidad_defectuosos;
    this.configPaginacion.cantidad_stock = listado.cantidad_stock;
    this.configPaginacion.cantidad_por_vencer = listado.cantidad_por_vencer;

    this.configurarListas.stock = listado.resultado;
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
    this._inventarioService.buscar(params).subscribe(
      respuesta => {
        this.prepararListadoStock(respuesta, page);
    }, error => { this._mensaje.cancelado(error); });
  }

  limpiarCampos(e: boolean) {
    this.sort = '-fecha_vencimiento'
    this.buscar({}, 1, '-fecha_vencimiento');
  }

  guardarProductoDefectuoso(defectuoso:object) {
    this._inventarioService.defectuoso(defectuoso).subscribe(
      respuesta => {
        this._mensaje.exitoso("El producto a sido guardado correctamente!!");
        // si la respuesta da ok actualizo el listado conlos criterios de busquedas ya otorgados.
        this.buscar(this.filtradoBusqueda, this.configPaginacion.page, this.sort);
      }, error => { this._mensaje.cancelado(error); }
    );
  }

  ordenarTabla(ordenar:string) {
    this.sort = ordenar;
    this.buscar(this.filtradoBusqueda, this.configPaginacion.page, this.sort);
  }

}
