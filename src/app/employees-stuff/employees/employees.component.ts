import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Database } from 'src/app/models/supabase';
import { EmployeeDataService } from '../../services/employees/employee-data.service';
import { BehaviorSubject, map } from 'rxjs';
import { OnlineStatusService } from '../../services/online-status.service';
import { Router } from '@angular/router';
import { EmployeesService } from 'src/app/services/employees/employees.service';
import { SupabaseService } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
})
export class EmployeesComponent implements OnInit {
  loggedUser: any;
  user: any;
  dataSource$: BehaviorSubject<
    MatTableDataSource<Database['public']['Tables']['Employee']['Row']>
  > = new BehaviorSubject<
    MatTableDataSource<Database['public']['Tables']['Employee']['Row']>
  >(new MatTableDataSource<Database['public']['Tables']['Employee']['Row']>());
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns = [
    'name',
    'CNP',
    'badge',
    'division',
    'access_interval',
    'IMEI',
    'access',
    'authorisedUser',
    'created_at',
    'photo',
  ];

  constructor(
    private employeeDataService: EmployeeDataService,
    public onlineStatusService: OnlineStatusService,
    private router: Router,
    private employeesService: EmployeesService,
    private supabaseService: SupabaseService
  ) {}

  ngOnInit() {
    this.supabaseService.getLoggedUser().then((data) => {
      this.user = data;
      this.employeesService
        .getEmployeeByEmail(this.user.user.email)
        .then((data) => {
          this.loggedUser = data;
        });
    });
    this.employeeDataService.employees$
      .pipe(
        map((employees) => {
          const dataSource = new MatTableDataSource<
            Database['public']['Tables']['Employee']['Row']
          >(employees || []);
          dataSource.paginator = this.paginator;
          dataSource.sort = this.sort;
          return dataSource;
        })
      )
      .subscribe(this.dataSource$);
  }

  applyFilter(event: Event) {
    const dataSource = this.dataSource$.getValue();
    const filterValue = (event.target as HTMLInputElement).value;
    dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource$.next(dataSource);

    if (dataSource.paginator) {
      dataSource.paginator.firstPage();
    if (dataSource.paginator) {
      dataSource.paginator.firstPage();
    }
  }

  onClickRow(employee: Database['public']['Tables']['Employee']['Row']) {
    this.router.navigateByUrl('/attendance/' + employee.IMEI);
  }
}
