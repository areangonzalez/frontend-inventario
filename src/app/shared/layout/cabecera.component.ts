import { Component, OnInit } from '@angular/core';
import { AutenticacionService, LoaderService } from 'src/app/core/service';
import { Router } from '@angular/router';

@Component({
  selector: 'layout-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.scss']
})
export class CabeceraComponent implements OnInit {
  public isCollapsed = true;
  public mostrar: boolean = false;
  public nombreUsuario: string = '';
  public estoyLogueado:boolean = false;

  constructor( private _router: Router, private _autenticacion: AutenticacionService, private _loader: LoaderService ) { }

  ngOnInit(): void {
    this.nombreUsuario = this._autenticacion.getUserName();
    this.estoyLogueado = this._autenticacion.loggedIn();
  }

  cerrarSesion() {
    this._loader.show();
      setTimeout(() => {
        this._autenticacion.logout();
        this._loader.hide();
        this._router.navigate(['/login']);
       }, 1000);
  }

  mostrarMenu(){
    this.mostrar = !this.mostrar;
  }

  ocultarMenu(){
    this.mostrar = false;
  }


}
