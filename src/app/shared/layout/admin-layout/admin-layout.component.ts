import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AutenticacionService, LoaderService } from 'src/app/core/service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {
  public isCollapsed = true;
  public mostrar: boolean = false;
  public nombreUsuario: string = "";
  public isAdmin: boolean = false;

  constructor(
    private _router: Router,
    private _auth: AutenticacionService,
    private _loaderService: LoaderService
  ) { }

  ngOnInit() {
    this.setNombreUsuario();
  }

  estoyLogueado(){
    return true;
  }

  cerrarSesion(){
    this._loaderService.show();
    setTimeout(() => {
      this._auth.logout();
      this._loaderService.hide();
      this._router.navigate(['/login']);
      }, 1000);
  }

  mostrarMenu(){
    this.mostrar = !this.mostrar;
  }

  ocultarMenu(){
    this.mostrar = false;
  }

  setNombreUsuario() {
    if (this._auth.loggedIn.apellido && this._auth.loggedIn.nombre && this._auth.loggedIn.rol !== 'admin') {
      this.nombreUsuario = this._auth.loggedIn.apellido + ", " + this._auth.loggedIn.nombre;
    }else{
      this.nombreUsuario = "Admin";
      this.isAdmin = true;
    }
  }

}
