import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataService } from '../services/todo/data.service';
import { Subscription } from 'rxjs';
import { response } from 'express';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../services/login/login.service';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit{
  userData:any[] =[];

  @Input() todos="";

  private usersSubscription!: Subscription;
  @Output() editUser: EventEmitter<any> = new EventEmitter<any>();


constructor(private service:DataService,private route:ActivatedRoute,private userService:LoginService){}
routeId:any;
  ngOnInit(): void { 
    this.routeId = this.route.snapshot.paramMap.get('id');
    // console.log(this.routeId)
   this.fillTable();
  }


  
  fillTable() {
    console.log("fill table called");
  
    // Assuming you can get the logged-in user's role via the user service
    const userRole = this.userService.loggedInUser.role;  
    // console.log(userRole)
    // Example: 'admin', 'user'
  
    if (userRole === 'admin') {
      // If the user is an admin, get all todos
      this.service.getTodos().subscribe((data) => {
        console.log("Getting all todos...", data);
        this.userData = JSON.parse(JSON.stringify(data));
      }, error => {
        console.error("Error fetching todos:", error);
      });
    } else {
      // If the user is not an admin, get todos by ID
      this.service.getTodoById(this.routeId).subscribe((data) => {
        // console.log("Getting todo by ID...", data);
        this.userData = JSON.parse(JSON.stringify(data));
      }, error => {
        console.error("Error fetching todo by ID:", error);
      });
    }
  }
  

  ngOnDestroy(): void {
    this.usersSubscription.unsubscribe();
  }

  handleEdit(user:any){
    console.log("edit clicked",user);
    this.editUser.emit(user); 
   
  }

  async handleDelete(user:any){
    console.log("delete clicked",user); 
    await this.deleteUserPromise(user);
    
    this.fillTable();
  }

  deleteUserPromise(user: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.service.deleteTodo(user).subscribe(
        response => resolve(response),
        error => reject(error)
      );
    });
  }
  
}
