import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { ModifierChampsPage } from '../modifier-champs/modifier-champs';
import { PouchdbProvider } from '../../../providers/pouchdb-provider';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';

/*
  Generated class for the DetailChamps page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-detail-champs',
  templateUrl: 'detail-champs.html'
})
export class DetailChampsPage {

  champ: any = {};
  champID: any;

   constructor(public servicePouchdb: PouchdbProvider, public toastCtl: ToastController, public navCtrl: NavController, public navParams: NavParams, public alertCtl: AlertController) {
    this.champ = this.navParams.data.champ;
    this.champID = this.champ._id;
  }

  ionViewDidEnter() {
    //console.log('ionViewDidLoad DetailUnionPage');
    this.servicePouchdb.getDocById(this.champID).then((c) => {
      this.champ = c;
    }, err => console.log(err))
  }

  editer(champ){
    this.navCtrl.push(ModifierChampsPage, {'champ': champ});
  }

  supprimer(champ){
    let alert = this.alertCtl.create({
      title: 'Suppression champs',
      message: 'Etes vous sûr de vouloir supprimer cet champs ?',
      buttons:[
        {
          text: 'Non',
          handler: () => console.log('suppression annulée')
 
        },
        {
          text: 'Oui',
          handler: () => {
            this.servicePouchdb.deleteDoc(champ);
            let toast = this.toastCtl.create({
              message:'Champs bien supprié',
              position: 'top',
              duration: 3000
            });

            toast.present();
            this.navCtrl.pop();
          }
        }
      ]
    });

    alert.present();
  }

 
}
