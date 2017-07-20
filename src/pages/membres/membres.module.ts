import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MembresPage } from './membres';
import { IonicImageViewerModule } from 'ionic-img-viewer';

@NgModule({
  declarations: [MembresPage],
  imports: [IonicPageModule.forChild(MembresPage), IonicImageViewerModule],
  exports: [MembresPage]
})
export class MembresPageModule { }
