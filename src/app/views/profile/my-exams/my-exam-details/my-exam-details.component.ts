import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExamResponse } from 'src/app/_models/exam/examResponse.interface';
import { ExamImplementationView } from 'src/app/_models/examImplementation/examImplementationView.interface';
import { ExamImplementationService } from 'src/app/_services/examImplementations/examImplementations.service';

@Component({
  selector: 'app-my-exam-details',
  templateUrl: './my-exam-details.component.html'
})
export class MyExamDetailsComponent implements OnInit {

  userExamId: number;
  userExamDetails: ExamImplementationView[];
  examDetails: ExamResponse;
  totalCorrectAnswers: number = 0;
  totalWrongAnswers: number = 0;
  fullMark: number = 0;
  userMarks: number = 0;

  constructor(private route: ActivatedRoute, private examImplementationService: ExamImplementationService) { }

  ngOnInit(): void {
    this.userExamId = this.route.snapshot.params['id'];
    this.getUserExamDetails();
  }

  getUserExamDetails(){
    this.examImplementationService.getAuthUserExam(this.userExamId).subscribe(response => {
      this.userExamDetails = response;
      response.forEach(element => {
        if(element.optionSelected.isCorrect){
          this.totalCorrectAnswers += 1;
          this.userMarks += element.question.degree;
        }
        if(!element.optionSelected.isCorrect) this.totalWrongAnswers += 1;
        this.fullMark += element.question.degree;
      });
      this.getExamDetails(this.userExamId);
    });
  }

  getExamDetails(userExamId: number){
    this.examImplementationService.getExamDetailsByUserExmId(userExamId).subscribe(response => {
      this.examDetails = response;
    });
  }

}
