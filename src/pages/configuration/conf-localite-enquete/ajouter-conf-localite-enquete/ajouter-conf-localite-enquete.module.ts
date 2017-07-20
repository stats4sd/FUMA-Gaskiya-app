import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AjouterConfLocaliteEnquetePage } from './ajouter-conf-localite-enquete';

@NgModule({
  declarations: [AjouterConfLocaliteEnquetePage],
  imports: [IonicPageModule.forChild(AjouterConfLocaliteEnquetePage)],
  exports: [AjouterConfLocaliteEnquetePage]
})
export class AjouterConfLocaliteEnquetePageModule { }
