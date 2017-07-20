import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailProtocolePage } from './detail-protocole';

@NgModule({
  declarations: [DetailProtocolePage],
  imports: [IonicPageModule.forChild(DetailProtocolePage)],
  exports: [DetailProtocolePage]
})
export class DetailProtocolePageModule { }
 