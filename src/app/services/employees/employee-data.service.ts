import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs'
import {Database} from '../../models/supabase'
import {EmployeesService} from './employees.service'
import {OfflineEmployeesService} from './offline-employees.service'
import {OnlineStatusService} from '../online-status.service'
import {AbstractEmployeeService} from './abstract-employee.service'

@Injectable({
  providedIn: 'root'
})
export class EmployeeDataService {

  private isOnlinePolimorphicMap: {[key in 'true' | 'false']: AbstractEmployeeService} = {
    true: this.employeesService,
    false: this.offlineEmployeesService
  }

  employees$: BehaviorSubject<Database['public']['Tables']['Employee']['Row'][] | null> = new BehaviorSubject<Database['public']['Tables']['Employee']['Row'][] | null>(null)
  constructor(
    private employeesService: EmployeesService,
    private offlineEmployeesService: OfflineEmployeesService,
    private onlineStatusService: OnlineStatusService
  ) {
    this.initEmployees()

  }
  private initEmployees() {
    this.onlineStatusService.isOnline$.subscribe(
      (isOnline) => {
        this.isOnlinePolimorphicMap[String(isOnline) as 'true' | 'false'].getEmployees()
          .then((employees) => {
            this.employees$.next(employees)
          })
      }
    )
  }

}
