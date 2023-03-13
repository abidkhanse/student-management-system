import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { Employee } from 'src/app/entity/employee';
import { Role } from 'src/app/entity/role';
import { DataService } from 'src/app/services/data.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {

  postError = false;
  postErrorMessage = "";
  employee: Employee = new Employee()
  id?: number;
  roleTypes?: Observable<String[]>

  constructor(private employeeService: EmployeeService, private route: ActivatedRoute, private router: Router, private dataService: DataService) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.params['id'];
    this.roleTypes = this.dataService.getRoleTypes()

    this.employeeService.getEmployeeById(this.id).subscribe(data => {
      this.employee = data;
    }, error => console.log(error))

  };

  onHttpError(e: any) {

    console.log("Error: " + e.error.message)
    this.postError = true;
    this.postErrorMessage = e.error.message;

  }


  gotoEmployeeList() {
    this.router.navigate(['/employees'])
  }



  onSubmit(form: NgForm, employee: Employee) {

    console.log("form is valid " + form.valid)

    if (form.valid) {

      this.employeeService.updateEmployee(this.employee).pipe(

        catchError(
          e => {
            console.log("onSubmit " + e.error.message)
            this.onHttpError(e)
            return throwError(e)
          })
      )
        .subscribe(
          () => {
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
}
