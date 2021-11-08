import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ConfiguracionListados } from 'src/app/core/model';

@Component({
  selector: 'producto-lista-ingreso',
  templateUrl: './lista-ingreso.component.html',
  styleUrls: ['./lista-ingreso.component.scss']
})
export class ListaIngresoComponent {
  @Input("configPaginacion") public configPaginacion:any;
  @Input("listas") public listas: ConfiguracionListados;
  @Input("sort") public sort:string;
  @Output("cambioDePagina") public cambioDePagina = new EventEmitter();
  @Output("ordenarTabla") public ordenarTabla = new EventEmitter();

  constructor() { }

  cambioPagina(pagina:number){
    this.cambioDePagina.emit(pagina);
  }

  ordenar(tituloTabla:string) {
    switch (tituloTabla) {
      case 'nro_remito':
        this.sort = (this.sort == 'nro_remito') ? '-nro_remito' : 'nro_remito';
        break;
      case 'fecha_emision':
        this.sort = (this.sort == 'fecha_emision') ? '-fecha_emision' : 'fecha_emision';
        break;
    }
    this.ordenarTabla.emit(this.sort);
  }

  actualizarListado(confirmacion: any, pagina: number) {
    this.cambioPagina(pagina);
    console.log("confirmacion de guardado: ", confirmacion);

  }

}
