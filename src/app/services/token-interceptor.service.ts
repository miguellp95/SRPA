import { HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core'; 
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private authentication : AuthenticationService) { }

  intercept(req, next){
    const tokenizeReq = req.clone({
      setHeaders : {
        Authorization : `Bearer ${this.authentication.getToken()}`
      }
    });

    return next.handle(tokenizeReq);
  }
}
