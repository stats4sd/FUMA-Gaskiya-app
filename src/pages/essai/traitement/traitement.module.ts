import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TraitementPage } from './traitement';

@NgModule({
  declarations: [TraitementPage],
  imports: [IonicPageModule.forChild(TraitementPage)],
  exports: [TraitementPage]
})
export class TraitementPageModule { }
