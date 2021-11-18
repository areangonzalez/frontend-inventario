import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from '../shared';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import {
  AdministrarRolPermisoComponent, BusquedaAvanzadaComponent, DatosPersonaComponent, DatosUsuarioComponent,
  UsuarioInfoComponent,
  AgregarUsuarioModalContent, AgregarUsuarioModalComponent, AltaUsuarioModalContent, AltaUsuarioModalComponent, BorrarPermisoUsuarioModalContent, BorrarPermisoUsuarioModalComponent, ConfigurarUsuarioModalContent, ConfigurarUsuarioModalComponent,
  ConfiguracionTabComponent,
  BajaUsuarioModalContent,
  BajaUsuarioModalComponent,
  UsuariosComponent,
  UsuarioPermisoListaComponent
} from "./componentes";
import { GestorUsuariosComponent } from './gestor-usuarios';


@NgModule({
  declarations: [
    AdminComponent,
    AdministrarRolPermisoComponent, BusquedaAvanzadaComponent, DatosPersonaComponent, DatosUsuarioComponent,
    UsuarioInfoComponent,
    UsuariosComponent, UsuarioPermisoListaComponent,
    AgregarUsuarioModalContent, AgregarUsuarioModalComponent, AltaUsuarioModalContent, AltaUsuarioModalComponent, BajaUsuarioModalContent, BajaUsuarioModalComponent, BorrarPermisoUsuarioModalContent, BorrarPermisoUsuarioModalComponent, ConfigurarUsuarioModalContent, ConfigurarUsuarioModalComponent,
    ConfiguracionTabComponent,
    GestorUsuariosComponent
  ],
  imports: [
    NgbModule,
    NgSelectModule,
    SharedModule,
    AdminRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdminModule {}
