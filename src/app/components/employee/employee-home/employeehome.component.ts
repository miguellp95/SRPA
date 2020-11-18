import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, ParamMap} from '@angular/router';
//Services
import { EmployeeService } from 'src/app/services/employee.service';

import { ErrorMessageComponent } from 'src/app/components/error-message/error-message.component';
import { IEmployee } from 'src/app/interfaces/employee.interface'; 
import { DatepickerComponent } from '../../datepicker/datepicker.component';
import { NgForm } from '@angular/forms';
import { MyModalComponent } from '../../my-modal/my-modal.component';

@Component({
  selector: 'app-employee-home',
  templateUrl: './employeehome.component.html',
  styleUrls: ['./employeehome.component.css']
})
export class EmployeeHomeComponent implements OnInit {
  @ViewChild('error_message_tag') error_message_tag : ErrorMessageComponent;
  @ViewChild('datepicker') datepicker : DatepickerComponent;
  @ViewChild('employee_update_form') employee_update_form : NgForm;
  @ViewChild('modalEdit') modalEdit : MyModalComponent;
  
  modalEdit_visible : boolean;
  modalView_visible : boolean;

  employees :IEmployee[] = [];
  employee_selected : IEmployee = null;

  date_born_setted ; 
  show_message : string;

  constructor(
    private employee_sv : EmployeeService,
    private router : Router,
    private active_route : ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.employees  = [];
    this.employee_sv.get_employees()
      .subscribe(
        (res)=>{
          this.employees = res; 
        },
        (err)=>{
          //this.showMessage("Error", err.error);
        }
      );
  }

  getOne(id:string){
    this.employee_sv.getOne_employee(id)
    .subscribe(
      res =>{
        this.employee_selected = res;
      },
      err => this.showMessage('Error', err.error)
    );
  }

  deleteEmployee(id:string){

    if(id){
        this.employee_sv.deleteEmployee(id)
        .subscribe(
          (res) => {
            this.showMessage('Operación exitosa', "El item fue eliminado exitosamente.")
            this.getAll();
          }
        );
    } else {
      this.showMessage('Operación fallida', "No ha seleccionado ningún registro");
    }
  }

  updateEmployee(id:string, data:NgForm){ 
    this.employee_selected = data.value;
    this.employee_selected.date_born = this.getDate();
    
    this.employee_sv.updateEmployee(id, this.employee_selected)
    .subscribe(
      res => {
        this.showMessage("Actualización Exitosa", "Los datos se han guardado correctamente.");
        this.modalEdit.closeModal();
        this.getAll();

      },
      err => this.showMessage("Error" , err.error)
    );
  }

  showMessage(title : string, message : string){
    this.error_message_tag.title = title;
    this.error_message_tag.message_error = message;
    this.error_message_tag.openModal();
  }

  openModalEdit(idEmployee:string){
    this.getOne(idEmployee);
    setTimeout(()=> this.date_born_setted = this.parseDate_(this.employee_selected.date_born));
    this.modalEdit_visible = true;
  }

  closeModalEdit(event){
    this.modalEdit_visible = event;
  }

  openModalView(idEmployee:string){
    this.getOne(idEmployee);
    this.modalView_visible = true; 
  }

  closeModalView(event){
    this.modalView_visible = event;
  }

  getDate(){
    try {
      const { year, month, day } = this.datepicker.getDate();
      return `${year}-${month}-${day}`;
    } catch (error) {
      this.showMessage('Error', error.error);
    } 
  }
  
  parseDate_(date : string){
    const newdate = date.split('-').map(x => parseInt(x));
    return { year : newdate[0], month : newdate[1], day: newdate[2]};
  }
}
