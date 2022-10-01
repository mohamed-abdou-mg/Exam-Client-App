import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FieldRequest } from 'src/app/_models/field/fieldRequest.interface';
import { FieldsService } from 'src/app/_services/manage/fields.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modify-field',
  templateUrl: './modify-field.component.html'
})
export class ModifyFieldComponent implements OnInit {

  fieldId: any;
  modifyFormGroup: FormGroup;

  constructor(private router: Router, private route: ActivatedRoute, private fieldsService: FieldsService) { }

  ngOnInit(): void {
    if(this.route.snapshot.queryParamMap.get('fieldId')||0 != 0){
      this.fieldId = this.route.snapshot.queryParamMap.get('fieldId')||0;
      this.getFieldDetails(this.fieldId);
    }

    this.modifyFormGroup = new FormGroup({
      name: new FormControl('', [Validators.required]),
      shortDescription: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });
  }

  getFieldDetails(id: number){
    this.fieldsService.getField(id).subscribe(response => {
      this.modifyFormGroup.addControl('id', new FormControl(this.fieldId));
      this.modifyFormGroup.patchValue({
        name: response.name,
        shortDescription: response.shortDescription,
        description: response.description
      });
    })
  }

  modifyFormSubmitted(){
    const fieldRequest: FieldRequest = this.modifyFormGroup.value;
    if(this.fieldId > 0){
      //update section
      this.fieldsService.updateField(fieldRequest).subscribe(() => {
        this.router.navigateByUrl('/manage/fields/' + this.fieldId);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Field has been updated',
          showConfirmButton: false,
          timer: 1500
        })
      });

    }else{
      //create section
      this.fieldsService.createField(fieldRequest).subscribe(() => {
        this.router.navigateByUrl('/manage/fields');
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Field has been created',
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
