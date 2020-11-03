import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { _srpa_user_ } from 'src/app/interfaces/srpa-user.interface';

@Injectable({
  providedIn: 'root'
})
export class SrpaUserService {
 
  //URI_API = 'localhost:3000/api/srpa';
  URI_API = '/api/srpa';

  usuarios_srpa : _srpa_user_[];
  usuario_srpa_selected : _srpa_user_ = {
    first_name : "",
    last_name : "",
    identification : "",
    date_born : "",
    address : "",
    photo_path : ""
  };

  constructor(private http:HttpClient) { }

  get_all(): Observable <_srpa_user_[]> { 
    return this.http.get <_srpa_user_[]> (this.URI_API + '/srpa-user');
  }

  post(data:_srpa_user_, photo : File){ 
    const fd = new FormData();
    fd.append("first_name", data.first_name);
    fd.append("last_name", data.last_name);
    fd.append("identification", data.identification);
    fd.append("date_born", data.date_born);
    fd.append("address", data.address);
    fd.append("photo", photo); 
    return this.http.post(this.URI_API + '/srpa-user', fd);
  }

  getOne(id : string) : Observable <_srpa_user_>{
    return this.http.get<_srpa_user_>(this.URI_API + '/srpa-user/' + id);
  }

  delete(id: string){
    return this.http.delete(this.URI_API + '/srpa-user/' + id);
  }

  update(data: _srpa_user_, photo : File, id: string){
    const fd = new FormData();
    fd.append("first_name", data.first_name);
    fd.append("last_name", data.last_name);
    fd.append("identification", data.identification);
    fd.append("date_born", data.date_born);
    fd.append("address", data.address); 
    fd.append("photo", photo);
    console.log("actualziando ", data);
    return this.http.put(this.URI_API + '/srpa-user/' + id, fd);
  }
}
