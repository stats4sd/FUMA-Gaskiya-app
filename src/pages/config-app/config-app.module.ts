import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConfigAppPage } from './config-app';

@NgModule({
  declarations: [
    ConfigAppPage,
  ],
  imports: [
    IonicPageModule.forChild(ConfigAppPage),
  ],
  exports: [
    ConfigAppPage,
  ]
})
export class ConfigAppPageModule {}
