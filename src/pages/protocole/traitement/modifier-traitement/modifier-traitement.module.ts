import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModifierTraitementPage } from './modifier-traitement';

@NgModule({
  declarations: [ModifierTraitementPage],
  imports: [IonicPageModule.forChild(ModifierTraitementPage)],
  exports: [ModifierTraitementPage]
})
export class ModifierTraitementPageModule { }
