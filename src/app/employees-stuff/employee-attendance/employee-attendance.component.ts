import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { SupabaseService } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-employee-attendance',
  templateUrl: './employee-attendance.component.html',
  styleUrls: ['./employee-attendance.component.scss'],
})
export class EmployeeAttendanceComponent implements OnInit {
  loggedUser: any;
  record: any;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  employee: any;
  displayedColumns = ['IMEI', 'tip_acces', 'data'];
  constructor(
    private supabaseService: SupabaseService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    const IMEI = this.route.snapshot.paramMap.get('IMEI');
    this.supabaseService
      .getLoggedUser()
      .then((data) => (this.loggedUser = data));

    const userRecord = async () => {
      const { data, error } = await this.supabaseService.supabase
        .from('Access')
        .select()
        .eq('IMEI', this.loggedUser.IMEI);
      if (error) return error;
      return data;
    };
    userRecord().then((data) => {
      this.record = data;
      this.dataSource.data = this.record;
    });

    const getEmployee = async () => {
      const { data, error } = await this.supabaseService.supabase
        .from('Employee')
        .select()
        .eq('IMEI', IMEI);
      if (error) return error;
      return data;
    };
    getEmployee().then((data) => (this.employee = data));
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
