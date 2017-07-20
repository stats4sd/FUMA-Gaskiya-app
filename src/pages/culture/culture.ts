import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController, IonicPage } from 'ionic-angular';
import { PouchdbProvider } from '../../providers/pouchdb-provider';
//import { AjouterCulturePage } from './ajouter-culture/ajouter-culture';
//import { ModifierCulturePage } from './modifier-culture/modifier-culture';
import { Storage } from '@ionic/storage';

/*
  Generated class for the Culture page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

@IonicPage()
@Component({
  selector: 'page-culture',
  templateUrl: 'culture.html'
})
export class CulturePage {

  cultures: any = [];
  allAulutres: any = [];

  constructor(public navCtrl: NavController, public toastCtl: ToastController, public navParams: NavParams, public storage: Storage, public servicePouchdb: PouchdbProvider, public alertCtl: AlertController) {}

  ionViewDidEnter() {

    this.servicePouchdb.getPlageDocs('fuma:culture','fuma:culture:\uffff').then((c) => {
        if(c){
          this.cultures = c;
          this.allAulutres = c;
        }
      });
  }

  ajouter(){
     this.navCtrl.push('AjouterCulturePage');
  }

  editer(culture){
    this.navCtrl.push('ModifierCulturePage', {'culture': culture});
  }

    supprimer(culture){
    let alert = this.alertCtl.create({
      title: 'Suppression culture',
      message: 'Etes vous sûr de vouloir supprimer cette culture ?',
      buttons:[
        {
          text: 'Non',
          handler: () => console.log('suppression annulée')
 
        },
        {
          text: 'Oui',
          handler: () => {
            this.servicePouchdb.deleteDoc(culture);
            let toast = this.toastCtl.create({
              message:'Cultrue bien supprié',
              position: 'top',
              duration: 3000
            });

            toast.present();
            this.ionViewDidEnter();
          }
        }
      ]
    });

    alert.present();
  }


  getItems(ev: any) {
    // Reset items back to all of the items
    this.cultures = this.allAulutres;

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.cultures = this.cultures.filter((item) => {
        return (item.data.nom.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
  }
 

} 
