import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../services/supabase.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  loginForm: FormGroup;
  loginValid = true;
  loggedUser: any;
  user: any;
  constructor(
    private readonly supabaseService: SupabaseService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [localStorage.getItem('email') || '', Validators.required],
      password: ['', Validators.required],
    });
  }

  async onSubmit(): Promise<void> {
    try {
      const { error } =
        await this.supabaseService.supabase.auth.signInWithPassword({
          email: this.loginForm.value.email,
          password: this.loginForm.value.password,
        });
      const getUserAutorizat = async () => {
        const { data, error } = await this.supabaseService.supabase
          .from('Authorised_user')
          .select()
          .eq('E-mail', this.loginForm.value.email);
        if (error) return error;
        return data;
      };
      getUserAutorizat().then((data) => {
        this.user = data;
        localStorage.setItem('user', this.user);
      });

      if (error) throw error;
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
        return;
      }
    }
    this.supabaseService
      .getLoggedUser()
      .then((data) => (this.loggedUser = data));
    location.href = '';
  }
}
