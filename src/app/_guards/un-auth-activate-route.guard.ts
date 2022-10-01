import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map, Observable } from 'rxjs';
import { AuthService } from '../_services/authentication/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class UnAuthActivateRouteGuard implements CanActivate {
  constructor(private jwtHelper: JwtHelperService, private authService: AuthService, private toastr: ToastrService){}
  canActivate(): Observable<boolean> {

    return this.authService.currentUser$.pipe(
      map(response => {
        if(response?.token == null){
          return true;
        }else{
          return false;
        }
      })
    );
  }  
}