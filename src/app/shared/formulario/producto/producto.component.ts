import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'form-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent implements OnInit {
  public productoForm: FormGroup;

  constructor( private _fb: FormBuilder ) {
    this.productoForm = _fb.group({
      productoid: '',
      nombre: '',
      cantidad: '',
      categoriaid: '',
      marcaid: '',
      unidad: '',
      medidaid: '',
      vencimiento: ''
    })
  }

  ngOnInit(): void {
  }

}
