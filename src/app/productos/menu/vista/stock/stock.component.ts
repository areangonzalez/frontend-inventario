import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/core/service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent implements OnInit {

  public listadoStock: any = [
    { id:7, cantidad: 3000, producto: 'Papel hig. Hoja simple, 320 ml', marca: 'Higienol', categoria: 'Limpieza', vencimiento: '2025-06-25' },
    { id:5, cantidad: 1000, producto: 'Alcohol, 250 cc', marca: 'Purocol', categoria: 'Limpieza', vencimiento: '2022-03-20' },
    { id:6, cantidad: 2500, producto: 'jabón blanco en pan, 200 gr', marca: 'Ala', categoria: 'Limpieza', vencimiento: '2021-03-20' },
    { id:2, cantidad: 3500, producto: 'Azucar blanca, 1 kg', marca: 'Ledesma', categoria: 'Alimentos / Bebidas', vencimiento: '2020-12-12' },
    { id:3, cantidad: 4000, producto: 'Fideos secos guiseros, 500 gr', marca: 'Canale', categoria: 'Alimentos / Bebidas', vencimiento: '2020-08-12' },
    { id:1, cantidad: 2000, producto: 'Aceite de girasol, 900 ml', marca: 'Legítimo', categoria: 'Alimentos / Bebidas', vencimiento: '2020-07-23' },
    { id:4, cantidad: 6000, producto: 'Leche entera, 1 lt', marca: 'Sancor', categoria: 'Alimentos / Bebidas', vencimiento: '2020-06-13' },
  ];


  constructor( public _alertService: AlertService ) { }

  ngOnInit(): void {
  }

  agregarStock() {
    console.log("presiono boton");

    this._alertService.exitoso('Success!!')
  }

}
