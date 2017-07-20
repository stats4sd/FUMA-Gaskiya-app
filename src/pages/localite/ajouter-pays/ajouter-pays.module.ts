import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AjouterPaysPage } from './ajouter-pays';

@NgModule({
  declarations: [
    AjouterPaysPage,
  ],
  imports: [
    IonicPageModule.forChild(AjouterPaysPage),
  ],
  exports: [
    AjouterPaysPage
  ]
})
export class AjouterPaysPageModule {}
