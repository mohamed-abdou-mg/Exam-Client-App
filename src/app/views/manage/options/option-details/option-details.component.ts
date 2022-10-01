import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OptionResponse } from 'src/app/_models/option/optionResponse.interface';
import { OptionsService } from 'src/app/_services/manage/options.service';

@Component({
  selector: 'app-option-details',
  templateUrl: './option-details.component.html'
})
export class OptionDetailsComponent implements OnInit {

  option: OptionResponse;

  constructor(private optionsService: OptionsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getOption();
  }

  // call getOption() method inside optionService by passing the optionId as a parameter
  // I get the optionId from the route called optionId
  getOption(){
    this.optionsService.getOption(this.route.snapshot.params['optionId']).subscribe(response => {
      this.option = response;
    })
  }

}
