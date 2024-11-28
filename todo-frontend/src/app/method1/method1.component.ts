import { Component } from '@angular/core';

@Component({
  selector: 'app-method1',
  templateUrl: './method1.component.html',
  styleUrls: ['./method1.component.scss']
})
export class Method1Component {

  ngOnInit(): void {
    this.users = this.getTodos();
  }

  
  model:any={
    name:'',
    task:''
  }

  users:any[] = [];
 
  submitted:boolean=false;

  addTodo(model:any){
    this.users.push({...model})
  }

  getTodos(){
    return this.users;
  }

  handleSubmit(){
    console.log("submitted");
    console.log(this.model )
    this.submitted=true
    this.addTodo(this.model);
  }

}
