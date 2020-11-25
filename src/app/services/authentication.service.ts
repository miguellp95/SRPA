import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  URI_API = '/api/srpa';

  constructor(private http : HttpClient, private router : Router) { }

  signin(user){ 
    return this.http.post(this.URI_API + "/signin", user);
  }

  loggedIn(){
    return !!localStorage.getItem("token");
  }

  getToken(){ 
    return localStorage.getItem("token");
  }

  logOut(){
    localStorage.removeItem("token");
    this.router.navigate(["/login"]);
  }
}
