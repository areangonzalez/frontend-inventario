import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AlertService, ProveedorService } from 'src/app/core/service';
import { ConfiguracionListados } from './../../../core/model';

@Component({
  selector: 'admin-provedor-lista',
  templateUrl: './provedor-lista.component.html',
  styleUrls: ['./provedor-lista.component.scss']
})
export class ProvedorListaComponent implements OnInit {
  @Input("listados") public listados: ConfiguracionListados;
  @Input("configPaginacion") public configPaginacion: any;
  @Output("cambioDePagina") public cambioDePagina = new EventEmitter();
  @Output("cambioDeTamanioPagina") public cambioDeTamanioPagina = new EventEmitter();
  public tamanioPagina: number = 20;

  constructor(private _msj: AlertService, private _proveedorService: ProveedorService) { }

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


  inactivarProveedor(inactivo:any, proveedorid: number) {
    if (inactivo.confirmacion) {
      inactivo['inactivo'] = 0;
      /* this._proveedorService.baja(baja, proveedorid).subscribe(
        resultado => {
          this._msj.exitoso("El proveedor a sido dado de baja correctamente.");
          this.cambioPagina(this.configPaginacion.page);
        }, error => { this._msj.cancelado(error); }) */
    }
  }

}
