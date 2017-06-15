import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Validators, FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { PouchdbProvider } from '../../../providers/pouchdb-provider';
import { Device } from '@ionic-native/device';
import { Sim } from '@ionic-native/sim';

/*
  Generated class for the AjouterUnion page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-ajouter-union',
  templateUrl: 'ajouter-union.html'
})
export class AjouterUnionPage {

  unionForm: any;
  confLocaliteEnquete: any = {};
  villages: any = [];
  selectedVillage: any;
  unionsApplication: any = [];
  unionKobo: any = [];
  allUnions: any;
  imei: any = '';
  phonenumber: any = '';
  autreVillage: any = {'id':'AUTRE', 'nom':'Autre'};
  nom_autre_village: any = '';


  constructor(public sim: Sim, public device: Device, public navCtrl: NavController, public toastCtl: ToastController, public navParams: NavParams, public servicePouchdb: PouchdbProvider, public formBuilder: FormBuilder, public storage: Storage) {
    this.confLocaliteEnquete = this.navParams.data.confLocaliteEnquete;
    let maDate = new Date();
    let today = this.createDate(maDate.getDate(), maDate.getMonth(), maDate.getFullYear());
    //this.storage.get('confLocaliteEnquete').then((confLocaliteEnquete) => {
    this.chargerVillages(this.confLocaliteEnquete.commune.id);
    //});

    this.unionForm = this.formBuilder.group({
      //_id:[''],
      type:['union'],
      nom_union: ['', Validators.required], 
      num_aggrement: ['', Validators.required],
      pays: [this.confLocaliteEnquete.pays.id, Validators.required],
      pays_nom: [this.confLocaliteEnquete.pays.nom],
      pays_autre: [this.confLocaliteEnquete.pays_autre],
      region: [this.confLocaliteEnquete.region.id, Validators.required],
      region_nom: [this.confLocaliteEnquete.region.nom],
      region_autre: [this.confLocaliteEnquete.region_autre],
      departement: [this.confLocaliteEnquete.departement.id, Validators.required],
      departement_nom: [this.confLocaliteEnquete.departement.nom],
      departement_autre: [this.confLocaliteEnquete.departement_autre],
      commune: [this.confLocaliteEnquete.commune.id, Validators.required],
      commune_nom: [this.confLocaliteEnquete.commune.nom],
      commune_autre: [this.confLocaliteEnquete.commune_autre],
      village: ['', Validators.required],
      village_nom: [''],
      village_autre: ['', Validators.required],
      today: [today, Validators.required],
      deviceid: [''],
      imei: [''],
      phonenumber: [''],
      num_OP: [0],
      num_membre: [0],
      num_hommes: [0],
      num_femmes: [0],
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

    this.servicePouchdb.getPlageDocs('fuma:union','fuma:union:\uffff').then((unionsA) => {
        /*if(unionsA){
          this.unionsApplication = unionsA;
          //this.allUnions = unions;
        }*/
         this.servicePouchdb.getPlageDocs('koboSubmission_fuma-union','koboSubmission_fuma-union\uffff').then((unionsK) => {
          this.allUnions = unionsA.concat(unionsK);
          //this.allUnions = this.unions

       /* if(unionsK){
          this.unionsKobo = unionsK;
          
        }*/
      }, err => console.log(err));

      }, err => console.log(err));      
    //});

     /*//this.unionsApplication = [];
      this.servicePouchdb.getPlageDocs('fuma:union','fuma:union:\uffff').then((unionsA) => {
        //if(unionsA){
          this.unionsApplication = unionsA;
      //  }
      }, err =>  console.log(err));
     
      //this.unionKobo = [];
      this.servicePouchdb.getPlageDocs('koboSubmission_fuma-union','koboSubmission_fuma-union\uffff').then((unionsK) => {
       // if(unions){
          this.unionKobo = unionsK;
       // }
      }, err =>  console.log(err));

    /*this.storage.get('confLocaliteEnquete').then((confLocaliteEnquete) => {
      this.confLocaliteEnquete = confLocaliteEnquete;
      this.chargerVillages(this.confLocaliteEnquete.commune.id);
    })*/
  }

  /*chargerVillages(c){
    this.villages = [];
    this.servicePouchdb.getDocById('village').then((villages) => {
      villages.data.forEach((village, index) => {
        if(village.id_commune === c){
          this.villages.push(village);
        }
      });
    });
  } */


  chargerVillages(c){
    this.villages = [];
    if(c !== 'AUTRE')
      {this.servicePouchdb.getDocById('village').then((villages) => {
        villages.data.forEach((village, index) => {
          if(village.id_commune === c){
            this.villages.push(village);
            
          }
        });
        this.villages.push(this.autreVillage);
        //this.nom_autre_departement = 'NA';
      });
    }else{
      this.villages.push(this.autreVillage);
      //this.nom_autre_departement = '';
    }

    //this.selectedVillage = '';
  } 

  chargerAutreNomVillage(c){
    if(c !== 'AUTRE'){
      this.nom_autre_village = 'NA';
    }else{
      this.nom_autre_village = '';
    }
  }


  verifierUniqueNon(union){
    //let data = this.unionsApplication.concat(this.unionKobo);
    //let union = this.unionForm.value;
    let res = 1;
    //data.push(this.unionsApplication);
    //data.push(this.unionKobo);
    this.allUnions.forEach((u, index) => {
      if(/*(union.nom_union === u.data.nom_union) || */(union.num_aggrement === u.data.num_aggrement)){
        res = 0;
      }
    });

    /*this.unionKobo.forEach((u, index) => {
      if((union.nom_union === u.nom_union) || (union.num_aggrement === u.num_aggrement)){
        res = 0;
      }
    });*/

    return res;
  }

  ajouter(){
    let date = new Date();
    let union = this.unionForm.value;

    if(this.verifierUniqueNon(union) === 0){
      alert('Le nom de l\'union et le numéro de la reférence doivent être uniques!');
    }else{
      union.village = this.selectedVillage.id;
      union.village_nom = this.selectedVillage.nom;
      union.deviceid = this.device.uuid;
      union.phonenumber = this.phonenumber;
      union.imei = this.imei;
      let id = this.servicePouchdb.generateId('union', union.pays, union.region, union.departement,union.commune, union.village);
      //union._id = 'fuma'+ id;
      union.end = date.toJSON();

      let unionFinal: any = {};
      unionFinal._id = 'fuma'+ id;
      unionFinal.data = union
      this.servicePouchdb.createDoc(unionFinal);
    
      let toast = this.toastCtl.create({
        message: 'Union bien enregistré!',
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
