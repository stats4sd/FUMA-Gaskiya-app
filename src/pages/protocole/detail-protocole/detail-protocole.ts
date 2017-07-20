import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';

/*
  Generated class for the DetailProtocole page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()
@Component({
  selector: 'page-detail-protocole',
  templateUrl: 'detail-protocole.html'
})
export class DetailProtocolePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailProtocolePage');
  }

}
