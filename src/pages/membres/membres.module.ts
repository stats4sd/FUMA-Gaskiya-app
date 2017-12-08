import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MembresPage } from './membres';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { DatePickerModule } from 'datepicker-ionic2';

@NgModule({
  declarations: [MembresPage],
  imports: [IonicPageModule.forChild(MembresPage), IonicImageViewerModule, DatePickerModule],
  exports: [MembresPage]
})
export class MembresPageModule { }
