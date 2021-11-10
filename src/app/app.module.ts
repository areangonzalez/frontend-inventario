import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID } from '@angular/core';
import es from "@angular/common/locales/es";
import { registerLocaleData } from "@angular/common";
import { NgbModule, NgbDatepickerI18n, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { SelfBuildingSquareSpinnerModule } from "angular-epic-spinners";

import { RoutingModule } from './routing.module';

import { AppComponent } from './app.component';
import {
  SharedModule,
  AppLayoutComponent,
  AdminLayoutComponent,
  LoaderComponent, CustomDatepickerI18n, NgbDateARParserFormatter,
  BreadcrumbComponent,
  // fakeBackendProvider,
  ErrorInterceptor
} from "./shared";
import { BreadcrumbsService } from './core/service';
import { JwtInterceptor } from './shared/helpers/jwt-interceptors';

registerLocaleData(es);

@NgModule({
  declarations: [
    AppComponent,
    AppLayoutComponent,
    AdminLayoutComponent,
    LoaderComponent,
    BreadcrumbComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    HttpClientModule,
    SelfBuildingSquareSpinnerModule,
    RoutingModule,
    SharedModule
  ],
  providers: [
    { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n },
    { provide: NgbDateParserFormatter, useClass: NgbDateARParserFormatter },
    { provide: LOCALE_ID, useValue: 'es-AR' },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    Title,
    BreadcrumbsService

    // fake backend
    // fakeBackendProvider
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
