import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AjouterMembrePage } from './ajouter-membre';

@NgModule({
  declarations: [AjouterMembrePage],
  imports: [IonicPageModule.forChild(AjouterMembrePage)],
  exports: [AjouterMembrePage]
})
export class AjouterMembrePageModule { }
