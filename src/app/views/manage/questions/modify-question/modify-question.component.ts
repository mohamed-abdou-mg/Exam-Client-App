import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamResponse } from 'src/app/_models/exam/examResponse.interface';
import { QuestionRequest } from 'src/app/_models/question/questionRequest.interface';
import { ExamsService } from 'src/app/_services/manage/exams.service';
import { QuestionsService } from 'src/app/_services/manage/questions.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modify-question',
  templateUrl: './modify-question.component.html'
})
export class ModifyQuestionComponent implements OnInit {

  questionId: any;
  modifyFormGroup: FormGroup;
  exams: ExamResponse[];

  constructor(private router: Router, private route: ActivatedRoute, private examServices: ExamsService, private questionsService: QuestionsService) { }

  // if there is a fieldId queryParam in the route => Update Section, call getFieldDetails to fill the form with the details
  // else => Create Section
  ngOnInit(): void {

    this.getExams();

    if(this.route.snapshot.queryParamMap.get('question')||0 != 0){
      this.questionId = this.route.snapshot.queryParamMap.get('question')||0;
      this.getQuestionDetails(this.questionId);
    }

    this.modifyFormGroup = new FormGroup({
      questionName: new FormControl('', [Validators.required]),
      degree: new FormControl('', [Validators.required]),
      examId: new FormControl('', [Validators.required])
    })
  }

  getExams(){
    this.examServices.getExams().subscribe(response => {
      this.exams = response;
    })
  }

  getQuestionDetails(id: number){
    this.questionsService.getQuestion(id).subscribe(response => {
      this.modifyFormGroup.addControl('id', new FormControl(this.questionId));
      this.modifyFormGroup.patchValue({
        questionName: response.questionName,
        degree: response.degree,
        examId: response.examId
      });
    })
  }

  modifyFormSubmitted(){
    const questionRequest: QuestionRequest = this.modifyFormGroup.value;
    if(this.questionId > 0){
      //update section
      console.log("update");
      console.log(questionRequest);
      this.questionsService.updateQuestion(questionRequest).subscribe(() => {
        this.router.navigateByUrl('/manage/questions/' + this.questionId);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Question has been updated',
          showConfirmButton: false,
          timer: 1500
        })
      });

    }else{
      //create section
      this.questionsService.createQuestion(questionRequest).subscribe(() => {
        this.router.navigateByUrl('/manage/questions');
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Question has been created',
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
