import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppUserResponse } from 'src/app/_models/appUser/appUserResponse.interface';
import { AppUserService } from 'src/app/_services/appUser/appUser.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html'
})
export class UserDetailsComponent implements OnInit {

  user: AppUserResponse;

  constructor(private usersService: AppUserService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(){
    this.usersService.getUser(this.route.snapshot.params['userId']).subscribe(response => {
      this.user = response;
    });
  }
}
