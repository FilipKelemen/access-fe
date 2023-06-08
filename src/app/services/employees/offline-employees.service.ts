import { Injectable } from '@angular/core';
import {AbstractEmployeeService} from './abstract-employee.service'
import {Database} from '../../models/supabase'
import {LocalDbService} from '../local-db.service'

@Injectable({
  providedIn: 'root'
})
export class OfflineEmployeesService implements AbstractEmployeeService{

  constructor(
    private localDbService: LocalDbService
  ) { }

  getEmployees(): Promise<Database["public"]["Tables"]["Employee"]["Row"][] | null> {
    return this.localDbService.getEmployees()
  }
}
