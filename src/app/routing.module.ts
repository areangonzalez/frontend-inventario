import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'productos',
    data: { title: 'Productos' },
    loadChildren: () => import('./productos/productos.module').then(m => m.ProductosModule)
  },
  { path: '**', redirectTo: 'productos', pathMatch: 'full' },
];



@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class RoutingModule { }
