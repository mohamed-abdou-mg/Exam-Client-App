import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { QuestionRequest } from 'src/app/_models/question/questionRequest.interface';
import { QuestionResponse } from 'src/app/_models/question/questionResponse.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor(private http: HttpClient) { }

  baseUrl: string = environment.apiUrl + 'Questions/';

  getQuestions(){
    return this.http.get<QuestionResponse[]>(this.baseUrl + 'GetQuestions');
  }

  getQuestion(id: number){
    return this.http.get<QuestionResponse>(this.baseUrl + 'GetQuestion/' + id);
  }

  deleteQuestion(id: number){
    return this.http.delete(this.baseUrl + 'DeleteQuestion/' + id);
  }

  createQuestion(questionRequest: QuestionRequest){
    return this.http.post(this.baseUrl + 'CreateQuestion', questionRequest);
  }

  updateQuestion(questionRequest: QuestionRequest){
    console.log(questionRequest);
    return this.http.put(this.baseUrl + 'UpdateQuestion', questionRequest);
  }

  getExamQuestions(id: number){
    return this.http.get<QuestionResponse[]>(this.baseUrl + 'GetExamQuestions/' + id);
  }

  createQuestions(questionsRequest: QuestionRequest[]){
    return this.http.post(this.baseUrl + 'CreateQuestions', questionsRequest);
  }
}
