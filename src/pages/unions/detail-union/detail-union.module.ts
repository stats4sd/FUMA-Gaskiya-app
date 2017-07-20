import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailUnionPage } from './detail-union';

@NgModule({
  declarations: [DetailUnionPage],
  imports: [IonicPageModule.forChild(DetailUnionPage)],
  exports: [DetailUnionPage]
})
export class DetailUnionPageModule { }
