import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ResearchPage } from './research';
//import { TranslationModule } from '../../../translation/translate.module'
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

@NgModule({
  declarations: [ResearchPage],
  imports: [TranslateModule, IonicPageModule.forChild(ResearchPage)],
  exports: [ResearchPage]
})
export class ResearchPageModule { }
