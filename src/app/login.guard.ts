import { Injectable } from '@angular/core';
import { CanActivate, Router  } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(
    private authentication : AuthenticationService,
    private router : Router
  ){}

  canActivate():boolean{
     if(this.authentication.loggedIn()){
       return true;
     }

     this.router.navigate(["/login"]);
     return false;
  }
  
}
