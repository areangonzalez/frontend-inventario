import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'producto-lista-egreso',
  templateUrl: './lista-egreso.component.html',
  styleUrls: ['./lista-egreso.component.scss']
})
export class ListaEgresoComponent {
  @Input("listaEgreso") public listaEgreso: any;
  @Input("configPaginacion") public configPaginacion:any;
  @Output("cambioDePagina") public cambioDePagina = new EventEmitter();

  constructor() { }

  cambioPagina(pagina:number){
    this.cambioDePagina.emit(pagina);
  }

}
