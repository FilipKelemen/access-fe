import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';

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
    if (error) return error;
    return Attendance;
  }
}
