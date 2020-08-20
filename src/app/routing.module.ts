import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guard/auth.guard';
import { AppLayoutComponent } from './shared';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'productos',
    component: AppLayoutComponent,
    canActivate: [AuthGuard],
    data: { title: 'Productos', breadcrumb: 'Productos' },
    loadChildren: () => import('./productos/productos.module').then(m => m.ProductosModule)
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];



@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class RoutingModule { }
