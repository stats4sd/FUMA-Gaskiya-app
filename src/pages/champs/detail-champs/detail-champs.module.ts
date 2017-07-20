import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailChampsPage } from './detail-champs';

@NgModule({
  declarations: [DetailChampsPage],
  imports: [IonicPageModule.forChild(DetailChampsPage)],
  exports: [DetailChampsPage]
})
export class DetailChampsPagePageModule { }
