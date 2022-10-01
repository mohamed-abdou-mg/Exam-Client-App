import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FieldRequest } from 'src/app/_models/field/fieldRequest.interface';
import { FieldResponse } from 'src/app/_models/field/fieldResponse.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FieldsService {

  constructor(private http: HttpClient) { }

  baseUrl: string = environment.apiUrl + 'Fields/';

  getFields(){
    return this.http.get<FieldResponse[]>(this.baseUrl + 'GetFields');
  }

  getField(id: number){
    return this.http.get<FieldResponse>(this.baseUrl + 'GetField/' + id);
  }

  deleteField(id: number){
    return this.http.delete(this.baseUrl + 'DeleteField/' + id);
  }

  createField(fieldRequest: FieldRequest){
    return this.http.post(this.baseUrl + 'CreateField', fieldRequest);
  }

  updateField(fieldRequest: FieldRequest){
    return this.http.put(this.baseUrl + 'UpdateField', fieldRequest);
  }

  createFields(fieldsRequest: FieldRequest[]){
    return this.http.post(this.baseUrl + 'CreateFields', fieldsRequest);
  }

}
