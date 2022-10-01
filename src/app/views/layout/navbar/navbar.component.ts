import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs';
import { AuthUser } from 'src/app/_models/auth/authUser.interface';
import { AuthService } from 'src/app/_services/authentication/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {

  constructor(private jwtHelper: JwtHelperService, public authService: AuthService, private router: Router) { }

  authUser:AuthUser;

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl("/");
  }


  // check if there is any authenticated user
  checkCredintials(){
    return this.authService.currentUser$.pipe(
      map(response => {
        if(response?.token == null){
          return false;
        }else{
          this.authUser = response;
          return true;
        }
      })
    )
  }

  // check the authenticated token expiration
  checkTokenCredintials(){
    return this.authService.currentUser$.pipe(
      map(response => {
        if(!this.jwtHelper.isTokenExpired(response?.token)){
          return true;
        }else{
          return false;
        }
      })
    )
  }

  // check the role of the authenticated user
  checkAdminCredintials(){
    return this.authService.currentUser$.pipe(
      map(response => {
        if(response?.token == null){
          return false;
        }else{
          if(response.roleName == 'Admin')
            return true;
          return false;
        }
      })
    )
  }

}