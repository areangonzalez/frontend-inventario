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
  public listadoIngreso: any = [
    { id:1, comprobanteid: 1, cantidad: 1000, producto: 'Alcohol, 250 cc', marca: 'Purocol', categoria: 'Limpieza', fecha_vencimiento: '2022-03-20', nro_remito: '0002-00000187', fecha_emision: '2020-05-20' },
    { id:2, comprobanteid: 1, cantidad: 2500, producto: 'jabón blanco en pan, 200 gr', marca: 'Ala', categoria: 'Limpieza', fecha_vencimiento: '2021-03-20', nro_remito: '0002-00000187', fecha_emision: '2020-05-20' },
    { id:3, comprobanteid: 1, cantidad: 3000, producto: 'Papel hig. Hoja simple, 320 ml', marca: 'Higienol', categoria: 'Limpieza', fecha_vencimiento: '2025-06-25', nro_remito: '0002-00000187', fecha_emision: '2020-05-20' },
    { id:4, comprobanteid: 1, cantidad: 2000, producto: 'Aceite de girasol, 900 ml', marca: 'Legítimo', categoria: 'Alimentos / Bebidas', fecha_vencimiento: '2020-07-23', nro_remito: '0002-00000157', fecha_emision: '2020-04-15' },
    { id:5, comprobanteid: 1, cantidad: 4000, producto: 'Fideos secos guiseros, 500 gr', marca: 'Canale', categoria: 'Alimentos / Bebidas', fecha_vencimiento: '2020-08-12', nro_remito: '0002-00000157', fecha_emision: '2020-04-15' },
    { id:6, comprobanteid: 1, cantidad: 3500, producto: 'Azucar blanca, 1 kg', marca: 'Ledesma', categoria: 'Alimentos / Bebidas', fecha_vencimiento: '2020-12-12', nro_remito: '0002-00000127', fecha_emision: '2020-04-27' },
    { id:7, comprobanteid: 1, cantidad: 6000, producto: 'Leche entera, 1 lt', marca: 'Sancor', categoria: 'Alimentos / Bebidas', fecha_vencimiento: '2020-06-13', nro_remito: '0002-00000127', fecha_emision: '2020-04-27' },
  ];

  constructor( private _route: ActivatedRoute ) { }

  ngOnInit(): void {
    this.listadoProductos = this._route.snapshot.data["productos"];
    this.listadoCategorias = this._route.snapshot.data["categorias"];
    this.listadoUnidadMedida = this._route.snapshot.data["unidadMedida"];
    this.listadoMarcas = this._route.snapshot.data["marcas"];
  }

}
