import { Injectable } from '@angular/core';
import { SupabaseService } from '../supabase.service';
import { Database } from '../../models/supabase';
import { LocalDbService } from '../local-db.service';
import { AbstractEmployeeService } from './abstract-employee.service';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService implements AbstractEmployeeService {
  loggedUser: any;
  constructor(
    private supabaseService: SupabaseService,
    private localDbService: LocalDbService
  ) {}

  async getEmployees() {
    let { data: Employee, error } = await this.supabaseService.supabase
      .from('Employee')
      .select('*')
      .range(0, 9);
    if (error) throw error;
    await this.localDbService.cacheEmployees(Employee);
    return Employee;
  }

  async getEmployee(IMEI: string) {
    let { data: Employee, error } = await this.supabaseService.supabase
      .from('Employee')
      .select('*')
      .eq('IMEI', IMEI);
    if (error) throw error;
    return Employee;
  }

  async getEmployeeByEmail(email: string) {
    let { data: Employee, error } = await this.supabaseService.supabase
      .from('Employee')
      .select('*')
      .eq('email', email);
    if (error) throw error;
    return Employee;
  }

  async getAuthorizedUsers() {
    let { data: Employee, error } = await this.supabaseService.supabase
      .from('Employee')
      .select('*')
      .neq('role', 3);
    if (error) throw error;
    return Employee;
  }

  async getSubordinatedEmployees(email: string) {
    let { data: Employee, error } = await this.supabaseService.supabase
      .from('Employee')
      .select('*')
      .eq('createdByAuthorizedUser', email)
      .range(0, 9);
    if (error) throw error;
    return Employee;
  }

  async addEmployee(
    employeeData: Database['public']['Tables']['Employee']['Insert']
  ) {
    const { error } = await this.supabaseService.supabase
      .from('Employee')
      .insert([employeeData]);
    if (error) throw error;
    return true;
  }

  async updateEmployee(
    employeeData: Database['public']['Tables']['Employee']['Update']
  ) {
    const { error } = await this.supabaseService.supabase
      .from('Employee')
      .update(employeeData)
      .eq('IMEI', employeeData.IMEI);
    if (error) throw error;
  }

  async deleteEmployee(IMEI: string) {
    const { error } = await this.supabaseService.supabase
      .from('Employee')
      .delete()
      .eq('IMEI', IMEI);
    if (error) throw error;
  }

  async savePhoto(photoFile: any) {
    const { error } = await this.supabaseService.supabase.storage
      .from('photos')
      .upload(photoFile[0].name, photoFile[0], {
        cacheControl: '3600',
        contentType: photoFile[0].type,
        upsert: false,
      });
  }

  isAdmin(employee: Database['public']['Tables']['Employee']['Row']): boolean {
    if (this.supabaseService.isAuthenticated() && employee.role === 1)
      return true;
    return false;
  }
}
