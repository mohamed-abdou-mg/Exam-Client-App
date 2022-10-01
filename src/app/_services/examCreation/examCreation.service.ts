import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ExamCreationRequest } from 'src/app/_models/examCreation/examCreationRequest.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExamCreationService {

  constructor(private http: HttpClient) { }

  baseUrl: string = environment.apiUrl + 'ExamCreation/';

  examCreationPost(examCreationRequest:ExamCreationRequest){
    return this.http.post(this.baseUrl + 'ExamCreationPost', examCreationRequest);
  }

}
