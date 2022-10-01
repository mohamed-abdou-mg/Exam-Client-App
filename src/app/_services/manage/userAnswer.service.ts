import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAnswerRequest } from 'src/app/_models/userAnswers/userAnswerRequest.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserAnswerService {

  constructor(private http: HttpClient) { }

  baseUrl: string = environment.apiUrl + 'ExamImplementations/';
  
  createUserAnswers(examId: number, userAnswerRequest: UserAnswerRequest[]){
    return this.http.post(this.baseUrl + 'CreateUserAnswers/' + examId, userAnswerRequest);
  } 
}
