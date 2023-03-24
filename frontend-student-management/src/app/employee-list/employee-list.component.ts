import { Component, OnInit } from '@angular/core';
import { Employee } from '../entity/employee';
import { EmployeeService } from '../services/employee.service';
import { Router } from '@angular/router';
import { PopupMessageService } from '../services/popup-message.service';
import { catchError, Subscription, throwError } from 'rxjs';
import { Role } from '../entity/role';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { DataService } from '../services/data.service';


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employee: Employee = {} as Employee;
  roles: Role[] = []
  value?: string;
  postError = false;
  postErrorMessage = "";
  subs: Subscription[] = [];
  isSubmitted = false

  employees: Employee[] = []

  registerForm = this.fb.group({

    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    role: '',
    password: [this.generatePassword(), [Validators.required, Validators.minLength(5)]]

  })
  constructor(private dataService: DataService, private fb: FormBuilder, private employeeService: EmployeeService, private router: Router, private popupService: PopupMessageService) { }

  ngOnInit(): void {

    this.getEmployees()
    this.getRoles()

  }

  getEmployees() {
    this.employeeService.getEmployeesList().subscribe((data: Employee[]) => {
      this.employees = data.map(e => ({ ...e, exist: true }))
    })
  }

  updateEmployee(id?: number) {
    this.router.navigate(['update-employee', id]);
  }


  deleteEmployee(id?: number) {
    this.employeeService.deleteEmployee(id).subscribe(data => {
      this.getEmployees()
    })
  }

  addNewRow() {

    console.log("Add Row pressed")
    this.employees = [...this.employees, { email: "", firstname: "", lastname: "", id: 0, password: "", role: "", exist: false }]

  }

  removeNewRow() {

    this.employees.pop()

  }



  onSubmit() {

    this.isSubmitted = true

    console.log(this.registerForm)

    if (this.registerForm.valid) {

      if (this.registerForm.value) {

        let val = this.employeeService.createEmployee(this.registerForm.value as Employee).pipe(

          catchError(
            e => {
              this.popupService.errorMessage({ message: "Error:" + e.error.message })
              console.log("onSubmit " + e.error.message)
              //this.onHttpError(e)
              return throwError(e)
            })
        )
          .subscribe(
            result => {
              if (this.registerForm.valid) {
                this.popupService.successMessage({ message: "User created: email:" + this.registerForm.value.email })
                console.log("successfully created user with email: " + this.registerForm.valid)

                this.resetControlsAndValues()

              } else {
                this.postError = true;
                this.postErrorMessage = "Fix the errors"
              }
            }
          );
        this.subs.push(val)
      }
    }
  }

  resetControlsAndValues() {

    this.getEmployees();
    this.registerForm.reset()
    this.registerForm.updateValueAndValidity()
    this.registerForm.get("password")?.setValue(this.generatePassword())
    this.registerForm.controls['role'].setValue(this.roles[0].role)

  }

  gotoEmployeeList() {
    window.location.reload()
  }

  getRoles() {

    this.dataService.getRoles().subscribe(data => {
      this.roles = data    
      this.registerForm.controls['role'].setValue(this.roles[0].role)
    })

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
