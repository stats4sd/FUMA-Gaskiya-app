import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, App } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { global } from '../../global-variables/variable';
import { TabsPage } from '../tabs/tabs';

/*
  Generated class for the Langue page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-langue',
  templateUrl: 'langue.html'
})
export class LanguePage {

  languages = [
    { code: 'en', name: 'English' },
    { code: 'fr', name: 'Français' }
  ];
  selectedLanguage = global.langue;

  //langue: any = global.langue; 

  constructor(public appCtl: App, public viewCtl: ViewController, public translate: TranslateService, public storage: Storage, public navCtrl: NavController, public navParams: NavParams) {
    this.translate.setDefaultLang(this.selectedLanguage);
  }

  ionViewWillEnter() {
    this.translate.use(global.langue);
   // console.log('ionViewDidLoad LanguePage');
  }

  choixLangue(){
    this.translate.use(this.selectedLanguage);
    global.langue = this.selectedLanguage;
    //this.appCtl.getRootNav().pop();//setRoot(TabsPage);
    //this.navCtrl.pop();
    //window.location.reload();
  }

  change(){
    this.storage.set('langue', this.selectedLanguage);
    this.navCtrl.pop();
  }

}
