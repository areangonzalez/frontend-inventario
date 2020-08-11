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
            .pipe(delay(1500))
            .pipe(dematerialize());

        function handleRoute() {
            switch (true) {
                case url.endsWith('/apimock/inventarios') && method === 'POST':
                    return crearInventario();
                case url.endsWith('/apimock/inventarios') && method === 'GET':
                    return listarInventario();
                case url.endsWith('/apimock/localidads') && method === 'GET':
                    return listarLocalidades();
                case url.endsWith('/apimock/tipo-egresos') && method === 'GET':
                    return listarTipoEgresos();
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
                case url.endsWith('/apimock/comprobantes') && method === 'GET':
                    return listarComprobantes();
                case url.endsWith('/apimock/egresos') && method === 'GET':
                    return listarEgresos();
                case url.endsWith('/apimock/egresos') && method === 'POST':
                    return crearEgreso();
                case url.match(/\/apimock\/egresos\/\d+$/) && method === 'GET':
                    return egresoPorId();
                case url.match(/\/apimock\/comprobantes\/\d+$/) && method === 'GET':
                    return comprobantePorId();
                case url.match(/\/apimock\/comprobantes\/registrar-producto-pendiente\/\d+$/) && method === 'PUT':
                  return registrarProductoPendiente();
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
        /* LISTADO INVENTARIO */
        function listarInventario() {
          let page: number = parseInt(request.params.get("page"));
          let pageSize: number = (request.params.get("pagesize")) ? parseInt(request.params.get("pagesize")) : 2;

          let inventario = { pagesize: pageSize, pages: 1, total_filtrado: 2, cantidad_vencidos: 4, cantidad_faltantes: 3,
            cantidad_defectuosos: 3, cantidad_stock: 5,
            resultado: [
              { productoid:7, cantidad: 3000, producto: 'Papel hig. Hoja simple, 320 ml', categoria: 'Limpieza', fecha_vencimiento: '2025-06-25' },
              { productoid:5, cantidad: 1000, producto: 'Alcohol, 250 cc', categoria: 'Limpieza', fecha_vencimiento: '2022-03-20' },
              { productoid:6, cantidad: 2500, producto: 'jabón blanco en pan, 200 gr', categoria: 'Limpieza', fecha_vencimiento: '2021-03-20' },
              { productoid:2, cantidad: 3500, producto: 'Azucar blanca, 1 kg', categoria: 'Alimentos / Bebidas', fecha_vencimiento: '2020-12-12' },
              { productoid:3, cantidad: 4000, producto: 'Fideos secos guiseros, 500 gr', categoria: 'Alimentos / Bebidas', fecha_vencimiento: '2020-08-12' },
              { productoid:1, cantidad: 2000, producto: 'Aceite de girasol, 900 ml', categoria: 'Alimentos / Bebidas', fecha_vencimiento: '2020-07-23' },
              { productoid:4, cantidad: 6000, producto: 'Leche entera, 1 lt', categoria: 'Alimentos / Bebidas', fecha_vencimiento: '2020-06-13' },
            ]
          };

          let listado = paginar(inventario, inventario.resultado, page, pageSize)

          if (listado) {
            return ok(listado);
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

        /* LISTADO LOCALIDAD */
        function listarLocalidades() {
          return ok([{id:1, nombre: "Cipolletti"}, {id:2, nombre:"Viedma"}]);
        }
        /* LISTADO TIPO EGRESO */
        function listarTipoEgresos() {
          return ok([{id:1, nombre: "Modulo"}, {id:2, nombre:"Bulto"}]);
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
          if (nuevoId) {
            return ok({id:nuevoId})
          }else{
            return error("No se a podido crear el producto");
          }
        }
        /* LISTADO DE COMPROBANTE INGRESO */
        function listarComprobantes() {
          let page: number = parseInt(request.params.get("page"));
          let pageSize: number = (request.params.get("pagesize")) ? parseInt(request.params.get("pagesize")) : 2;

          let comprobante = {
            pagesize: pageSize, pages: 0, total_filtrado: 9, resultado: [
            { id:8, nro_remito: '0002-00000008', producto_cant_total: 1000, fecha_emision: '2020-06-03' },
            { id:7, nro_remito: '0002-00000007', producto_cant_total: 2500, fecha_emision: '2020-05-28' },
            { id:6, nro_remito: '0002-00000006', producto_cant_total: 3600, fecha_emision: '2020-05-21' },
            { id:5, nro_remito: '0002-00000005', producto_cant_total: 2000, fecha_emision: '2020-04-02' },
            { id:4, nro_remito: '0002-00000004', producto_cant_total: 1100, fecha_emision: '2020-03-23' },
            { id:3, nro_remito: '0002-00000003', producto_cant_total: 2000, fecha_emision: '2020-03-10' },
            { id:2, nro_remito: '0002-00000002', producto_cant_total: 3000, fecha_emision: '2020-01-22' },
            { id:1, nro_remito: '0002-00000001', producto_cant_total: 2100, fecha_emision: '2020-01-20' }
          ]};

          // pagino el listado
          let listaComprobantes = paginar(comprobante, comprobante.resultado, page, pageSize)
          // Creo la respuesta
          if (comprobante) {
            return ok(comprobante);
          }else {
            return error("No se puede obtener listado de productos");
          }
        }
        /* COMPROBANTE POR ID */
        function comprobantePorId() {
          let urlParts = request.url.split('/');
          let id = parseInt(urlParts[urlParts.length - 1]);

          let listado = JSON.parse(localStorage.getItem("comprobante"));
          if (listado) {
            if (listado.length > 0) {
              comprobante = listado;
            }
          }

          if (id) {
            return ok(comprobante);
          }else {
            return error("Este comrpobante no existe");
          }
        }

        /* REGISTRAR PRODUCTO PENDIENTES */
        function registrarProductoPendiente() {
          let urlParts = request.url.split('/');
          let id = parseInt(urlParts[urlParts.length - 1]);
          let params = body;

          let listaProductos = comprobante["lista_producto"];
          let productoNuevo: any;
          let indice: number = 0;

          for (let i = 0; i < listaProductos.length; i++) {
            if ( listaProductos[i].fecha_vencimiento == params["fecha_vencimiento"] && listaProductos[i].productoid == params["productoid"]) {
              productoNuevo  = Object.assign({}, listaProductos[i]);

              productoNuevo['falta'] = true;
              productoNuevo['fecha_vencimiento'] = "";
            } else if (listaProductos[i].fecha_vencimiento == "" && listaProductos[i].productoid == params['productoid'] ) {
              indice = i;
              listaProductos[i].cantidad = params['cantidad'];
              listaProductos[i].fecha_vencimiento = params['fecha_vencimiento'];
              listaProductos[i].falta = false;
            }
          }
          if (params['falta'] === true) {
            listaProductos.push(productoNuevo);
          }

          // modifico el listado de productos del comprobante
          comprobante["lista_producto"] = listaProductos;
          // lo guardo en local storage al comprobante
          localStorage.setItem('comprobante', JSON.stringify(comprobante));

          let respuesta = {
            message: "Se modifica el comprobante",
            comprobanteid: 1
          };

          if (id) {
            return ok(respuesta);
          } else {
            return error("Este comrpobante no existe");
          }
        }

        /* LISTADO DE COMPROBANTE EGRESO */
        function listarEgresos() {
          let page: number = parseInt(request.params.get("page"));
          let pageSize: number = (request.params.get("pagesize")) ? parseInt(request.params.get("pagesize")) : 2;

          let egresos = {
            pagesize: pageSize, pages: 0, total_filtrado: 9, resultado: [
              { id: 1, fecha: "2019-03-03", origen: "un origen", producto_cant_total: 300, destino_nombre: "Un destino",
              destino_localidadid: 2626, destino_localidad: "Viedma", nro_acta: "0001" },
            { id: 2, fecha: "2019-04-04", origen: "un origen", producto_cant_total: 200, destino_nombre: "Un destino",
              destino_localidadid: 2626, destino_localidad: "Viedma", nro_acta: "0002" },
            { id: 3, fecha: "2019-05-05", origen: "un origen", producto_cant_total: 600, destino_nombre: "Un destino",
              destino_localidadid: 2626, destino_localidad: "Viedma", nro_acta: "0003" }
          ]};

          // pagino el listado
          let listado = paginar(egresos, egresos.resultado, page, pageSize)
          // Creo la respuesta
          if (listado) {
            return ok(listado);
          }else {
            return error("No se puede obtener listado de productos");
          }
        }
        /* CREAR UN ACTA */
        function crearEgreso() {
          let acta = body;
          console.log(acta);

          if (acta['lista_producto'].length > 0) {
            return ok({id: 7});
          }else{
            return error("Error no se pudo guardar los datos");
          }
        }
        /* OBTENER UN ACTA POR SU ID */
        function egresoPorId() {
          let urlParts = request.url.split('/');
          let id = parseInt(urlParts[urlParts.length - 1]);

          let acta: any = { fecha: "2020-03-03", origen: "Origen 1", destino_nombre: "Destino 1", destino_localidadid: 2626,
            descripcion: "Esto es una descripcion de egreso", nro_acta: "456-123", tipo_egresoid: 1, fecha_inicial: "2020-08-03",
            id: 4, suscrito: "algun suscrito", tipo_egreso: "Modulo", producto_cant_total: 2, destino_localidad: "Rio Colorado",
            lista_producto: [
              { cantidad: "20", producto: "Arroz blanco, 1kg (Dos hermanos)" },
              { cantidad: "20", producto: "Fideos secos guiseros, 500 gr (Canale)" },
              { cantidad: "20", producto: "Aceite de girasol, 900 ml (Legítimo)" },
              { cantidad: "20", producto: "Azucar blanca, 1 kg (Ledesma)" },
              { cantidad: "20", producto: "Leche entera, 1 lt (Sancor)" } ]
            };

          if (id){
            return ok(acta);
          }else{
            error("error al obtener el acta");
          }
        }

        // helper functions

        function ok(body?) {
            return of(new HttpResponse({ status: 200, body }))
        }

        function error(message) {
            return throwError({ status: 403, error: { message: message } });
        }

        function unauthorized() {
            return throwError({ status: 401, error: { message: 'Unauthorised' } });
        }

        function isLoggedIn() {
            return headers.get('Authorization') === 'Bearer fake-jwt-token';
        }

        function paginar(listadoOrigen: any, listaEncontrados: any, page: number, pageSize: number) {
          let totalFiltrado:number = listaEncontrados.length;
          let total:number = totalFiltrado/pageSize;
          let numEntero = Math.floor(total);
          let totalPagina:number = (total > numEntero) ? numEntero + 1 : total;

          listadoOrigen.total_filtrado = listaEncontrados.length;
          listadoOrigen.pages = totalPagina;

          if (page > 0) {
            page = page;
            let pageStart = page * pageSize;
            let pageEnd = pageStart + pageSize;
            listadoOrigen.resultado = listaEncontrados.slice(pageStart, pageEnd);
          }else{
            listadoOrigen.resultado = listaEncontrados.slice(0,pageSize);
          }

          return listadoOrigen;
        }
    }
}

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};
