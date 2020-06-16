import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'form-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent implements OnInit {
  public productoForm: FormGroup;
  public submitted: boolean = false;

  constructor( private _fb: FormBuilder ) {
    this.productoForm = _fb.group({
      productoid: ['', Validators.required],
      nombre: ['', Validators.required],
      cantidad: ['', Validators.required],
      categoriaid: ['', Validators.required],
      marcaid: ['', Validators.required],
      unidad: ['', Validators.required],
      medidaid: ['', Validators.required],
      vencimiento: '',
      fechaVencimiento: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

}
