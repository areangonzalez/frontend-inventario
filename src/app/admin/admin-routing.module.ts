import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { AdminComponent } from './admin.component';
import { GestorUsuariosComponent } from './gestor-usuarios';
import { LocalidadService, PermisosService, RolService, UsuarioService } from '../core/service';
import { AuthGuard } from '../core/guard/auth.guard';


const routes: Routes = [
  /* {  path: '', redirectTo: 'gestor-usuarios', pathMatch: 'full' }, */
  {
    path: '', component: AdminComponent,
    canActivate: [AuthGuard],
    data: { loading: true, preload: true, breadcrumb: 'Administración', title: 'Administración'/* , rol: ['soporte', 'admin'] */ },
  },{
    path: 'gestor-usuarios', component: GestorUsuariosComponent,
    canActivate: [AuthGuard],
    data: { loading: true, title: 'Gestión de Usuarios'/* , rol: ['soporte', 'admin'] */ },
    resolve: { usuarios: UsuarioService, permisos: PermisosService, localidades: LocalidadService, roles: RolService }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, UsuarioService, PermisosService, LocalidadService, RolService]
})
export class AdminRoutingModule { }
