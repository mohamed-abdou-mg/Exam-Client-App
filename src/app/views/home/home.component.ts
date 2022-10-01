import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, take } from 'rxjs';
import { AuthService } from 'src/app/_services/authentication/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.checkDbRolesAvailable().subscribe(() => {});
  }

  startNav(){
    this.authService.currentUser$.pipe(take(1)).subscribe(response => {
      if(response?.roleName == 'Admin'){
        this.router.navigateByUrl('/manage/fields');
      }else if(response?.roleName == 'Trainer'){
        this.router.navigateByUrl('/exams-content');
      }else {
        this.router.navigateByUrl('/login');
      }
    })
  }
}