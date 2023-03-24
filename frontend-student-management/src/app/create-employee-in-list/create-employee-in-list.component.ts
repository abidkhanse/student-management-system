import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, FormGroup } from '@angular/forms';
import { Role } from '../entity/role';

@Component({
  selector: 'app-create-employee-in-list',
  templateUrl: './create-employee-in-list.component.html',
  styleUrls: ['./create-employee-in-list.component.css']
})

// We will see if we can use this otherwise it will be removed
// Don't forget to add it in app module
export class CreateEmployeeInListComponent  {

 
   @Input() registerForm! : FormGroup

  @Input() roles?: Role []

 
  onSubmit() {
    
  }
}


