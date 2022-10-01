import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExamResponse } from 'src/app/_models/exam/examResponse.interface';
import { FieldResponse } from 'src/app/_models/field/fieldResponse.interface';
import { ExamsService } from 'src/app/_services/manage/exams.service';
import { FieldsService } from 'src/app/_services/manage/fields.service';

@Component({
  selector: 'app-field-details',
  templateUrl: './field-details.component.html'
})
export class FieldDetailsComponent implements OnInit {

  field: FieldResponse;
  exams: ExamResponse[];

  constructor(private fieldsService: FieldsService,
    private route: ActivatedRoute,
    private examsService: ExamsService) { }

  ngOnInit(): void {
    this.getField();
  }

  // call getField() method inside fieldService by passing the fieldId as a parameter
  // I get the fieldId from the route called fieldId
  // after getting the response successfully, the getFieldExams() method will call by passing the fieldId to it 
  // it does not matter passing the id from the response or the route.
  getField(){
    this.fieldsService.getField(this.route.snapshot.params['fieldId']).subscribe(response => {
      this.field = response;
      this.getFieldExams(this.field.id);
    });
  }

  // call getFieldExams method inside the examsService to get all the exams inside this field
  getFieldExams(fieldId: number){
    this.examsService.getFieldExams(fieldId).subscribe(response => {
      this.exams = response;
    });
  }
}