import { Component, OnInit } from '@angular/core';
import { ExamResponse } from 'src/app/_models/exam/examResponse.interface';
import { ExamsService } from 'src/app/_services/manage/exams.service';

@Component({
  selector: 'app-exams-content',
  templateUrl: './exams-content.component.html'
})
export class ExamsContentComponent implements OnInit {

  exams: ExamResponse[];

  constructor(private examsService: ExamsService) { }

  ngOnInit(): void {
    this.getExams();
  }

  getExams(){
    this.examsService.getExams().subscribe(response => {
      this.exams = response;
    });
  }
}
