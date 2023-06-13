import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { Database } from '../models/supabase';

@Injectable({
  providedIn: 'root',
})
export class AttendanceService {
  constructor(private supabaseService: SupabaseService) {}

  async getAttendance(IMEI: string) {
    let { data: Attendance, error } = await this.supabaseService.supabase
      .from('Access')
      .select('*')
      .eq('IMEI', IMEI);
    if (error) throw error;
    return Attendance;
  }

  async addAttendance(
    attendance: Database['public']['Tables']['Access']['Insert']
  ) {
    const { error } = await this.supabaseService.supabase
      .from('Access')
      .insert([attendance]);
    if (error) throw error;
    return true;
  }
}
