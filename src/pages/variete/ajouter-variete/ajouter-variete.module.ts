import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AjouterVarietePage } from './ajouter-variete';

@NgModule({
  declarations: [AjouterVarietePage],
  imports: [IonicPageModule.forChild(AjouterVarietePage)],
  exports: [AjouterVarietePage]
})
export class AjouterVarietePageModule { }
 