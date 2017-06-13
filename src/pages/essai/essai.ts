import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { PouchdbProvider } from '../../providers/pouchdb-provider';
import { AjouterEssaiPage } from './ajouter-essai/ajouter-essai';
import { DetailEssaiPage } from './detail-essai/detail-essai';
import { Storage } from '@ionic/storage';

/*
  Generated class for the Essai page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-essai',
  templateUrl: 'essai.html'
})
export class EssaiPage {

  essais: any = [];
  allEssais: any = [];
  annee: any = '';
  selectedAnnee: any;

  annees: any = [];
  selectedStyle: any = 'liste';

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public servicePouchdb: PouchdbProvider, public alertCtl: AlertController) {
    //générer des années de 2000 à 2050
    for(let i=0; i<=50; i++){
      this.annees.push(2000 + i)
    } 
    this.annees.push('Tous');
 
    let date = new Date();
    this.selectedAnnee = date.getFullYear();
  }

  ionViewDidEnter() {

    if(this.selectedAnnee === 'Tous'){
      this.servicePouchdb.getPlageDocs('fuma:essai', 'fuma:essai:\uffff').then((e) => {
          if(e){
            this.essais = e;
            this.allEssais = e;
          }
        });
    }else{
      let ess: any = [];
      this.servicePouchdb.getPlageDocs('fuma:essai', 'fuma:essai:\uffff').then((e) => {
          if(e){
            e.forEach((es, i) => {
              if(es.data.annee_essai === this.selectedAnnee){
                ess.push(es);
              }
            })
            this.essais = ess;
            this.allEssais = ess;
          }
        });
    }
  }

  choixAnneeEssai(){
    if(this.selectedAnnee === 'Tous'){
      this.servicePouchdb.getPlageDocs('fuma:essai', 'fuma:essai:\uffff').then((e) => {
          if(e){
            this.essais = e;
            this.allEssais = e;
          }
        });
    }else{
      let ess: any = [];
      this.servicePouchdb.getPlageDocs('fuma:essai', 'fuma:essai:\uffff').then((e) => {
          if(e){
            e.forEach((es, i) => {
              if(es.data.annee_essai === this.selectedAnnee){
                ess.push(es);
              }
            })
            this.essais = ess;
            this.allEssais = ess;
          }
        });
    }
  }

   ajouter(){
      this.navCtrl.push(AjouterEssaiPage);  
  }

  detail(essai){
    this.navCtrl.push(DetailEssaiPage, {'essai': essai});
  }

  sync(){
    this.servicePouchdb.syncAvecToast();
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.essais = this.allEssais;

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.essais = this.essais.filter((item) => {
        return (item.data.nom_producteur.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
  }
 

}
