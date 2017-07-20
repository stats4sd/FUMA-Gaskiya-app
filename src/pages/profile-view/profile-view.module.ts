import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfileViewPage } from './profile-view';
//import { TranslationModule } from '../../translation/translate.module'
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

@NgModule({
  declarations: [ProfileViewPage],
  imports: [TranslateModule, IonicPageModule.forChild(ProfileViewPage)],
  exports: [ProfileViewPage]
})
export class ProfileViewPageModule { }
  