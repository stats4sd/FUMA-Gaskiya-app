import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, IonicPage } from 'ionic-angular';
import { Validators, FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { PouchdbProvider } from '../../../../providers/pouchdb-provider';

/*
  Generated class for the ModifierTraitement page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/ 
@IonicPage()
@Component({
  selector: 'page-modifier-traitement',
  templateUrl: 'modifier-traitement.html'
})
export class ModifierTraitementPage {

  traitementForm: any;
  traitement: any;
  grandTraitement: any;
  selectedAnnee: any;
  ancienneAnnee: any;
  allTraitement: any;
  annees: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtl: ToastController, public servicePouchdb: PouchdbProvider, public formBuilder: FormBuilder, public storage: Storage) {
    
    this.grandTraitement = this.navParams.data.traitement;
    this.traitement = this.grandTraitement.data;

    let maDate = new Date();
    for(let i=0; i<=50; i++){
      this.annees.push(2000 + i)
    }

    this.selectedAnnee = this.traitement.annee;
    this.ancienneAnnee = this.traitement.annee;

    this.traitementForm = this.formBuilder.group({
     // _id:[''],
      nom_traitement: [this.traitement.nom_traitement],
      code_traitement: [this.traitement.code_traitement, Validators.required],
      annee: [this.traitement.annee, Validators.required],
      superficie: [this.traitement.superficie],
      nom_entree: [this.traitement.nom_entree, Validators.required],
      description_entree: [this.traitement.description_entree],
      objectif_traitement: [this.traitement.objectif_traitement],
      today: [this.traitement.today],
    });
    
  }

  ionViewDidEnter() {
    this.servicePouchdb.getPlageDocs('fuma:traitement','fuma:traitement:\uffff').then((t) => {
        this.allTraitement = t;

      }, err => console.log(err));      
   
  }

  verifierUniqueNon(traitement){
    let res = 1;
    this.allTraitement.forEach((t, index) => {
      if((traitement.annee !== this.ancienneAnnee )&& (traitement.annee === t.data.annee ) && ((traitement.nom_traitement === t.data.nom_traitement) || (traitement.code_traitement === t.data.code_traitement))){
        res = 0;
      }
    });
    return res;
  }

     modifier(){
      //  let date = new Date();
    let traitement = this.traitementForm.value;

    if(this.verifierUniqueNon(traitement) === 0){
      alert('Le nom et code du traitement doivent être uniques par an!');
    }else{

    this.traitement.nom_traitement = traitement.nom_traitement;
    this.traitement.code_traitement = traitement.code_traitement;
    this.traitement.annee = traitement.annee;
    this.traitement.superficie = traitement.superficie;
    this.traitement.nom_entree = traitement.nom_entree;
    this.traitement.description_entree = traitement.description_entree;
    this.traitement.objectif_traitement = traitement.objectif_traitement;

    /*if(this.verifierUniqueNon(typeSole, this.grandTypeSole._id) === 0){
      alert('Le nom du type de sole doit être uniques!');
    }else{*/
      this.grandTraitement.data = this.traitement;
      this.servicePouchdb.updateDoc(this.grandTraitement);
    
      let toast = this.toastCtl.create({
        message: 'Traitement bien sauvegardée!',
        position: 'top',
        duration: 2000
      });

      this.navCtrl.pop();
      toast.present();
      
    }
   // }
  }

  annuler(){
    this.navCtrl.pop();
  }


  
}
