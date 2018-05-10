import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ModalController } from 'ionic-angular';

/**
 * Generated class for the InfoAppPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-info-app',
  templateUrl: 'info-app.html',
})
export class InfoAppPage {

  version: any = '';
  //anne_courante: any;
  constructor(public navCtrl: NavController, public modalCtl: ModalController, public navParams: NavParams, public myPlateform: Platform) {
  }

  ionViewDidLoad() {
    if(this.myPlateform.is('android')){
      this.version = "1.1.3"
    }else
    this.version = "1.6.3"

    //let maDate = new Date();
    //this.anne_courante = maDate.getFullYear();
    //console.log('ionViewDidLoad InfoAppPage');
  }

  contacter(){
    /*if(this.myPlateform.is('android')){
      let model = this.modalCtl.create('SendMailPage');
      model.present();
    }*/
    
  }

}
