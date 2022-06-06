import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AlertService, ConfiguracionParaPaginarService, MarcaAbmService } from 'src/app/core/service';
import { ConfiguracionListados, ConfigurarPagina } from 'src/app/core/model';

@Component({
  selector: 'app-marca',
  templateUrl: './marca.component.html',
  styleUrls: ['./marca.component.scss']
})
export class MarcaComponent implements OnInit {
  public listas = {} as ConfiguracionListados;
  public busqueda: any = {};
  public configPaginacion: ConfigurarPagina = new ConfigurarPagina();
  public tamanioPagina: number = 20;

  constructor(private _route: ActivatedRoute, private _marcaAbmService: MarcaAbmService, private _configPagina: ConfiguracionParaPaginarService, private _msj: AlertService) { }

  ngOnInit(): void {
    this.prepararListado(this._route.snapshot.data["marcas"], 1);
  }

  prepararListado(listado:any, pagina: number) {
    // preparo la variable con la configuracion para el paginado
    this.configPaginacion = this._configPagina.config(listado, pagina);

    this.listas.marcas = listado.resultado;
    this.listas.tamanioPagina = [{size: 10}, {size: 20}, {size: 50}, {size: 100}];
  }

  /**
   * @function buscar busca en listado
   * @param apiBusqueda parametros de filtracion
   */
   public realizarBusqueda(apiBusqueda:any, page: number) {
    // Agrego la paginacion a la busqueda avanzada
    Object.assign(apiBusqueda, {page: page-1, pagesize: this.tamanioPagina});
    // agrego la busqueda en la nueva variable
    this.busqueda = apiBusqueda;
    // configuro para que se dirija a la primera pagina
    this.configPaginacion.page = 1;
    // realizo la busqueda
    this._marcaAbmService.buscar(apiBusqueda).subscribe(
      respuesta => {
        this.prepararListado(respuesta, page);
      }, error => { this._msj.cancelado(error); }
    );
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
