import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeeAttendanceComponent } from './employee-attendance/employee-attendance.component';

const routes: Routes = [
  { path: 'employees', component: EmployeesComponent },
  { path: 'attendance/:IMEI', component: EmployeeAttendanceComponent },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeesRoutingModule {}
