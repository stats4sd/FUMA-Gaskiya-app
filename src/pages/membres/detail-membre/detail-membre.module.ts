import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailMembrePage } from './detail-membre';
import { IonicImageViewerModule } from 'ionic-img-viewer'

@NgModule({
  declarations: [DetailMembrePage],
  imports: [IonicPageModule.forChild(DetailMembrePage), IonicImageViewerModule],
  exports: [DetailMembrePage]
})
export class DetailMembrePageModule { }
