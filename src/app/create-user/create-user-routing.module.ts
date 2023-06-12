import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CreateUserComponent } from './create-user.component';
import { RoleGuardService as RoleGuard } from '../services/role-guard.service';

const routes: Routes = [
  { path: 'create', component: CreateUserComponent, canActivate: [RoleGuard] },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateUserRoutingModule {}
