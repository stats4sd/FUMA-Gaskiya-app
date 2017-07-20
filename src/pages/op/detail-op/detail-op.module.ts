import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailOpPage } from './detail-op';

@NgModule({
  declarations: [DetailOpPage],
  imports: [IonicPageModule.forChild(DetailOpPage)],
  exports: [DetailOpPage]
})
export class DetailOpPageModule { }
 