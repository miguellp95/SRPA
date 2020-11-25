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
  usuario_srpa_selected : _srpa_user_ ;

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
    fd.append("age", data.age.toString());
    fd.append("gender", data.gender);
    fd.append("scholar", data.scholar);
    fd.append("occupation", data.occupation);
    fd.append("address", data.address);
    fd.append("phone_number", data.phone_number);
    fd.append("parent_1", data.parent_1);
    fd.append("parent_2", data.parent_2);
    fd.append("health", data.health);
    fd.append("attention_mode", data.attention_mode);
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
    fd.append("age", data.age.toString());
    fd.append("gender", data.gender);
    fd.append("scholar", data.scholar);
    fd.append("occupation", data.occupation);
    fd.append("address", data.address);
    fd.append("phone_number", data.phone_number);
    fd.append("parent_1", data.parent_1);
    fd.append("parent_2", data.parent_2);
    fd.append("health", data.health);
    fd.append("attention_mode", data.attention_mode); 
    fd.append("photo", photo); 
    return this.http.put(this.URI_API + '/srpa-user/' + id, fd);
  }
}
