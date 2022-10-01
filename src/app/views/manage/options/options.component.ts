import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OptionRequest } from 'src/app/_models/option/optionRequest.interface';
import { OptionResponse } from 'src/app/_models/option/optionResponse.interface';
import { OptionsService } from 'src/app/_services/manage/options.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html'
})
export class OptionsComponent implements OnInit {

  options: OptionResponse[];
  dtOptions: DataTables.Settings = {};

  // properties used for importing and exporting excel sheet
  optionTemplate: any[] = [];
  optionsNeedToUpload: OptionRequest[] = [];
  uploadBtnStatus: boolean = true;

  constructor(private optionsService: OptionsService, private router: Router) { 
    // initialize optionTemplate property with null values that used in download template
    this.optionTemplate = [{ 'optionName': '', 'isCorrect': '', 'questionId': ''}];
  }

  ngOnInit(): void {
    this.getOptions();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };
  }

  getOptions(){
    this.optionsService.getOptions().subscribe((response) => {
      this.options = response;
    })
  }

  deleteOption(id: number){
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
        this.optionsService.deleteOption(id).subscribe(() => {
          Swal.fire(
            'Deleted!',
            'Option has been deleted.',
            'success'
          );
          this.reloadPage();
        })
      }
    })
  }

  filterOptions(event: OptionResponse[]){
    this.options = event;
  }

  fileListImported($event: any){
    this.optionsNeedToUpload = $event;
    this.uploadBtnStatus = false;
  }

  uploadFile(){
    this.optionsService.createOptions(this.optionsNeedToUpload).subscribe(() => {
      Swal.fire(
        'Uploaded!',
        'Option file has been uploaded.',
        'success'
      );
      this.reloadPage();
    })
  }

  reloadPage(){
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.navigateByUrl('/manage/options');
  }
}
