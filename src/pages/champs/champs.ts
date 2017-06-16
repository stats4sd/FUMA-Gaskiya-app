import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { PouchdbProvider } from '../../providers/pouchdb-provider';
import { AjouterChampsPage } from './ajouter-champs/ajouter-champs';
import { DetailChampsPage } from './detail-champs/detail-champs';
import { TypeSolePage } from '../type-sole/type-sole';
import { Storage } from '@ionic/storage';

/*
  Generated class for the Champs page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-champs',
  templateUrl: 'champs.html'
})
export class ChampsPage {

  selectedTypeSole: any = 'Tous';
  champs: any = [];
  allChamps: any = [];
  typeSoles: any = [];
  typeSoleTous: any = {'data': {'nom': 'Tous'}};
  matricule_producteur: any;
  nom_producteur: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public servicePouchdb: PouchdbProvider, public alertCtl: AlertController) {
    if(this.navParams.data.matricule_producteur){
      this.matricule_producteur = this.navParams.data.matricule_producteur;
      this.nom_producteur = this.navParams.data.nom_producteur;
    }
  }

  ionViewDidEnter() {

    this.servicePouchdb.getPlageDocs('fuma:type-sole','fuma:type-sole:\uffff').then((ts) => {
        if(ts){
          this.typeSoles = ts;
          this.typeSoles.push(this.typeSoleTous);
        }
      });

    if(this.selectedTypeSole === 'Tous'){
     // this.unions = [];
      this.servicePouchdb.getPlageDocs('fuma:champs','fuma:champs:\uffff').then((c) => {
        if(c){
          if(this.matricule_producteur){
            let chmps: any = [];
            c.forEach((ch, i) => {
              if(ch.data.matricule_producteur === this.matricule_producteur){
                chmps.push(ch);
              }
            });

            this.champs = chmps;
            this.allChamps = chmps;
          }else {
            this.champs = c;
            this.allChamps = c;
          }
        }
      });
    }else{
     // this.unions = [];
      this.servicePouchdb.getPlageDocs('fuma:champs','fuma:champs:\uffff').then((c) => {
        if(c){
          let ch: any = [];
          c.forEach((cp, index) => {
            if(cp.data.type_sole === this.selectedTypeSole){
              ch.push(cp);
            }
          });

          if(this.matricule_producteur){
            let chmps: any = [];
            ch.forEach((chm, i) => {
              if(chm.data.matricule_producteur === this.matricule_producteur){
                chmps.push(chm);
              }
            });

            this.champs = chmps;
            this.allChamps = chmps;
          }else {
            this.champs = ch;
            this.allChamps = ch;
          }

          //this.champs = ch;
          //this.allChamps = ch;
        }
      });
    }
    
  }

  choixTypeSole(){
    if(this.selectedTypeSole === 'Tous'){
     // this.unions = [];
      this.servicePouchdb.getPlageDocs('fuma:champs','fuma:champs:\uffff').then((c) => {
        if(c){
          if(this.matricule_producteur){
            let chmps: any = [];
            c.forEach((ch, i) => {
              if(ch.data.matricule_producteur === this.matricule_producteur){
                chmps.push(ch);
              }
            });

            this.champs = chmps;
            this.allChamps = chmps;
          }else {
            this.champs = c;
            this.allChamps = c;
          }
          //this.champs = c;
          //this.allChamps = c;
        }
      });
    }else{
     // this.unions = [];
      this.servicePouchdb.getPlageDocs('fuma:champs','fuma:champs:\uffff').then((c) => {
        if(c){
          let ch: any = [];
          c.forEach((cp, index) => {
            if(cp.data.type_sole === this.selectedTypeSole){
              ch.push(cp);
            }
          });

          if(this.matricule_producteur){
            let chmps: any = [];
            ch.forEach((chm, i) => {
              if(chm.data.matricule_producteur === this.matricule_producteur){
                chmps.push(chm);
              }
            });

            this.champs = chmps;
            this.allChamps = chmps;
          }else {
            this.champs = ch;
            this.allChamps = ch;
          }
          //this.champs = ch;
          //this.allChamps = ch;
        }
      });
    }   

  }

   ajouter(){
    if(this.typeSoles.length > 0){
      if(this.matricule_producteur){
        this.navCtrl.push(AjouterChampsPage, {'matricule_producteur': this.matricule_producteur});
      }else{
        this.navCtrl.push(AjouterChampsPage);
      }
      
    }else{
      let alert = this.alertCtl.create({
        title: 'Erreur',
        message: 'Vous devez d\'abord définir les types de soles!',
        buttons: [
          {
            text: 'Définir types soles',
            handler:  () => {
              this.navCtrl.push(TypeSolePage);
            }        
          },
          {
            text: 'Annuler',
            handler: () => console.log('annuler')
          }
        ]
      });

      alert.present();
    }
    
  }

  detail(champ){
    this.navCtrl.push(DetailChampsPage, {'champ': champ});
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.champs = this.allChamps;

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.champs = this.champs.filter((item) => {
        return (item.data.nom.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
  }
 
}
