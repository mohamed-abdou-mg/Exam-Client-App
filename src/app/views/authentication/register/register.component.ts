import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Register } from 'src/app/_models/auth/register.interface';
import { AuthService } from 'src/app/_services/authentication/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup = new FormGroup({
    username: new FormControl("", [Validators.required, Validators.minLength(4), Validators.maxLength(12)]),
    email: new FormControl("", [Validators.required, Validators.email]),
    passwordHash: new FormControl("", [Validators.required, Validators.minLength(8), Validators.maxLength(16)])
  });

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.registerForm;
  }

  registerFormSubmitted(){
    const registerModel: Register = this.registerForm.value;
    this.authService.register(registerModel).subscribe((response) => {
      this.router.navigateByUrl('');
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.registerForm.controls[controlName].hasError(errorName);
  }
}
