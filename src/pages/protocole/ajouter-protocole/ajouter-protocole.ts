import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';

/*
  Generated class for the AjouterProtocole page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()
@Component({
  selector: 'page-ajouter-protocole',
  templateUrl: 'ajouter-protocole.html'
})
export class AjouterProtocolePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad AjouterProtocolePage');
  }

}
