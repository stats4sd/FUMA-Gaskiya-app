import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TabsPage } from './tabs';
//import { TranslationModule } from '../../translation/translate.module'
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

@NgModule({
  declarations: [TabsPage],
  imports: [TranslateModule, IonicPageModule.forChild(TabsPage)],
  exports: [TabsPage]
})
export class TabsPageModule { }
