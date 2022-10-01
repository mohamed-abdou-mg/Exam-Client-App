import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExamResponse } from 'src/app/_models/exam/examResponse.interface';
import { ExamImplementation } from 'src/app/_models/examImplementation/examImplementation.interface';

@Component({
  selector: 'app-exam-result',
  templateUrl: './exam-result.component.html'
})
export class ExamResultComponent implements OnInit {

  @HostListener('window:beforeunload', ['event']) unloadNotification($event: any){
    $event.returnValue = true;
  }

  examImplementation:ExamImplementation[];
  exam: ExamResponse;
  totalCorrectAnswers: number = 0;
  totalWrongAnswers: number = 0;
  fullMark: number = 0;
  userMarks: number = 0;

  constructor(private router: Router) { 
    if(router.getCurrentNavigation()?.extras?.state?.['examImplementation'] == undefined){
      router.navigateByUrl('/');
    }else {
      this.examImplementation = router.getCurrentNavigation()?.extras?.state?.['examImplementation'];
      this.exam = router.getCurrentNavigation()?.extras?.state?.['exam'];
      this.examImplementation.forEach(element => {
        if(element.optionSelected.isCorrect){
          this.totalCorrectAnswers += 1;
          this.userMarks += element.question.degree;
        }
        if(!element.optionSelected.isCorrect) this.totalWrongAnswers += 1;
        this.fullMark += element.question.degree;
      });
    }

  }

  ngOnInit(): void {
  }

}