import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, ParamMap} from '@angular/router';
//Services
import { EmployeeService } from 'src/app/services/employee.service';

import { ShowMessageComponent } from 'src/app/components/show-message/show-message.component';
import { IEmployee } from 'src/app/interfaces/employee.interface'; 
import { DatepickerComponent } from '../datepicker/datepicker.component';
import { NgForm } from '@angular/forms';
import { MyModalComponent } from '../my-modal/my-modal.component';

@Component({
  selector: 'app-employee-home',
  templateUrl: './employeehome.component.html',
  styleUrls: ['./employeehome.component.css']
})
export class EmployeeHomeComponent implements OnInit {
  @ViewChild('employee_update_form') employee_update_form : NgForm;
  @ViewChild('employee_register_form') employee_register_form : NgForm;
  @ViewChild('modalEdit') modalEdit : MyModalComponent;
  @ViewChild('modalRegister') modalRegister : MyModalComponent;
  @ViewChild('message') message_tag : ShowMessageComponent;
  @ViewChild('datepicker') datepicker : DatepickerComponent;
  
  modalEdit_visible : boolean;
  modalView_visible : boolean;
  modalRegister_visible : boolean;
  modalMessage_visible : boolean;

  employees :IEmployee[] = [];
  employee_selected : IEmployee = null;

  password_confirmation:string = null;

  date_born_setted ;  

  message : string;
  title_message : string;

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
        this.date_born_setted = this.parseDate_(res.date_born);
      },
      err => this.showMessage("Error", err.error)
    );
  }

  saveEmployee(form:NgForm){ 
    this.employee_selected = form.value;
    this.employee_selected.date_born = this.getDate();
    this.password_confirmation = form.value.password_confirmation; 
    if(
      this.employee_selected.identification && 
      this.employee_selected.first_name && 
      this.employee_selected.last_name && 
      this.employee_selected.date_born && 
      this.employee_selected.email && this.employee_selected.password){
        
        if(this.employee_selected.password == this.password_confirmation){
          this.employee_selected.date_born = this.getDate();
          this.employee_sv.postEmployee(this.employee_selected)
            .subscribe(
              (res) => {
                this.showMessage("Operacion exitosa.", "Se registró a " + this.employee_selected.first_name + " satisfactoriamente.");
                this.clean_fields(this.employee_register_form);
                this.getAll();
              },
              err => {
                this.showMessage("Error",err.error);
              }
            ); 
        } else {
          this.showMessage("Error","La contraseña de confirmación no coincide.");
        }

    } else {
      this.showMessage("Error", "Los campos obligatorios deben ser llenados");
    }
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
    console.log(this.employee_selected)
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
    this.message_tag.title = title;
    this.message_tag.message = message;
    this.message_tag.openModal();
  }
  
  open_modalRegister(){
    this.modalRegister_visible = true;
  }

  close_modalRegister(event){
    this.modalRegister_visible = event;
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
      const { year, month, day } = this.date_born_setted ? this.date_born_setted : this.datepicker.getDate();
      return `${year}-${month}-${day}`;
    } catch (error) {
      this.showMessage('Error', error.error);
    } 
  }
  
  parseDate_(date : string){
    const newdate = date.split('-').map(x => parseInt(x));
    return { year : newdate[0], month : newdate[1], day: newdate[2]};
  }

  clean_fields(form : NgForm){
    form.reset();
    this.employee_selected = null;
    this.password_confirmation = "";
    this.modalRegister.closeModal();
  }

}
