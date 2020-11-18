import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { _srpa_user_ } from 'src/app/interfaces/srpa-user.interface';
import { SrpaUserService } from 'src/app/services/srpa-user.service';
import { ErrorMessageComponent } from '../../error-message/error-message.component';
import { DatepickerComponent } from '../../datepicker/datepicker.component';
 
@Component({
  selector: 'app-srpa-user-home',
  templateUrl: './srpa-user-home.component.html',
  styleUrls: ['./srpa-user-home.component.css'],
})
export class SrpaUserHomeComponent implements OnInit {

  @ViewChild('usuario_srpa_form') srpa_user_form: NgForm;
  @ViewChild('error_message_tag') error_message_tag : ErrorMessageComponent;
  @ViewChild('datepicker') datepicker : DatepickerComponent;

  usuarios_srpa: _srpa_user_[];
  usuario_srpa_selected: _srpa_user_ = {
    _id: '',
    first_name: '',
    last_name: '',
    identification: '',
    date_born: '',
    address: '',
    photo_path: '',
  };

  
  show_image:boolean = false;
  src_image:string = "";
  selected_file: File = null;

  error_message : string;

  constructor(
    private activated_route: ActivatedRoute,
    private router: Router,
    public user_srpa_service: SrpaUserService
  ) {}

  ngOnInit(): void {
    this.get_srpa_users(); 
  }

  get_srpa_users() {
    this.user_srpa_service.get_all().subscribe(
      (res) => {
        this.usuarios_srpa = res;
      },
      (error) => this.handlerError(error.error)
    );
  }

  getOne_srpa_user(id: string) {
    if (id) {
      this.user_srpa_service.getOne(id).subscribe(
        (res) => {
          this.usuario_srpa_selected = res;
          this.usuario_srpa_selected.photo_path = 'http://localhost:3000/' + this.usuario_srpa_selected.photo_path;
        },
        (error) => this.handlerError(error.error)
      );
    }
  }

  add_srpa_user(form: NgForm) {

    this.usuario_srpa_selected = form.value;
    this.usuario_srpa_selected.photo_path = this.src_image;
    this.usuario_srpa_selected.date_born = this.getDate();

    if(this.usuario_srpa_selected && this.usuario_srpa_selected.photo_path){ 
      this.user_srpa_service.post(form.value, this.selected_file).subscribe(
        (res) => {
          this.showMessage("Guardado exitoso!", "El usuario SRPA ha sido creado exitosamente.");
          this.get_srpa_users();
          this.clean_fields(form);
        },
        (error) => this.handlerError(error.error)
      );
    } else {
      this.handlerError("Debe llenar los campos obligatorios");
    }
  }

  remove_srpa_user(id: string): void {
    this.user_srpa_service.delete(id).subscribe(
      (res) => {
        this.showMessage('Operación exitosa', "El item fue removido exitosamente");
        this.router.navigate(["/srpa-user", this.get_srpa_users()]);
      },
      (error) => {
        this.handlerError(error.error)
      }
    );
  }

  clean_fields(form: NgForm): void {
    form.reset();
    this.datepicker ? this.datepicker.cleanDatePicker() : null;
    this.show_image = false; 
  }

  delete_selection(){
    this.selected_file = null;
    this.show_image = false;
  }

  onSelectedFile(file : FileList){
    
    this.show_image = true;    
    this.selected_file = file.item(0); 
    const reader = new FileReader();    
    reader.onload = (event : any) => {
      this.src_image = event.target.result;      
    }
    reader.readAsDataURL(this.selected_file);  
  } 

  handlerError(error){
    this.error_message_tag.title = "Error";
    this.error_message = error;
    this.error_message_tag.openModal();
  }

  showMessage(title:string, message:string){
    this.error_message_tag.title = title;
    this.error_message = message;
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
