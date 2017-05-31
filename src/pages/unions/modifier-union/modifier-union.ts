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

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtl: ToastController, public servicePouchdb: PouchdbProvider, public formBuilder: FormBuilder, public storage: Storage) {
    this.grandeUnion = this.navParams.data.union;
    this.union = this.grandeUnion.data;
    this.selectedVillageID = this.union.village;
    this.selectedPaysID = this.union.pays;
    this.selectedRegionID = this.union.region;
    this.selectedDepartementID = this.union.departement;
    this.selectedCommuneID = this.union.commune;

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
      region: [this.union.region, Validators.required],
      region_nom: [this.union.region_nom],
      departement: [this.union.departement, Validators.required],
      departement_nom: [this.union.departement_nom],
      commune: [this.union.commune, Validators.required],
      commune_nom: [this.union.commune_nom],
      village: [this.union.village, Validators.required],
      village_nom: [this.union.village_nom],
      today: [this.union.today, Validators.required],
      deviceid: [this.union.deviceid],
      imei: [this.union.imei],
      phonenumber: [this.union.phonenumber],
      num_OP: [this.union.num_OP],
      num_membre: [this.union.num_membre],
      start: [this.union.start],
      end: [this.union.end],
      created_at: [this.union.created_at],
      created_by: [this.union.created_by],
    });
  } 



  ionViewDidEnter() {
     
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
      if((union._id !== this.grandeUnion._id) && ((union.nom_union === u.nom_union) || (union.num_aggrement === u.num_aggrement))){
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

    this.villages.forEach((v, i) => {
      if(v.id === this.selectedVillageID){
        union.village = v.id;
        union.village_nom = v.nom;
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
      this.grandeUnion.data = union
      this.servicePouchdb.createDoc(this.grandeUnion);
    
      let toast = this.toastCtl.create({
        message: 'Union bien sauvegarder!',
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
