import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductosComponent } from './productos.component';
import { StockComponent } from './menu/vista/stock/stock.component';
import { IngresoComponent } from './menu/vista/ingreso/ingreso.component';
import { EgresoComponent } from './menu/vista/egreso/egreso.component';
import { ProductoService, CategoriaService, UnidadMedidaService, MarcaService, EgresoService, ComprobanteService, InventarioService, LocalidadService } from '../core/service';

const routes: Routes = [
  {
    path: '',
    //data: {title: 'Productos'},
    component: ProductosComponent,
    children: [
      {
        path: 'stock', component: StockComponent,
        data: { loading: true, breadcrumb: 'Stock' }
      },
      {
        path: 'ingreso', component: IngresoComponent,
        data: { loading: true, breadcrumb: 'Ingreso' },
        resolve: {
          ingreso: ComprobanteService, productos: ProductoService, categorias: CategoriaService,
          unidadMedida: UnidadMedidaService, marcas: MarcaService
        }
      },
      {
        path: 'egreso', component: EgresoComponent,
        data: { loading: true, breadcrumb: 'Egreso' },
        resolve: { egresos: EgresoService, inventario: InventarioService, localidad: LocalidadService }
      },
      { path: '**', redirectTo: 'stock', pathMatch: 'full' },
    ]
  },
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  providers: [ComprobanteService, ProductoService, CategoriaService, UnidadMedidaService, MarcaService, EgresoService, InventarioService, LocalidadService]
})
export class ProductosRoutingModule { }
