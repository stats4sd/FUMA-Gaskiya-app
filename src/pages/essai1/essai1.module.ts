import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Essai1Page } from './essai1';
import { AutoCompleteModule } from 'ionic2-auto-complete';
import { DatePickerModule } from 'datepicker-ionic2';
//import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  declarations: [
    Essai1Page,
  ],
  imports: [
    AutoCompleteModule, DatePickerModule, IonicPageModule.forChild(Essai1Page),
  ],
  //schemas: [NO_ERRORS_SCHEMA],
  exports: [Essai1Page]
})
export class Essai1PageModule {}
