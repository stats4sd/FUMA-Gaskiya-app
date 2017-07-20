import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModifierCulturePage } from './modifier-culture';

@NgModule({
  declarations: [ModifierCulturePage],
  imports: [IonicPageModule.forChild(ModifierCulturePage)],
  exports: [ModifierCulturePage]
})
export class ModifierCulturePageModule { }
