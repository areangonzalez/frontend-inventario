import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { AdminComponent } from './admin.component';
import { GestorUsuariosComponent } from './gestor-usuarios';
import { InfoAdicionalComponent } from './info-adicional';
import { LocalidadService, PermisosService, ProveedorAbmService, RolService, UsuarioService, MarcaAbmService } from '../core/service';
import { AuthGuard } from '../core/guard/auth.guard';
import { ProvedorComponent } from './provedor';
import { MarcaComponent } from './marca';


const routes: Routes = [
  {  path: '', redirectTo: 'gestor-usuarios', pathMatch: 'full' },
  {
    path: '', component: AdminComponent,
    canActivate: [AuthGuard],
    data: { loading: true, preload: true, breadcrumb: 'Administración', title: 'Administración', rol: ['soporte', 'admin'] },
  },{
    path: 'gestor-usuarios', component: GestorUsuariosComponent,
    canActivate: [AuthGuard],
    data: { loading: true, title: 'Gestión de Usuarios', rol: ['soporte', 'admin'] },
    resolve: { usuarios: UsuarioService, permisos: PermisosService, localidades: LocalidadService, roles: RolService }
  },{
    path: 'info-adicional', component: InfoAdicionalComponent,
    canActivate: [AuthGuard],
    data: { loading: true, title: 'Información Adicional', rol: ['soporte', 'admin'] },
    resolve: { permisos: PermisosService }
  },{
    path: 'proveedor', component: ProvedorComponent,
    canActivate: [AuthGuard],
    data: { loading: true, title: 'Proveedores', rol: ['soporte', 'admin'] },
    resolve: { proveedores: ProveedorAbmService }
  }
  ,{
    path: 'marca', component: MarcaComponent,
    canActivate: [AuthGuard],
    data: { loading: true, title: 'Marcas', rol: ['soporte', 'admin'] },
    resolve: { marcas: MarcaAbmService }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, UsuarioService, PermisosService, LocalidadService, RolService]
})
export class AdminRoutingModule { }
