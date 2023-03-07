import { Component, OnInit } from '@angular/core';
import { Employee } from '../entity/employee';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employees : Employee[] = []

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {

    this.getEmployees() 

    /*

    this.employees = [{
      "id": 1,
      "firstname": "Abid",
      "lastname" : "Khan",
      "emailid" : "abid@seb.se"
    },
    {
      "id": 2,
      "firstname": "Shahroz",
      "lastname" : "Khan",
      "emailid" : "shahroz@seb.se"
    }
    */

  }

  getEmployees() {
    this.employeeService.getEmployeesList().subscribe(data => {
      this.employees = data
    })
  }

}
