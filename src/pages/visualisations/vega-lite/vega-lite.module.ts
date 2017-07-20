import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VegaLitePage } from './vega-lite';
//import { TranslationModule } from '../../../translation/translate.module'
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

@NgModule({
  declarations: [VegaLitePage],
  imports: [TranslateModule, IonicPageModule.forChild(VegaLitePage)],
  exports: [VegaLitePage]
})
export class VegaLitePageModule { }
