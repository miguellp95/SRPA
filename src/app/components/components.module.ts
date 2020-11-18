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
//Error Message
import { ErrorMessageComponent } from './error-message/error-message.component';
//Modal
import { ModalComponent, ModalModule } from 'ngb-modal';
//DatePicker
import { DatepickerComponent } from './datepicker/datepicker.component';

//SRPA User
import { SrpaUserHomeComponent } from './srpa-user/srpa-user-home/srpa-user-home.component';
import { SrpaUserDetailComponent } from './srpa-user/srpa-user-detail/srpa-user-detail.component';
//Employee
import { EmployeeHomeComponent } from './employee/employee-home/employeehome.component';
import { EmployeeRegisterComponent } from './employee/employee-register/employee-register.component'; 
import { MyModalComponent } from './my-modal/my-modal.component'; 

@NgModule({
  declarations: [
    SrpaUserHomeComponent,
    SrpaUserDetailComponent,
    NavigationComponent,
    ErrorMessageComponent,
    DatepickerComponent,
    FooterComponent,
    EmployeeHomeComponent, 
    EmployeeRegisterComponent, 
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
    ErrorMessageComponent, 
    DatepickerComponent, 
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
