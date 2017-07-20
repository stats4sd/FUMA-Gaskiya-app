import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfileUserPage } from './profile-user';
//import { TranslationModule } from '../../../translation/translate.module'
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

@NgModule({
  declarations: [ProfileUserPage],
  imports: [TranslateModule, IonicPageModule.forChild(ProfileUserPage)],
  exports: [ProfileUserPage]
})
export class ProfileUserPageModule { }
