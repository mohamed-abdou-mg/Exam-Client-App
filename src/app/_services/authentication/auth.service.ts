import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, ReplaySubject, Subject } from 'rxjs';
import { AuthUser } from 'src/app/_models/auth/authUser.interface';
import { Login } from 'src/app/_models/auth/login.interface';
import { Register } from 'src/app/_models/auth/register.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSource = new ReplaySubject<AuthUser | null>(1);
  currentUser$ = this.currentUserSource.asObservable();

  baseUrl: string = environment.apiUrl + 'Auth/';

  constructor(private http: HttpClient, private router: Router) { }

  login(loginModel: Login){
    return this.http.post<AuthUser>(this.baseUrl + 'Login', loginModel).pipe(
      map((response) => {
        if(response){
          localStorage.setItem('authUser', JSON.stringify(response));
          this.currentUserSource.next(response);
        }
      })
    );
  }

  register(registerModel: Register) {
    return this.http.post<AuthUser>(this.baseUrl + "Register", registerModel).pipe(
      map((response) => {
        if(response){
          localStorage.setItem('authUser', JSON.stringify(response));
          this.currentUserSource.next(response);
        }
      })
    );
  }

  setCurrentUser(authUser: AuthUser){
    this.currentUserSource.next(authUser);
  }

  logout() {
    localStorage.removeItem('authUser');
    this.router.navigateByUrl('');
    this.currentUserSource.next(null);
  }


  checkDbRolesAvailable(){
    return this.http.post(this.baseUrl + "CheckDatabaseRolesAvailable", {});
  }

}