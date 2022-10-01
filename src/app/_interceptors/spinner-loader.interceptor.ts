import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { LoaderServiceService } from '../_services/lib/loader-service.service';

@Injectable()
export class SpinnerLoaderInterceptor implements HttpInterceptor {

  constructor(private loaderService: LoaderServiceService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loaderService.busy();
    return next.handle(request).pipe(
      finalize(() => {
        this.loaderService.idle();
      })
    );
  }
}
