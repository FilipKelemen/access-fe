import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeeAttendanceComponent } from './employee-attendance/employee-attendance.component';
import { AuthGuardService as AuthGuard } from '../services/auth-guard.service';
const routes: Routes = [
  {
    path: 'employees',
    component: EmployeesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'attendance/:IMEI',
    component: EmployeeAttendanceComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeesRoutingModule {}
