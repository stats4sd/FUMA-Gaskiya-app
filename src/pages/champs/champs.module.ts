import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChampsPage } from './champs';
import { AutoCompleteModule } from 'ionic2-auto-complete';

@NgModule({
  declarations: [ChampsPage],
  imports: [AutoCompleteModule, IonicPageModule.forChild(ChampsPage)],
  exports: [ChampsPage]
})
export class ChampsPageModule { }
