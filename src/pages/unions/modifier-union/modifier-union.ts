import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Validators, FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { PouchdbProvider } from '../../../providers/pouchdb-provider';


/*
  Generated class for the ModifierUnion page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-modifier-union',
  templateUrl: 'modifier-union.html'
})
export class ModifierUnionPage {

  union: any;
  grandeUnion: any;
  unionForm: any;
  confLocaliteEnquete: any = {};
  villages: any = [];
  selectedVillageID: any;
  selectedPaysID: any;
  selectedRegionID: any;
  selectedDepartementID: any;
  selectedCommuneID: any;
  unionsApplication: any = [];
  unionKobo: any = [];
  allUnions: any;
  autreVillage: any = {'id':'AUTRE', 'nom':'Autre'};
  nom_autre_village: any = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtl: ToastController, public servicePouchdb: PouchdbProvider, public formBuilder: FormBuilder, public storage: Storage) {
    this.grandeUnion = this.navParams.data.union;
    this.union = this.grandeUnion.data;
    this.selectedVillageID = this.union.village;
    this.selectedPaysID = this.union.pays;
    this.selectedRegionID = this.union.region;
    this.selectedDepartementID = this.union.departement;
    this.selectedCommuneID = this.union.commune;

    if(this.union.village_autre)
      {
        this.nom_autre_village = this.union.village_autre;
      }else{
        this.nom_autre_village = 'NA';
      }

    let maDate = new Date();
    
    //this.storage.get('confLocaliteEnquete').then((confLocaliteEnquete) => {
    this.chargerVillages(this.union.commune);
    //});

    this.unionForm = this.formBuilder.group({
      //_id:[this.union._id],
      //_rev:[this.union._rev],
      nom_union: [this.union.nom_union, Validators.required],
      num_aggrement: [this.union.num_aggrement, Validators.required],
      pays: [this.union.pays, Validators.required],
      pays_nom: [this.union.pays_nom],
      pays_autre: [this.union.pays_autre],
      region: [this.union.region, Validators.required],
      region_nom: [this.union.region_nom],
      region_autre: [this.union.region_autre],
      departement: [this.union.departement, Validators.required],
      departement_nom: [this.union.departement_nom],
      departement_autre: [this.union.departement_autre],
      commune: [this.union.commune, Validators.required],
      commune_nom: [this.union.commune_nom],
      commune_autre: [this.union.commune_autre],
      village: [this.union.village, Validators.required],
      village_nom: [this.union.village_nom],
      village_autre: [this.union.village_autre, Validators.required],
      today: [this.union.today, Validators.required],
      //deviceid: [this.union.deviceid],
      //imei: [this.union.imei],
      //phonenumber: [this.union.phonenumber],
      num_OP: [this.union.num_OP],
      num_membre: [this.union.num_membre],
      num_hommes: [this.union.num_hommes],
      num_femmes: [this.union.num_femmes],
      /*start: [this.union.start],
      end: [this.union.end],
      created_at: [this.union.created_at],
      created_by: [this.union.created_by],*/
    });
  } 



  ionViewDidEnter() {
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

    //this.selectedVillageID = '';
  } 

  chargerAutreNomVillage(c){
    if(c !== 'AUTRE'){
      this.nom_autre_village = 'NA';
    }else{
      this.nom_autre_village = '';
    }
  }



  verifierUniqueNon(union){
    // let data = this.unionsApplication.concat(this.unionKobo);
    //let union = this.unionForm.value;
    let res = 1;
    //data.push(this.unionsApplication);
    //data.push(this.unionKobo);
    this.allUnions.forEach((u, index) => {
      if((u._id !== this.grandeUnion._id) && (/*(union.nom_union === u.data.nom_union) || */(union.num_aggrement === u.data.num_aggrement))){
        res = 0;
      }
    });

    /*this.unionKobo.forEach((u, index) => {
      if((union._id !== u._id) && ((union.nom_union === u.nom_union) || (union.num_aggrement === u.num_aggrement))){
        res = 0;
      }
    });*/

    return res;
  }

  modifier(){
      //  let date = new Date();
    let union = this.unionForm.value;

    this.union.nom_union = union.nom_union;
    this.union.num_aggrement = union.num_aggrement;
    this.union.village = union.village;
    this.union.village_nom = union.village_nom;
    this.union.village_autre = union.village_autre;
    this.union.num_OP = union.num_OP;
    this.union.num_membre = union.num_membre;
    this.union.num_hommes = union.num_hommes;
    this.union.num_femmes = union.num_femmes;

    this.villages.forEach((v, i) => {
      if(v.id === this.selectedVillageID){
        this.union.village = v.id;
        this.union.village_nom = v.nom;
      }
    })
    
    //union.village = this.selectedVillage.id;
    //union.village_nom = this.selectedVillage.nom;
    //let id = this.servicePouchdb.generateId('union', union.pays, union.region, union.departement,union.commune, union.village);
    //union._id = 'fuma'+ id;
    //union.end = date.toJSON();

    if(this.verifierUniqueNon(union) === 0){
      alert('Le nom de l\'union et le numéro de la reférence doivent être uniques!');
    }else{
      this.grandeUnion.data = this.union
      this.servicePouchdb.updateDoc(this.grandeUnion);
    
      let toast = this.toastCtl.create({
        message: 'Union bien sauvegardée!',
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
