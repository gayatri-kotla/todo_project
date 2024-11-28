
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../services/todo/data.service';
import { TableComponent } from '../table/table.component';


@Component({
  selector: 'app-method2',
  templateUrl: './method2.component.html',
  styleUrls: ['./method2.component.scss'],
})
export class Method2Component implements OnInit{
  @ViewChild(TableComponent) table!: TableComponent;
  
  model:any= {
    task: '',
    userId:'',
  };
  constructor(private service: DataService, private router: Router,private route:ActivatedRoute) {}
  routeId:any;
  todoId:any;

  ngOnInit(): void {

    this.routeId = this.route.snapshot.paramMap.get('id');
    // console.log(this.routeId)
    this.model.userId = this.routeId;
  }
 

  selectedUser: any = null;

  async handleSubmit() {
    // if(this.model.task ==="") return;
    console.log("handle submit called")
    if (this.selectedUser) {
      console.log(this.selectedUser);
      this.model.userId = this.routeId;
      await this.handleUpdatePromise(this.model, this.selectedUser._id);
    } else {
      console.log(this.model);
      await this.handleAddPromise(this.model);
      console.log('adding user', this.model);
    }
    this.selectedUser = null;
    this.model.task = '';
    this.table.fillTable();
    
  }

handleAddPromise(user:any):Promise<any>{
  return new Promise((resolve,reject)=>{
    this.service.addTodo(this.model).subscribe(
      (response)=> resolve("sd"));
  })
}

handleUpdatePromise(user:any, id: any):Promise<any>{
  console.log(user);
  
  return new Promise((resolve,reject)=>{
    this.service.updateTodo(user,id).subscribe(
      (response)=>resolve(response));
})
}


  handleEdit(user: any): void {
    // console.log(user);
    console.log(user);
 
    this.selectedUser = user; // Store the user data
    this.model.task = user.task; // Prepopulate the form with the selected task's value
   
  }
}
