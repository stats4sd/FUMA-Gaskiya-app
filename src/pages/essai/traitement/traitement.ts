import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController, IonicPage } from 'ionic-angular';
import { PouchdbProvider } from '../../../providers/pouchdb-provider';
//import { AjouterTraitementPage } from './ajouter-traitement/ajouter-traitement';
//import { DetailTraitementPage } from './detail-traitement/detail-traitement';
import { Storage } from '@ionic/storage';

/*
  Generated class for the Traitement page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

@IonicPage()
@Component({
  selector: 'page-traitement',
  templateUrl: 'traitement.html'
})
export class TraitementPage {

  traitements: any = [];
  allTraitements: any = [];
  annee: any = '';
  selectedAnnee: any;

  annees: any = [];

  constructor(public navCtrl: NavController, public viewCtl: ViewController, public navParams: NavParams, public storage: Storage, public servicePouchdb: PouchdbProvider, public alertCtl: AlertController) {
    //générer des années de 2000 à 2050
    for(let i=0; i<=50; i++){
      this.annees.push(2000 + i)
    }
    this.annees.push('Tous');

    
    if(this.navParams.data.annee){
      this.selectedAnnee = this.navParams.data.annee;
    }else{
      let date = new Date();
      this.selectedAnnee = date.getFullYear();
    }
    
  }

  dismiss(){
    this.viewCtl.dismiss(this.traitements);
  }

   ionViewDidEnter() {

    if(this.selectedAnnee === 'Tous'){
      this.servicePouchdb.getPlageDocsRapide('fuma:traitement', 'fuma:traitement:\uffff').then((t) => {
          if(t){
            this.traitements = t;
            this.allTraitements = t;
          }
        });
    }else{
      let trm: any = [];
      this.servicePouchdb.getPlageDocsRapide('fuma:traitement', 'fuma:traitement:\uffff').then((t) => {
          if(t){
            t.forEach((tr, i) => {
              if(tr.doc.data.annee === this.selectedAnnee){
                trm.push(tr);
              }
            })
            this.traitements = trm;
            this.allTraitements = trm;
          }
        });
    }
  }

  choixAnneeTraitement(){
    if(this.selectedAnnee === 'Tous'){
      this.servicePouchdb.getPlageDocsRapide('fuma:traitement', 'fuma:traitement:\uffff').then((t) => {
          if(t){
            this.traitements = t;
            this.allTraitements = t;
          }
        });
    }else{
      let trm: any = [];
      this.servicePouchdb.getPlageDocsRapide('fuma:traitement', 'fuma:traitement:\uffff').then((t) => {
          if(t){
            t.forEach((tr, i) => {
              if(tr.doc.data.annee === this.selectedAnnee){
                trm.push(tr);
              }
            })
            this.traitements = trm;
            this.allTraitements = trm;
          }
        });
    }
  }

   ajouter(){
     if(this.selectedAnnee !== 'Tous'){
      this.navCtrl.push('AjouterTraitementPage', {'annee': this.selectedAnnee});
     }else{
      this.navCtrl.push('AjouterTraitementPage');
     }
        
  }

  detail(traitement){
    this.navCtrl.push('DetailTraitementPage', {'traitement': traitement});
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.traitements = this.allTraitements;

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.traitements = this.traitements.filter((item) => {
        return (item.doc.data.nom_traitement.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
  }
 
}
