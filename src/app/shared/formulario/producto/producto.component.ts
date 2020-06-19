import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
  @Input("listadoDeMarcas") listadoDeMarcas:any; // listado de marcas
  @Output("obtenerListadoDestock") listadoDeStock = new EventEmitter(); // listado de stock que es creada por el usuario

  public productoForm: FormGroup;
  public submitted: boolean = false;
  public listaProductos: any = [];
  public productoSeleccionado: any;

  constructor( private _fb: FormBuilder, private _route: ActivatedRoute ) {
    this.productoForm = _fb.group({
      productoid: '',
      nombre: ['', Validators.required],
      cantidad: ['', Validators.required],
      categoriaid: ['', Validators.required],
      marcaid: ['', Validators.required],
      unidad_valor: ['', Validators.required],
      unidad_medidaid: ['', Validators.required],
      vencimiento: '',
      fechaVencimiento: ['', Validators.required],
      producto: ''
    })
  }

  ngOnInit(): void {
  }

  obtenerProducto(producto:any) {
    this.productoSeleccionado = producto;
    this.productoForm.patchValue(producto);
  }

  agregarProductoLista(){
    this.submitted = true;

    if (!this.productoForm.invalid) {
      return;
    }else{
      this.productoSeleccionado['cantidad'] = this.productoForm.get('cantidad').value;
      this.productoSeleccionado['vencimiento'] = this.productoForm.get('fecha_vencimiento').value;
      this.listadoDeStock.emit(this.productoSeleccionado);

    }
  }

}
