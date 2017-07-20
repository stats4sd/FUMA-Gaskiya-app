import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AjouterProtocolePage } from './ajouter-protocole';

@NgModule({
  declarations: [AjouterProtocolePage],
  imports: [IonicPageModule.forChild(AjouterProtocolePage)],
  exports: [AjouterProtocolePage]
})
export class AjouterProtocolePageModule { }
 