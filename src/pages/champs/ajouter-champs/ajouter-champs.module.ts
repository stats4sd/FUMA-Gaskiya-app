import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AjouterChampsPage } from './ajouter-champs';
import { AutoCompleteModule } from 'ionic2-auto-complete';

@NgModule({
  declarations: [AjouterChampsPage],
  imports: [AutoCompleteModule, IonicPageModule.forChild(AjouterChampsPage)],
  exports: [AjouterChampsPage]
})
export class AjouterChampsPageModule { }
