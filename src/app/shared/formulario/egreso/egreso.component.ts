import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UtilService } from 'src/app/core/service';

@Component({
  selector: 'shared-form-egreso',
  templateUrl: './egreso.component.html',
  styleUrls: ['./egreso.component.scss']
})
export class EgresoComponent implements OnInit {
  public formEgreso: FormGroup;
  public submitted: boolean = false;
  public listadolocalidades: any = [{ id: 1, nombre: "Viedma" }];
  public listadoTipoEgreso: any = [{ id: 1, nombre: "modulo" },{ id: 2, nombre: "mercaderia" }];

  constructor(
    private _fb: FormBuilder, private _util: UtilService
  ) {
    this.formEgreso = _fb.group({
      fechaActa: ['', Validators.required],
      fecha: '',
      destino_nombre: ['', Validators.required],
      destino_localidadid: ['', Validators.required],
      nro_acta: ['', Validators.required],
      tipo_egreso: ['', Validators.required],
      origen: ['', Validators.required],
      suscrito: ['', Validators.required],
      descripcion: ''
    });
  }

  ngOnInit(): void {
  }

  /**
   * Formatea la fecha para una variable del formulario
   * @param obj [any] objecto de fecha
   * @param keyFecha [string] nombre de la variable que sera seteada
   */
  public formatearFecha(fecha:any){
    if (fecha !== null){
      this.formEgreso.controls.fecha_emision.setValue(this._util.formatearFecha(fecha.day, fecha.month, fecha.year, "yyyy-MM-dd"));
    }else{
      this.formEgreso.controls.fecha_emision.setValue('');
    }
  }

}
