import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username?: string
  password?: string
  obj?: any

  constructor(private us: UserService, private router: Router) { 
    
  }

  ngOnInit(): void {
  }

  loginUser(form: NgForm) {

    console.log("username " + this.username)
  
    
    this.us.getUserData(this.username,this.password).subscribe((res:any)=> {

      this.obj = res;
      
      if (this.obj != null) {
        this.router.navigate(["/home"])
      } else {
        alert("Invalid username or password")
      }
    })

    
  }

}
