import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UtilService } from 'src/app/core/service';

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
  @Output("obtenerListadoDestock") public obtenerListadoDestock = new EventEmitter(); // listado de stock que es creada por el usuario

  public productoForm: FormGroup;
  public submitted: boolean = false;
  public listaProductos: any = [];
  public productoSeleccionado: any;
  public productoValor: any = '';
  public focusAuto: boolean = false;

  constructor(
    private _fb: FormBuilder, private _route: ActivatedRoute,
    private _util: UtilService
  ) {
    this.productoForm = _fb.group({
      productoid: '',
      nombre: ['', Validators.required],
      cantidad: ['', Validators.required],
      categoriaid: ['', Validators.required],
      marcaid: ['', Validators.required],
      unidad_valor: ['', Validators.required],
      unidad_medidaid: ['', Validators.required],
      fecha_vencimiento: '',
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

    if (this.productoForm.invalid) {
      return;
    }else{

      this.productoSeleccionado['cantidad'] = this.productoForm.get('cantidad').value;
      this.productoSeleccionado['fecha_vencimiento'] = this.productoForm.get('fecha_vencimiento').value;
      this.obtenerListadoDestock.emit(this.productoSeleccionado);

      this.productoValor = null;
      this.productoForm.reset();
      this.productoForm.get("categoriaid").patchValue("");
      this.productoForm.get("marcaid").patchValue("");
      this.productoForm.get("unidad_medidaid").patchValue("");
      this.submitted = false;
      this.focusAuto = true;
    }
  }

  /**
   * Formatea la fecha para una variable del formulario
   * @param obj [any] objecto de fecha
   * @param keyFecha [string] nombre de la variable que sera seteada
   */
  public formatearFecha(fecha:any){
    if (fecha !== null){
      this.productoForm.controls.fecha_vencimiento.setValue(this._util.formatearFecha(fecha.day, fecha.month, fecha.year, "yyyy-MM-dd"));
    }else{
      this.productoForm.controls.fecha_vencimiento.setValue('');
    }
  }

}
