import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  private baseUrl = "http://localhost:8080/student-service/"


  getUserData(username?: string, password?: string) {

    console.log("getUserData " + username + " " + password)

    return this.httpClient.get(this.baseUrl + 'student/' + username + '/' + password)

  }

  getAllEmployees() {

    console.log("getAllUsers")
    return this.httpClient.get(this.baseUrl + "user-service/users")
    
  }


}
