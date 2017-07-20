import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailCulturePage } from './detail-culture';

@NgModule({
  declarations: [DetailCulturePage],
  imports: [IonicPageModule.forChild(DetailCulturePage)],
  exports: [DetailCulturePage]
})
export class DetailCulturePageModule { }
