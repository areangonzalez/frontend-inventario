import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.component.html',
  styleUrls: ['./ingreso.component.scss']
})
export class IngresoComponent implements OnInit {
  public listadoProductos: any; // listado de productos
  public listadoCategorias: any; // listado de categorias
  public listadoUnidadMedida: any; // listado de unidad de medidas
  public listadoMarcas: any; // listado de marcas
  public listadoIngreso: any;
  constructor( private _route: ActivatedRoute ) { }

  ngOnInit(): void {
    this.listadoIngreso = this._route.snapshot.data['ingreso'];
    this.listadoProductos = this._route.snapshot.data["productos"];
    this.listadoCategorias = this._route.snapshot.data["categorias"];
    this.listadoUnidadMedida = this._route.snapshot.data["unidadMedida"];
    this.listadoMarcas = this._route.snapshot.data["marcas"];
  }

}
