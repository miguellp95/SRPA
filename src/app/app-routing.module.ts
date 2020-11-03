import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SrpaUserDetailComponent } from './components/srpa-user/srpa-user-detail/srpa-user-detail.component';
import { SrpaUserHomeComponent } from './components/srpa-user/srpa-user-home/srpa-user-home.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

const routes : Routes = [
    { path : "srpa-user" , component: SrpaUserHomeComponent },
    { path : "srpa-user/:id", component : SrpaUserDetailComponent},
    { path : "" , pathMatch: "full", redirectTo : "/"},
    { path : "**", pathMatch : "full" , redirectTo : "srpa-user"}
]

@NgModule({
    imports : [ RouterModule.forRoot(routes)], 
    exports : [ RouterModule]

})

export class AppRoutingModule { }