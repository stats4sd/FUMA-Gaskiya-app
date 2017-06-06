import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Validators, FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { PouchdbProvider } from '../../../providers/pouchdb-provider';

/*
  Generated class for the ModifierOp page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-modifier-op',
  templateUrl: 'modifier-op.html'
})
export class ModifierOpPage { 

  op: any;
  grandeOP: any;
  opForm: any;
  confLocaliteEnquete: any = {};
  villages: any = [];
  unions: any = [];
  selectedVillageID: any;
  selectedUnionID: any;
  ancienSelectedUnionID: any;
  opApplication: any = [];
  opKobo: any = [];
  allOP: any;
  autreVillage: any = {'id':'AUTRE', 'nom':'Autre'};
  nom_autre_village: any = '';
  autreUnion: any = {"data": {'num_aggrement':'AUTRE', 'nom_union':'Autre'}};
  nom_autre_union: any = '';

  constructor(public navCtrl: NavController, public navParams: NavParams,  public toastCtl: ToastController, public servicePouchdb: PouchdbProvider, public formBuilder: FormBuilder, public storage: Storage) {

     this.grandeOP = this.navParams.data.op;

     this.servicePouchdb.getPlageDocs('fuma:union','fuma:union:\uffff').then((uA) => {
         this.servicePouchdb.getPlageDocs('koboSubmission_fuma-union','koboSubmission_fuma-union\uffff').then((uK) => {
          this.unions = uA.concat(uK);
          this.unions.push(this.autreUnion);
      }, err => console.log(err));

      }, err => console.log(err));


    this.op = this.grandeOP.data;
    this.selectedVillageID = this.op.village;
    this.selectedUnionID = this.op.union;
    this.ancienSelectedUnionID = this.op.union;

    if(this.op.village_autre){
        this.nom_autre_village = this.op.village_autre;
      }else{
        this.nom_autre_village = 'NA';
    }

    if(this.op.union_autre) {
        this.nom_autre_union = this.op.union_autre;
    }else{
      this.nom_autre_union = 'NA';
    }

    //let maDate = new Date();
    
    //this.storage.get('confLocaliteEnquete').then((confLocaliteEnquete) => {
    this.chargerVillages(this.op.commune);
    //});

    this.opForm = this.formBuilder.group({
      //_id:[''],
      nom_OP: [this.op.nom_OP, Validators.required],
      num_aggrement: [this.op.num_aggrement, Validators.required],
      pays: [this.op.pays, Validators.required],
      pays_nom: [this.op.pays_nom],
      pays_autre: [this.op.pays_autre],
      region: [this.op.region, Validators.required],
      region_nom: [this.op.region_nom],
      region_autre: [this.op.region_autre],
      departement: [this.op.departement, Validators.required],
      departement_nom: [this.op.departement_nom],
      departement_autre: [this.op.departement_autre],
      commune: [this.op.commune, Validators.required],
      commune_nom: [this.op.commune_nom],
      commune_autre: [this.op.commune_autre],
      village: [this.op.village, Validators.required],
      village_nom: [this.op.village_nom],
      village_autre: [this.op.village_autre, Validators.required],
      union: [this.op.union, Validators.required],
      union_nom: [this.op.union_nom],
      union_autre: [this.op.union_autre, Validators.required],
      today: [this.op.today, Validators.required],
      /*deviceid: [this.op.deviceid],
      imei: [this.op.imei],
      phonenumber: [this.op.phonenumber],*/
      //num_OP: [0],
      num_membre: [this.op.num_membre],
      num_hommes: [this.op.num_hommes],
      num_femmes: [this.op.num_femmes],
      /*start: [this.op.start],
      end: [this.op.end],
      created_at: [this.op.created_at],
      created_by: [this.op.created_by],*/
    });

  }

   ionViewDidEnter() {
     this.servicePouchdb.getPlageDocs('fuma:op','fuma:op:\uffff').then((opA) => {
        /*if(unionsA){
          this.unionsApplication = unionsA;
          //this.allUnions = unions;
        }*/
         this.servicePouchdb.getPlageDocs('koboSubmission_fuma-op','koboSubmission_fuma-op\uffff').then((opK) => {
          this.allOP = opA.concat(opK);
          //this.allUnions = this.unions

       /* if(unionsK){
          this.unionsKobo = unionsK;
          
        }*/
      }, err => console.log(err));

      }, err => console.log(err)); 
  }

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

  chargerAutreNomVillage(v){
    if(v !== 'AUTRE'){
      this.nom_autre_village = 'NA';
    }else{
      this.nom_autre_village = '';
    }
  }

  chargerAutreNomUnion(u){
    if(u !== 'AUTRE'){
      this.nom_autre_union = 'NA';
    }else{
      this.nom_autre_union = '';
    }
  }

   verifierUniqueNon(op){
    let res = 1;
    this.allOP.forEach((o, index) => {
      if((o._id !== this.grandeOP._id) && ((op.nom_OP === o.data.nom_OP) || (op.num_aggrement === o.data.num_aggrement))){
        res = 0;
      }
    });
    return res;
  }


  modifier(){
      //  let date = new Date();
    let op = this.opForm.value;

    this.op.nom_OP = op.nom_OP;
    this.op.num_aggrement = op.num_aggrement;
    this.op.village = op.village;
    this.op.village_nom = op.village_nom;
    this.op.village_autre = op.village_autre;
    this.op.union = op.union;
    this.op.union_nom = op.union_nom;
    this.op.union_autre = op.union_autre;
    this.op.num_membre = op.num_membre;
    this.op.num_hommes = op.num_hommes;
    this.op.num_femmes = op.num_femmes;

    this.villages.forEach((v, i) => {
      if(v.id === this.selectedVillageID){
        this.op.village = v.id;
        this.op.village_nom = v.nom;
      }
    })

    if(this.selectedUnionID !== 'AUTRE'){
      this.unions.forEach((u, i) => {
        if(u.data.num_aggrement === this.selectedUnionID){
          this. op.union = u.data.num_aggrement;
          this.op.union_nom = u.data.nom_union;
        }
      });
    }else{
      this.op.union = this.autreUnion.data.num_aggrement;
      this.op.union_nom = this.autreUnion.data.nom_union;
    }
    
    //union.village = this.selectedVillage.id;
    //union.village_nom = this.selectedVillage.nom;
    //let id = this.servicePouchdb.generateId('union', union.pays, union.region, union.departement,union.commune, union.village);
    //union._id = 'fuma'+ id;
    //union.end = date.toJSON();

    if(this.verifierUniqueNon(op) === 0){
      alert('Le nom de l\'OP et le numéro de la reférence doivent être uniques!');
    }else{
      this.grandeOP.data = this.op
      this.servicePouchdb.updateDoc(this.grandeOP);
      
      if(this.ancienSelectedUnionID !== this.selectedUnionID){
        if(this.selectedUnionID !== 'AUTRE' && this.ancienSelectedUnionID === 'AUTRE'){
          this.unions.forEach((u, i) => {
            if(u.data.num_aggrement === this.selectedUnionID){
              u.data.num_OP++;
              this.servicePouchdb.updateDoc(u);
            }
          });
        }else if(this.selectedUnionID !== 'AUTRE' && this.ancienSelectedUnionID !== 'AUTRE'){
          this.unions.forEach((u, i) => {
            if(u.data.num_aggrement === this.selectedUnionID){
              u.data.num_OP++;
              this.servicePouchdb.updateDoc(u);
            }
            if(u.data.num_aggrement === this.ancienSelectedUnionID){
              u.data.num_OP--;
              this.servicePouchdb.updateDoc(u);
            }
          });
        }else if(this.selectedUnionID === 'AUTRE' && this.ancienSelectedUnionID !== 'AUTRE'){
           this.unions.forEach((u, i) => {
            if(u.data.num_aggrement === this.ancienSelectedUnionID){
              u.data.num_OP--;
              this.servicePouchdb.updateDoc(u);
            }
          });
        }
      }

      let toast = this.toastCtl.create({
        message: 'OP bien sauvegardée!',
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
