import { Component, OnInit } from '@angular/core';
import { Employee } from '../entity/employee';
import { EmployeeService } from '../services/employee.service';
import { Router } from '@angular/router';
import { PopupMessageService } from '../services/popup-message.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employees : Employee[] = []

  constructor(private employeeService: EmployeeService, private router: Router, private popupService: PopupMessageService) { }

  ngOnInit(): void {

    this.getEmployees() 

  }

  getEmployees() {
    this.employeeService.getEmployeesList().subscribe(data => {
      this.employees = data
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

}
