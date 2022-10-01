import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserExamsResponse } from 'src/app/_models/userExams/userExamsResponse.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserExamService {

  constructor(private http: HttpClient) { }

  baseUrl: string = environment.apiUrl + 'UserExams/';

  getUserExams(){
    return this.http.get<UserExamsResponse[]>(this.baseUrl + 'GetUserExams');
  }

  deleteUserExam(userExamId: number){
    return this.http.delete(this.baseUrl + 'DeleteUserExam/' + userExamId);
  }
}
