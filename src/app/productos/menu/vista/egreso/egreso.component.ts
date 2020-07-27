import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-egreso',
  templateUrl: './egreso.component.html',
  styleUrls: ['./egreso.component.scss']
})
export class EgresoComponent implements OnInit {
  public listadoInventario: any;
  public listadoEgreso: any;

  constructor( private _route: ActivatedRoute ) { }

  ngOnInit(): void {
    this.listadoInventario = this._route.snapshot.data["inventario"];
    this.listadoEgreso = this._route.snapshot.data["egresos"];
  }

}
