import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TypologiePage } from './typologie';
import { AutoCompleteModule } from 'ionic2-auto-complete';

@NgModule({
  declarations: [
    TypologiePage,
  ],
  imports: [
    AutoCompleteModule,
    IonicPageModule.forChild(TypologiePage),
  ],
  exports: [TypologiePage]
})
export class TypologiePageModule {}
