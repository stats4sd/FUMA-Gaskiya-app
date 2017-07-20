import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AjouterCommunePage } from './ajouter-commune';

@NgModule({
  declarations: [
    AjouterCommunePage,
  ],
  imports: [
    IonicPageModule.forChild(AjouterCommunePage),
  ],
  exports: [
    AjouterCommunePage
  ]
})
export class AjouterCommunePageModule {}
