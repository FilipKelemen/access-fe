import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';

export interface Employee {
  lastName: string;
  firstName: string;
  CNP: string;
  photo: string;
  badge: string;
  division: string;
  accessInterval: string;
  IMEI: string;
  access: boolean;
  createdByAuthorisedUser: string;
  data: Date;
}

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  loggedUser: any;
  constructor(private supabaseService: SupabaseService) {}

  async getPrezenta(IMEI: string) {
    const { data, error } = await this.supabaseService.supabase
      .from('Prezenta')
      .select()
      .eq('IMEI', IMEI);
    if (error) return error;
    return data;
  }
}
