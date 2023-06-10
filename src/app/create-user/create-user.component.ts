import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SupabaseService } from '../services/supabase.service';
import { Database } from '../models/supabase';
import { isPostgressError } from '../models/utils';
import { RoleService } from '../services/role.service';
import { EmployeesService } from '../services/employees/employees.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent implements OnInit {
  createUser: FormGroup;
  hide = true;
  selectedRole: number;
  selectedUser: string;
  roles: Database['public']['Tables']['Role']['Row'][];
  authorizedUsers: Database['public']['Tables']['Employee']['Row'][];
  constructor(
    private formBuilder: FormBuilder,
    private supabaseService: SupabaseService,
    private employeesService: EmployeesService,
    private roleService: RoleService
  ) {}
  ngOnInit(): void {
    this.createUser = this.formBuilder.group({
      email: [''],
      password: [''],
      firstName: [''],
      lastName: [''],
      CNP: [''],
      photo: [''],
      badge: [''],
      department: [''],
      accessInterval: [''],
      IMEI: [''],
      role: [''],
      createdByAuthorisedUser: [''],
    });
    this.createUser.markAllAsTouched();
    this.roleService.getAll().then((data) => {
      if (isPostgressError(data)) throw data;
      this.roles = data || [];
    });
    this.employeesService.getAuthorizedUsers().then((data) => {
      if (isPostgressError(data)) throw data;
      this.authorizedUsers = data || [];
    });
  }

  async Save() {
    let employee: Database['public']['Tables']['Employee']['Row'] =
      this.createUser.value;
    const { data, error } =
      await this.supabaseService.supabase.auth.admin.createUser({
        email: this.createUser.value.email,
        password: this.createUser.value.password,
        email_confirm: true,
      });
    if (error) return;
    await this.employeesService.addEmployee(employee);
    if (error) return;
    location.href = '';
  }
}
