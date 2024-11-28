import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = sessionStorage.getItem('token');  // Replace 'authToken' with the key you're using

    // If token exists, clone the request and add the Authorization header
    if (authToken) {
      const clonedRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`
        }
      });   
      // Pass the cloned request to the next handler
      return next.handle(clonedRequest);
  }
  // If no token, just pass the original request
  return next.handle(request);
}
}
