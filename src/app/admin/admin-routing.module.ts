import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { GestorUsuariosComponent } from './gestor-usuarios';


const routes: Routes = [
  { path: '', redirectTo: 'gestor-usuarios', pathMatch: 'full' },
  {
    path: '', component: AdminComponent,
    data: { loading: true, preload: true, breadcrumb: 'Administración', title: 'Administración'/* , rol: ['soporte', 'admin'] */ },
  },{
    path: 'gestor-usuarios', component: GestorUsuariosComponent,
    data: { loading: true, title: 'Gestión de Usuarios'/* , rol: ['soporte', 'admin'] */ },
    //resolve: { usuarios: UsuarioService, roles: RolService, localidades: LocalidadService, permisos: PermisosService, convenios: ConvenioService}
  }/* ,{
    path: 'localidad-abm', component: GestorLocalidadComponent,
    data: { loading: true, title: 'Gestionar Localidades', rol: ['soporte', 'admin'] },
    resolve: { provincias: ProvinciaService, backendLocalidades: BackendLocalidadService, localidadesExtras: LocalidadExtraService}
  } */
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
