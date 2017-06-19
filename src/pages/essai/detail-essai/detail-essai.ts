import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { ModifierEssaiPage } from '../modifier-essai/modifier-essai';
import { PouchdbProvider } from '../../../providers/pouchdb-provider';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';

/*
  Generated class for the DetailEssai page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-detail-essai',
  templateUrl: 'detail-essai.html'
})
export class DetailEssaiPage {
 
   essai: any = {};
  essaiID: any;

   constructor(public servicePouchdb: PouchdbProvider, public toastCtl: ToastController, public navCtrl: NavController, public navParams: NavParams, public alertCtl: AlertController) {
    this.essai = this.navParams.data.essai;
    this.essaiID = this.essai._id;
  }

  ionViewDidEnter() {
    //console.log('ionViewDidLoad DetailUnionPage');
    this.servicePouchdb.getDocById(this.essaiID).then((e) => {
      this.essai = e;
    }, err => console.log(err))
  }

  editer(essai){
    this.navCtrl.push(ModifierEssaiPage, {'essai': essai});
  }

  supprimer(essai){
    let alert = this.alertCtl.create({
      title: 'Suppression Essai',
      message: 'Etes vous sûr de vouloir supprimer cet essai ?',
      buttons:[
        {
          text: 'Non',
          handler: () => console.log('suppression annulée')
 
        },
        {
          text: 'Oui',
          handler: () => {
            this.servicePouchdb.deleteDoc(essai);
            let toast = this.toastCtl.create({
              message:'Essai bien supprié',
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
