import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamRequest } from 'src/app/_models/exam/examRequest.interface';
import { ExamsService } from 'src/app/_services/manage/exams.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import Swal from 'sweetalert2';
import { FieldsService } from 'src/app/_services/manage/fields.service';
import { FieldResponse } from 'src/app/_models/field/fieldResponse.interface';

@Component({
  selector: 'app-modify-exam',
  templateUrl: './modify-exam.component.html'
})
export class ModifyExamComponent implements OnInit {

  //dropdown declare props
  fields: FieldResponse[];
  selectedItems: {id: number, name: string}[] = [];
  dropdownSettings: IDropdownSettings = {};

  examId: any;
  modifyFormGroup: FormGroup;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private examsService: ExamsService,
    private fieldsService: FieldsService) { }

  ngOnInit(): void {    
    if(this.route.snapshot.queryParamMap.get('examId')||0 != 0){
      this.examId = this.route.snapshot.queryParamMap.get('examId')||0;
    }

    //dropdown options
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: "Select All Items From List",
      unSelectAllText: "UnSelect All Items From List",
      itemsShowLimit: 8,
      allowSearchFilter: true
    };

    this.modifyFormGroup = new FormGroup({
      name: new FormControl('', [Validators.required]),
      shortDescription: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      duration: new FormControl('', [Validators.required]),
      fieldExams: new FormControl(this.selectedItems)
    })

    this.getFields();
  }


  getFields(){
    this.fieldsService.getFields().subscribe(response => {
      this.fields = response;
      if(this.route.snapshot.queryParamMap.get('examId')||0 != 0){
        this.getExamDetails(this.examId);
      }
    });
  }

  getExamDetails(id: number){
    this.examsService.getExam(id).subscribe(response => {
      var fieldsExam:{id: number, name: string | undefined}[]  = [];
      if(response.fieldExams){
        response.fieldExams.forEach(element => {
          fieldsExam.push({ id: element.fieldId, name: this.fields.find(f=>f.id == element.fieldId)?.name });
        });
      }
      this.modifyFormGroup.addControl('id', new FormControl(this.examId));
      this.modifyFormGroup.patchValue({
        name: response.name,
        shortDescription: response.shortDescription,
        description: response.description,
        duration: response.duration,
        fieldExams: fieldsExam
      });
    })
  }

  modifyFormSubmitted(){
    var fieldsId: { fieldId: string, examId: string}[] = [];
    const fieldExams: {id: string, name: string}[] = this.modifyFormGroup.value.fieldExams;
    
    if(this.examId > 0){
      //update section
      fieldExams.forEach(element => {
        fieldsId.push({ fieldId: element.id.toString(), examId: this.examId.toString()});
      });
      this.modifyFormGroup.value.fieldExams = fieldsId;  
      const examRequest: ExamRequest = this.modifyFormGroup.value;
      console.log(examRequest);
      this.examsService.updateExam(examRequest).subscribe(() => {
        this.router.navigateByUrl('/manage/exams/' + this.examId);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Exam has been updated',
          showConfirmButton: false,
          timer: 1500
        })
      });

    }else{
      //create section
      fieldExams.forEach(element => {
        fieldsId.push({ fieldId: element.id.toString(), examId: '0'});
      });
      this.modifyFormGroup.value.fieldExams = fieldsId;  
      const examRequest: ExamRequest = this.modifyFormGroup.value;
      this.examsService.createExam(examRequest).subscribe(() => {
        this.router.navigateByUrl('/manage/exams');
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Exam has been created',
          showConfirmButton: false,
          timer: 1500
        })
      });
    }
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.modifyFormGroup.controls[controlName].hasError(errorName);
  }
}
