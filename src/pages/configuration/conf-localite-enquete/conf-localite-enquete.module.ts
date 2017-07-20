import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConfLocaliteEnquetePage } from './conf-localite-enquete';

@NgModule({
  declarations: [ConfLocaliteEnquetePage],
  imports: [IonicPageModule.forChild(ConfLocaliteEnquetePage)],
  exports: [ConfLocaliteEnquetePage]
})
export class ConfLocaliteEnquetePageModule { }
