import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'productos',
    data: { title: 'Productos', breadcrumb: 'Productos' },
    loadChildren: () => import('./productos/productos.module').then(m => m.ProductosModule)
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];



@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class RoutingModule { }
