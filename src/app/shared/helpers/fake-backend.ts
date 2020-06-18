import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

let listadoProductos = [
  { id: 1, nombre: 'Azucar blanca', unidad_valor: 1, unidad_medidaid: 4, marcaid: 4, categoriaid: 1, producto: 'Azucar blanca, 1lt (Chango)' },
  { id: 8, nombre: 'Alcohol', unidad_valor: 250, unidad_medidaid: 1, marcaid: 8, categoriaid: 2, producto: 'Alcohol, 250 cm3 (Purocol)' },
  { id: 2, nombre: 'Fideos secos guiseros', unidad_valor: 500, unidad_medidaid: 3, marcaid: 3, categoriaid: 1, producto: 'Fideos secos guiseros, 500gr (Canale)' },
  { id: 3, nombre: 'Harina de trigo 000', unidad_valor: 500, unidad_medidaid: 3, marcaid: 1, categoriaid: 1, producto: 'Harina de trigo 000, 500gr (Cañuelas)' },
  { id: 7, nombre: 'Jabón blanco en pan', unidad_valor: 200, unidad_medidaid: 3, marcaid: 9, categoriaid: 2, producto: 'Jabón blanco en pan, 200gr (Ala)' },
  { id: 5, nombre: 'Leche entera', unidad_valor: 1, unidad_medidaid: 2, marcaid: 5, categoriaid: 1, producto: 'Leche entera, 1lt (La Serenísima)' },
  { id: 6, nombre: 'Manteca', unidad_valor: 200, unidad_medidaid: 3, marcaid: 6, categoriaid: 1, producto: 'Manteca, 200gr (La Serenísima)' },
  { id: 4, nombre: 'Mermelada de ciruela', unidad_valor: 454, unidad_medidaid: 3, marcaid: 1, categoriaid: 1, producto: 'Mermelada de ciruela, 454gr (Canale)' }
];
let unidad_medida = [
  { id:1, nombre: 'Centimetros Cúbicos', simbolo: 'cm3' }, { id:2, nombre: 'Litro', simbolo: 'lt' },
  { id:3, nombre: 'Gramos', simbolo: 'gr' }, { id:4, nombre: 'Kilogramos', simbolo: 'kg' },
  { id:5, nombre: 'Miligramos', simbolo: 'ml' }, { id:6, nombre: 'Unidad', simbolo: 'un' }
];
let listadoMarcas = [
  { id:1, nombre:'Cañuelas' },{ id:2, nombre:'Dos Hermanos' },{ id:3, nombre:'Canale' },
  { id:4, nombre:'Chango' },{ id:5, nombre:'Sancor' },{ id:6, nombre:'La Serenísima' },
  { id:7, nombre:'La salteña' },{ id:8, nombre:'Purocol' },{ id:9, nombre:'Ala' },
];
let listadoCategorias = [
  { id:1, nombre:'Alimentos/Bebidas' }, { id:2, nombre:'Limpieza' }
];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;

        // wrap in delayed observable to simulate server api call
        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
            .pipe(delay(500))
            .pipe(dematerialize());

        function handleRoute() {
            switch (true) {
                case url.endsWith('/apimock/inventarios') && method === 'POST':
                    return crearInventario();
                case url.endsWith('/apimock/productos') && method === 'GET':
                    return listarProductos();
                case url.endsWith('/apimock/categorias') && method === 'GET':
                    return listarCategorias();
                case url.endsWith('/apimock/unidad-medidas') && method === 'GET':
                    return listarUnidadMedida();
                case url.endsWith('/apimock/marcas') && method === 'GET':
                    return listarMarcas();
                default:
                    // pass through any requests not handled above
                    return next.handle(request);
            }
        }

        // route functions
        /* LISTADO PRODUCTOS */
        function listarProductos() {
          return ok(listadoProductos);
        }
        /* LISTADO CATEGORIAS */
        function listarCategorias() {
          return ok(listadoCategorias);
        }
        /* LISTADO UNIDAD MEDIDA */
        function listarUnidadMedida() {
          return ok(unidad_medida);
        }
        /* LISTADO MARCAS */
        function listarMarcas() {
          return ok(listadoMarcas);
        }

        function crearInventario() {
            const { username, password } = body;
            const user = {id:0};
            if (!user) return error('Username or password is incorrect');
            return ok({
                id: user.id,
                /* username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                token: 'fake-jwt-token' */
            })
        }

        // helper functions

        function ok(body?) {
            return of(new HttpResponse({ status: 200, body }))
        }

        function error(message) {
            return throwError({ error: { message } });
        }

        function unauthorized() {
            return throwError({ status: 401, error: { message: 'Unauthorised' } });
        }

        function isLoggedIn() {
            return headers.get('Authorization') === 'Bearer fake-jwt-token';
        }
    }
}

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};
