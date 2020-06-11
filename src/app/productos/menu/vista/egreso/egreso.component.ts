import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-egreso',
  templateUrl: './egreso.component.html',
  styleUrls: ['./egreso.component.scss']
})
export class EgresoComponent implements OnInit {
  public listadoStock: any = [
    { id:1, cantidad: 20, producto: 'Aceite de girasol, 900 ml', marca: 'Legítimo', categoria: 'Alimentos / Bebidas', vencimiento: '2020-07-23', comprobante: '04321', egreso: '2020-06-10' },
    { id:2, cantidad: 20, producto: 'Fideos secos guiseros, 500 gr', marca: 'Canale', categoria: 'Alimentos / Bebidas', vencimiento: '2020-08-12', comprobante: '04321', egreso: '2020-06-10' },
    { id:3, cantidad: 20, producto: 'Alcohol, 250 cc', marca: 'Purocol', categoria: 'Limpieza', vencimiento: '2022-03-20', comprobante: '04321', egreso: '2020-06-10' },
    { id:4, cantidad: 35, producto: 'Azucar blanca, 1 kg', marca: 'Ledesma', categoria: 'Alimentos / Bebidas', vencimiento: '2020-12-12', comprobante: '04367', egreso: '2020-05-29' },
    { id:5, cantidad: 35, producto: 'Leche entera, 1 lt', marca: 'Sancor', categoria: 'Alimentos / Bebidas', vencimiento: '2020-06-13', comprobante: '04367', egreso: '2020-05-29' },
    { id:6, cantidad: 25, producto: 'jabón blanco en pan, 200 gr', marca: 'Ala', categoria: 'Limpieza', vencimiento: '2021-03-20', comprobante: '04343', egreso: '2020-05-02' },
    { id:7, cantidad: 25, producto: 'Papel hig. Hoja simple, 320 ml', marca: 'Higienol', categoria: 'Limpieza', vencimiento: '2025-06-25', comprobante: '04343', egreso: '2020-05-02' }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
