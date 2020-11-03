import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { _srpa_user_ } from 'src/app/interfaces/srpa-user.interface';
import { SrpaUserService } from 'src/app/services/srpa-user.service';
import { ErrorMessageComponent } from '../../error-message/error-message.component';
import { DatepickerComponent } from '../../datepicker/datepicker.component'; 

@Component({
  selector: 'app-srpa-user-detail',
  templateUrl: './srpa-user-detail.component.html',
  styleUrls: ['./srpa-user-detail.component.css']
})
export class SrpaUserDetailComponent implements OnInit {

  @ViewChild('error_message_tag') error_message_tag : ErrorMessageComponent;
  @ViewChild('datepicker') datepicker : DatepickerComponent;

  usuario_srpa_id = "";
  usuarios_srpa: _srpa_user_[];
  usuario_srpa_selected: _srpa_user_ = {
    first_name: '',
    last_name: '',
    identification: '',
    date_born: '',
    address: '',
    photo_path: '',
  };
  
  show_image:boolean = true;
  src_image:string = "";
  selected_file: File = null;

  error_message : string;

  constructor(
    private router: Router,
    private active_route: ActivatedRoute,
    public user_srpa_service : SrpaUserService) { }

  ngOnInit(): void {
    this.active_route.paramMap.subscribe( 
      (params: ParamMap) => {
        this.usuario_srpa_id = params.get('id');
        this.getOne_srpa_user( this.usuario_srpa_id);
      });
    setTimeout(()=> this.datepicker.placeholder_="Fecha de nacimiento");
  }

  getOne_srpa_user(id: string) {
    if (id) {
      this.user_srpa_service.getOne(id).subscribe(
        (res) => {
          this.usuario_srpa_selected = res;
          this.usuario_srpa_selected.photo_path = 'http://localhost:3000/' + this.usuario_srpa_selected.photo_path;
          this.src_image = this.usuario_srpa_selected.photo_path;
          setTimeout(() => this.datepicker.setDate(this.parseDate_(res.date_born)));
          
        },
        (error) => this.handlerError(error.error)
      );
    }
  }

  update_srpa_user(form : NgForm){

    this.usuario_srpa_selected = form.value; 
    this.usuario_srpa_selected.photo_path = this.src_image; 
    this.usuario_srpa_selected.date_born = this.getDate();
    console.log("intentando actualizar")
    if(this.usuario_srpa_selected && this.usuario_srpa_selected.photo_path){
      console.log("casi")
      console.log(this.usuario_srpa_selected);
      console.log(this.selected_file);
      console.log(this.usuario_srpa_id);
      this.user_srpa_service.update(form.value, this.selected_file, this.usuario_srpa_id).subscribe(
        (res) => {
          console.log("lo logro")
          this.router.navigate(['/srpa-user']);
        },
        (error) => {
          this.handlerError(error.error);
        }
      );
    } else {
      this.handlerError("Debe llenar los campos obligatorios");
    }
  }

  cancel(){
    this.router.navigate(['/srpa-user']);
  }

  clean_fields(form: NgForm): void {
    form.reset();
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

  handlerError(error):void{
    this.error_message = error;
    this.error_message_tag.openModal();
  }

  getDate(){
    try {
      const { year, month, day } = this.datepicker.getDate();
      return `${year}-${month}-${day}`;
    } catch (error) {
      this.handlerError(error.error);
    } 
  }
  
  parseDate_(date : string){
    const newdate = date.split('-').map(x => parseInt(x));
    return { year : newdate[0], month : newdate[1], day: newdate[2]};
  }
}
