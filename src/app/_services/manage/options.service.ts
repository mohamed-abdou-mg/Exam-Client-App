import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OptionRequest } from 'src/app/_models/option/optionRequest.interface';
import { OptionResponse } from 'src/app/_models/option/optionResponse.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OptionsService {

  constructor(private http: HttpClient) { }

  baseUrl: string = environment.apiUrl + 'Options/';

  getOptions(){
    return this.http.get<OptionResponse[]>(this.baseUrl + 'GetOptions');
  }

  getOption(id: number){
    return this.http.get<OptionResponse>(this.baseUrl + 'GetOption/' + id);
  }

  deleteOption(id: number){
    return this.http.delete(this.baseUrl + 'DeleteOption/' + id);
  }

  createOption(optionRequest: OptionRequest){
    return this.http.post(this.baseUrl + 'CreateOption', optionRequest);
  }

  updateOption(optionRequest: OptionRequest){
    return this.http.put(this.baseUrl + 'UpdateOption', optionRequest);
  }

  getQuestionOptions(id: number){
    return this.http.get<OptionResponse[]>(this.baseUrl + 'GetQuestionOptions/' + id);
  }

  createOptions(optionsRequest: OptionRequest[]){
    return this.http.post(this.baseUrl + 'CreateOptions', optionsRequest);
  }
}
