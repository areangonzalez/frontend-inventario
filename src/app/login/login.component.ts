import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AutenticacionService } from '../core/service';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public mensaje: string = '';
  public huboError: boolean = false;
  public submitted: boolean = false;
  public returnUrl: string;

  constructor( private _fb: FormBuilder, private _autenticacion: AutenticacionService, private _router: Router, private _route: ActivatedRoute ) {
    this.loginForm = _fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // verifico si esta logueado
    this.estaLogueado();
    // Guardo la ultima ruta a la que se querido acceder
    this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/productos';
  }

  ingresar() {
    this._autenticacion.login(this.loginForm.value)
    .pipe(first())
    .subscribe(
      respuesta => {
        this._router.navigate([this.returnUrl]);
      }, error => {
        this.huboError = true;
        this.mensaje = "Por favor verifique sus datos.";
      }
    );
  }

  estaLogueado() {
    if (localStorage.getItem('token-gdi') != null) {
      this._router.navigate(['/productos']);
    }
  }

}
