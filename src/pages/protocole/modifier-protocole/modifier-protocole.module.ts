import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModifierProtocolePage } from './modifier-protocole';

@NgModule({
  declarations: [ModifierProtocolePage],
  imports: [IonicPageModule.forChild(ModifierProtocolePage)],
  exports: [ModifierProtocolePage]
})
export class ModifierProtocolePageModule { }
 