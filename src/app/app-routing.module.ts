import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SrpaUserDetailComponent } from './components/srpa-user/srpa-user-detail/srpa-user-detail.component';
import { SrpaUserHomeComponent } from './components/srpa-user/srpa-user-home/srpa-user-home.component';

import { EmployeeHomeComponent } from "src/app/components/employee/employeehome.component";

import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component'; 
import { LoginComponent } from './pages/login/login.component';
import { LoginGuard } from './login.guard';

const routes : Routes = [
    { path: "login", component : LoginComponent},
    { path : "srpa-user" , component: SrpaUserHomeComponent, canActivate : [LoginGuard] },
    { path : "srpa-user/:id", component : SrpaUserDetailComponent, canActivate : [LoginGuard]},
    { path : "employee" , component : EmployeeHomeComponent, canActivate : [LoginGuard]}, 
    { path : "page-not-found", component : PageNotFoundComponent },
    { path : "**", pathMatch : "full" , redirectTo : "page-not-found"}
]

@NgModule({
    imports : [ RouterModule.forRoot(routes)], 
    exports : [ RouterModule]

})

export class AppRoutingModule { }