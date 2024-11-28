import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { Method1Component } from './method1/method1.component';
import { Method2Component } from './method2/method2.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TableComponent } from './table/table.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { TokenInterceptor } from './interceptor/token.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    Method1Component,
   TableComponent,Method2Component,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule 
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true  // Set multi to true to allow multiple interceptors
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
