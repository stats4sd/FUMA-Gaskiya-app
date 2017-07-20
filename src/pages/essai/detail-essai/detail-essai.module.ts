import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailEssaiPage } from './detail-essai';

@NgModule({
  declarations: [DetailEssaiPage],
  imports: [IonicPageModule.forChild(DetailEssaiPage)],
  exports: [DetailEssaiPage]
})
export class DetailEssaiPageModule { }
