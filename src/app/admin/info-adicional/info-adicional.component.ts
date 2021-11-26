import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'admin-info-adicional',
  templateUrl: './info-adicional.component.html',
  styleUrls: ['./info-adicional.component.scss']
})
export class InfoAdicionalComponent implements OnInit {
  public permisos: any;

  constructor(private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this.permisos = this._route.snapshot.data["permisos"];
  }

}
