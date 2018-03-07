import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LeafletPage } from './leaflet';
//import { TranslationModule } from '../../../translation/translate.module'
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { AutoCompleteModule } from 'ionic2-auto-complete';

@NgModule({
  declarations: [LeafletPage],
  imports: [AutoCompleteModule, TranslateModule, IonicPageModule.forChild(LeafletPage)],
  exports: [LeafletPage]
})
export class LeafletPageModule { }
