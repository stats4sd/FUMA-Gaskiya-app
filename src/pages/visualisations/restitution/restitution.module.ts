import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RestitutionPage } from './restitution';
import { AutoCompleteModule } from 'ionic2-auto-complete';

@NgModule({
  declarations: [
    RestitutionPage,
  ],
  imports: [
    AutoCompleteModule, IonicPageModule.forChild(RestitutionPage),
  ],
  exports: [RestitutionPage]
})
export class RestitutionPageModule {}
 