import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Validators, FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { PouchdbProvider } from '../../../providers/pouchdb-provider';
import { Device } from '@ionic-native/device';
import { Sim } from '@ionic-native/sim';

/*
  Generated class for the AjouterMembre page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-ajouter-membre',
  templateUrl: 'ajouter-membre.html'
})
export class AjouterMembrePage {

  membreForm: any;
  confLocaliteEnquete: any = {};
  villages: any = [];
  ops: any = [];
  classes: any = [];
  selectedVillage: any;
  selectedOP: any;
  selectedClasse: any;
  membreApplication: any = [];
  membreKobo: any = [];
  allMembres: any;
  allUnion
  imei: any = '';
  phonenumber: any = '';
  autreVillage: any = {'id':'AUTRE', 'nom':'Autre'};
  autreOP: any = {"data": {'num_aggrement':'AUTRE', 'nom_OP':'Autre'}};
  autreClasse: any = {"data": {'id':'AUTRE', 'nom':'Autre'}};
  nom_autre_village: any = '';
  nom_autre_op: any = '';
  nom_autre_classe: any = '';
  matricule: any = '';
  nom:any = '';
  num_aggrement_op: any;
  nom_op: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public sim: Sim, public device: Device, public toastCtl: ToastController, public servicePouchdb: PouchdbProvider, public formBuilder: FormBuilder, public storage: Storage) {
    
    if(this.navParams.data.num_aggrement_op){
      this.num_aggrement_op = this.navParams.data.num_aggrement_op;
      this.nom_op = this.navParams.data.nom_op;
      this.nom_autre_op= 'NA';
    }
    this.confLocaliteEnquete = this.navParams.data.confLocaliteEnquete;

    this.servicePouchdb.getPlageDocs('fuma:op','fuma:op:\uffff').then((oA) => {
         this.servicePouchdb.getPlageDocs('koboSubmission_fuma-op','koboSubmission_fuma-op\uffff').then((oK) => {
          this.ops = oA.concat(oK);
          this.ops.push(this.autreOP);
      }, err => console.log(err));

    }, err => console.log(err)); 
    
    this.servicePouchdb.getPlageDocs('fuma:classe','fuma:classe:\uffff').then((cA) => {
         this.servicePouchdb.getPlageDocs('koboSubmission_fuma-classe','koboSubmission_fuma-classe\uffff').then((cK) => {
          this.classes = cA.concat(cK);
          this.classes.push(this.autreClasse);
      }, err => console.log(err)); 

      }, err => console.log(err));

    let maDate = new Date();
    let today = this.createDate(maDate.getDate(), maDate.getMonth(), maDate.getFullYear());
    //this.storage.get('confLocaliteEnquete').then((confLocaliteEnquete) => {
    this.chargerVillages(this.confLocaliteEnquete.commune.id);
    //});

    this.membreForm = this.formBuilder.group({
      //_id:[''],
      type:['membre_op'],
      nom_Membre: ['', Validators.required],
      matricule_Membre: ['', Validators.required],
      genre: ['', Validators.required],
      classe: [''],
      classe_nom: [''],
      classe_autre: [''],
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
      op: ['', Validators.required],
      op_nom: [''],
      op_autre: ['NA', Validators.required],
      today: [today, Validators.required],
      deviceid: [''],
      imei: [''],
      phonenumber: [''],
      start: [maDate.toJSON()],
      end: ['']
    });
    
  }

  chargerOp(){
    this.nom_op
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

  getMatricule(){
    let membre = this.membreForm.value;
   
    if(this.nom.length === 2){
      this.matricule = this.generateId(this.nom.toUpperCase().substr(0, 2),/* membre.pays.toUpperCase().substr(0, 2), membre.region.toUpperCase().substr(0, 2), membre.departement.toUpperCase().substr(0, 2), membre.commune.toUpperCase().substr(0, 2), this.selectedVillage.nom.toUpperCase().substr(0, 2)*/);
    } 
 }

  generateId(operation, /*pays, region, departement, commune, village*/){
    /*var pays = pays||'XX'
    var region = region||'XX'
    var department = departement || 'XX'
    var commune = commune || 'XX'*/
    //var village = village || 'XX'
    //select 3 random numbers and random letter for up to 25,000 unique per department
    var chars='ABCDEFGHIJKLMNPQRSTUVWYZ'
    var numbers='0123456789'
    var randomArray=[]
    for(let i=0;i<6;i++){
      var rand = Math.floor(Math.random()*10)
      randomArray.push(numbers[rand])
    }
    randomArray.push('-')
    var rand = Math.floor(Math.random()*24)
    randomArray.push(chars[rand])
    var randomString=randomArray.join("");
    var Id= operation+' '/*+pays+'-'+region+'-'+department+'-'+commune +'-' +village+ */+randomString 
    return Id
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

    this.servicePouchdb.getPlageDocs('fuma:op:membre','fuma:op:membre:\uffff').then((mbrsA) => {
         this.servicePouchdb.getPlageDocs('koboSubmission_fuma-op-membre','koboSubmission_fuma-op-membre\uffff').then((mbrsK) => {
          this.allMembres = mbrsA.concat(mbrsK);
      }, err => console.log(err));

      }, err => console.log(err));      
   

      this.servicePouchdb.getPlageDocs('fuma:union','fuma:union:\uffff').then((uA) => {
         this.servicePouchdb.getPlageDocs('koboSubmission_fuma-union','koboSubmission_fuma-union\uffff').then((uK) => {
          this.allUnion = uA.concat(uK);
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

  chargerAutreNomOP(op){
    if(op !== 'AUTRE'){
      this.nom_autre_op = 'NA';
    }else{
      this.nom_autre_op = '';
    }
  }

   chargerAutreNomClasse(c){
    if(c !== 'AUTRE'){
      this.nom_autre_classe = 'NA';
    }else{
      this.nom_autre_classe = '';
    }
  }


  verifierUniqueMatricule(membre){
    let res = 1;
    this.allMembres.forEach((m, index) => {
      if(membre.matricule_Membre === m.data.matricule_Membre){
        res = 0;
      }
    });
    return res;
  }

   ajouter(){
    let date = new Date();
    let membre = this.membreForm.value;

    if(this.verifierUniqueMatricule(membre) === 0){
      alert('Le matricule du membre doit être unique!');
    }else{
      membre.village = this.selectedVillage.id;
      membre.village_nom = this.selectedVillage.nom;
      if(!this.num_aggrement_op){
         membre.op = this.selectedOP.data.num_aggrement;
         membre.op_nom = this.selectedOP.data.nom_OP;
      }
      membre.classe = this.selectedClasse.data.id;
      membre.classe_nom = this.selectedClasse.data.nom;
      membre.deviceid = this.device.uuid;
      membre.phonenumber = this.phonenumber;
      membre.imei = this.imei;
      let id = this.servicePouchdb.generateId('op:membre', membre.pays, membre.region, membre.departement,membre.commune, membre.village);
      //union._id = 'fuma'+ id;
      membre.end = date.toJSON();

      let membreFinal: any = {};
      membreFinal._id = 'fuma'+ id;
      membreFinal.data = membre
      this.servicePouchdb.createDoc(membreFinal);

      /*if(this.selectedOP.data.num_aggrement !== 'AUTRE'){
        this.selectedOP.data.num_membre++;
        if(membre.genre === 'male'){
          this.selectedOP.data.num_hommes++;
        }else{
          this.selectedOP.data.num_femmes++;
        }
        this.servicePouchdb.updateDoc(this.selectedOP);
      }

      this.allUnion.forEach((u, i) => {
        if(u.data.num_aggrement === this.selectedOP.data.union){
          u.data.num_membre++; 
          if(membre.genre === 'male'){
            u.data.num_hommes++;
          }else{
            u.data.num_femmes++;
          }
        this.servicePouchdb.updateDoc(u);
        }
      });*/

      let toast = this.toastCtl.create({
        message: 'Membre OP bien enregistré!',
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
