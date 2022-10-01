import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { map, Observable, of, take } from 'rxjs';
import { AuthService } from '../_services/authentication/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})

export class AuthActivateRouteGuard implements CanActivate {
  constructor(private jwtHelper: JwtHelperService,
    private authService: AuthService){}
  canActivate(): Observable<boolean> {

    return this.authService.currentUser$.pipe(
      map(response => {
        if(response?.token != null && !this.jwtHelper.isTokenExpired(response?.token)){
          return true;
        }else{
          this.authService.logout();
          return false;
        }
      })
    );
  }  
}