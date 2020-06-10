import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbDate, NgbCalendar, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { UtilService } from 'src/app/core/service';


@Component({
  selector: 'ba-stock',
  templateUrl: './ba-stock.component.html',
  styleUrls: ['./ba-stock.component.scss']
})
export class BaStockComponent implements OnInit {
  public categoriaLista: any = [{id:1, nombre:'Alimentos / Bebidas'}];
  public marcaLista: any = [{id:1, nombre:'Canale'}];
  public medidadLista: any = [{ id:1, nombre:'kg' },{ id:2, nombre:'lts' },{ id:3, nombre:'gr' }];
  public globalParam:string = '';
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
        global_param: '',
        categoriaid: '',
        marcaid: '',
        unidad: '',
        medidadid: '',
        defectuoso: '',
        vencido: '',
        vencimientoDesde: null,
        vencimiento_desde: '',
        vencimientoHasta: null,
        vencimiento_hasta: ''
      });
    }

  ngOnInit(): void {
  }
  public buscar(){
    console.log('buscamos');
  }

  public limpiarCampos() {
    console.log('limpiamos');
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


  /* ### DATE PICKER CONFIG ### */
  /**
   * Selecciona el rango de fecha DESDE/HASTA
   * @param date [NgbDate] objeto de fecha del DatePicker
   */
  public onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
      console.log(date);
      this.busquedaAvanzada.patchValue({vencimientoDesde: date});
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
      this.busquedaAvanzada.patchValue({vencimientoHasta: date});
      this.abrirDp();
    } else {
      this.toDate = null;
      this.fromDate = date;
      this.busquedaAvanzada.patchValue({vencimientoDesde: date});
      this.busquedaAvanzada.patchValue({vencimientoHasta: null});
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
