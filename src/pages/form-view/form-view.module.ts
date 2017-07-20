import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FormViewPage } from './form-view';
//import { TranslationModule } from '../../translation/translate.module'
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

@NgModule({
  declarations: [FormViewPage],
  imports: [TranslateModule, IonicPageModule.forChild(FormViewPage)],
  exports: [FormViewPage]
})
export class FormViewPageModule { }
