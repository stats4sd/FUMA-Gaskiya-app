import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController, IonicPage } from 'ionic-angular';
import { PouchdbProvider } from '../../../providers/pouchdb-provider';
//import { ModifierVarietePage } from '../modifier-variete/modifier-variete';
import { Storage } from '@ionic/storage';

/*
  Generated class for the DetailVariete page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()
@Component({
  selector: 'page-detail-variete',
  templateUrl: 'detail-variete.html'
})
export class DetailVarietePage {

    variete: any;

  constructor(public navCtrl: NavController, public toastCtl: ToastController, public navParams: NavParams, public storage: Storage, public servicePouchdb: PouchdbProvider, public alertCtl: AlertController) {
    this.variete = this.navParams.data.variete
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailVarietePage');
  }

  editer(variete){
    this.navCtrl.push('ModifierVarietePage', {'variete': variete});
  }


  supprimer(variete){
    let alert = this.alertCtl.create({
      title: 'Suppression variété',
      message: 'Etes vous sûr de vouloir supprimer cette variété ?',
      buttons:[
        {
          text: 'Annuler',
          handler: () => console.log('suppression annulée')
 
        },
        {
          text: 'Confirmer',
          handler: () => {
            this.servicePouchdb.deleteDoc(variete);
            let toast = this.toastCtl.create({
              message:'Variété bien suppriée',
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
