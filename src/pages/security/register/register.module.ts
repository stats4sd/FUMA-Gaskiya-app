import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterPage } from './register';
///import { TranslationModule } from '../../../translation/translate.module'
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

@NgModule({
  declarations: [RegisterPage],
  imports: [TranslateModule, IonicPageModule.forChild(RegisterPage)],
  exports: [RegisterPage]
})
export class RegisterPageModule { }
