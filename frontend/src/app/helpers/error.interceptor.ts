import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { NgFlashMessageService } from 'ng-flash-messages';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  
  constructor(private ngFlashMessageService: NgFlashMessageService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      const error = err.error.message || err.statusText;
      this.ngFlashMessageService.showFlashMessage({
        messages: [error],
        type: 'danger',
        dismissible: true,
        timeout: 5000
      });
      return throwError(error);
    }))
  }
}