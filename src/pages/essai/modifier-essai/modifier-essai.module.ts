import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModifierEssaiPage } from './modifier-essai';

@NgModule({
  declarations: [ModifierEssaiPage],
  imports: [IonicPageModule.forChild(ModifierEssaiPage)],
  exports: [ModifierEssaiPage]
})
export class ModifierEssaiPageModule { }
