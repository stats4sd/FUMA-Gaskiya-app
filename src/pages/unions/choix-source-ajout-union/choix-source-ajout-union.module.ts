import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChoixSourceAjoutUnionPage } from './choix-source-ajout-union';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { FormViewComponentModule } from '../../../components/form-view/form-view.module'

@NgModule({
  declarations: [ChoixSourceAjoutUnionPage],
  imports: [TranslateModule, FormViewComponentModule, IonicPageModule.forChild(ChoixSourceAjoutUnionPage)],
  exports: [ChoixSourceAjoutUnionPage]
})
export class ChoixSourceAjoutUnionPageModule { }
