import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { global } from '../../../global-variables/variable'
import { Storage } from '@ionic/storage'

/*
  Generated class for the Home page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  languages = [
    { code: 'en', name: 'English' },
    { code: 'fr', name: 'Français' }
  ];
  selectedLanguage = 'fr';

  constructor(public storage: Storage, public navCtrl: NavController, public navParams: NavParams, public translate: TranslateService) {
    translate.setDefaultLang(global.langue);
  }

  ionViewDidEnter() {
    //this.translate.use(global.langue)
    //console.log('ionViewDidLoad HomePage');
  }

  applyLanguage() {
    this.translate.use(this.selectedLanguage);
    global.langue = this.selectedLanguage;
    this.storage.set('langue', this.selectedLanguage);

  }

  open(){
    this.storage.set('langue', this.selectedLanguage);
    global.langue = this.selectedLanguage;
    this.navCtrl.setRoot('TabsPage')
  }

}
