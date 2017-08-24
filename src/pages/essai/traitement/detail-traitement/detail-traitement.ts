import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController, IonicPage } from 'ionic-angular';
//import { ModifierTraitementPage } from '../modifier-traitement/modifier-traitement';
import { PouchdbProvider } from '../../../../providers/pouchdb-provider';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';

/*
  Generated class for the DetailTraitement page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()
@Component({ 
  selector: 'page-detail-traitement',
  templateUrl: 'detail-traitement.html'
})
export class DetailTraitementPage {

   traitement: any = {};
  traitementID: any;

   constructor(public servicePouchdb: PouchdbProvider, public toastCtl: ToastController, public navCtrl: NavController, public navParams: NavParams, public alertCtl: AlertController) {
    this.traitement = this.navParams.data.traitement;
    this.traitementID = this.traitement._id;
  }

  ionViewDidEnter() {
    //console.log('ionViewDidLoad DetailUnionPage');
    this.servicePouchdb.getDocById(this.traitementID).then((t) => {
      this.traitement = t;
    }, err => console.log(err))
  }

  editer(traitement){
    this.navCtrl.push('ModifierTraitementPage', {'traitement': traitement});
  }

  supprimer(traitement){
    let alert = this.alertCtl.create({
      title: 'Suppression Traitement',
      message: 'Etes vous sûr de vouloir supprimer ce traitement ?',
      buttons:[
        {
          text: 'Non',
          handler: () => console.log('suppression annulée')
 
        },
        {
          text: 'Oui',
          handler: () => {
            this.servicePouchdb.deleteDoc(traitement);
            let toast = this.toastCtl.create({
              message:'Traitement bien supprié',
              position: 'top',
              duration: 1000
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
