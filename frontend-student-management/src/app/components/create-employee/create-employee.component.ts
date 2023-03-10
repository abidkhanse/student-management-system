import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { catchError, Observable, take, throwError } from 'rxjs';
import { Employee } from 'src/app/entity/employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  employee: Employee = new Employee()
  roleTypes?: Observable<string[]>

  value?: Array<string>;

  postError = false;
  postErrorMessage = "";

  constructor(private employeeService: EmployeeService, private router: Router, private dataService: DataService) { }

  ngOnInit(): void {

    this.employee.password = this.randomString()
    this.roleTypes = this.dataService.getRoleTypes()

    this.roleTypes
      .pipe(take(1))
      .subscribe((firstName) => {
        this.value = firstName;
      });

    this.employee.role = this.value?.at(0)


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

    console.log("form is valid " + form.valid)
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


