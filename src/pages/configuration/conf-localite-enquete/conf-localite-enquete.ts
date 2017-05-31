import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { Validators, FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { ModifierConfLocaliteEnquetePage } from './modifier-conf-localite-enquete/modifier-conf-localite-enquete';
import { AjouterConfLocaliteEnquetePage } from './ajouter-conf-localite-enquete/ajouter-conf-localite-enquete';
import { PouchdbProvider } from '../../../providers/pouchdb-provider';
/*
  Generated class for the ConfLocaliteEnquete page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-conf-localite-enquete',
  templateUrl: 'conf-localite-enquete.html'
})
export class ConfLocaliteEnquetePage {

  confLocaliteEnquete: any;

  constructor(public pouchdbService: PouchdbProvider, public navCtrl: NavController, public navParams: NavParams, public alertCtl: AlertController, public toastCtl: ToastController, public translate: TranslateService, public formBuilder: FormBuilder, public storage: Storage) {
    //this.storage.remove('confLocaliteEnquete');
  }

  ionViewDidEnter() {
    this.storage.get('confLocaliteEnquete').then((confLocaliteEnquete) => {
      if(confLocaliteEnquete){
        this.confLocaliteEnquete = confLocaliteEnquete;
      }
    }, err => {
      console.log('confLocaliteEnquete non définie')
    });
  }

  configurer(){
    this.navCtrl.push(AjouterConfLocaliteEnquetePage);
  }

  modifierConfigurer(confLocaliteEnquete){
    this.navCtrl.push(ModifierConfLocaliteEnquetePage, {'local': this.confLocaliteEnquete});
  }


  supprimer(confLocaliteEnquete){
    let alert = this.alertCtl.create({
      title: 'Suppression produit',
      message: 'Etes vous sûr de vouloir supprimer cet produit ?',
      buttons:[
        {
          text: 'Annuler',
          handler: () => console.log('suppression annulée')
        },
        {
          text: 'Confirmer',
          handler: () => {
            //this.pouchdbService.delete(confLocaliteEnquete);
            this.storage.remove('confLocaliteEnquete');
            let toast = this.toastCtl.create({
              message:'Configuration supprimée avec succès!',
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
