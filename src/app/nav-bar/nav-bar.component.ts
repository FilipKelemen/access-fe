import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from '../services/supabase.service';
import { Database } from '../models/supabase';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  user: any;
  constructor(
    private router: Router,
    private supabaseService: SupabaseService
  ) {}
  ngOnInit(): void {
    this.supabaseService.getLoggedUser().then((data) => (this.user = data));
  }

  logout() {
    localStorage.clear();
    this.supabaseService.signOut().then(() => {
      location.href = '/auth';
    });
  }

  create() {
    this.router.navigateByUrl('/create');
  }
}
