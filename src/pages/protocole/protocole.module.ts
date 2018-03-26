import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProtocolePage } from './protocole';
import { AttributProtocoleComponent } from '../../components/attribut-protocole/attribut-protocole';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ProtocolePage,
    AttributProtocoleComponent
  ],
  imports: [
    FormsModule, ReactiveFormsModule, IonicPageModule.forChild(ProtocolePage),
  ], 
  exports: [
    ProtocolePage
  ],
})
export class ProtocolePageModule {}
