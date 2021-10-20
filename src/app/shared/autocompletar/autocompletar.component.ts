import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Observable, merge, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, filter, tap, switchMap, catchError } from 'rxjs/operators';
import { NgbTypeaheadSelectItemEvent, NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'shared-autocompletar',
  templateUrl: './autocompletar.component.html',
  styleUrls: ['./autocompletar.component.scss']
})
export class AutocompletarComponent {
  @Input("form") public form: FormGroup;
  @Input("listado") public listado: any;
  @Input("submitted") public submitted: boolean;
  @Input("setFocus") public setFocus: boolean;
  @Output("obtenerSeleccion") public seleccionaValor = new EventEmitter();

  @ViewChild('instance') instance: NgbTypeahead;
    click$ = new Subject<string>();

    search = (text$: Observable<string>) =>
    text$.pipe(

      debounceTime(200),
      map(term => term === '' ? []
      : this.listado.filter(v => v.nombre.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
      );

      formatter = (x: {nombre: string}) => x.nombre;

  /**
   * Busca el nombre del item seleccionado y devuelve el objeto al componente padre
   * @param valor Item seleccionado por el auto completar
   */
  seleccionaElemento(valor: NgbTypeaheadSelectItemEvent){
      // Reviso si hubo una selección
      if (valor != undefined) {
        this.seleccionaValor.emit(valor.item);
      }else{// sino hubo seleccion mando un mensaje de error
        this.seleccionaValor.emit(false);
      }
    }

  nombreProducto() {
    // Tarea futura de taiga
  }

}
