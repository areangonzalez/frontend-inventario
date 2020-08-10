import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/core/service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent implements OnInit {

  public listadoStock: any = [];


  constructor( private _alertService: AlertService, private _route: ActivatedRoute ) { }

  ngOnInit(): void {
    this.listadoStock = this._route.snapshot.data["inventario"];
  }

  agregarStock() {
    this._alertService.exitoso('Success!!')
  }

  buscarStock() {
    this._alertService.exitoso('Success!!')
  }

}
