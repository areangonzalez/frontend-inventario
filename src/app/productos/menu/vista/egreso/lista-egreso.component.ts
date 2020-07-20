import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'producto-lista-egreso',
  templateUrl: './lista-egreso.component.html',
  styleUrls: ['./lista-egreso.component.scss']
})
export class ListaEgresoComponent implements OnInit {
  @Input("listaEgreso") public listaEgreso: any;

  constructor() { }

  ngOnInit(): void {

  }

}
