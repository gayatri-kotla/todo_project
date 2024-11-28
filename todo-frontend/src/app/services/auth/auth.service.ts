import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = false;
  constructor() { }

  login():void{
    // this.loggedIn = true;
  }

  logout():void{
    // this.loggedIn = false;
  }

  isLoggedIn():boolean{
    let token = sessionStorage.getItem("token")
    if(token){
      this.loggedIn = true;
    }else{
      this.loggedIn = false;
    }
    return this.loggedIn;
  }
}
