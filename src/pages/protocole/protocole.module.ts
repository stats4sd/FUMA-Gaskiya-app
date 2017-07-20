import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProtocolePage } from './protocole';

@NgModule({
  declarations: [ProtocolePage],
  imports: [IonicPageModule.forChild(ProtocolePage)],
  exports: [ProtocolePage]
})
export class ProtocolePageModule { }
 