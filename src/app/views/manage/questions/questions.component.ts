import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionRequest } from 'src/app/_models/question/questionRequest.interface';
import { QuestionResponse } from 'src/app/_models/question/questionResponse.interface';
import { QuestionsService } from 'src/app/_services/manage/questions.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html'
})
export class QuestionsComponent implements OnInit {

  questions: QuestionResponse[];
  dtOptions: DataTables.Settings = {};

  // properties used for importing and exporting excel sheet
  questionTemplate: any[] = [];
  questionsNeedToUpload: QuestionRequest[] = [];
  uploadBtnStatus: boolean = true;

  constructor(private questionsService: QuestionsService, private router: Router) {
    this.questionTemplate = [{ 'questionName': '', 'degree': '', 'examId': ''}];
  }

  ngOnInit(): void {
    this.getQuestions();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };
  }

  getQuestions(){
    this.questionsService.getQuestions().subscribe((response) => {
      this.questions = response;
    })
  }

  deleteQuestion(questionId: number){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.questionsService.deleteQuestion(questionId).subscribe(() => {
          Swal.fire(
            'Deleted!',
            'Question has been deleted.',
            'success'
          );
          this.reloadPage();
        })
      }
    })
  }

  filterQuestions(event: QuestionResponse[]){
    this.questions = event;
  }

  fileListImported($event: any){
    this.questionsNeedToUpload = $event;
    this.uploadBtnStatus = false;
  }

  uploadFile(){
    this.questionsService.createQuestions(this.questionsNeedToUpload).subscribe(() => {
      Swal.fire(
        'Uploaded!',
        'Question has been uploaded.',
        'success'
      );
      this.reloadPage();
    })
  }

  reloadPage(){
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.navigateByUrl('/manage/questions');
  }

}
