import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModifierProfilePage } from './modifier-profile';
//import { TranslationModule } from '../../../../translation/translate.module'
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

@NgModule({
  declarations: [ModifierProfilePage],
  imports: [TranslateModule, IonicPageModule.forChild(ModifierProfilePage)],
  exports: [ModifierProfilePage]
})
export class ModifierProfilePageModule { }
