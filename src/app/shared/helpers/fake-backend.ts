import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

let productos = [
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

// Comprobar listado de productos
function getProductos(){
  let listaProductos = productos;
  if(localStorage.getItem("productos")) {
    let productosStorage: any[] = JSON.parse(localStorage.getItem("productos"));
    for (let i = 0; i < productosStorage.length; i++) {
      let existe = false;
      for (let j = 0; j < listaProductos.length; j++) {
        if (productosStorage[i].id === listaProductos[j].id){
          listaProductos[j] = productosStorage[i]; // si se edito
          existe = true;
        }
      }
      if (!existe) {
        listaProductos.push(productosStorage[i]);
      }
    }
  }
  return listaProductos;
}
/**
 * realizo una busqueda dentro de un listado para obtener sus datos
 * @param id identificador de la busqueda
 * @param listado listado a buscar
 * @return objeto que contiene los datos encontrados
 */
function getDatosListado(id:number, listado:any) {
  for (let i = 0; i < listado.length; i++) {
    if (listado[i].id == id) {
      return listado[i];
    }
  }
}

function ultimoID(listado:any) {
  return listado.length + 1;
}

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;
        const listadoProductos = getProductos();

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
                case url.endsWith('/apimock/productos') && method === 'POST':
                    return crearProducto();
                case url.endsWith('/apimock/categorias') && method === 'GET':
                    return listarCategorias();
                case url.endsWith('/apimock/unidad-medidas') && method === 'GET':
                    return listarUnidadMedida();
                case url.endsWith('/apimock/marcas') && method === 'GET':
                    return listarMarcas();
                case url.match(/\/apimock\/destinatarios\/\d+$/) && method === 'GET':
                    return comprobantePorId();
                default:
                    // pass through any requests not handled above
                    return next.handle(request);
            }
        }

        // route functions
        /* LISTADO PRODUCTOS */
        function listarProductos() {
          if (listadoProductos) {
            return ok(listadoProductos);
          }else {
            return error("No se puede obtener listado de productos");

          }
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
            let comprobante = body;
            if (!comprobante) return error('Error al guardar');
            return ok({
                id: 1,
            })
        }
        /* CREAR PRODUCTO */
        function crearProducto() {
          let producto = body;
          let nuevoId = ultimoID(listadoProductos);
          let marca = getDatosListado(producto['marcaid'], listadoMarcas);
          let unidadMedida = getDatosListado(producto['marcaid'], unidad_medida);
          let nombreProducto = producto['nombre'] + ', '+ producto['unidad_valor'] + unidadMedida['simbolo'] + ' (' + marca['nombre'] + ')';

          listadoProductos.push({
            id: nuevoId,
            nombre: producto['nombre'],
            unidad_valor: producto['unidad_valor'],
            unidad_medidaid: producto['unidad_medidaid'],
            marcaid: producto['marcaid'],
            categoriaid: producto['categoriaid'],
            producto: nombreProducto
          });

          localStorage.setItem('productos', JSON.stringify(listadoProductos));
          console.log("nuevo id: ",nuevoId);
          if (nuevoId) {
            return ok({id:nuevoId})
          }else{
            error("No se a podido crear el producto");
          }
        }
        /* COMPROBANTE POR ID */
        function comprobantePorId() {
          let urlParts = request.url.split('/');
          let id = parseInt(urlParts[urlParts.length - 1]);
          let comprobante = {
            "id": 1, "nro_remito": "0001-00001", "fecha_inicial": "2019-03-03", "fecha_emision": "2019-03-03", "total": 7500,
            "proveedorid": 1, "descripcion": "Esto es una descripcion hecha por fixture 1", "producto_cant_total": "12",
            "lista_producto": [
              { "comprobanteid": 1, "productoid": 1, "fecha_vencimiento": "2019-03-03", "precio_unitario": 100, "defectuoso": true, "egresoid": "",
                    "depositoid": "", "falta": false, "stock": false, "vencido": true, "cantidad": "1", "precio_total": 100, "nombre": "Aceite de girasol",
                    "codigo": "A300", "unidad_valor": "1,5", "unidad_medidaid": 3, "marcaid": 1, "categoriaid": 1, "marca": "Arcor", "unidad_medida": "lt",
                    "producto": "Aceite de girasol, 1,5lt (Arcor)" },
                { "comprobanteid": 1, "productoid": 2, "fecha_vencimiento": "2019-03-20", "precio_unitario": 300, "defectuoso": false, "egresoid": 2,
                    "depositoid": "", "falta": false, "stock": false, "vencido": true, "cantidad": "2", "precio_total": 600, "nombre": "Aceite de girasol",
                    "codigo": "A301", "unidad_valor": "900", "unidad_medidaid": 4, "marcaid": 1, "categoriaid": 1, "marca": "Arcor", "unidad_medida": "ml",
                    "producto": "Aceite de girasol, 900ml (Arcor)" }]};
          console.log("comrpobante id: ", id);

          return ok(comprobante);
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
