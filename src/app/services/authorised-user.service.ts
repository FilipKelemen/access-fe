import { Injectable } from '@angular/core';
import {SupabaseService} from './supabase.service'
import {Database} from '../models/supabase'

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

  async post(postDTO: Database['public']['Tables']['AuthorisedUser']['Insert']) {
    const { data: Response, error } = await this.supabaseService.supabase
      .from('AuthorisedUser')
      .insert([
        postDTO,
      ])
    if(error) throw error
  }
  async getOne(email: string) {

    let { data: AuthorisedUser, error } = await this.supabaseService.supabase
      .from('AuthorisedUser')
      .select("*")

      // Filters
      .eq('Email', email)

  }
  async update(putDTO: Database['public']['Tables']['AuthorisedUser']['Update'], email: string) {

    const { data, error } = await this.supabaseService.supabase
      .from('AuthorisedUser')
      .update(putDTO)
      .eq('Email', email)

  }

  async delete(email: string) {
    const { data, error } = await this.supabaseService.supabase
      .from('AuthorisedUser')
      .delete()
      .eq('Email', email)

  }
}

