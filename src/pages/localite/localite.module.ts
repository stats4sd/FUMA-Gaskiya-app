import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LocalitePage } from './localite';

@NgModule({
  declarations: [
    LocalitePage,
  ],
  imports: [
    IonicPageModule.forChild(LocalitePage),
  ],
  exports: [
    LocalitePage
  ]
})
export class LocalitePageModule {}
