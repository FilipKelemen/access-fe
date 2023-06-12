import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { SupabaseService } from './supabase.service';
@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public supabase: SupabaseService, public router: Router) {}
  canActivate(): boolean {
    if (this.supabase.isAuthenticated()) return true;
    else {
      this.router.navigateByUrl('/auth');
      return false;
    }
  }
}
