import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService, UtilService } from 'src/app/core/service';

@Component({
  selector: 'form-comprobante',
  templateUrl: './comprobante.component.html',
  styleUrls: ['./comprobante.component.scss']
})
export class ComprobanteComponent implements OnInit {
  public comprobanteForm: FormGroup;
  public submitted: boolean = false;

  constructor(
    private _fb: FormBuilder, private _mensajeService: AlertService,
    private _util: UtilService
  ) {
    this.comprobanteForm = _fb.group({
      nro_comprobante: '',
      nroComprobantePrincipal: ['', Validators.required],
      nroComprobanteFinal: ['', Validators.required],
      fecha_emision: '',
      fechaEmision: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  validarNumeroComprobante(numero: any, tipo: string) {
    let valor: string = '';
    switch (tipo) {
      case 'principal':
        // completo numero principal
        numero.value = this._util.completarConCeros(numero.value, 4);
        this.comprobanteForm.get("nroComprobantePrincipal").patchValue(numero.value);
        break;
      case 'final':
        //completo numero final
        numero.value = this._util.completarConCeros(numero.value, 8);
        this.comprobanteForm.get("nroComprobanteFinal").patchValue(numero.value);
        break;
    }
    // concateno los numero de comprobantes
    valor = this.comprobanteForm.get("nroComprobantePrincipal").value + "-" + this.comprobanteForm.get("nroComprobanteFinal").value;
    // se actualiza el numero de comprobante completo
    this.comprobanteForm.get("nro_comprobante").patchValue(valor);
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


}
