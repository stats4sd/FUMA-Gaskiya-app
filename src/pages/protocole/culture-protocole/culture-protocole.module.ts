import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CultureProtocolePage } from './culture-protocole';

@NgModule({
  declarations: [
    CultureProtocolePage,
  ],
  imports: [
    IonicPageModule.forChild(CultureProtocolePage),
  ],
  exports: [
    CultureProtocolePage
  ],
})
export class CultureProtocolePageModule {}
