import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OptionRequest } from 'src/app/_models/option/optionRequest.interface';
import { QuestionResponse } from 'src/app/_models/question/questionResponse.interface';
import { OptionsService } from 'src/app/_services/manage/options.service';
import { QuestionsService } from 'src/app/_services/manage/questions.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modify-option',
  templateUrl: './modify-option.component.html'
})
export class ModifyOptionComponent implements OnInit {

  optionId: any;
  modifyFormGroup: FormGroup;
  questions: QuestionResponse[];

  constructor(private router: Router,
    private route: ActivatedRoute, 
    private questionServices: QuestionsService, 
    private optionsService: OptionsService) { }


  ngOnInit(): void {

    this.getQuestions();

    if(this.route.snapshot.queryParamMap.get('option')||0 != 0){
      this.optionId = this.route.snapshot.queryParamMap.get('option')||0;
      this.getOptionDetails(this.optionId);
    }

    this.modifyFormGroup = new FormGroup({
      optionName: new FormControl('', [Validators.required]),
      isCorrect: new FormControl(true),
      questionId: new FormControl('', [Validators.required])
    })
  }

  getQuestions(){
    this.questionServices.getQuestions().subscribe(response => {
      this.questions = response;
    })
  }

  getOptionDetails(id: number){
    this.optionsService.getOption(id).subscribe(response => {
      this.modifyFormGroup.addControl('id', new FormControl(this.optionId));
      this.modifyFormGroup.patchValue({
        optionName: response.optionName,
        isCorrect: response.isCorrect,
        questionId: response.questionId
      });
    })
  }

  modifyFormSubmitted(){
    const optionRequest: OptionRequest = this.modifyFormGroup.value;
    if(this.optionId > 0){
      //update section
      this.optionsService.updateOption(optionRequest).subscribe(() => {
        this.router.navigateByUrl('/manage/options/' + this.optionId);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Option has been updated',
          showConfirmButton: false,
          timer: 1500
        })
      });

    }else{
      //create section
      this.optionsService.createOption(optionRequest).subscribe(() => {
        this.router.navigateByUrl('/manage/options');
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Option has been created',
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
