import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LeafletPage } from './leaflet';
//import { TranslationModule } from '../../../translation/translate.module'
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

@NgModule({
  declarations: [LeafletPage],
  imports: [TranslateModule, IonicPageModule.forChild(LeafletPage)],
  exports: [LeafletPage]
})
export class LeafletPageModule { }
