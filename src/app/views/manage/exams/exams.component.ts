import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExamRequest } from 'src/app/_models/exam/examRequest.interface';
import { ExamResponse } from 'src/app/_models/exam/examResponse.interface';
import { ExamsService } from 'src/app/_services/manage/exams.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html'
})
export class ExamsComponent implements OnInit {

  exams: ExamResponse[];
  dtOptions: DataTables.Settings = {};

  // properties used for importing and exporting excel sheet
  examTemplate: any[] = [];
  examsNeedToUpload: ExamRequest[] = [];
  uploadBtnStatus: boolean = true;

  constructor(private examsService: ExamsService, private router: Router) { 
    this.examTemplate = [{ 'name': '', 'shortDescription': '', 'description': '', 'duration': 0}];
  }

  ngOnInit(): void {
    this.getExams();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };
  }

  getExams(){
    this.examsService.getExams().subscribe((response) => {
      this.exams = response;
    })
  }

  deleteExam(examId: number){
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
        this.examsService.deleteExam(examId).subscribe(() => {
          Swal.fire(
            'Deleted!',
            'Exam has been deleted.',
            'success'
          );
          this.reloadPage();
        })
      }
    })
  }

  fileListImported($event: any){
    this.examsNeedToUpload = $event;
    this.uploadBtnStatus = false;
  }

  uploadFile(){
    this.examsService.createExams(this.examsNeedToUpload).subscribe(() => {
      Swal.fire(
        'Uploaded!',
        'Exam has been uploaded.',
        'success'
      );
      this.reloadPage();
    })
  }

  reloadPage(){
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.navigateByUrl('/manage/exams');
  }
}