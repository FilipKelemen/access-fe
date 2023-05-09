import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SupabaseService } from '../services/supabase.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent implements OnInit {
  createUser: FormGroup;
  hide = true;
  constructor(
    private formBuilder: FormBuilder,
    private supabaseService: SupabaseService
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
      createdByAuthorisedUser: [''],
    });
    this.createUser.markAllAsTouched();
  }

  async Save() {
    const { data, error } =
      await this.supabaseService.supabase.auth.admin.createUser({
        email: this.createUser.value.email,
        password: this.createUser.value.password,
        email_confirm: true,
      });
    if (error) return;
    location.href = '';
  }
}
