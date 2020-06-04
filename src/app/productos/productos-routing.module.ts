import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductosComponent } from './productos.component';
import { StockComponent } from './menu/vista/stock/stock.component';
import { IngresoComponent } from './menu/vista/ingreso/ingreso.component';
import { EgresoComponent } from './menu/vista/egreso/egreso.component';

const routes: Routes = [
  {
    path: '',
    //data: {title: 'Productos'},
    component: ProductosComponent,
    children: [
      {
        path: 'stock', component: StockComponent
      },
      {
        path: 'ingreso', component: IngresoComponent
      },
      {
        path: 'egreso', component: EgresoComponent
      },
      { path: '**', redirectTo: 'stock', pathMatch: 'full' },
    ]
  },
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ProductosRoutingModule { }
