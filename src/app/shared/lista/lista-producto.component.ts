import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'shared-lista-producto',
  templateUrl: './lista-producto.component.html',
  styleUrls: ['./lista-producto.component.scss']
})
export class ListaProductoComponent implements OnInit {
  @Input("stock") public stock:any;
  @Input("submitted") public submitted: boolean;
  @Input("borrar") public borrar: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
