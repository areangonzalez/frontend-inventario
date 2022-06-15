import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from '../shared';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import {
  AdministrarRolPermisoComponent, BusquedaAvanzadaComponent, DatosPersonaComponent, DatosUsuarioComponent,
  UsuarioInfoComponent,
  AgregarUsuarioModalContent, AgregarUsuarioModalComponent, AltaUsuarioModalContent, AltaUsuarioModalComponent,
  BorrarPermisoUsuarioModalContent, BorrarPermisoUsuarioModalComponent, ConfigurarUsuarioModalContent, ConfigurarUsuarioModalComponent,
  ConfiguracionTabComponent,
  BajaUsuarioModalContent, BajaUsuarioModalComponent,
  UsuariosComponent, UsuarioPermisoListaComponent,
  ProvedorListaComponent, MarcaListaComponent, AgregarEditarProveedorContent, AgregarEditarProveedorComponent, AgregarEditarMarcaComponent,AgregarEditarMarcaContent
} from "./componentes";
import { GestorUsuariosComponent } from './gestor-usuarios';
import { InfoAdicionalComponent } from './info-adicional';
import { ProvedorComponent } from './provedor';
import { ProveedorFormComponent } from './componentes/form/proveedor-form.component';
import { AltaBajaProvedorComponent } from './componentes/modal/alta-baja-provedor.component';
import { MarcaComponent } from './marca';
import { MarcaFormComponent } from './componentes/form/marca-form.component';


@NgModule({
  declarations: [
    AdminComponent,
    AdministrarRolPermisoComponent, BusquedaAvanzadaComponent, DatosPersonaComponent, DatosUsuarioComponent,
    UsuarioInfoComponent,
    UsuariosComponent, UsuarioPermisoListaComponent,
    AgregarUsuarioModalContent, AgregarUsuarioModalComponent, AltaUsuarioModalContent, AltaUsuarioModalComponent, BajaUsuarioModalContent, BajaUsuarioModalComponent, BorrarPermisoUsuarioModalContent, BorrarPermisoUsuarioModalComponent, ConfigurarUsuarioModalContent, ConfigurarUsuarioModalComponent,
    ConfiguracionTabComponent,
    GestorUsuariosComponent,
    InfoAdicionalComponent,
    ProvedorComponent,
    ProvedorListaComponent,MarcaListaComponent, AgregarEditarProveedorContent, AgregarEditarProveedorComponent, ProveedorFormComponent, AltaBajaProvedorComponent, MarcaComponent, AgregarEditarMarcaComponent, MarcaFormComponent,AgregarEditarMarcaContent
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
