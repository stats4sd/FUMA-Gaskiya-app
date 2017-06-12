import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { PouchdbProvider } from '../../providers/pouchdb-provider';
import { AjouterUnionPage } from './ajouter-union/ajouter-union';
import { DetailUnionPage } from './detail-union/detail-union';
import { Storage } from '@ionic/storage';
import { ConfLocaliteEnquetePage } from '../configuration/conf-localite-enquete/conf-localite-enquete';
import { ChoixSourceAjoutUnionPage } from './choix-source-ajout-union/choix-source-ajout-union';

/*
  Generated class for the Unions page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-unions',
  templateUrl: 'unions.html'
})
export class UnionsPage {

  selectedSource: any = 'application';
  unions: any = [];
  unionsApplication: any = [];
  unionsKobo: any = [];
  allUnions: any = [];
  confLocaliteEnquete: any;


  constructor(public storage: Storage, public navCtrl: NavController, public alertCtl: AlertController, public navParams: NavParams, public servicePouchdb: PouchdbProvider) {}

  sync(){
    this.servicePouchdb.syncAvecToast();
  }

  ionViewDidEnter() {
    if(this.selectedSource === 'application'){
     // this.unions = [];
      this.servicePouchdb.getPlageDocs('fuma:union','fuma:union:\uffff').then((unions) => {
        if(unions){
          this.unions = unions;
          this.allUnions = unions;
        }
      });
    }else if(this.selectedSource === 'kobo'){
     // this.unions = [];
      this.servicePouchdb.getPlageDocs('koboSubmission_fuma-union','koboSubmission_fuma-union\uffff').then((unions) => {
        if(unions){
          this.unions = unions;
          this.allUnions = unions;
        }
      });
    }else{
      
      this.servicePouchdb.getPlageDocs('fuma:union','fuma:union:\uffff').then((unionsA) => {
        /*if(unionsA){
          this.unionsApplication = unionsA;
          //this.allUnions = unions;
        }*/
         this.servicePouchdb.getPlageDocs('koboSubmission_fuma-union','koboSubmission_fuma-union\uffff').then((unionsK) => {
          this.unions = unionsA.concat(unionsK);
          this.allUnions = this.unions

       /* if(unionsK){
          this.unionsKobo = unionsK;
          
        }*/
      }, err => console.log(err));

      }, err => console.log(err));      
    }
    

    this.storage.get('confLocaliteEnquete').then((confLocaliteEnquete) => {
      if(confLocaliteEnquete){
        this.confLocaliteEnquete = confLocaliteEnquete;
      }
      //this.chargerVillages(this.confLocaliteEnquete.commune.id);
    });
  }

  choixSource(){
   // this.unions = [];
     if(this.selectedSource === 'application'){
     // this.unions = [];
      this.servicePouchdb.getPlageDocs('fuma:union','fuma:union:\uffff').then((unions) => {
        if(unions){
          this.unions = unions;
          this.allUnions = unions;
        }
      });
    }else if(this.selectedSource === 'kobo'){
     // this.unions = [];
      this.servicePouchdb.getPlageDocs('koboSubmission_fuma-union','koboSubmission_fuma-union\uffff').then((unions) => {
        if(unions){
          this.unions = unions;
          this.allUnions = unions;
        }
      });
    }else{
      
      this.servicePouchdb.getPlageDocs('fuma:union','fuma:union:\uffff').then((unionsA) => {
        /*if(unionsA){
          this.unionsApplication = unionsA;
          //this.allUnions = unions;
        }*/
         this.servicePouchdb.getPlageDocs('koboSubmission_fuma-union','koboSubmission_fuma-union\uffff').then((unionsK) => {
          this.unions = unionsA.concat(unionsK);
          this.allUnions = this.unions

       /* if(unionsK){
          this.unionsKobo = unionsK;
          
        }*/
      }, err => console.log(err));

      }, err => console.log(err));
     
      
    }

  }

  ajouter(confLocaliteEnquete){
    if(this.confLocaliteEnquete){
      this.navCtrl.push(AjouterUnionPage, {'confLocaliteEnquete': confLocaliteEnquete});
    }else{
      let alert = this.alertCtl.create({
        title: 'Erreur',
        message: 'Vous devez d\'abord définir la configuration de la localité à enquêtée!',
        buttons: [
          {
            text: 'Définir localité',
            handler:  () => {
              this.navCtrl.push(ConfLocaliteEnquetePage);
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

  detail(union, selectedSource){
    this.navCtrl.push(DetailUnionPage, {'union': union, 'selectedSource': selectedSource});
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.unions = this.allUnions;

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.unions = this.unions.filter((item) => {
        return (item.data.nom_union.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
  }
}
