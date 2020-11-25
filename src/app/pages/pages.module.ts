import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { LoginComponent } from './login/login.component'; 
import { ComponentsModule } from '../components/components.module';

// Employee
import { EmployeeHomeComponent } from './employee/employeehome.component';

// SRPA Users

import { SrpaUserComponent } from './srpa-user/srpa-user.component';



@NgModule({
  declarations: [PageNotFoundComponent, LoginComponent, EmployeeHomeComponent, SrpaUserComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    ComponentsModule
  ],
  exports : [
    PageNotFoundComponent,
    LoginComponent
  ]
})
export class PagesModule { }
