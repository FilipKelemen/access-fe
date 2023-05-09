import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CreateUserComponent } from './create-user.component';

const routes: Routes = [{ path: 'create', component: CreateUserComponent }];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateUserRoutingModule {}
