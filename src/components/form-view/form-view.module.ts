import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { FormViewComponent } from './form-view';
//import { TranslationModule } from '../../translation/translate.module'
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

@NgModule({
  declarations: [FormViewComponent],
  imports: [TranslateModule, IonicModule],
  exports: [FormViewComponent]
})
export class FormViewComponentModule { }
