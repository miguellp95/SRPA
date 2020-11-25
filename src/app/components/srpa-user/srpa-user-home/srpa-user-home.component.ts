import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { _srpa_user_ } from 'src/app/interfaces/srpa-user.interface';
import { SrpaUserService } from 'src/app/services/srpa-user.service';
import { ShowMessageComponent } from '../../show-message/show-message.component';
import { DatepickerComponent } from '../../datepicker/datepicker.component';
import { MyModalComponent } from '../../my-modal/my-modal.component';
 
@Component({
  selector: 'app-srpa-user-home',
  templateUrl: './srpa-user-home.component.html',
  styleUrls: ['./srpa-user-home.component.css'],
})
export class SrpaUserHomeComponent implements OnInit {
 
  @ViewChild('modalRegister') modalRegister : MyModalComponent;
  @ViewChild('usuario_srpa_form') srpa_user_form: NgForm;
  @ViewChild('message') message_tag : ShowMessageComponent;
  @ViewChild('datepicker') datepicker : DatepickerComponent;


  new_srpa_user : boolean = false;

  usuarios_srpa: _srpa_user_[];
  usuario_srpa_selected: _srpa_user_; 
   
  src_image:string = "";
  selected_file: File = null;
  photo_selected : boolean = false;

  modalView_visible : boolean  = false;
  modalRegister_visible : boolean = false;

  message : string;
  title_message : string;

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

    console.log(this.usuario_srpa_selected);
    
    if(this.usuario_srpa_selected && this.usuario_srpa_selected.photo_path){ 
      this.user_srpa_service.post(this.usuario_srpa_selected, this.selected_file).subscribe(
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
    this.photo_selected = false;
    this.src_image = ""; 
    this.modalRegister.closeModal();
  }

  delete_selection(){
    this.selected_file = null;
    this.src_image = "";
    this.photo_selected = false;
  }

  onSelectedFile(file : FileList){
    
    this.photo_selected = true;    
    this.selected_file = file.item(0); 
    const reader = new FileReader();    
    reader.onload = (event : any) => {
      this.src_image = event.target.result;
      this.photo_selected = true;
    }
    reader.readAsDataURL(this.selected_file);  
  } 

  handlerError(error){
    this.message_tag.title = "Error";
    this.message_tag.message = error;
    this.message_tag.openModal();
  }

  showMessage(title:string, message:string){
    this.message_tag.title = title;
    this.message_tag.message = message;
    this.message_tag.openModal();
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

  open_modalView(id:string){
    this.modalView_visible = true;
    this.getOne_srpa_user(id);
  }

  open_modalRegister(){
    this.modalRegister_visible = true;
  }

  close_modalView(event){
    this.modalView_visible = event;
  }

  close_modalRegister(event){
    this.modalRegister_visible = event;
  }
}
