import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'shared-lista-acta',
  templateUrl: './lista-acta.component.html',
  styleUrls: ['./lista-acta.component.scss']
})
export class ListaActaComponent implements OnInit {
  @Input("borrar") public borrar:boolean;
  @Input("listadoActa") public listadoActa:any;
  @Output("ActualizarInventario") public actualizarInventario = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  ConfirmarBorradoProducto(confirmar: boolean) {
    if (confirmar) {
      this.actualizarInventario.emit(true);
    }
  }

}
