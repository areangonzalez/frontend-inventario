import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpEventType } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, finalize } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { AlertService, AutenticacionService, LoaderService } from 'src/app/core/service';



@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  private service_count = 0;
    constructor(private _auth: AutenticacionService, private _loaderService: LoaderService, private _msj: AlertService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      this._loaderService.show();
      this.service_count++;
        return next.handle(request).pipe(
          catchError(err => {
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                this._auth.logout();
                window.location.reload();
            }
            if (err.status === 403) {
              const error = err.error.message || err.statusText;
              this._msj.cancelado(error);
              return throwError(error);
            }
            if (err.status === 400) {
              const error = err.error.message || err.statusText;
              return throwError(error);
            }
        }), finalize(() => {
          this.service_count--;
          if (this.service_count === 0){
            this._loaderService.hide();
          }
        }))
    }
}
