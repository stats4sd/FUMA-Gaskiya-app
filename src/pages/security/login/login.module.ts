import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginPage } from './login';
//import { TranslationModule } from '../../../translation/translate.module'
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

@NgModule({
  declarations: [LoginPage],
  imports: [TranslateModule, IonicPageModule.forChild(LoginPage)],
  exports: [LoginPage]
})
export class LoginPageModule { }
