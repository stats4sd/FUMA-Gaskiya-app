import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AjouterTraitementPage } from './ajouter-traitement';

@NgModule({
  declarations: [AjouterTraitementPage],
  imports: [IonicPageModule.forChild(AjouterTraitementPage)],
  exports: [AjouterTraitementPage]
})
export class AjouterTraitementPageModule { }
