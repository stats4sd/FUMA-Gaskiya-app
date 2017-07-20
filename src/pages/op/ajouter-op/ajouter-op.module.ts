import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AjouterOpPage } from './ajouter-op';

@NgModule({
  declarations: [AjouterOpPage],
  imports: [IonicPageModule.forChild(AjouterOpPage)],
  exports: [AjouterOpPage]
})
export class AjouterOpPageModule { }
