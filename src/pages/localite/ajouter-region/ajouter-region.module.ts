import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AjouterRegionPage } from './ajouter-region';

@NgModule({
  declarations: [
    AjouterRegionPage,
  ],
  imports: [
    IonicPageModule.forChild(AjouterRegionPage),
  ],
  exports: [
    AjouterRegionPage
  ]
})
export class AjouterRegionPageModule {}
