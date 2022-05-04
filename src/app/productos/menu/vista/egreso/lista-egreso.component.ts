import { Component, Input, Output, EventEmitter } from '@angular/core';
import { EgresoService, AlertService } from 'src/app/core/service';
import { saveAs } from "file-saver";

@Component({
  selector: 'producto-lista-egreso',
  templateUrl: './lista-egreso.component.html',
  styleUrls: ['./lista-egreso.component.scss']
})
export class ListaEgresoComponent {
  @Input("listaEgreso") public listaEgreso: any;
  @Input("configPaginacion") public configPaginacion:any;
  @Input("sort") public sort:string;
  @Output("cambioDePagina") public cambioDePagina = new EventEmitter();
  @Output("ordenarTabla") public ordenarTabla = new EventEmitter();

  constructor(private _egresoService: EgresoService, private _mensaje: AlertService) { }

  cambioPagina(pagina:number){
    this.cambioDePagina.emit(pagina);
  }

  ordenar(tituloTabla: string) {
    switch (tituloTabla) {
      case 'fecha':
        this.sort = (this.sort == 'fecha') ? '-fecha' : 'fecha';
        break;
      case 'destino_nombre':
        this.sort = (this.sort == 'destino_nombre') ? '-destino_nombre' : 'destino_nombre';
        break;
      case 'nro_acta':
        this.sort = (this.sort == 'nro_acta') ? '-nro_acta' : 'nro_acta';
        break;
    }
    this.ordenarTabla.emit(this.sort);
  }

  exportarActa(idActa) {
    this._egresoService.descargarPdf(idActa).subscribe(
      blob => {
        let file = new File([blob], 'egreso.pdf', {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
        saveAs(file);
    }, error => { this._mensaje.cancelado(error.mensaje); });

  }

}
