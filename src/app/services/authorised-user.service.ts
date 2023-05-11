import { Injectable } from '@angular/core';
import {SupabaseService} from './supabase.service'

@Injectable({
  providedIn: 'root'
})
export class AuthorisedUserService {

  constructor(private supabaseService: SupabaseService) { }

  async getAll () {
    let { data: AuthorisedUser, error } = await this.supabaseService.supabase
      .from('AuthorisedUser')
      .select('*')
    if(error) throw error
    return AuthorisedUser
  }
}
