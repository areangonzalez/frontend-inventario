import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-egreso',
  templateUrl: './egreso.component.html',
  styleUrls: ['./egreso.component.scss']
})
export class EgresoComponent implements OnInit {
  public listadoEgreso: any = [
    { id: 1, fecha: "2019-03-03", origen: "un origen", producto_cant_total: 300, destino_nombre: "Un destino",
      destino_localidadid: 2626, destino_localidad: "Viedma", nro_acta: "0001" },
    { id: 2, fecha: "2019-04-04", origen: "un origen", producto_cant_total: 200, destino_nombre: "Un destino",
      destino_localidadid: 2626, destino_localidad: "Viedma", nro_acta: "0002" },
    { id: 3, fecha: "2019-05-05", origen: "un origen", producto_cant_total: 600, destino_nombre: "Un destino",
      destino_localidadid: 2626, destino_localidad: "Viedma", nro_acta: "0003" }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
