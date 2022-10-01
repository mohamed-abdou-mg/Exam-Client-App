import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppUserRequest } from 'src/app/_models/appUser/appUserRequest.interface';
import { AppUserService } from 'src/app/_services/appUser/appUser.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-info-details',
  templateUrl: './info-details.component.html'
})
export class InfoDetailsComponent implements OnInit {

  userFormGroup: FormGroup;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private appUserService: AppUserService) { }

  // if there is an examId queryParam in the route => Update Section
  // else => Create Section
  ngOnInit(): void {    

    this.userFormGroup = new FormGroup({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      surName: new FormControl(''),
      firstName: new FormControl(''),
      jobTitle: new FormControl('')
    })

    this.getAuthUser();
  }


  getAuthUser(){
    this.appUserService.getAuthUser().subscribe(response => {
      this.userFormGroup.patchValue({
        username: response.username,
        email: response.email,
        surName: response.surName,
        firstName: response.firstName,
        jobTitle: response.jobTitle
      });
    });
  }

  userFormSubmitted(){
    const appUserRequest: AppUserRequest = this.userFormGroup.value;
    console.log(appUserRequest);
    this.appUserService.updateAuthUser(appUserRequest).subscribe(() => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Profile has been updated',
        showConfirmButton: false,
        timer: 1500
      })
    });

  }

  public hasError = (controlName: string, errorName: string) => {
    return this.userFormGroup.controls[controlName].hasError(errorName);
  }

}
