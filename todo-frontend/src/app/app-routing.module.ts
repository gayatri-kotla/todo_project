import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableComponent } from './table/table.component';
import { Method2Component } from './method2/method2.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { authGuard } from './authguards/auth.guard';

const routes: Routes = [
  // {path:'table', component:TableComponent},
  {path:'todo/:id',component:Method2Component,canActivate:[authGuard]},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
