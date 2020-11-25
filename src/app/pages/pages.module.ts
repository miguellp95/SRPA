import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';


import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { AccessComponent } from './access/access.component';
import { LoginComponent } from './login/login.component'; 
import { ComponentsModule } from '../components/components.module';



@NgModule({
  declarations: [PageNotFoundComponent, AccessComponent, LoginComponent],
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
