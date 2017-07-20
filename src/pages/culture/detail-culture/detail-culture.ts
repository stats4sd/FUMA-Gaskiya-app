import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';

/*
  Generated class for the DetailCulture page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

@IonicPage()
@Component({
  selector: 'page-detail-culture',
  templateUrl: 'detail-culture.html'
})
export class DetailCulturePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailCulturePage');
  }

}
