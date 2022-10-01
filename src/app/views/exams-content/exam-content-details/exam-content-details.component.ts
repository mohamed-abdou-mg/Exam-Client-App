import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ExamResponse } from 'src/app/_models/exam/examResponse.interface';
import { QuestionResponse } from 'src/app/_models/question/questionResponse.interface';
import { ExamsService } from 'src/app/_services/manage/exams.service';
import { OptionsService } from 'src/app/_services/manage/options.service';
import { QuestionsService } from 'src/app/_services/manage/questions.service';

@Component({
  selector: 'app-exam-content-details',
  templateUrl: './exam-content-details.component.html'
})
export class ExamContentDetailsComponent implements OnInit {

  examId: any;
  startBtn: boolean = false;
  examDetails: ExamResponse;
  totalQuestions: number;
  finalMark: number = 0;

  constructor(private route: ActivatedRoute, 
    private router: Router,
    private examsService: ExamsService,
    private questionsService: QuestionsService,
    private optionsService: OptionsService) {}

  ngOnInit(): void {
    this.examId = this.route.snapshot.params['id'];
    this.getExamDetails();
  }

  getExamDetails(){
    this.examsService.getExam(this.examId).subscribe(response => {
      this.examDetails = response;
      console.log(this.examDetails);
      this.getQuestionsBrief();
    })
  }

  getQuestionsBrief(){
    this.questionsService.getExamQuestions(this.examId).subscribe(response => {
      this.totalQuestions = response.length;
      response.forEach(question => {
        this.finalMark = this.finalMark + question.degree;
      });
      this.getOptions(response);
    })
  }

  getOptions(response: QuestionResponse[]){
    response.forEach(element => {
      this.optionsService.getQuestionOptions(element.id).subscribe(response => {
        if(response.length == 0) this.startBtn = true;
        console.log(response);
      })
    });
  } 

  userTakeExam(examId: number){
    const navigationExtras: NavigationExtras = { state: { examId: examId, examTimer: this.examDetails.duration }};
    this.router.navigateByUrl("/exams-content/exam-begin", navigationExtras);
  }

}
