import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';



@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, NgbModule, LoginRoutingModule
  ]
})
export class LoginModule { }
