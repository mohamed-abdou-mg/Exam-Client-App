import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppUserRequest } from 'src/app/_models/appUser/appUserRequest.interface';
import { AppUserService } from 'src/app/_services/appUser/appUser.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-modify-user',
  templateUrl: './modify-user.component.html'
})
export class ModifyUserComponent implements OnInit {

  userId: any;
  roles: any;
  modifyFormGroup: FormGroup;

  constructor(private router: Router, private route: ActivatedRoute, private usersService: AppUserService) { }

  ngOnInit(): void {
    if(this.route.snapshot.queryParamMap.get('userId')||0 != 0){
      this.userId = this.route.snapshot.queryParamMap.get('userId')||0;
    }

    this.modifyFormGroup = new FormGroup({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      firstName: new FormControl(''),
      surName: new FormControl(''),
      jobTitle: new FormControl(''),
      roleName: new FormControl('')
    });

    this.getRoles();
  }

  getRoles(){
    this.usersService.getRoles().subscribe(response => {
      this.roles = response;
      this.getUser(this.userId);
    })
  }

  getUser(id: string){
    this.usersService.getUser(id).subscribe(response => {
      this.modifyFormGroup.addControl('id', new FormControl(this.userId));
      this.modifyFormGroup.patchValue({
        username: response.username,
        email: response.email,
        firstName: response.firstName,
        surName: response.surName,
        jobTitle: response.jobTitle,
        roleName: response.roleName
      });
    })
  }

  modifyFormSubmitted(){
    const userRequest: AppUserRequest = this.modifyFormGroup.value;
    if(this.userId != 0){
      //update section
      console.log("update section");
      console.log(userRequest);
      this.usersService.updateUser(userRequest).subscribe(() => {
        this.router.navigateByUrl('/manage/users/' + this.userId);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Field has been updated',
          showConfirmButton: false,
          timer: 1500
        })
      });
    }
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.modifyFormGroup.controls[controlName].hasError(errorName);
  }

}
