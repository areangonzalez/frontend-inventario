import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbDate, NgbDatepickerConfig, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UtilService } from 'src/app/core/service';
import { ConfiguracionListados } from "src/app/core/model";

@Component({
  selector: 'ba-ingreso',
  templateUrl: './ba-ingreso.component.html',
  styleUrls: ['./ba-stock.component.scss']
})
export class BaIngresoComponent implements OnInit {
  /* @Input("productos") public productos: any; // listado de productos
  @Input("categorias") public categorias: any; // Listados de categorias
  @Input("unidadMedida") public unidadMedida: any; // Listados de unidad de medida
  @Input("marcas") public marcas: any; // Listados de marcas, */
  @Input("listados") public listados: ConfiguracionListados;
  @Output("obtenerBusqueda") public obtenerBusqueda = new EventEmitter();
  @Output("limpiar") public limpiar = new EventEmitter();

  public global_param:string = '';
  public busquedaAvanzada: FormGroup;
  public mostrar: boolean = false;
  public btnSeleccion: boolean = false;

  // Variables para calendarios
  public hoveredDate: NgbDate | null = null; // Resalta la fecha
  public fromDate: NgbDate | null = null; // fecha desde
  public toDate: NgbDate | null = null; // fecha hasta
  public mostrarDp: boolean = false; // Muestra el DatePicker


    constructor(
      private _fb: FormBuilder,
      private _configNgbDate: NgbDatepickerConfig,
      private _calendar: NgbCalendar,
      private _util: UtilService
    ) {
      // configuracion de fecha minima
      _configNgbDate.minDate = {year: 1900, month: 1, day: 1};
      // formulario de busqueda avanzada
      this.busquedaAvanzada = _fb.group({
        fechaDesde: null,
        fecha_desde: '',
        fechaHasta: null,
        fecha_hasta: ''
      });
    }

  ngOnInit(): void {
    console.log(this.listados);

  }
  public buscar(){
    let busquedaAvanzada = this.busquedaAvanzada.value;
    let apiBusqueda:any = {};
    let esTrue: boolean = false;

    if (this.global_param !== '') {
      Object.assign(apiBusqueda, {"global_param": this.global_param});
    }
    for (const clave in busquedaAvanzada) {
      if(busquedaAvanzada[clave] !== '' && busquedaAvanzada[clave] !== null && (busquedaAvanzada[clave])){
        if (clave != 'fechaDesde' && clave != 'fechaHasta'){
          Object.assign(apiBusqueda, {[clave]: busquedaAvanzada[clave]});
          esTrue = true;
        }
      }
    }
    this.btnSeleccion = esTrue;
    this.obtenerBusqueda.emit(apiBusqueda);
  }

  public limpiarCampos() {
    let busqueda: any = this.busquedaAvanzada.value;
      for (const key in busqueda) {
        if (key == 'fechaDesde') {
          busqueda[key] = null;
        }else if (key == 'fechaHasta') {
          busqueda[key] = null;
        }else {
          busqueda[key] = '';
        }
      }
      this.global_param = '';
      this.busquedaAvanzada.patchValue(busqueda);
      this.btnSeleccion = false;
      this.mostrar = false;
      this.limpiar.emit(true);
  }
  /**
   * Formatea la fecha para una variable del formulario
   * @param obj [any] objecto de fecha
   * @param keyFecha [string] nombre de la variable que sera seteada
   */
  public formatFecha(obj:any, keyFecha:string){
    if (obj != null){
      this.busquedaAvanzada.controls[keyFecha].setValue(this._util.formatearFecha(obj.day, obj.month, obj.year, "yyyy-MM-dd"));
    }else{
      this.busquedaAvanzada.controls[keyFecha].setValue('');
    }
  }
  /**
   * Marca los campos que seran utilizados en la busqueda avanzada
   * @param valor contiene el valor del input seleccionado
   */
  marcarCampo(valor: any){
    let marcar:boolean = false;
    marcar = (valor != null && valor != '') ? true : false;
    return marcar;
  }
  /**
   * Muestra/Oculta los campos de busqueda avanzada
   */
  public mostrarBusquedaAvanzada(){
    return this.mostrar = !this.mostrar;
  }
  /**
   * Valido si los valores ingresados al input son numeros,
   * si no borro los valores ingresados
   * @param datos objeto que contiene el valor del input
   */
  validarNumero(datos: any){
    console.log(datos.value)
    if (!this._util.validarNumero(datos.value)) {
      datos.value = datos.value.substring(0,datos.value.length - 1);
      this.busquedaAvanzada.get("unidad").patchValue(datos.value);
    }
  }

  actualizarListado(actualizar: boolean) {
    if (actualizar) {
      this.buscar();
    }
  }

  /* ### DATE PICKER CONFIG ### */
  /**
   * Selecciona el rango de fecha DESDE/HASTA
   * @param date [NgbDate] objeto de fecha del DatePicker
   */
  public onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
      this.busquedaAvanzada.patchValue({fechaDesde: date});
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
      this.busquedaAvanzada.patchValue({fechaHasta: date});
      this.abrirDp();
    } else {
      this.toDate = null;
      this.fromDate = date;
      this.busquedaAvanzada.patchValue({fechaDesde: date});
      this.busquedaAvanzada.patchValue({fechaHasta: null});
    }
  }
  public isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }
  public isInside(date: NgbDate) {
    return date.after(this.fromDate) && date.before(this.toDate);
  }
  public isRange(date: NgbDate) {
    return date.equals(this.fromDate) || date.equals(this.toDate) || this.isInside(date) || this.isHovered(date);
  }
  public abrirDp(){
    this.mostrarDp = !this.mostrarDp;
  }
}
