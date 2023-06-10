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
    if (error) return error;
    return Employee;
  }

  async getAuthorizedUsers() {
    let { data: Employee, error } = await this.supabaseService.supabase
      .from('Employee')
      .select('*')
      .eq('role', 2);
    if (error) throw error;
    return Employee;
  }

  async getSubordinatedEmployees(email: string) {
    let { data: Employee, error } = await this.supabaseService.supabase
      .from('Employee')
      .select('*')
      .eq('createdByAuthorizedUser', email)
      .range(0, 9);
    if (error) return error;
    return Employee;
  }

  async addEmployee(
    employeeData: Database['public']['Tables']['Employee']['Insert']
  ) {
    const { error } = await this.supabaseService.supabase
      .from('Employee')
      .insert([employeeData]);
    if (error) throw error;
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
}
