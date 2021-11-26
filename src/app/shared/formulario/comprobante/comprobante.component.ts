import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UtilService } from 'src/app/core/service';

@Component({
  selector: 'form-comprobante',
  templateUrl: './comprobante.component.html',
  styleUrls: ['./comprobante.component.scss']
})
export class ComprobanteComponent implements OnInit {
  @Input("comprobante") public comprobanteForm: FormGroup;
  @Input("submitted") public submitted: boolean;

  constructor( private _util: UtilService ) {}

  ngOnInit(): void {
    this.fechaHoy();
  }

  validarNumeroComprobante(numero: any, tipo: string) {
    let valor: string = '';
    switch (tipo) {
      case 'principal':
        // completo numero principal
        numero.value = this._util.completarConCeros(numero.value, 4);
        if (numero.value != '0000') {
          this.comprobanteForm.get("nroComprobantePrincipal").patchValue(numero.value);
        } else {
          this.comprobanteForm.get("nroComprobantePrincipal").patchValue('');
        }
        break;
      case 'final':
        //completo numero final
        numero.value = this._util.completarConCeros(numero.value, 8);
        if (numero.value != '00000000') {
          this.comprobanteForm.get("nroComprobanteFinal").patchValue(numero.value);
        } else {
          this.comprobanteForm.get("nroComprobanteFinal").patchValue('');
        }
        break;
    }
    // concateno los numero de comprobantes
    valor = this.comprobanteForm.get("nroComprobantePrincipal").value + "-" + this.comprobanteForm.get("nroComprobanteFinal").value;
    // se actualiza el numero de comprobante completo
    this.comprobanteForm.get("nro_remito").patchValue(valor);
  }

  esNumero(numero:any) {
    if (!this._util.validarNumero(numero.value)) {
      numero.value = numero.value.substring(0,numero.value.length - 1);
      this.comprobanteForm.get("nroComprobantePrincipal").patchValue(numero.value);
    }
  }
  /**
   * Formatea la fecha para una variable del formulario
   * @param obj [any] objecto de fecha
   * @param keyFecha [string] nombre de la variable que sera seteada
   */
  public formatearFecha(fecha:any){
    if (fecha !== null){
      this.comprobanteForm.controls.fecha_emision.setValue(this._util.formatearFecha(fecha.day, fecha.month, fecha.year, "yyyy-MM-dd"));
    }else{
      this.comprobanteForm.controls.fecha_emision.setValue('');
    }
  }
  public fechaHoy() {
    let date = new Date()

    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()
    let fecha: string = "";

    if(month < 10){
      fecha = year+"-0"+month+"-"+day;
    }else{
      fecha = year+"-"+month+"-"+day;
    }

    this.comprobanteForm.patchValue({'fechaEmision': { day: day, month: month, year: year}})
    this.comprobanteForm.patchValue({'fecha_emision': fecha})
  }


}
