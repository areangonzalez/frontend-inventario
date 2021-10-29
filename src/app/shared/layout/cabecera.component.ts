import { Component, OnInit } from '@angular/core';
import { AutenticacionService, LoaderService } from 'src/app/core/service';
import { Router} from '@angular/router';


@Component({
  selector: 'layout-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.scss']
})
export class CabeceraComponent implements OnInit {
  public isCollapsed = true;
  public mostrar: boolean = false;
  public nombreUsuario: string = '';
  public isAdmin: boolean = false;

  constructor( private _router: Router, private _auth: AutenticacionService, private _loader: LoaderService ) { }

  ngOnInit(): void {
    this.setNombreUsuario();
  }

  setNombreUsuario() {
    if (this._auth.loggedIn.apellido && this._auth.loggedIn.nombre && this._auth.loggedIn.rol !== 'admin') {
      this.nombreUsuario = this._auth.loggedIn.apellido + ", " + this._auth.loggedIn.nombre;
    }else{
      this.nombreUsuario = "Admin";
      this.isAdmin = true;
    }
  }

  cerrarSesion() {
    this._loader.show();
      setTimeout(() => {
        this._auth.logout();
        this._loader.hide();
        this._router.navigate(['/login']);
       }, 1000);
  }

  mostrarMenu(){
    this.mostrar = !this.mostrar;
  }

  estoyLogueado(){
    return true;
  }

  ocultarMenu(){
    this.mostrar = false;
  }


}
