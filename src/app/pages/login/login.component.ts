import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router' 
import { ShowMessageComponent } from 'src/app/components/show-message/show-message.component';
import  { AuthenticationService } from '../../services/authentication.service';

interface IUser{
  email : string,
  password : string
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('message') modalMessage : ShowMessageComponent; 
  user : IUser = null; 

  message : string = "No mensajes";
  title_message : string = "Sin titulo";

  constructor(private authentication : AuthenticationService, private router : Router) { }

  ngOnInit(): void {
  }

  signin(form : NgForm){
    this.user = form.value;
    if(this.user.email && this.user.password){
      this.authentication.signin(this.user)
      .subscribe(
        res => {
          localStorage.setItem("token", res["token"]);
          this.router.navigate(["/employee"]);
        },
        err => this.showMessage(err["error"])
      );
    } else {
      this.showMessage("Debe llenar los campos.");
    }
  }

  showMessage(message : string){ 
    this.modalMessage.title = "Error";
    this.modalMessage.message = message;
    this.modalMessage.openModal();
  }

}
