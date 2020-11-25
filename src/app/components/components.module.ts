//Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

//Third-parties
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

//Services
import { SrpaUserService } from 'src/app/services/srpa-user.service';
import { EmployeeService } from 'src/app/services/employee.service';

//Components

//Navigation
import { NavigationComponent } from './navigation/navigation.component';
//Footer
import { FooterComponent } from './footer/footer.component';

//Component tools

//Show Modal Message
import { ShowMessageComponent } from './show-message/show-message.component';
//Modal
import { ModalComponent, ModalModule } from 'ngb-modal';
//DatePicker
import { DatepickerComponent } from './datepicker/datepicker.component';
 
import { MyModalComponent } from './my-modal/my-modal.component';

@NgModule({
  declarations: [ 
    NavigationComponent,
    ShowMessageComponent,
    DatepickerComponent,
    FooterComponent, 
    MyModalComponent 
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    ModalModule,
    NgbModule
  ],
  exports: [
    NavigationComponent, 
    ShowMessageComponent, 
    DatepickerComponent,
    MyModalComponent,
    FooterComponent
  ],
  providers: [
    SrpaUserService, 
    EmployeeService
  ],
  entryComponents: [
    ModalComponent
  ],
  bootstrap: [
    DatepickerComponent
  ],
})
export class ComponentsModule {}
