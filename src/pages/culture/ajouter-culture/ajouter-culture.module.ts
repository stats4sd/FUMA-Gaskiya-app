import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AjouterCulturePage } from './ajouter-culture';

@NgModule({
  declarations: [AjouterCulturePage],
  imports: [IonicPageModule.forChild(AjouterCulturePage)],
  exports: [AjouterCulturePage]
})
export class AjouterCulturePageModule { }
