import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}
 

  private apiUrl = 'http://localhost:3000/todo';

 
  users: any[] = [];

  
  getTodos(): Observable<any[]> {
    // console.log("getting users..", this.users)
    // const storedUsers = localStorage.getItem("users");
    // return storedUsers ? JSON.parse(storedUsers) : [];
    return this.http.get<any[]>(this.apiUrl);
  }

  addTodo(user: any): Observable<any> {
    // console.log("added")
    // const newUser = { ...user };
    // this.users.push(newUser)
    // localStorage.setItem("users", JSON.stringify(this.users));
    // this.usersSubject.next(this.users)
    return this.http.post<any>(this.apiUrl, user);
  }

  deleteTodo(user: any): Observable<any> {
    // console.log("Deleting user...");
    // const currentUsers = this.usersSubject.getValue();

    // const updatedUsers = currentUsers.filter(u => u.id !== user.id);
    // this.users =  currentUsers.filter(u => u.id !== user.id);
    // localStorage.setItem("users", JSON.stringify(updatedUsers));
    // this.usersSubject.next(updatedUsers);

    return this.http.delete<any>(`${this.apiUrl}/${user._id}`);
  }

  updateTodo(updateTodo: any, todoId: any) {
    return this.http.put<any>(`${this.apiUrl}/${todoId}`, updateTodo);
    //   console.log(updatedUser);
    //   const currentUsers = this.usersSubject.getValue();
    //   const index = currentUsers.findIndex(u => u.task === updatedUser.task); // Assuming task is unique
    //   for(let user of currentUsers){
    //     if(user.id==updatedUser.id){
    //       user.task = updatedUser.task;
    //     }
    //   }

    //   localStorage.setItem("users", JSON.stringify(currentUsers));
    //   this.usersSubject.next(currentUsers);
  }

  getTodoById(userId:any):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/${userId}`);
  }
}
