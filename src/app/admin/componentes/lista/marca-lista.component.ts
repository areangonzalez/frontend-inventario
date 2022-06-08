import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AlertService, MarcaAbmService } from 'src/app/core/service';
import { ConfiguracionListados } from './../../../core/model';

@Component({
  selector: 'admin-marca-lista',
  templateUrl: './marca-lista.component.html',
  styleUrls: ['./marca-lista.component.scss']
})
export class MarcaListaComponent implements OnInit {
  @Input("listados") public listados: ConfiguracionListados;
  @Input("configPaginacion") public configPaginacion: any;
  @Output("cambioDePagina") public cambioDePagina = new EventEmitter();
  @Output("cambioDeTamanioPagina") public cambioDeTamanioPagina = new EventEmitter();
  public tamanioPagina: number = 20;

  constructor(private _msj: AlertService, private _marcaAbmService: MarcaAbmService) { }

  ngOnInit(): void {
  }

  infoAdicional(activo: number) {
    return ( activo == 1 )? 'Activo' : 'Inactivo';
  }

  /**
   * Envio al componente padre el numero de pagina
   * @param pagina numero de pagina
   */
   cambioPagina(pagina:number){
    this.cambioDePagina.emit(pagina);
  }

  cambioTamanioPagina(size: number) {
    this.tamanioPagina = size;
    this.cambioDeTamanioPagina.emit(size);
  }

  inactivarProveedor(confirmacion: boolean, activo:number, marcaid: number) {
    if (confirmacion) {
      let param:any = { activo: (activo == 1) ? 0 : 1};
      this._marcaAbmService.altaBajaMarca(marcaid, param).subscribe(
        resultado => {
          if (param.activo == 0) {
            this._msj.exitoso("La marca a sido dado de baja correctamente.");
          }else{
            this._msj.exitoso("La marca a sido dado de alta correctamente.");
          }
          this.cambioPagina(this.configPaginacion.page);
        }, error => { this._msj.cancelado(error); })
    }
  }

}
