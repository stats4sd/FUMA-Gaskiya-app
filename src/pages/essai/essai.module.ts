import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EssaiPage } from './essai';

@NgModule({
  declarations: [EssaiPage],
  imports: [IonicPageModule.forChild(EssaiPage)],
  exports: [EssaiPage]
})
export class EssaiPageModule { }
