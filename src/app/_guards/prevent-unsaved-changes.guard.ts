import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class PreventUnsavedChangesGuard implements CanDeactivate<unknown> {
  canDeactivate(component: any){
    return confirm("Are you sure?");
  }
}