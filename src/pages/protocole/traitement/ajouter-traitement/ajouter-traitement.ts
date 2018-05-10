import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, IonicPage } from 'ionic-angular';
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
@IonicPage()
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
  superficie: any;
  max_NPR: any;
  max_NPL: any;
  protocole: any;

  annees: any = [];
  protocoles: any = [];
  selectedProtocole: any;
  indexSelectedProtocole: number;
  type_essais: any = '';

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

    if(this.navParams.data.protocole){
      this.protocole = this.navParams.data.protocole;
      this.selectedAnnee = this.protocole.data.annee;
      //this.selectedProtocole = this.protocole.data;
      //this.setTypeEssais(this.selectedProtocole)
      //this.type_essais = this.selectedProtocole.type_essais;
    }

    this.traitementForm = this.formBuilder.group({
     // _id:[''],
      type:['traitement'],
      //nom_traitement: [''],
      code_traitement: ['', Validators.required],
      annee: [maDate.getFullYear()],
      nom_entree: ['', Validators.required],
      nom_controle: [''],
      superficie: ['', Validators.required],
      code_protocole: ['', Validators.required],
      nom_protocole: [''],
      type_essais: ['', Validators.required],
      //max_NPL: ['', Validators.required],
      //max_NPR: ['', Validators.required],
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

  setSelectedProtocoleIndex(protocole){
   for(let i = 0; i < this.protocoles.length; i++){
     if(this.protocoles[i].doc.data.code == protocole.data.code){
       this.indexSelectedProtocole = i;
       //this.selectedProtocole = this.protocoles[i].doc.data;
       this.setTypeEssais(this.indexSelectedProtocole);
       break;
     }
   }
  }

  setTypeEssais(index){
    if(index >= 0){
      this.selectedProtocole = this.protocoles[index].doc.data
      this.type_essais = this.selectedProtocole.type_essais;
    }
  }


  setAnnee(annee){
    this.selectedProtocole = null;
    this.type_essais = '';
    this.indexSelectedProtocole = -1;
    this.chargerProtocole(annee);
  }
  chargerProtocole(annee){
    this.servicePouchdb.getPlageDocsRapide('fuma:protocole', 'fuma:protocole:\uffff').then((p) => {
      if(p){
        let ps: any = [];
        p.forEach((protocole) => {
          if(protocole.doc.data.annee == annee){
            ps.push(protocole);
          }
        });
        this.protocoles = ps;

        if(this.navParams.data.protocole){
          this.setSelectedProtocoleIndex(this.navParams.data.protocole)
        }
      }
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
        if(info.cards.length > 0){
          info.cards.forEach((infoCard) => {
            if(infoCard.phoneNumber){
              this.phonenumber = infoCard.phoneNumber;
            }
            if(infoCard.deviceId){
              this.imei = infoCard.deviceId;
            }
          })
        }else{
          this.phonenumber = info.phoneNumber;
          this.imei = info.deviceId;
        }

      },
      (err) => console.log('Unable to get sim info: ', err)
    );

    this.servicePouchdb.getPlageDocs('fuma:traitement','fuma:traitement:\uffff').then((t) => {
        this.allTraitement = t;

      }, err => console.log(err));      
   
    this.chargerProtocole(this.selectedAnnee)
    
  }

  verifierUniqueNon(traitement){
    let res = 1;
    this.allTraitement.forEach((t, index) => {
      if((traitement.code_protocole === t.data.code_protocole && traitement.annee === t.data.annee ) && ((traitement.nom_entree === t.data.nom_entree) || (traitement.code_traitement === t.data.code_traitement))){
        res = 0;
      }
    });
    return res;
  }
  

  ajouter(){
    let date = new Date();
    let traitement = this.traitementForm.value;
    traitement.code_protocole = this.selectedProtocole.code;
    traitement.nom_protocole = this.selectedProtocole.nom;
    traitement.type_essais = this.selectedProtocole.type_essais;
    //traitement.matricule_producteur = this.selectedProducteur.data.matricule_Membre;
    //champs.nom_producteur = this.selectedProducteur.data.nom_Membre;
    if(this.verifierUniqueNon(traitement) === 0){
      alert('Le nom et code du traitement doivent être uniques par protocole et par an!');
    }else{
      if((traitement.type_essais == 'sans controle') || (traitement.type_essais == 'avec controle' && traitement.nom_controle && traitement.nom_controle !== '')){
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
        /*let toast = this.toastCtl.create({
          message: 'Traitement bien enregistré!',
          position: 'top',
          duration: 1000
        });*/
  
        this.navCtrl.pop();
        //toast.present();  
      }else{
        alert('Le nom du controle est obligatoire')
      }

    }
    
  }

  annuler(){
    this.navCtrl.pop();
  }

}
