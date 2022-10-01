import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ExamResponse } from 'src/app/_models/exam/examResponse.interface';
import { ExamImplementation } from 'src/app/_models/examImplementation/examImplementation.interface';
import { ExamImplementationView } from 'src/app/_models/examImplementation/examImplementationView.interface';
import { UserExamsResponse } from 'src/app/_models/userExams/userExamsResponse.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExamImplementationService {

  constructor(private http: HttpClient) { }

  baseUrl: string = environment.apiUrl + 'ExamImplementations/';

  getExamImplementations(id: number){
    return this.http.get<ExamImplementation[]>(this.baseUrl + 'GetExamImplementations/' + id);
  }

  getAuthUserExams(){
    return this.http.get<UserExamsResponse[]>(this.baseUrl + 'GetAuthUserExams');
  }

  getAuthUserExam(userExamId: number){
    return this.http.get<ExamImplementationView[]>(this.baseUrl + 'GetAuthUserExam/' + userExamId);
  }

  getExamDetailsByUserExmId(userExamId: number){
    return this.http.get<ExamResponse>(this.baseUrl + 'GetExamDetailsByUserExmId/' + userExamId);
  }

  deleteUserExam(userExamId: number){
    return this.http.delete(this.baseUrl + 'DeleteUserExam/' + userExamId);
  }
}
