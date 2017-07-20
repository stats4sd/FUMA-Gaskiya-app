import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AjouterTypeSolePage } from './ajouter-type-sole';

@NgModule({
  declarations: [AjouterTypeSolePage],
  imports: [IonicPageModule.forChild(AjouterTypeSolePage)],
  exports: [AjouterTypeSolePage]
})
export class AjouterTypeSolePageModule { }
