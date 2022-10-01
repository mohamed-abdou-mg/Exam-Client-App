import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AppUserRequest } from 'src/app/_models/appUser/appUserRequest.interface';
import { AppUserResponse } from 'src/app/_models/appUser/appUserResponse.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppUserService {

  baseUrl: string = environment.apiUrl + 'Users/';

  constructor(private http: HttpClient, private router: Router) { }

  getAuthUser(){
    return this.http.get<AppUserResponse>(this.baseUrl + 'GetAuthUser');
  }

  updateAuthUser(appUser: AppUserRequest){
    return this.http.put(this.baseUrl + 'UpdateAuthUser', appUser);
  }

  getUsers(){
    return this.http.get<AppUserResponse[]>(this.baseUrl + 'GetUsers');
  }
  
  getUser(userId: string){
    return this.http.get<AppUserResponse>(this.baseUrl + 'GetUser/' + userId);
  }

  updateUser(appUser: AppUserRequest){
    console.log(appUser);
    return this.http.put(this.baseUrl + 'UpdateUser', appUser);
  }

  getRoles(){
    return this.http.get(environment.apiUrl + 'Roles/GetRoles');
  }
}