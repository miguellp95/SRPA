import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core'; 

import { AppComponent } from './app.component'; 
import { AppRoutingModule } from './app-routing.module';
import { PagesModule } from './pages/pages.module';
import { ComponentsModule } from "./components/components.module";  
import { DatepickerComponent } from './components/datepicker/datepicker.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    ComponentsModule  
  ], 
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
