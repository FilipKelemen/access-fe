import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from '../services/supabase.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  loggedUser: any;
  constructor(
    private router: Router,
    private supabaseService: SupabaseService
  ) {}
  ngOnInit(): void {
    // this.supabaseService
    //   .getLoggedUser()
    //   .then((data) => (this.loggedUser = data));
  }

  logout() {
    this.supabaseService.signOut().then(() => {
      this.router.navigateByUrl('/auth');
    });
  }
}
