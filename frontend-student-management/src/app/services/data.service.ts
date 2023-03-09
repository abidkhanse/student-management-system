import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {}

  // Is it better to make a connection with database and get the roles from there or it is suffice to have roles here hard coded
  getRoleTypes(): Observable<string[]> {

    return of(['User','Manager','Admin'])
  
  }

}
