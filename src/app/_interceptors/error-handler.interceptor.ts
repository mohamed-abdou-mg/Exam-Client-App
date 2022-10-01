import { Injectable } from '@angular/core';
import {  HttpRequest,HttpHandler,HttpEvent,HttpInterceptor} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NavigationExtras, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {

  constructor(private router: Router, private toastr: ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(error => {
        if(error){
          switch(error.status) {
            case 400:
              if(error.error.errors){
                const modalStateErrors = [];
                for(const key in error.error.errors){
                  if(error.error.errors[key]){
                    modalStateErrors.push(error.error.errors[key]);
                  }
                }
                throw modalStateErrors.flat();
              }else if(typeof(error.error) === 'object'){
                Swal.fire({
                  position: 'top-end',
                  icon: 'error',
                  title: error.error,
                  showConfirmButton: false,
                  timer: 2000
                })
              }
              else{
                Swal.fire({
                  position: 'top-end',
                  icon: 'error',
                  title: error.error,
                  showConfirmButton: false,
                  timer: 2000
                })
              }
              break;

            case 401:
              Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: error.error,
                showConfirmButton: false,
                timer: 2000
              })
              break;
            case 404:
              this.router.navigateByUrl("/not-found");
              break;
            case 500:
              const navigationExtras: NavigationExtras = { state: {error: error.error}};
              this.router.navigateByUrl("/server-error", navigationExtras);
              break;
            default:
              Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Something unexpected went wrong',
                showConfirmButton: false,
                timer: 2000
              });
              console.log(error);
              break;
          }
        }
        return throwError(error);
      })
    );
  }
}