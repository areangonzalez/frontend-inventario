import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'shared-lista-stock',
  templateUrl: './lista-stock.component.html',
  styleUrls: ['./lista-stock.component.scss']
})
export class ListaStockComponent implements OnInit {
  @Input("listadoStock") public listadoStock: any;
  constructor() { }

  ngOnInit(): void {
  }

}
