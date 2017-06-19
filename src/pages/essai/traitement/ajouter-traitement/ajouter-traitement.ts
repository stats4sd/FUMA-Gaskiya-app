import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Validators, FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { PouchdbProvider } from '../../../../providers/pouchdb-provider';
//import { AutoCompletion } from '../../../providers/auto-completion';
import { Device } from '@ionic-native/device';
import { Sim } from '@ionic-native/sim';

/*
  Generated class for the AjouterTraitement page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-ajouter-traitement',
  templateUrl: 'ajouter-traitement.html'
})
export class AjouterTraitementPage {

  traitementForm: any;
  producteurs: any = [];
  selectedAnnee: any;
  allTraitement: any;
  imei: any = '';
  phonenumber: any = '';

  annees: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public sim: Sim, public device: Device, public toastCtl: ToastController, public servicePouchdb: PouchdbProvider, public formBuilder: FormBuilder, public storage: Storage) {
    
    let maDate = new Date();
    let today = this.createDate(maDate.getDate(), maDate.getMonth(), maDate.getFullYear());

    for(let i=0; i<=50; i++){
      this.annees.push(2000 + i)
    }
    this.annees.push('Tous');

    if(this.navParams.data.annee){
      this.selectedAnnee = this.navParams.data.annee;
    }else{
      this.selectedAnnee = maDate.getFullYear();
    }

    this.traitementForm = this.formBuilder.group({
     // _id:[''],
      type:['traitement'],
      nom_traitement: ['', Validators.required],
      code_traitement: [''],
      annee: [maDate.getFullYear()],
      nom_entree: ['', Validators.required],
      description_entree: [''],
      objectif_traitement: [''],
      today: [today, Validators.required],
      deviceid: [''],
      imei: [''],
      phonenumber: [''],
      start: [maDate.toJSON()],
      end: ['']
    });
    
  }

  createDate(jour: any, moi: any, annee: any){
    let s = annee+'-';
    moi += 1;
    if(moi < 10){
      s += '0'+moi+'-';
    }else{
      s += moi+'-';
    }

    if(jour < 10){
      s += '0'+jour;
    }else{
      s += jour;
    }
    return s;
  }

  ionViewDidEnter() {

    this.sim.getSimInfo().then(
      (info) => {
        this.phonenumber = info.phoneNumber;
        this.imei = info.deviceId;
      },
      (err) => console.log('Unable to get sim info: ', err)
    );

    this.servicePouchdb.getPlageDocs('fuma:traitement','fuma:traitement:\uffff').then((t) => {
        this.allTraitement = t;

      }, err => console.log(err));      
   
  }

  verifierUniqueNon(traitement){
    let res = 1;
    this.allTraitement.forEach((t, index) => {
      if((traitement.annee === t.data.annee ) && ((traitement.nom_traitement === t.data.nom_traitement) || (traitement.code_traitement === t.data.code_traitement))){
        res = 0;
      }
    });
    return res;
  }
  

  ajouter(){
    let date = new Date();
    let traitement = this.traitementForm.value;
    //traitement.matricule_producteur = this.selectedProducteur.data.matricule_Membre;
    //champs.nom_producteur = this.selectedProducteur.data.nom_Membre;
    if(this.verifierUniqueNon(traitement) === 0){
      alert('Le nom et code du traitement doivent être uniques par an!');
    }else{
      traitement.deviceid = this.device.uuid;
      traitement.phonenumber = this.phonenumber;
      traitement.imei = this.imei;
      let id = this.servicePouchdb.generateOderId('traitement');
      //union._id = 'fuma'+ id;
      traitement.end = date.toJSON();
      //champs.id_champs = id;

      let traitementFinal: any = {};
      traitementFinal._id = 'fuma'+ id;
      traitementFinal.data = traitement
      this.servicePouchdb.createDoc(traitementFinal);
      let toast = this.toastCtl.create({
        message: 'Traitement bien enregistré!',
        position: 'top',
        duration: 3000
      });

      toast.present();
      this.navCtrl.pop();

    }
    
  }

  annuler(){
    this.navCtrl.pop();
  }

}
