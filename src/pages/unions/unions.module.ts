import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UnionsPage } from './unions';

@NgModule({
  declarations: [UnionsPage],
  imports: [IonicPageModule.forChild(UnionsPage)],
  exports: [UnionsPage]
})
export class UnionsPageModule { }
 