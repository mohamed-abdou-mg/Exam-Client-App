import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ExamRequest } from 'src/app/_models/exam/examRequest.interface';
import { ExamResponse } from 'src/app/_models/exam/examResponse.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExamsService {

  constructor(private http: HttpClient) { }

  baseUrl: string = environment.apiUrl + 'Exams/';

  getExams(){
    return this.http.get<ExamResponse[]>(this.baseUrl + 'GetExams');
  }

  getExam(examId: number){
    return this.http.get<ExamResponse>(this.baseUrl + 'GetExam/' + examId);
  }

  deleteExam(examId: number){
    return this.http.delete(this.baseUrl + 'DeleteExam/' + examId);
  }

  createExam(examRequest: ExamRequest){
    return this.http.post(this.baseUrl + 'CreateExam', examRequest);
  }

  updateExam(examRequest: ExamRequest){
    return this.http.put(this.baseUrl + 'UpdateExam', examRequest);
  }

  getFieldExams(fieldId: number){
    return this.http.get<ExamResponse[]>(this.baseUrl + 'GetFieldExams/' + fieldId);
  }

  createExams(examsRequest: ExamRequest[]){
    return this.http.post(this.baseUrl + 'CreateExams', examsRequest);
  }
}
