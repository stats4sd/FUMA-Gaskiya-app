import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StartPage } from './start';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

@NgModule({
  declarations: [StartPage],
  imports: [IonicPageModule.forChild(StartPage), TranslateModule],
  exports: [StartPage]
})
export class StartPageModule { }
