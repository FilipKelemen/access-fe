import { Injectable } from '@angular/core';
import {SupabaseService} from './supabase.service'
import {Database} from '../models/supabase'

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private supabaseService: SupabaseService) { }

  async getAll () {
    let { data: Role, error } = await this.supabaseService.supabase
      .from('Role')
      .select('*')
    if(error) throw error
    return Role
  }

  async post(postDTO: Database['public']['Tables']['Role']['Insert']) {
    const { data: Response, error } = await this.supabaseService.supabase
      .from('Role')
      .insert([
        postDTO,
      ])
    if(error) throw error
  }
  async getOne(email: string) {

    let { data: Role, error } = await this.supabaseService.supabase
      .from('Role')
      .select("*")

      // Filters
      .eq('Email', email)

  }
  async update(putDTO: Database['public']['Tables']['Role']['Update'], email: string) {

    const { data, error } = await this.supabaseService.supabase
      .from('Role')
      .update(putDTO)
      .eq('Email', email)
  }

  async delete(email: string) {
    const { data, error } = await this.supabaseService.supabase
      .from('Role')
      .delete()
      .eq('Email', email)
  }
}
