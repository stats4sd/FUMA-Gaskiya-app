import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ResearchViewPage } from './research-view';
//import { TranslationModule } from '../../translation/translate.module'
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

@NgModule({
  declarations: [ResearchViewPage],
  imports: [TranslateModule, IonicPageModule.forChild(ResearchViewPage)],
  exports: [ResearchViewPage]
})
export class ResearchViewPageModule { }
 