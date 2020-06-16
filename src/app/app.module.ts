import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbModule, NgbDatepickerI18n, NgbTooltipModule, NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

import { RoutingModule } from './routing.module';

import { AppComponent } from './app.component';
import {
  SharedModule, CabeceraComponent, CustomDatepickerI18n, NgbDateARParserFormatter,
  BreadcrumbComponent
} from "./shared";
import { BreadcrumbsService } from './core/service';


@NgModule({
  declarations: [
    AppComponent,
    CabeceraComponent,
    BreadcrumbComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    NgbTooltipModule,
    RoutingModule,
    SharedModule
  ],
  providers: [
    { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n },
    { provide: NgbDateParserFormatter, useClass: NgbDateARParserFormatter },
    BreadcrumbsService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
