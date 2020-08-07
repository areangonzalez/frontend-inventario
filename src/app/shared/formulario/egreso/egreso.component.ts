import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UtilService } from 'src/app/core/service';

@Component({
  selector: 'shared-form-egreso',
  templateUrl: './egreso.component.html',
  styleUrls: ['./egreso.component.scss']
})
export class EgresoComponent implements OnInit {
  @Input("formEgreso") public formEgreso: FormGroup;
  @Input("submitted") public submitted: boolean;
  @Input("listadoLocalidades") public listadoLocalidades: any;
  @Input("listadoTipoEgreso") public listadoTipoEgreso: any;

  constructor( private _util: UtilService ) {}

  ngOnInit(): void {
  }

  /**
   * Formatea la fecha para una variable del formulario
   * @param obj [any] objecto de fecha
   * @param keyFecha [string] nombre de la variable que sera seteada
   */
  public formatearFecha(fecha:any){
    if (fecha !== null){
      this.formEgreso.controls.fecha.setValue(this._util.formatearFecha(fecha.day, fecha.month, fecha.year, "yyyy-MM-dd"));
    }else{
      this.formEgreso.controls.fecha.setValue('');
    }
  }

}
