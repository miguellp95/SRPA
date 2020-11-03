import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SrpaUserService } from 'src/app/services/srpa-user.service';
import { NavigationComponent } from './navigation/navigation.component';
import { SrpaUserHomeComponent } from './srpa-user/srpa-user-home/srpa-user-home.component';
import { SrpaUserDetailComponent } from './srpa-user/srpa-user-detail/srpa-user-detail.component';
import { ErrorMessageComponent } from './error-message/error-message.component';
import { ModalComponent, ModalModule } from 'ngb-modal';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    SrpaUserHomeComponent,
    SrpaUserDetailComponent,
    NavigationComponent,
    ErrorMessageComponent,
    DatepickerComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    ModalModule,
    NgbModule
  ],
  exports: [NavigationComponent, ErrorMessageComponent, DatepickerComponent, FooterComponent],
  providers: [SrpaUserService],
  entryComponents: [ModalComponent],
  bootstrap: [DatepickerComponent],
})
export class ComponentsModule {}
