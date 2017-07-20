import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AjouterEssaiPage } from './ajouter-essai';
import { AutoCompleteModule } from 'ionic2-auto-complete';

@NgModule({
  declarations: [AjouterEssaiPage],
  imports: [ AutoCompleteModule, IonicPageModule.forChild(AjouterEssaiPage)],
  exports: [AjouterEssaiPage]
})
export class AjouterEssaiPageModule { }
