import { Component, OnInit } from '@angular/core';
import { AppUserResponse } from 'src/app/_models/appUser/appUserResponse.interface';
import { AppUserService } from 'src/app/_services/appUser/appUser.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html'
})

export class UsersComponent implements OnInit {

  users: AppUserResponse[];
  dtOptions: DataTables.Settings = {};


  constructor(private appUserService: AppUserService) { }

  ngOnInit(): void {
    this.getUsers();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };
  }

  getUsers(){
    this.appUserService.getUsers().subscribe(response => {
      this.users = response;
    });
  }

  deleteUser(userId: string){
  // Swal.fire({
  //   title: 'Are you sure?',
  //   text: "You won't be able to revert this!",
  //   icon: 'warning',
  //   showCancelButton: true,
  //   confirmButtonColor: '#3085d6',
  //   cancelButtonColor: '#d33',
  //   confirmButtonText: 'Yes, delete it!'
  // }).then((result) => {
  //   if (result.isConfirmed) {
  //     this.appUserService.deleteUser(userId).subscribe(() => {
  //       Swal.fire(
  //         'Deleted!',
  //         'User has been deleted.',
  //         'success'
  //       );
  //       this.getUsers();
  //     })
  //   }
  // })
  }
}