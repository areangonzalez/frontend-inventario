import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductosComponent } from './productos.component';
import { StockComponent } from './menu/vista/stock/stock.component';
import { IngresoComponent } from './menu/vista/ingreso/ingreso.component';
import { EgresoComponent } from './menu/vista/egreso/egreso.component';
import { ProductoService, CategoriaService, UnidadMedidaService, MarcaService, EgresoService, ComprobanteService, InventarioService, LocalidadService, TipoEgresoService, InventarioActaService } from '../core/service';
import { AuthGuard } from '../core/guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    //data: {title: 'Productos'},
    component: ProductosComponent,
    children: [
      {
        path: 'stock', component: StockComponent,
        canActivate: [AuthGuard],
        data: { loading: true, breadcrumb: 'Stock', title: 'Stock' },
        resolve: { inventario: InventarioService, categorias: CategoriaService, unidadMedida: UnidadMedidaService, marcas: MarcaService }
      },
      {
        path: 'ingreso', component: IngresoComponent,
        canActivate: [AuthGuard],
        data: { loading: true, breadcrumb: 'Ingreso', title: 'Ingreso' },
        resolve: {
          ingreso: ComprobanteService, productos: ProductoService, categorias: CategoriaService,
          unidadMedida: UnidadMedidaService, marcas: MarcaService
        }
      },
      {
        path: 'egreso', component: EgresoComponent,
        canActivate: [AuthGuard],
        data: { loading: true, breadcrumb: 'Egreso', title: 'Egreso' },
        resolve: { egresos: EgresoService, inventario: InventarioActaService, localidad: LocalidadService, tipoEgreso: TipoEgresoService }
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
  providers: [AuthGuard, ComprobanteService, ProductoService, CategoriaService, UnidadMedidaService, MarcaService, EgresoService, InventarioService, LocalidadService, TipoEgresoService, InventarioActaService]
})
export class ProductosRoutingModule { }
