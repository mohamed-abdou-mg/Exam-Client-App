import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserExamsResponse } from 'src/app/_models/userExams/userExamsResponse.interface';
import { UserExamService } from 'src/app/_services/manage/userExam.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-exams',
  templateUrl: './user-exams.component.html'
})
export class UserExamsComponent implements OnInit {

  userExams: UserExamsResponse[];
  dtOptions: DataTables.Settings = {};

  constructor(private userExamService: UserExamService, private router: Router) { }

  ngOnInit(): void {
    this.getUserExams();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };
  }

  getUserExams(){
    this.userExamService.getUserExams().subscribe(response => {
      this.userExams = response;
    });
  }

  deleteUserExam(id: number){
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
        this.userExamService.deleteUserExam(id).subscribe(() => {
          Swal.fire(
            'Deleted!',
            'Your exam has been deleted.',
            'success'
          );
          this.reloadPage();
        })
      }
    })
  }

  reloadPage(){
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.navigateByUrl('/manage/exams');
  }
}
