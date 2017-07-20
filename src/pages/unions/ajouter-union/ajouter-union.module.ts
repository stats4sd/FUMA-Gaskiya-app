import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AjouterUnionPage } from './ajouter-union';

@NgModule({
  declarations: [AjouterUnionPage],
  imports: [IonicPageModule.forChild(AjouterUnionPage)],
  exports: [AjouterUnionPage]
})
export class AjouterUnionPageModule { }
