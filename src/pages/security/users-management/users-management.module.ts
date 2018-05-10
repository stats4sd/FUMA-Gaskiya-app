import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UsersManagementPage } from './users-management';

@NgModule({
  declarations: [
    UsersManagementPage,
  ],
  imports: [
    IonicPageModule.forChild(UsersManagementPage),
  ],
  exports: [UsersManagementPage] 
})
export class UsersManagementPageModule {}
