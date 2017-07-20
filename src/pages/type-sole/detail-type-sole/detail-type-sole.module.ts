import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailTypeSolePage } from './detail-type-sole';

@NgModule({
  declarations: [DetailTypeSolePage],
  imports: [IonicPageModule.forChild(DetailTypeSolePage)],
  exports: [DetailTypeSolePage]
})
export class DetailTypeSolePageModule { }
