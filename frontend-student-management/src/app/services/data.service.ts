import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Role } from '../entity/role';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient) { }

  private baseUrl = "http://localhost:8080/data-service/"
  
  getRoleTypes(): Observable<string[]> {
    return of(['User','Manager','Admin'])
  }
    
  getRoles(): Observable<Role[]> {
    return this.httpClient.get<Role[]>(this.baseUrl + "roles")
  }
  



}

