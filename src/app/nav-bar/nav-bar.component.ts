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
  loggedUser: Database['public']['Tables']['Employee']['Row'];
  constructor(
    private router: Router,
    private supabaseService: SupabaseService
  ) {}
  ngOnInit(): void {}

  logout() {
    this.supabaseService.signOut().then(() => {
      this.router.navigateByUrl('/auth');
    });
  }
}
