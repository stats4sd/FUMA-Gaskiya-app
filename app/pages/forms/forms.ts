import {Component} from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';



@Component({
  templateUrl: 'build/pages/forms/forms.html'
})

export class FormsPage {
  form:any;

  constructor(private params:NavParams, public viewCtrl:ViewController) {
    this.form=params.data.form;
    console.log(this.form);
  }
  close(){
    let pending=document.getElementsByClassName('offline-enabled__queue-length');
    console.log(pending);
    this.viewCtrl.dismiss('data')
  }



}
