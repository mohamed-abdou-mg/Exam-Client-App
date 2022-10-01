import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OptionResponse } from 'src/app/_models/option/optionResponse.interface';
import { QuestionResponse } from 'src/app/_models/question/questionResponse.interface';
import { OptionsService } from 'src/app/_services/manage/options.service';
import { QuestionsService } from 'src/app/_services/manage/questions.service';

@Component({
  selector: 'app-question-details',
  templateUrl: './question-details.component.html'
})
export class QuestionDetailsComponent implements OnInit {

  question: QuestionResponse;
  options: OptionResponse[];
  
  constructor(private questionsService: QuestionsService, 
    private route: ActivatedRoute,
    private optionsService: OptionsService) { }

  ngOnInit(): void {
    this.getQuestion();
  }

  // call getQuestion() method inside questionService by passing the questionId as a parameter
  // I get the questionId from the route called questionId
  // after getting the response successfully, the getQuestionOptions() method will call by passing the questionId to it 
  // it does not matter passing the id from the response or the route.
  getQuestion(){
    this.questionsService.getQuestion(this.route.snapshot.params['questionId']).subscribe(response => {
      this.question = response;
      this.optionsService.getQuestionOptions(response.id).subscribe(response => {
        this.options = response;
      })
    })
  }

}
