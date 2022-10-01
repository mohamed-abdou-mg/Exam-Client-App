import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExamResponse } from 'src/app/_models/exam/examResponse.interface';
import { QuestionResponse } from 'src/app/_models/question/questionResponse.interface';
import { ExamsService } from 'src/app/_services/manage/exams.service';
import { QuestionsService } from 'src/app/_services/manage/questions.service';

@Component({
  selector: 'app-exam-details',
  templateUrl: './exam-details.component.html'
})
export class ExamDetailsComponent implements OnInit {

  exam: ExamResponse;
  questions: QuestionResponse[];
  
  constructor(private examsService: ExamsService, 
    private route: ActivatedRoute,
    private questionsService: QuestionsService) { }

  ngOnInit(): void {
    this.getExam();
  }

  // call getExam() method inside examsService by passing the examId as a parameter
  // I get the examId from the route called examId
  // after getting the response successfully, the getExamQuestions() method will call by passing the examId to it 
  // it does not matter passing the id from the response or the route.
  getExam(){
    this.examsService.getExam(this.route.snapshot.params['examId']).subscribe(response => {
      this.exam = response;
      this.questionsService.getExamQuestions(this.exam.id).subscribe(response => {
        this.questions = response;
      });
    })
  }
}
