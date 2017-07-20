import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModifierChampsPage } from './modifier-champs';

@NgModule({
  declarations: [ModifierChampsPage],
  imports: [IonicPageModule.forChild(ModifierChampsPage)],
  exports: [ModifierChampsPage]
})
export class ModifierChampsPageModule { }
