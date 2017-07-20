import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController, IonicPage } from 'ionic-angular';
import { PouchdbProvider } from '../../providers/pouchdb-provider';
//import { AjouterVarietePage } from './ajouter-variete/ajouter-variete';
//import { DetailVarietePage } from './detail-variete/detail-variete';
import { Storage } from '@ionic/storage';

/*
  Generated class for the Variete page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()
@Component({
  selector: 'page-variete',
  templateUrl: 'variete.html'
}) 
export class VarietePage {

  cultures: any = [];
  allVariete: any = [];
  varietes: any = [];
  selectedCulture: any;
  tous: any = {'data':{'nom': 'Tous'}}

  constructor(public navCtrl: NavController, public toastCtl: ToastController, public navParams: NavParams, public storage: Storage, public servicePouchdb: PouchdbProvider, public alertCtl: AlertController) {}

  ionViewDidEnter() {

    this.servicePouchdb.getPlageDocs('fuma:culture','fuma:culture:\uffff').then((c) => {
        if(c){
          this.cultures = c;
          this.cultures.push(this.tous)
        }
      });

    this.servicePouchdb.getPlageDocs('fuma:variete','fuma:variete:\uffff').then((v) => {
    if(v){
      this.varietes = v;
      this.allVariete = v;
    }
  });
}

  choixCulture(){
    if(this.selectedCulture === 'Tous'){
      this.varietes = this.allVariete
    }else{
      let v = [];
      this.allVariete.forEach((vr, i) => {
        if(vr.data.culture === this.selectedCulture){
          v.push(vr)
        }
      });

      this.varietes = v;
    }
  }

  ajouter(){
     this.navCtrl.push('AjouterVarietePage');
  }

  detail(variete){
    this.navCtrl.push('DetailVarietePage', {'variete': variete});
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.varietes = this.allVariete;

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.varietes = this.varietes.filter((item) => {
        return (item.data.nom.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
  }

}
