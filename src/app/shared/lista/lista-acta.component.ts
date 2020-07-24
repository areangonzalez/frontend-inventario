import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'shared-lista-acta',
  templateUrl: './lista-acta.component.html',
  styleUrls: ['./lista-acta.component.scss']
})
export class ListaActaComponent implements OnInit {
  @Input("borrar") public borrar:boolean;
  @Input("listadoActa") public listadoActa:any;

  constructor() { }

  ngOnInit(): void {
  }

}
