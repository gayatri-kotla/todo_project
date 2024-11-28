import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'http://localhost:3000';

  loggedInUser:any='';

  constructor(private http:HttpClient) { }

  loginUser(loginCredentials:any):Observable<any>{
    return this.http.post<any>(this.apiUrl+"/login",loginCredentials)
  }

  createUser(loginCredentials:any):Observable<any>{
    return this.http.post<any>(this.apiUrl+"/user",loginCredentials);
  }

  getUsers():Observable<any>{
    return this.http.get<any>(this.apiUrl+"/users");
  }

 

}
