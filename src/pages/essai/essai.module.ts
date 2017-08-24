import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EssaiPage } from './essai';
import { AutoCompleteModule } from 'ionic2-auto-complete';
import { DatePickerModule } from 'datepicker-ionic2';

@NgModule({
  declarations: [EssaiPage],
  imports: [AutoCompleteModule, DatePickerModule, IonicPageModule.forChild(EssaiPage)],
  exports: [EssaiPage]
})
export class EssaiPageModule { }
