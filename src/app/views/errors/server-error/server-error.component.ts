import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-server-error',
  templateUrl: './server-error.component.html'
})
export class ServerErrorComponent implements OnInit {

  error: any;

  constructor(private router: Router) { 
    this.error = router.getCurrentNavigation()?.extras?.state?.['error'];
  }

  ngOnInit(): void {
  }

}
