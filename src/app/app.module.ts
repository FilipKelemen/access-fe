import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthComponent } from './auth/auth.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FullnamePipe } from 'src/pipes/fullname.pipe';
import { EmployeesRoutingModule } from './employees-stuff/employees-routing.module';
import { EmployeeAttendanceComponent } from './employees-stuff/employee-attendance/employee-attendance.component';
import { EmployeesComponent } from './employees-stuff/employees/employees.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CreateUserRoutingModule } from './create-user/create-user-routing.module';
import { LocalDbService } from './services/local-db.service';
import { OfflinePopUpComponent } from './components/offline-pop-up/offline-pop-up.component';
import { CreateUserComponent } from './create-user/create-user.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    NavBarComponent,
    FullnamePipe,
    EmployeeAttendanceComponent,
    EmployeesComponent,
    CreateUserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatInputModule,
    MatCardModule,
    MatSelectModule,
    MatOptionModule,
    ReactiveFormsModule,
    EmployeesRoutingModule,
    AuthRoutingModule,
    MatSortModule,
    MatPaginatorModule,
    MatToolbarModule,
    CreateUserRoutingModule,
    OfflinePopUpComponent,
  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  //inits db
  constructor(private localDbService: LocalDbService) {}
}
