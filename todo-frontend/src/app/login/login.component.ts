import { Component } from '@angular/core';
import { LoginService } from '../services/login/login.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private service:LoginService,private router:Router,private authservice:AuthService,private userService:LoginService){}
  userId:any;
  login:any={
  userName:'',
  passWord:''
}

isInvalidCredentials:boolean = false;

  handleSubmit(){
    
    console.log("login credentials",this.login);

    this.service.loginUser(this.login).subscribe({
      next: (response) => {
        // console.log(response.token)
        sessionStorage.setItem("token",response.token)
        // console.log(response.user.role);
        // console.log("response",response.user._id);
        this.userId = response.user._id;
        // console.log(this.userId)
        this.router.navigate([`/todo/${this.userId}`]);
        this.userService.loggedInUser = response.user;
        this.isInvalidCredentials = false;
      },
      error: (err) => {
        // console.log(err);
        this.isInvalidCredentials = true;
      }
    });

    this.login.userName="";
    this.login.passWord="";
    // this.router.navigate([`/todo/${this.userId}`]);
    
    
  }

  onInputChange() {
    this.isInvalidCredentials = false;
  }

  handleSignup(){
  this.router.navigate(['/signup'])
  }

}
