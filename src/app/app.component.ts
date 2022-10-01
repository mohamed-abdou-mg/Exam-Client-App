import { Component, OnInit } from '@angular/core';
import { AuthService } from './_services/authentication/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(private authService: AuthService){}
  
  ngOnInit(): void {
    this.setCurrentUser();
  }
  title = 'ExamClientApp';

  setCurrentUser(){
    this.authService.setCurrentUser(JSON.parse(localStorage.getItem("authUser") || '{}'));
  }
}