import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AjouterVillagePage } from './ajouter-village';

@NgModule({
  declarations: [
    AjouterVillagePage,
  ],
  imports: [
    IonicPageModule.forChild(AjouterVillagePage),
  ],
  exports: [
    AjouterVillagePage
  ]
})
export class AjouterVillagePageModule {}
