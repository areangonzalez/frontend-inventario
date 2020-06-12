import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlertService, UtilService } from 'src/app/core/service';

@Component({
  selector: 'form-comprobante',
  templateUrl: './comprobante.component.html',
  styleUrls: ['./comprobante.component.scss']
})
export class ComprobanteComponent implements OnInit {
  public comprobanteForm: FormGroup;

  constructor(
    private _fb: FormBuilder, private _mensajeService: AlertService,
    private _util: UtilService
  ) {
    this.comprobanteForm = _fb.group({
      nro_comprobante: '',
      nroComprobantePrincipal: '',
      nroComprobanteFinal: '',
      fecha_emision: '',
      fechaEmision: ''
    });
  }

  ngOnInit(): void {
  }

  validarNumeroComprobante(numero: number) {
    console.log(numero);
  }




}
