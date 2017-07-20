import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LanguePage } from './langue';
//import { TranslationModule } from '../../translation/translate.module'
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

@NgModule({
  declarations: [LanguePage],
  imports: [TranslateModule, IonicPageModule.forChild(LanguePage)],
  exports: [LanguePage]
})
export class LanguePageModule { }
