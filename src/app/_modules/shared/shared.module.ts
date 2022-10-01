import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AlertModule } from 'ngx-bootstrap/alert';
import { TabsModule } from 'ngx-bootstrap/tabs';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ToastrModule.forRoot(),
    BsDropdownModule.forRoot(),
    SweetAlert2Module.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),
    AccordionModule.forRoot(),
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }),
    AlertModule.forRoot(),
    TabsModule.forRoot()
  ],
  exports: [
    ToastrModule,
    BsDropdownModule,
    SweetAlert2Module,
    NgMultiSelectDropDownModule,
    AccordionModule,
    NgxSpinnerModule,
    AlertModule,
    TabsModule
  ]
})
export class SharedModule { }
