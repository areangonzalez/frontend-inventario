import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'producto-lista-ingreso',
  templateUrl: './lista-ingreso.component.html',
  styleUrls: ['./lista-ingreso.component.scss']
})
export class ListaIngresoComponent implements OnInit {
  @Input("listadoIngreso") public listadoIngreso: any;

  constructor() { }

  ngOnInit(): void {
  }

}
