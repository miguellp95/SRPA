import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { IEmployee } from '../interfaces/employee.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http : HttpClient) { }

  URI_API = '/api/srpa';

  employees : IEmployee[] = [];
  employee_selected : IEmployee  = null;

  get_employees(): Observable<IEmployee[]>{
    return this.http.get<IEmployee[]>(this.URI_API + "/employee");
  }

  getOne_employee(id:string): Observable<IEmployee>{
    return this.http.get<IEmployee>(this.URI_API + "/employee/" + id);
  }

  postEmployee(data:IEmployee){
    return this.http.post(this.URI_API + "/employee", data);
  }

  updateEmployee(id:string, data:IEmployee){
    return this.http.put(this.URI_API + "/employee/" + id, data);
  }

  deleteEmployee(id:string){
    return this.http.delete(this.URI_API + "/employee/" + id);
  }
}
