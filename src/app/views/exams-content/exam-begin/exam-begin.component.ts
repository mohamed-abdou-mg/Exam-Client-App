import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { interval } from 'rxjs';
import { ExamImplementation } from 'src/app/_models/examImplementation/examImplementation.interface';
import { OptionResponse } from 'src/app/_models/option/optionResponse.interface';
import { QuestionResponse } from 'src/app/_models/question/questionResponse.interface';
import { UserAnswerRequest } from 'src/app/_models/userAnswers/userAnswerRequest.interface';
import { ExamImplementationService } from 'src/app/_services/examImplementations/examImplementations.service';
import { ExamsService } from 'src/app/_services/manage/exams.service';
import { UserAnswerService } from 'src/app/_services/manage/userAnswer.service';

@Component({
  selector: 'app-exam-begin',
  templateUrl: './exam-begin.component.html'
})
export class ExamBeginComponent implements OnInit, OnDestroy {

  @HostListener('window:beforeunload', ['event']) unloadNotification($event: any){
    $event.returnValue = true;
  }
  
  // if the user forget to answer
  errorsList: string[] = [];

  //counter properties
  counter: number = 59; //default 59 minutes it will override when an exam init
  counterSec: number = 60; // total number of seconds used to calculate the duration of the exam
  intervalSec$: any;

  examId:number;
  userExamId: number;
  examImplementation:ExamImplementation[];
  activeExamImplementation:ExamImplementation;

  order:number = 0; // question order
  nextBtn:boolean = true;
  prevBtn:boolean = true;
  finishBtn:boolean = true;

  constructor(private router: Router, 
    private examsService: ExamsService,
    private examImplementationService: ExamImplementationService,
    private userAnswerService: UserAnswerService) { 
    if(router.getCurrentNavigation()?.extras?.state?.['examId'] == undefined){
      router.navigateByUrl('/');        
    }else{
      this.examId = router.getCurrentNavigation()?.extras?.state?.['examId'];
      this.counter = router.getCurrentNavigation()?.extras?.state?.['examTimer'] - 1;
    }
  }

  ngOnInit(): void {
    if(this.examId != undefined){
      this.getExamImplementations();
    }
  }

  nextBtnClicked(){
    if(this.examImplementation[this.order + 1].question.questionName != null){
      this.order = this.order + 1;
      this.activeExamImplementation = this.examImplementation[this.order];
      this.btnsStatus();
    }
  }

  prevBtnClicked(){
    if(this.examImplementation[this.order - 1].question.questionName != null){
      this.order = this.order +-1;
      this.activeExamImplementation = this.examImplementation[this.order];
      this.btnsStatus();
    }
  }

  btnsStatus(){
    if(!this.examImplementation[this.order + 1]){
      this.nextBtn = true;
      this.finishBtn = false;
    }else{
      this.nextBtn = false;
      this.finishBtn = true;
    }
    if(!this.examImplementation[this.order - 1]){
      this.prevBtn = true;
    }else{
      this.prevBtn = false;
    }
  }

  // timer control
  // the user will redirect to the home page when the time over.
  startCounter(){
    if(this.examId != undefined){
      this.intervalSec$ = interval(1000).subscribe(value => {
        this.counterSec --;
        if(this.counterSec === 0 && this.counter !== 0){
          this.counter--;
          this.counterSec = 60;
        }else if(this.counterSec === 0 && this.counter === 0){
          this.router.navigateByUrl('');
        }
      });
    }
  }

  getExamImplementations(){
    this.examImplementationService.getExamImplementations(this.examId).subscribe(response => {
      this.examImplementation = response;
      this.startCounter();
      this.order = 0;
      this.activeExamImplementation = this.examImplementation[this.order];
      console.log(this.examImplementation.length);
      console.log(this.examImplementation);
      
      if(this.examImplementation.length == 1){
        this.finishBtn = false;
      }
      if(this.examImplementation[this.order + 1].question.questionName != null){
        this.nextBtn = false;
      }
    });
  }

  optionSelected(question: QuestionResponse, option: OptionResponse){
    var examImplementaionIndex = this.examImplementation.findIndex(ei => ei.question.id == question.id);
    this.examImplementation[examImplementaionIndex].optionSelected = option;
  }

  finishExam(){
    var checkErrors = false;
    for (let i = 0; i < this.examImplementation.length; i++) {
      if(!this.examImplementation[i].optionSelected){
        this.errorsList = [];
        this.errorsList.push("check question number " + (i+1))
        checkErrors = true;
      }
    }

    if(!checkErrors){

      var userAnswers: UserAnswerRequest[] = [];
      this.examImplementation.forEach(element => {
        userAnswers.push({ questionId: element.question.id, optionId: element.optionSelected.id, userExamId: 0});
      });
  
      this.userAnswerService.createUserAnswers( this.examId, userAnswers).subscribe(() => {
        this.examsService.getExam(this.examId).subscribe(response => {
          const navigationExtras: NavigationExtras = { state: {examImplementation: this.examImplementation, exam: response}};
          this.router.navigateByUrl("/exams-content/exam-result", navigationExtras);
        });
      })
    }
  }

  ngOnDestroy(): void {
    if(this.examId != undefined){
      this.intervalSec$.unsubscribe(); 
    }
  }
}