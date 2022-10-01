import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-no-content',
  templateUrl: './no-content.component.html'
})
export class NoContentComponent implements OnInit {

  @Input() contentName: string;
  @Input() url: string;

  constructor() { }

  ngOnInit(): void {
  }

}
