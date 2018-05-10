import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

/**
 * Generated class for the LoadingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-loading',
  templateUrl: 'loading.html',
})
export class LoadingPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController) {
    //let loading = this.loadingCtrl.create({
     // spinner: 'dots',
      //content: 'Chargement en cours...'
    //});
   // loading.present();
  }

  /*ionViewDidLoad() {
    console.log('ionViewDidLoad LoadingPage');
  }*/

}
