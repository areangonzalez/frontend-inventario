import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'producto-lista-ingreso',
  templateUrl: './lista-ingreso.component.html',
  styleUrls: ['./lista-ingreso.component.scss']
})
export class ListaIngresoComponent {
  @Input("listadoIngreso") public listadoIngreso: any;
  @Input("configPaginacion") public configPaginacion:any;
  @Output("cambioDePagina") public cambioDePagina = new EventEmitter();

  constructor() { }

  cambioPagina(pagina:number){
    this.cambioDePagina.emit(pagina);
  }

}
