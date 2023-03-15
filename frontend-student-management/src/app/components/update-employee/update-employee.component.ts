import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, Subscription, throwError } from 'rxjs';
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
  employee: Employee = {} as Employee;
  id?: number;
  roles : Role[] = []
  isSubmitted = false
  subs : Subscription[] = [];

  registerForm = this.fb.group({

    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    role: '',
    password:['', [Validators.required,Validators.minLength(5)]],
    id: 0

  })

  constructor(private fb: FormBuilder, 
    private employeeService: EmployeeService, 
    private route: ActivatedRoute, 
    private router: Router, 
    private dataService: DataService) 
  { }

  ngOnInit(): void {

    this.id = this.route.snapshot.params['id'];
    this.getRoles();

    console.log("ID " + this.id)

    let val = this.employeeService.getEmployeeById(this.id).subscribe(data => {
      this.registerForm.setValue(data)

    }, error => console.log(error))

    this.subs.push(val)

  };

  getRoles() {

    let val = this.dataService.getRoles().subscribe(data => {
      this.roles = data    
    })
    this.subs.push(val)

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
    if (this.registerForm.valid) {

      let val = this.employeeService.updateEmployee(this.registerForm.value as Employee).pipe(
        
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

}
