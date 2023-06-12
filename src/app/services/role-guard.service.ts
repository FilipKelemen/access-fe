import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { SupabaseService } from './supabase.service';
import { EmployeesService } from './employees/employees.service';

@Injectable()
export class RoleGuardService implements CanActivate {
  constructor(
    public supabaseService: SupabaseService,
    public router: Router,
    private employeesService: EmployeesService
  ) {}
  match: boolean;
  loggedUser: any;
  canActivate(route: ActivatedRouteSnapshot): boolean {
    const token = localStorage.getItem('sb-oqphhgyulecsgphlwjqr-auth-token');
    if (token === null) return false;
    this.employeesService
      .getEmployeeByEmail(JSON.parse(token).user.email)
      .then((data) => {
        this.loggedUser = data;
        this.match = this.employeesService.isAdmin(this.loggedUser[0]);
      });
    return this.match;
  }
}
