import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { InventarioService, AlertService } from 'src/app/core/service';

/**
 * Componente que muestra el contenido del modal
 */
@Component({
  selector: 'comprobante-modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">{{titulo}}</h4>
      <button type="button" class="close" aria-label="Close" (click)="cerrarModal()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <form-comprobante [comprobante]="comprobanteForm" [submitted]="submitted" ></form-comprobante>
      <form-producto [listadoDeProducto]="listaProductos" [listadoDeCategoria]="listaCategorias" [listadoDeUnidadMedida]="listaUnidadMedida" [listadoDeMarcas]="listaMarcas" (obtenerListadoDestock)="crearListadoDeStock($event)"></form-producto>
      <shared-lista-producto [stock]="listadoDeStock" [submitted]="submitted" [borrar]="true" ></shared-lista-producto>
      <hr style="border: solid 1px #eee;">
      <div [formGroup]="comprobanteForm" class="form-group">
        <label for="descripcion">Observación:</label>
        <textarea class="form-control" id="descripcion" formControlName="descripcion" rows="1" placeholder="Descripción..."></textarea>
      </div>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-success" (click)="guardar()"><i class="fas fa-save"></i> Guardar</button>
    </div>
  `
})
export class ComprobanteModalContent {
  @Input("titulo") public titulo: string;
  @Input("listaProductos") public listaProductos: any; // Listado de productos
  @Input("listaCategorias") public listaCategorias: any; // Listado de productos
  @Input("listaUnidadMedida") public listaUnidadMedida: any; // Listado de unidad de medida
  @Input("listaMarcas") public listaMarcas: any; // Listado de unidad de medida
  public listadoDeStock: any = [];
  public comprobanteForm: FormGroup;
  public submitted: boolean = false;

  constructor(
    private _ativeModal: NgbActiveModal, private _fb: FormBuilder,
    private _inventarioService: InventarioService, private _mensaje: AlertService
  ) {
    this.comprobanteForm = _fb.group({
      nro_remito: '',
      nroComprobantePrincipal: ['', Validators.required],
      nroComprobanteFinal: ['', Validators.required],
      fechaEmision: ['', Validators.required],
      fecha_emision: '',
      descripcion: '',
      falta: false,
      defectuoso: false
    });
  }

  cerrarModal() {
    this._ativeModal.close('close');
  }

  guardar() {
    this.submitted = true;

    if (this.comprobanteForm.invalid && (this.listadoDeStock.length > 0)) {
      return;
    } else {
      let parametros = this.comprobanteForm.value;
      parametros["lista_producto"] = this.listadoDeStock;

      this._inventarioService.guardar(parametros).subscribe(
        respuesta => {
          this._mensaje.exitoso("El stock ha sido guardado con éxito!");
          this.cerrarModal();
      }, error => { this._mensaje.cancelado(error.message); });

    }
  }

  crearListadoDeStock(stock: any) {
    this.listadoDeStock.push(Object.assign({}, stock));
  }
}

/**
 * Componente que contiene el boton para abrir el modal
 */
@Component({
  selector: 'abrir-comprobante-modal',
  templateUrl: './comprobante-modal.component.html',
  styleUrls: ['./comprobante-modal.component.scss']
})
export class ComprobanteModalComponent {
  @Input("titulo") public titulo: string;
  @Input("productos") public productos: any; // listado de productos
  @Input("categorias") public categorias: any; // listado de categorías
  @Input("unidadMedida") public unidadMedida: any; // listado de unidad de medida
  @Input("marcas") public marcas: any; // listado de marcas


  constructor( private _modalService: NgbModal ) { }

  open() {
    const modalRef = this._modalService.open(ComprobanteModalContent, { size: 'lg' });
    modalRef.componentInstance.titulo = this.titulo;
    modalRef.componentInstance.listaProductos = this.productos;
    modalRef.componentInstance.listaCategorias = this.categorias;
    modalRef.componentInstance.listaUnidadMedida = this.unidadMedida;
    modalRef.componentInstance.listaMarcas = this.marcas;
  }

}
