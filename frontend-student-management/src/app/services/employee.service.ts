import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../entity/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private httpClient: HttpClient) { }

  private baseUrl = "http://localhost:8080/employee-service/"

  getEmployeesList(): Observable<Employee[]> {

    console.log("getAllUsers")
    return this.httpClient.get<Employee[]>(this.baseUrl + "employees")

  }

  createEmployee(employee: Employee): Observable<Employee> {

    return this.httpClient.post<Employee>(this.baseUrl + "employee", employee)

  }

  getEmployeeById(id?: number): Observable<Employee> {

    return this.httpClient.get<Employee>(this.baseUrl + "employee/" + id)
  
  }




}
