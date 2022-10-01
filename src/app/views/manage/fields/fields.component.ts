import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { FieldRequest } from 'src/app/_models/field/fieldRequest.interface';
import { FieldResponse } from 'src/app/_models/field/fieldResponse.interface';
import { FieldsService } from 'src/app/_services/manage/fields.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-fields',
  templateUrl: './fields.component.html'
})
export class FieldsComponent implements OnInit {

  fields: FieldResponse[];
  dtOptions: DataTables.Settings = {};
  
  // properties used for importing and exporting excel sheet
  fieldTemplate: any[] = [];
  fieldsNeedToUpload: FieldRequest[] = [];
  uploadBtnStatus: boolean = true;
 
  constructor(private fieldsService: FieldsService, private router: Router) {
    this.fieldTemplate = [{ 'name': '', 'shortDescription': '', 'description': ''}];
  }

  ngOnInit(): void {
    this.getFields();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };
  }

  getFields(){
    this.fieldsService.getFields().subscribe((response) => {
      this.fields = response;
    })
  }

 deleteField(fieldId: number){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.fieldsService.deleteField(fieldId).subscribe(() => {
          Swal.fire(
            'Deleted!',
            'Field has been deleted.',
            'success'
          );
          this.reloadPage();
        });
      }
    })
  }

  fileListImported($event: any){
    this.fieldsNeedToUpload = $event;
    this.uploadBtnStatus = false;
  }

  uploadFile(){
    this.fieldsService.createFields(this.fieldsNeedToUpload).subscribe(() => {
      Swal.fire(
        'Uploaded!',
        'Field has been uploaded.',
        'success'
      );
      this.reloadPage();
    })
  }

  reloadPage(){
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.navigateByUrl('/manage/fields');
  }

}