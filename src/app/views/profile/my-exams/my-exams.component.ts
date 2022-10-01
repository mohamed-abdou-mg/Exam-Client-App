import { Component, OnInit } from '@angular/core';
import { UserExamsResponse } from 'src/app/_models/userExams/userExamsResponse.interface';
import { ExamImplementationService } from 'src/app/_services/examImplementations/examImplementations.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-my-exams',
  templateUrl: './my-exams.component.html'
})
export class MyExamsComponent implements OnInit {

  authUserExams: UserExamsResponse[];

  constructor(private examImplementationsService: ExamImplementationService) { }

  ngOnInit(): void {
    this.getAuthUserExams();    
  }


  getAuthUserExams(){
    this.examImplementationsService.getAuthUserExams().subscribe(response => {
      this.authUserExams = response;
    })
  }

  deleteMyExam(id: number){

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
        this.examImplementationsService.deleteUserExam(id).subscribe(() => {
          Swal.fire(
            'Deleted!',
            'Your exam has been deleted.',
            'success'
          );
          this.getAuthUserExams();
        })
      }
    })
  }

}
