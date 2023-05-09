import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Employee } from 'src/app/services/employees.service';
import { SupabaseService } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
})
export class EmployeesComponent implements OnInit {
  employees: any;
  expandedEmployee: any;
  dataSource: MatTableDataSource<Employee> = new MatTableDataSource<Employee>();
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
    'accepter',
    'created_at',
    'photo',
  ];

  constructor(private supabaseService: SupabaseService) {}

  ngOnInit() {
    const getEmployees = async () => {
      const { data, error } = await this.supabaseService.supabase
        .from('Employee')
        .select();
      if (error) return error;
      return data;
    };
    getEmployees().then((data) => {
      this.employees = data;
      this.dataSource.data = this.employees;
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

  onClickRow(employee: Employee) {
    location.href = '/attendance/' + employee.IMEI;
  }
}
