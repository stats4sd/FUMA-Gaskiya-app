import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChampsPage } from './champs';

@NgModule({
  declarations: [ChampsPage],
  imports: [IonicPageModule.forChild(ChampsPage)],
  exports: [ChampsPage]
})
export class ChampsPageModule { }
