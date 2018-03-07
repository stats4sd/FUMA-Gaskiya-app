import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CulturePage } from './culture';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VariableComponent } from '../../components/variable/variable';

@NgModule({
  declarations: [
    CulturePage,
    VariableComponent
  ],
  imports: [
    FormsModule, ReactiveFormsModule, IonicPageModule.forChild(CulturePage),
  ],
  exports: [
    CulturePage
  ],
})
export class CulturePageModule {}
