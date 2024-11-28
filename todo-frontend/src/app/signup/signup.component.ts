import { Component } from '@angular/core';
import { LoginService } from '../services/login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  constructor(private service:LoginService,private router:Router){}
  userId:any;
  login:any={
  userName:'',
  passWord:''
}
  handleSubmit(){
    
    console.log("login credentials",this.login);

    this.service.createUser(this.login).subscribe((response)=>{
      console.log("response",response._id);
      this.userId = response._id;
      console.log(this.userId)
      this.router.navigate(['/login']);
    });

    this.login.userName="";
    this.login.passWord="";
    // this.router.navigate([`/todo/${this.userId}`]);
    
  }
}
