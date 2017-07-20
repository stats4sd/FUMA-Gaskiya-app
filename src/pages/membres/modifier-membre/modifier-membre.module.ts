import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModifierMembrePage } from './modifier-membre';

@NgModule({
  declarations: [ModifierMembrePage],
  imports: [IonicPageModule.forChild(ModifierMembrePage)],
  exports: [ModifierMembrePage]
})
export class ModifierMembrePageModule { }
