import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpEventType } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, finalize } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { LoaderService } from 'src/app/core/service';

//import { AuthenticationService } from '@app/_services';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  private service_count = 0;
   //constructor(private authenticationService: AuthenticationService) { }
    constructor(private _loaderService: LoaderService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      this._loaderService.show();
      this.service_count++;
        return next.handle(request).pipe(
          catchError(err => {
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                // this.authenticationService.logout();
                // location.reload(true);
                console.log(err.status);

            }
            if (err.status === 403) {
              // auto logout if 401 response returned from api
              // this.authenticationService.logout();
              // location.reload(true);
              console.log(err.status);

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
