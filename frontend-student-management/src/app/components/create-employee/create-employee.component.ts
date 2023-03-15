import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { catchError, Observable, Subscription, take, throwError } from 'rxjs';
import { Employee } from 'src/app/entity/employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Role } from 'src/app/entity/role';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit, OnDestroy{

  employee: Employee = {} as Employee;
  roles : Role[] = []
  value?: string;
  postError = false;
  postErrorMessage = "";
  subs : Subscription[] = [];
  isSubmitted = false

  registerForm = this.fb.group({

    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    role: '',
    password:[this.generatePassword(), [Validators.required,Validators.minLength(5)]]

  })

  constructor(private fb: FormBuilder, private employeeService: EmployeeService, private router: Router, private dataService: DataService) { }

  ngOnInit(): void {
    this.getRoles()
  }

  ngOnDestroy(): void {

    this.subs.forEach(sub => {
      sub.unsubscribe()
    })
  }



  getRoles() {

    this.dataService.getRoles().subscribe(data => {
      this.roles = data    
      this.registerForm.controls['role'].setValue(this.roles[0].role)
    })

  }

  onHttpError(e: any) {

    console.log("Error: " + e.error.message)
    this.postError = true;
    this.postErrorMessage = e.error.message;

  }

  gotoEmployeeList() {
    this.router.navigate(['/employees'])
  }

  onSubmit() {

    this.isSubmitted = true

    console.log(this.registerForm)

    if (this.registerForm.valid) {

      let val = this.employeeService.createEmployee(this.registerForm.value as Employee).pipe(
        
        catchError(
          e => {
            console.log("onSubmit " + e.error.message)
            this.onHttpError(e)
            return throwError(e)
          })
      )
        .subscribe(
          result => {
            if (this.registerForm.valid) {
              console.log("successfully created user with email: " + this.registerForm.valid)
              this.gotoEmployeeList();
              
            } else {
              this.postError = true;
              this.postErrorMessage = "Fix the about errors"

            }
          }
        );

        this.subs.push(val)
    }
  }


  generatePassword() {

    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for (var i = 0; i < 10; i++) {
      result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }

    return result;
  }

}


