import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModifierUnionPage } from './modifier-union';

@NgModule({
  declarations: [ModifierUnionPage],
  imports: [IonicPageModule.forChild(ModifierUnionPage)],
  exports: [ModifierUnionPage]
})
export class ModifierUnionPageModule { }
