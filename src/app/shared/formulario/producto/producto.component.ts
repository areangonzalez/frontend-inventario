import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UtilService, ProductoService, AlertService } from 'src/app/core/service';

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
    private _util: UtilService, private _productoService: ProductoService,
    private _mensajeService: AlertService
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
      fechaVencimiento: null,
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
    console.log(this.productoForm.status)
    if (this.productoForm.invalid) {
      return;
    }else{
      let productoVerificado:any;
      if (this.productoSeleccionado) {
        /**
         * verifico si hay cambios en cada campo del producto y borro su id para notificar que es un nuevo producto
         */
        productoVerificado = this.verificarProducto(this.productoSeleccionado);

        productoVerificado['cantidad'] = this.productoForm.get('cantidad').value;
        productoVerificado['fecha_vencimiento'] = this.productoForm.get('fecha_vencimiento').value;

        if(productoVerificado["id"] !== "") {
          this.obtenerListadoDestock.emit(productoVerificado);
        }else{
          // se aplica servicio para el guardado del nuevo producto y se le agrega su nuevo id al producto
          this.nuevoProducto(productoVerificado);
        }
      }else{
        // se aplica servicio para el guardado del nuevo producto y se le agrega su nuevo id al producto
        productoVerificado = this.verificarProducto(this.productoForm.value);
        this.nuevoProducto(productoVerificado);
      }
      // Limpio los campos despues de haber agregado el producto al listado
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
    this.productoForm.get("fechaVencimiento").setValue(null);
    this.productoForm.get("categoriaid").setValue("");
    this.productoForm.get("marcaid").setValue("");
    this.productoForm.get("unidad_valor").setValue("");
    this.productoForm.get("unidad_medidaid").setValue("");
    this.productoForm.get("productoid").setValue("");
    this.submitted = false;
  }
  /**
   * verifico si hay cambios en el producto seleccionado
   * @param producto devuelvo un objeto de producto si tuvo o no cambios
   */
  verificarProducto(producto: Object) {
    let medida:string = "", marca:string = "";

    if (this._util.verificarCambio(producto, 'categoriaid', this.productoForm.get('categoriaid').value)) {
      producto["categoriaid"] = this.productoForm.get('categoriaid').value;
      producto["id"] = "";
    }
    if (this._util.verificarCambio(producto, 'marcaid', this.productoForm.get('marcaid').value)) {
      producto["marcaid"] = this.productoForm.get('marcaid').value;
      producto["id"] = "";
    }
    if (this._util.verificarCambio(producto, 'unidad_valor', this.productoForm.get('unidad_valor').value)) {
      producto["unidad_valor"] = this.productoForm.get('unidad_valor').value;
      producto["id"] = "";
    }
    if (this._util.verificarCambio(producto, 'unidad_medidaid', this.productoForm.get('unidad_medidaid').value)) {
      producto["unidad_medidaid"] = this.productoForm.get('unidad_medidaid').value;
      producto["id"] = "";
    }
    if (typeof this.productoForm.get("nombre").value === 'string') {
      if (this._util.verificarCambio(producto, 'nombre', this.productoForm.get('nombre').value)) {
        producto["nombre"] = this.productoForm.get('nombre').value;
        producto["id"] = "";
      }
    }
    // busco los valores de la medida y la marca
    medida = this._util.buscarDatosPorId(this.listadoDeUnidadMedida,producto["unidad_medidaid"]);
    marca = this._util.buscarDatosPorId(this.listadoDeMarcas,producto["marcaid"]);
    // armo el nombre de producto
    producto["producto"] = producto["nombre"];
    producto["producto"] += ", " + producto["unidad_valor"];
    producto["producto"] += medida['simbolo'] + " (" + marca['nombre'] + ")";

    return producto;
  }
  /**
   * Guarda un nuevo producto y devuelve su id
   * @param params
   * @return devuelve el nuevo producto con su id
   */
  nuevoProducto(params: Object) {
    this._productoService.guardar(params).subscribe(
      respuesta => {
        params['id'] = respuesta['id'];
        this.obtenerListadoDestock.emit(params);
        // refresco el listado del autoCompletar
        this.listarProducto();
      }, error => {
        this._mensajeService.cancelado(error.message);
      }
    );
  }
  /**
   * obtiene el listado de productos
   */
  listarProducto() {
    this._productoService.listar().subscribe(
      respuesta => {
        this.listadoDeProducto = respuesta;
      }, error => { this._mensajeService.cancelado(error.message); }
    )
  }



  /**
   * Formatea la fecha para una variable del formulario
   * @param obj [any] objecto de fecha
   * @param keyFecha [string] nombre de la variable que sera seteada
   */
  public formatearFecha(fecha:any){
    console.log(fecha);
    if (fecha !== null){
      this.productoForm.controls.fecha_vencimiento.setValue(this._util.formatearFecha(fecha.day, fecha.month, fecha.year, "yyyy-MM-dd"));
    }else{
      this.productoForm.controls.fecha_vencimiento.setValue('');
    }
  }

}
