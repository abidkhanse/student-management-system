import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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

  employee: Employee = new Employee()
  roleTypes?: Observable<string[]>

  rolesList?: Observable<Role[]>
  roles : Role[] = []

  value?: string;

  postError = false;
  postErrorMessage = "";

  subs : Subscription[] = [];

  constructor(private employeeService: EmployeeService, private router: Router, private dataService: DataService) { }

  ngOnInit(): void {

    this.employee.password = this.randomString()

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
      this.employee.role = this.roles[0].role
      console.log(this.roles)
    })
  }

  onHttpError(e: any) {

    console.log("Error: " + e.error.message)
    this.postError = true;
    this.postErrorMessage = e.error.message;

  }

  saveEmployee(employee: Employee) {

    this.employeeService.createEmployee(employee).subscribe(data => {
      console.log("saveEmployee " + data);
      this.gotoEmployeeList();
    }, error => {
      console.log("createEmployee " + error.error.message)
    }
    );
  }


  gotoEmployeeList() {
    this.router.navigate(['/employees'])
  }


  onSubmit(form: NgForm, employee: Employee) {

    console.log("form is valid " + form)
    if (form.valid) {
      this.employeeService.createEmployee(this.employee).pipe(

        catchError(
          e => {
            console.log("onSubmit " + e.error.message)
            this.onHttpError(e)
            return throwError(e)
          })
      )
        .subscribe(
          result => {
            if (form.valid) {
              console.log("successfully created user with email: " + employee.email)
              this.gotoEmployeeList();
            } else {
              this.postError = true;
              this.postErrorMessage = "Fix the about errors"

            }
          }
        );
    }
  }



  randomString() {

    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for (var i = 0; i < 10; i++) {
      result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }

    return result;
  }

}


