import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { ModifierUnionPage } from '../modifier-union/modifier-union';
import { PouchdbProvider } from '../../../providers/pouchdb-provider';
import { Validators, FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';

/*
  Generated class for the DetailUnion page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-detail-union',
  templateUrl: 'detail-union.html'
})
export class DetailUnionPage {
  union: any = {};
  selectedSource: any;
  unionID: any;


  constructor(public servicePouchdb: PouchdbProvider, public toastCtl: ToastController, public navCtrl: NavController, public navParams: NavParams, public alertCtl: AlertController) {
    this.union = this.navParams.data.union;
    this.selectedSource = this.navParams.data.selectedSource;
    this.unionID = this.union._id;
  }

  ionViewDidEnter() {
    //console.log('ionViewDidLoad DetailUnionPage');
    this.servicePouchdb.getDocById(this.unionID).then((u) => {
      this.union = u;
    }, err => console.log(err))
  }

  editer(union){
    this.navCtrl.push(ModifierUnionPage, {'union': union});
  }

  supprimer(union){
    let alert = this.alertCtl.create({
      title: 'Suppression operation',
      message: 'Etes vous sûr de vouloir supprimer cette uion ?',
      buttons:[
        {
          text: 'Annuler',
          handler: () => console.log('suppression annulée')
 
        },
        {
          text: 'Confirmer',
          handler: () => {
            this.servicePouchdb.deleteDoc(union);
            let toast = this.toastCtl.create({
              message:'Union bien suppriée',
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
