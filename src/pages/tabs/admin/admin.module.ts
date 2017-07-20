import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminPage } from './admin';
//import { TranslationModule } from '../../../translation/translate.module'
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

@NgModule({
  declarations: [AdminPage],
  imports: [TranslateModule, IonicPageModule.forChild(AdminPage)],
  exports: [AdminPage]
})
export class AdminPageModule { }
