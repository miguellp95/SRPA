import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { EmployeeService } from 'src/app/services/employee.service';
import { IEmployee } from '../../../interfaces/employee.interface';
import { DatepickerComponent } from '../../datepicker/datepicker.component';
import { ErrorMessageComponent } from '../../error-message/error-message.component';

@Component({
  selector: 'app-employee-register',
  templateUrl: './employee-register.component.html',
  styleUrls: ['./employee-register.component.css']
})
export class EmployeeRegisterComponent implements OnInit {

  @ViewChild('datepicker') datepicker : DatepickerComponent;
  @ViewChild('error_message_tag') error_message_tag : ErrorMessageComponent;

  employee : IEmployee = null;
  password_confirmation:string = null;

  error_message : string = "";

  constructor(private employee_sv : EmployeeService, private router : Router) { }

  ngOnInit(): void {
  }

  saveEmployee(form:NgForm){

      this.employee = form.value;
      this.password_confirmation = form.value.password_confirmation; 

      if(this.employee.password == this.password_confirmation){
        this.employee.date_born = this.getDate();
  
        this.employee_sv.postEmployee(this.employee)
          .subscribe(
            (res) => {
              this.showMessage("Operacion exitosa.", "Se registró a " + this.employee.first_name + " satisfactoriamente.");
              this.employee = null;
              this.password_confirmation = null;
              this.datepicker.model = null;
              form.reset();
            },
            err => {
              this.handlerError(err.error);
            }
          ); 
      } else {
        this.handlerError("La contraseña de confirmación no coincide.");
      }
  }

  showMessage(title: string, message : string){
    this.error_message_tag.title = title;
    this.error_message = message;
    this.error_message_tag.openModal();
  }
  handlerError(error){
    this.error_message_tag.title = "Error";
    this.error_message = error;
    this.error_message_tag.openModal();
  }

  getDate():any{
    try {
      const { year, month, day } = this.datepicker.getDate();
      return `${year}-${month}-${day}`;
    } catch (error) {
      this.handlerError(error.error);
    } 
  }
  
  parseDate(date : string){
    const newdate = date.split('-').map(x => parseInt(x));
    return { year : newdate[0], month : newdate[1], day: newdate[2]};
  }
 
}
