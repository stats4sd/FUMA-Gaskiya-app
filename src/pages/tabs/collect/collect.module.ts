import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CollectPage } from './collect';
//import { TranslationModule } from '../../../translation/translate.module'
import { FormViewComponentModule } from '../../../components/form-view/form-view.module'
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

@NgModule({
  declarations: [CollectPage],
  imports: [IonicPageModule.forChild(CollectPage), TranslateModule, FormViewComponentModule],
  exports: [CollectPage]
})
export class CollectPageModule { }
