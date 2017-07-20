import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfilePage } from './profile';
//import { TranslationModule } from '../../../translation/translate.module'
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

@NgModule({
  declarations: [ProfilePage],
  imports: [TranslateModule, IonicPageModule.forChild(ProfilePage)],
  exports: [ProfilePage]
})
export class ProfilePageModule { }
