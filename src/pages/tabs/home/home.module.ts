import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
//import { TranslationModule } from '../../../translation/translate.module'
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

@NgModule({
  declarations: [HomePage],
  imports: [ TranslateModule, IonicPageModule.forChild(HomePage)],
  exports: [HomePage]
})
export class HomePageModule { }
