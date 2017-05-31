import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Validators, FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { PouchdbProvider } from '../../../providers/pouchdb-provider';

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


  constructor(public navCtrl: NavController, public toastCtl: ToastController, public navParams: NavParams, public servicePouchdb: PouchdbProvider, public formBuilder: FormBuilder, public storage: Storage) {
    this.confLocaliteEnquete = this.navParams.data.confLocaliteEnquete;
    let maDate = new Date();
    let today = this.createDate(maDate.getDate(), maDate.getMonth(), maDate.getFullYear());
    //this.storage.get('confLocaliteEnquete').then((confLocaliteEnquete) => {
    this.chargerVillages(this.confLocaliteEnquete.commune.id);
    //});

    this.unionForm = this.formBuilder.group({
      _id:[''],
      nom_union: ['', Validators.required],
      num_aggrement: ['', Validators.required],
      pays: [this.confLocaliteEnquete.pays.id, Validators.required],
      pays_nom: [this.confLocaliteEnquete.pays.nom],
      region: [this.confLocaliteEnquete.region.id, Validators.required],
      region_nom: [this.confLocaliteEnquete.region.nom],
      departement: [this.confLocaliteEnquete.departement.id, Validators.required],
      departement_nom: [this.confLocaliteEnquete.departement.nom],
      commune: [this.confLocaliteEnquete.commune.id, Validators.required],
      commune_nom: [this.confLocaliteEnquete.commune.nom],
      village: ['', Validators.required],
      village_nom: [''],
      today: [today, Validators.required],
      deviceid: [''],
      imei: [''],
      phonenumber: [''],
      num_OP: [0],
      num_membre: [0],
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
      this.unionsApplication = [];
      this.servicePouchdb.getPlageDocs('fuma:union','fuma:union:\uffff').then((unions) => {
        if(unions){
          this.unionsApplication = unions;
        }
      });
    
      this.unionKobo = [];
      this.servicePouchdb.getPlageDocs('koboSubmission_fuma-union','koboSubmission_fuma-union\uffff').then((unions) => {
        if(unions){
          this.unionKobo = unions;
        }
      });

    /*this.storage.get('confLocaliteEnquete').then((confLocaliteEnquete) => {
      this.confLocaliteEnquete = confLocaliteEnquete;
      this.chargerVillages(this.confLocaliteEnquete.commune.id);
    })*/
  }

  chargerVillages(c){
    this.villages = [];
    this.servicePouchdb.getDocById('village').then((villages) => {
      villages.data.forEach((village, index) => {
        if(village.id_commune === c){
          this.villages.push(village);
        }
      });
    });
  } 

  verifierUniqueNon(union){
    let data = this.unionsApplication.concat(this.unionKobo);
    //let union = this.unionForm.value;
    let res = 1;
    //data.push(this.unionsApplication);
    //data.push(this.unionKobo);
    data.forEach((u, index) => {
      if((union.nom_union === u.nom_union) || (union.num_aggrement === u.num_aggrement)){
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
    
    union.village = this.selectedVillage.id;
    union.village_nom = this.selectedVillage.nom;
    let id = this.servicePouchdb.generateId('union', union.pays, union.region, union.departement,union.commune, union.village);
    //union._id = 'fuma'+ id;
    union.end = date.toJSON();

    let unionFinal: any = {};
    unionFinal._id = 'fuma'+ id;
    unionFinal.data = union

    if(this.verifierUniqueNon(union) === 0){
      alert('Le nom de l\'union et le numéro de la reférence doivent être uniques!');
    }else{
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
