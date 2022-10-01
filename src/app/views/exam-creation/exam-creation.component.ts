import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ExamCreationRequest } from 'src/app/_models/examCreation/examCreationRequest.interface';
import { FieldResponse } from 'src/app/_models/field/fieldResponse.interface';
import { ExamCreationService } from 'src/app/_services/examCreation/examCreation.service';
import { FieldsService } from 'src/app/_services/manage/fields.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-exam-creation',
  templateUrl: './exam-creation.component.html'
})
export class ExamCreationComponent implements OnInit {
    
  examCreation: any;

  //dropdown properties
  fields: FieldResponse[];
  selectedItems: {id: number, name: string}[] = [];
  dropdownSettings: IDropdownSettings = {};

  constructor(private examCreationService: ExamCreationService, 
    private router: Router,
    private fieldsService: FieldsService) {}

  ngOnInit() {

    this.examCreation = new FormGroup({
      exams: this.initExam()
    });

    //dropdown section
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: "Select All Items From List",
      unSelectAllText: "UnSelect All Items From List",
      itemsShowLimit: 8,
      allowSearchFilter: true
    };

    this.getFields();

  }

  //get fields from the api using getFields() method inside fieldsService 
  getFields(){
    this.fieldsService.getFields().subscribe(response => {
      this.fields = response;
    });
  }

  initExam() {
    return new FormGroup({
      examId: new FormControl(0),
      examName: new FormControl('', [Validators.required]),
      examShortDescription: new FormControl('', [Validators.required]),
      examDescription: new FormControl('', [Validators.required]),
      examDuration: new FormControl('', [Validators.required]),
      fieldExams: new FormControl(this.selectedItems),
      questions: new FormArray([
        this.initQuestion()
      ])
    });
  }
  initQuestion() {
    return new FormGroup({
      questionName: new FormControl('', [Validators.required]),
      questionDegree: new FormControl('', [Validators.required]),
      options: new FormArray([
        this.initOptions()
      ])
    });
  }

  initOptions() {
    return new FormGroup({
      optionName: new FormControl('', [Validators.required]),
      optionIsCorrect: new FormControl(false, [Validators.required])
    });
  }

  // used to create a new control for option inside the formArray of questions
  addQuestion() {
    const control = <FormArray>this.examCreation.get('exams').controls.questions;
    control.push(this.initQuestion());
  }

  // used to create a new control for option inside the formArray of options
  add(j:any) {
    const control = <FormArray>this.examCreation.get('exams').controls.questions.controls[j].controls.options;
    control.push(this.initOptions());
  }

  // get all questions inside the questions formArray
  getQuestions() {
    return this.examCreation.get('exams').controls.questions.controls;
  }

  // get all options inside the options formArray
  getOptions(form:any) {
    return form.controls.options.controls;
  }

  // used to remove control a specific control inside the questions control
  removeQuestion(j:any){
    const controls = <FormArray>this.examCreation.get('exams').controls.questions;
    controls.removeAt(j);
  }

  // used to remove control a specific control inside the options control
  removeOption(j:any,k:any){
   const control = <FormArray>this.examCreation.get(['exams','questions',j,'options']); // also try this new syntax
   control.removeAt(k);
  }

  // remove(j:any){
  //   const control =  <FormArray>this.examCreation.get(['exams','questions',j,'options']);
  //   control.removeAt(j);
  //   control.controls = [];
  // }

  // set one option only can be checked inside a question
  isCorrectChecked(j: any, k: any){
    const controls = this.examCreation.get(['exams','questions',j,'options']).controls; // also try this new syntax
    for (let i = 0; i < controls.length; i++) {
      if(i != k){
        controls[i].value.optionIsCorrect = false;
      }
    }
  }

  examCreationSubmitted(form:any){
    var fieldsId: { fieldId: string, examId: string}[] = [];
    const fieldExams: {id: string, name: string}[] = this.examCreation.value.exams.fieldExams;
    if(fieldExams.length > 0){
      fieldExams.forEach(element => {
        fieldsId.push({ fieldId: element.id.toString(), examId: '0'});
      });    
      this.examCreation.value.exams.fieldExams = fieldsId;    
    }

    const examCreationModel: ExamCreationRequest = form.value.exams;
    
    this.examCreationService.examCreationPost(examCreationModel).subscribe(() => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Full exam has been created',
        showConfirmButton: false,
        timer: 1500
      }),
      this.router.navigateByUrl('/');
    })
  }
}