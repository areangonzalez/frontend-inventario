import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'form-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent implements OnInit {
  @Input("listadoDeProducto") listadoDeProducto:any; // Listado de productos
  @Input("listadoDeCategoria") listadoDeCategoria:any; // listado de categoria
  @Input("listadoDeUnidadMedida") listadoDeUnidadMedida:any; // listado de unidad de medida

  public productoForm: FormGroup;
  public submitted: boolean = false;

  constructor( private _fb: FormBuilder, private _route: ActivatedRoute ) {
    this.productoForm = _fb.group({
      productoid: ['', Validators.required],
      nombre: ['', Validators.required],
      cantidad: ['', Validators.required],
      categoriaid: ['', Validators.required],
      marcaid: ['', Validators.required],
      unidad_valor: ['', Validators.required],
      unidad_medidaid: ['', Validators.required],
      vencimiento: '',
      fechaVencimiento: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  obtenerProducto(producto:any) {
    console.log(producto);

    this.productoForm.patchValue(producto);
  }

}
