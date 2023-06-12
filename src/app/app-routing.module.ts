import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';
import { EmployeesComponent } from './employees-stuff/employees/employees.component';

const routes: Routes = [
  {
    path: '',
    component: EmployeesComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
