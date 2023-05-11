import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { EmployeesService } from 'src/app/services/employees.service';
import { Database } from 'src/app/models/supabase';
import { isPostgressError } from 'src/app/models/utils';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
})
export class EmployeesComponent implements OnInit {
  employees: any;
  employee: any;
  dataSource: MatTableDataSource<
    Database['public']['Tables']['Employee']['Row']
  > = new MatTableDataSource<Database['public']['Tables']['Employee']['Row']>();
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

  constructor(private employeesService: EmployeesService) {}

  ngOnInit() {
    this.employeesService.getEmployees().then((data) => {
      if (isPostgressError(data)) throw data;
      this.dataSource.data = data || [];
    });
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onClickRow(employee: Database['public']['Tables']['Employee']['Row']) {
    location.href = '/attendance/' + employee.IMEI;
  }
}
