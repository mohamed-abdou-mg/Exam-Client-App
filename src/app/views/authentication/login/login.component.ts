import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/_models/auth/login.interface';
import { AuthService } from 'src/app/_services/authentication/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    passwordHash: new FormControl("", [Validators.required, Validators.minLength(8), Validators.maxLength(16)])
  });

  constructor(private router: Router, public authService: AuthService) { }

  ngOnInit(): void { 
    this.loginForm;
  }

  loginFormSubmitted(){
    const loginModel: Login = this.loginForm.value;
    this.authService.login(loginModel).subscribe((response) => {
      this.router.navigateByUrl('');
    });
  }


  public hasError = (controlName: string, errorName: string) => {
    return this.loginForm.controls[controlName].hasError(errorName);
  }
}
