import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
 
import { SrpaUserComponent } from './pages/srpa-user/srpa-user.component';

import { EmployeeHomeComponent } from "src/app/pages/employee/employeehome.component";

import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component'; 
import { LoginComponent } from './pages/login/login.component';
import { LoginGuard } from './login.guard';

const routes : Routes = [
    { path: "login", component : LoginComponent},
    { path : "srpa-user" , component: SrpaUserComponent , canActivate : [LoginGuard] },
    { path : "employee" , component : EmployeeHomeComponent, canActivate : [LoginGuard]}, 
    { path : "page-not-found", component : PageNotFoundComponent },
    { path : "**", pathMatch : "full" , redirectTo : "page-not-found"}
]

@NgModule({
    imports : [ RouterModule.forRoot(routes)], 
    exports : [ RouterModule]

})

export class AppRoutingModule { }