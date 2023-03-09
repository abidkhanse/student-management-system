import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateEmployeeComponent } from './components/create-employee/create-employee.component';
import { HomeComponent } from './components/home/home.component';
import { UpdateEmployeeComponent } from './components/update-employee/update-employee.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';

const routes: Routes = [
  {path :"employees", component: EmployeeListComponent},
  {path :"", redirectTo: "employees", pathMatch: 'full'},
  {path :"create-employee", component: CreateEmployeeComponent},
  {path :"update-employee/:id", component: UpdateEmployeeComponent},
  {path :"home", component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
