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
    });
  }

  ngOnInit(): void {
  }

  obtenerProducto(producto:any) {
    this.productoSeleccionado = producto;
    this.productoForm.patchValue(producto);
    this.productoForm.patchValue({productoid: producto.id});
    this.productoForm.patchValue({nombre: producto.nombre});
  }

  agregarProductoLista(){
    this.submitted = true;

    if (this.productoForm.invalid) {
      return;
    }else{
      let nombre:string = "", unidad:string = "", medida:string = "", marca:string = "";
      if (this.productoSeleccionado) {
        /**
         * verifico si hay cambios en cada campo del producto y borro su id para notificar que es un nuevo producto
         */
        if (this._util.verificarCambio(this.productoSeleccionado, 'categoriaid', this.productoForm.get('categoriaid').value)) {
          this.productoSeleccionado["categoriaid"] = this.productoForm.get('categoriaid').value;
          this.productoSeleccionado["id"] = "";
        }
        if (this._util.verificarCambio(this.productoSeleccionado, 'marcaid', this.productoForm.get('marcaid').value)) {
          this.productoSeleccionado["marcaid"] = this.productoForm.get('marcaid').value;
          this.productoSeleccionado["id"] = "";
          marca = this._util.buscarNombrePorId(this.listadoDeMarcas, this.productoSeleccionado["marcaid"]);
        }
        if (this._util.verificarCambio(this.productoSeleccionado, 'unidad_valor', this.productoForm.get('unidad_valor').value)) {
          this.productoSeleccionado["unidad_valor"] = this.productoForm.get('unidad_valor').value;
          this.productoSeleccionado["id"] = "";
          marca = this.productoSeleccionado["unidad_valor"];
        }
        if (this._util.verificarCambio(this.productoSeleccionado, 'unidad_medidaid', this.productoForm.get('unidad_medidaid').value)) {
          this.productoSeleccionado["unidad_medidaid"] = this.productoForm.get('unidad_medidaid').value;
          this.productoSeleccionado["id"] = "";
          medida = this._util.buscarNombrePorId(this.listadoDeUnidadMedida, this.productoSeleccionado["unidad_medidaid"]);
        }
        if (typeof this.productoForm.get("nombre").value === 'string') {
          if (this._util.verificarCambio(this.productoSeleccionado, 'nombre', this.productoForm.get('nombre').value)) {
            this.productoSeleccionado["nombre"] = this.productoForm.get('nombre').value;
            this.productoSeleccionado["id"] = "";
            marca = this.productoSeleccionado["nombre"];
          }
        }
        console.log(this.productoSeleccionado)
        this.productoSeleccionado['cantidad'] = this.productoForm.get('cantidad').value;
        this.productoSeleccionado['fecha_vencimiento'] = this.productoForm.get('fecha_vencimiento').value;

        if(this.productoSeleccionado["id"] !== "") {
          this.obtenerListadoDestock.emit(this.productoSeleccionado);
        }else{
          this.productoSeleccionado["producto"] = (nombre != "") ? nombre : this.productoSeleccionado["nombre"];
          this.productoSeleccionado["producto"] += (unidad != "") ? ", " + unidad : ", " + this.productoSeleccionado["unidad_valor"];
          this.productoSeleccionado["producto"] += (medida != "") ? medida : this._util.buscarNombrePorId(this.listadoDeUnidadMedida,this.productoSeleccionado["unidad_medidaid"]);
          this.productoSeleccionado["producto"] += (marca != "") ? " (" + marca + ")" : " (" + this._util.buscarNombrePorId(this.listadoDeMarcas,this.productoSeleccionado["marcaid"]) + ")";
          // se aplica servicio para el guardado del nuevo producto y se le agrega su nuevo id al producto
          this.obtenerListadoDestock.emit(this.productoSeleccionado);
        }
      }else{
        console.log("Obtengo un producto nuevo", this.productoForm.value);
        //this.obtenerListadoDestock.emit();
      }
      this.limpiarCampos();
    }
  }
  /**
   * limpio los campos del formulario
   */
  limpiarCampos() {
    this.productoSeleccionado = undefined;
    this.productoForm.get("nombre").setValue("");
    this.productoForm.get("cantidad").setValue("");
    this.productoForm.get("fechaVencimiento").setValue("");
    this.productoForm.get("categoriaid").setValue("");
    this.productoForm.get("marcaid").setValue("");
    this.productoForm.get("unidad_valor").setValue("");
    this.productoForm.get("unidad_medidaid").setValue("");
    this.submitted = false;
  }

  verificarProducto() {

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
