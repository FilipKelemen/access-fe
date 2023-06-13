import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Database } from 'src/app/models/supabase';
import { AttendanceService } from 'src/app/services/attendance.service';
import { EmployeesService } from 'src/app/services/employees/employees.service';

@Component({
  selector: 'app-employee-attendance',
  templateUrl: './employee-attendance.component.html',
  styleUrls: ['./employee-attendance.component.scss'],
})
export class EmployeeAttendanceComponent implements OnInit {
  employees: Database['public']['Tables']['Employee']['Row'][];
  dataSource: MatTableDataSource<
    Database['public']['Tables']['Access']['Row']
  > = new MatTableDataSource<Database['public']['Tables']['Access']['Row']>();
  displayedColumns = ['IMEI', 'type', 'created_at'];
  access: Database['public']['Tables']['Access']['Insert'];
  IMEI = this.route.snapshot.paramMap.get('IMEI');
  constructor(
    private employeesService: EmployeesService,
    private route: ActivatedRoute,
    private attendanceService: AttendanceService
  ) {}
  ngOnInit(): void {
    if (!this.IMEI) return;
    this.employeesService.getEmployee(this.IMEI).then((data) => {
      this.employees = data || [];
    });

    this.attendanceService.getAttendance(this.IMEI).then((data) => {
      this.dataSource.data = data || [];
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addEntry() {
    this.access = { IMEI: this.IMEI, type: true };
    this.attendanceService.addAttendance(this.access);
  }

  addExit() {
    this.access = { IMEI: this.IMEI, type: false };
    this.attendanceService.addAttendance(this.access);
  }
}
