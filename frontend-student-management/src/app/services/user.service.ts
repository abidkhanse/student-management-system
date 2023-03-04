import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }


getUserData(username?: string , password?: string) {

  console.log("getUserData " +  username + " " + password)

  

  return this.httpClient.get('http://localhost:8080/student-service/student/' + username + '/'  + password)

}

}
