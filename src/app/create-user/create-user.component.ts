import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Database } from '../models/supabase';
import { isPostgressError } from '../models/utils';
import { RoleService } from '../services/role.service';
import { EmployeesService } from '../services/employees/employees.service';

const defaultValues = {
  email: new FormControl(''),
  // password: new FormControl(''),
  firstName: new FormControl(''),
  lastName: new FormControl(''),
  CNP: new FormControl(''),
  photo: new FormControl(''),
  badge: new FormControl(''),
  division: new FormControl(''),
  accessInterval: new FormControl(''),
  IMEI: new FormControl(''),
  role: new FormControl(''),
  createdByAuthorisedUser: new FormControl(''),
};

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent implements OnInit {
  createUser!: FormGroup<typeof defaultValues>;
  hide = true;
  selectedRole: number;
  selectedUser: string;
  selectedFiles: any;
  roles: Database['public']['Tables']['Role']['Row'][];
  authorizedUsers: Database['public']['Tables']['Employee']['Row'][];
  constructor(
    private employeesService: EmployeesService,
    private roleService: RoleService
  ) {}
  ngOnInit(): void {
    this.createUser = new FormGroup<typeof defaultValues>(defaultValues);
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
    this.createUser.value.photo =
      'https://oqphhgyulecsgphlwjqr.supabase.co/storage/v1/object/public/photos/' +
      this.selectedFiles[0].name;
    let employee = this.createUser.value;
    // const { data, error } =
    //   await this.supabaseService.supabase.auth.admin.createUser({
    //     email: this.createUser.value.email ?? '',
    //     email_confirm: true,
    //   });
    // if (error) return;
    await this.employeesService.savePhoto(this.selectedFiles);
    await this.employeesService.addEmployee(
      (employee ??
        '') as unknown as Database['public']['Tables']['Employee']['Insert']
    );
    location.href = '';
  }

  selectFile(event: any) {
    if (event.target === null) return;
    this.selectedFiles = event.target.files;
  }
}
