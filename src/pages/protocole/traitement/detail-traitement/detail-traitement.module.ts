import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailTraitementPage } from './detail-traitement';

@NgModule({
  declarations: [DetailTraitementPage],
  imports: [IonicPageModule.forChild(DetailTraitementPage)],
  exports: [DetailTraitementPage]
})
export class DetailTraitementPageModule { }
