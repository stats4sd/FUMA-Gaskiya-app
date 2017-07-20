import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, IonicPage, ModalController, MenuController, Events } from 'ionic-angular';
import { Validators, FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { PouchdbProvider } from '../../../providers/pouchdb-provider';
import { Device } from '@ionic-native/device';
import { Sim } from '@ionic-native/sim';
import { global } from '../../../global-variables/variable'

/*
  Generated class for the AjouterOp page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

@IonicPage()
@Component({
  selector: 'page-ajouter-op',
  templateUrl: 'ajouter-op.html'
})
export class AjouterOpPage {

  opForm: any;
  confLocaliteEnquete: any = {};
  villages: any = [];
  unions: any = [];
  selectedVillage: any;
  selectedUnion: any;
  opApplication: any = [];
  opKobo: any = [];
  allOP: any;
  imei: any = '';
  phonenumber: any = '';
  autreVillage: any = {'id':'AUTRE', 'nom':'Autre'};
  autreUnion: any = {"data": {'num_aggrement':'AUTRE', 'nom_union':'Autre'}};
  nom_autre_village: any = '';
  nom_autre_union: any = '';
  num_aggrement_union: any;
  nom_union: any;
  nom_op: string = '';
  code_op: any = '';
  aProfile: boolean = true;
 
  constructor(public navCtrl: NavController, public modelCtl: ModalController, public navParams: NavParams, public menuCtl: MenuController, public events: Events, public sim: Sim, public device: Device, public toastCtl: ToastController, public servicePouchdb: PouchdbProvider, public formBuilder: FormBuilder, public storage: Storage) {
    
    this.menuCtl.enable(false, 'options');
    this.menuCtl.enable(false, 'connexion');
    this.menuCtl.enable(false, 'profile');
    
    events.subscribe('user:login', () => {
      this.servicePouchdb.remoteSaved.getSession((err, response) => {
        if (response.userCtx.name) {
          this.aProfile = true;
        }else{
          this.aProfile = false;
        }
      }, err => console.log(err));
    });
    
    this.confLocaliteEnquete = this.navParams.data.confLocaliteEnquete;
    if(this.navParams.data.num_aggrement_union){
      this.num_aggrement_union = this.navParams.data.num_aggrement_union;
      this.nom_union = this.navParams.data.nom_union;
      this.nom_autre_union= 'NA';
    }

    this.servicePouchdb.getPlageDocs('fuma:union','fuma:union:\uffff').then((uA) => {
         this.servicePouchdb.getPlageDocs('koboSubmission_fuma-union','koboSubmission_fuma-union\uffff').then((uK) => {
          this.unions = uA.concat(uK);
          //this.unions.push(this.autreUnion);
      }, err => console.log(err));

      }, err => console.log(err)); 

    let maDate = new Date();
    let today = this.createDate(maDate.getDate(), maDate.getMonth(), maDate.getFullYear());
    //this.storage.get('confLocaliteEnquete').then((confLocaliteEnquete) => {
    this.chargerVillages(this.confLocaliteEnquete.commune.id);
    //});

    this.opForm = this.formBuilder.group({
     // _id:[''],
      type:['op'],
      nom_OP: ['', Validators.required],
      code_OP: ['', Validators.required],
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
      union: ['', Validators.required],
      union_nom: [''],
      union_autre: ['NA', Validators.required],
      today: [today, Validators.required],
      deviceid: [''],
      imei: [''],
      phonenumber: [''],
      //num_OP: [0],
      num_membre: [0],
      num_hommes: [0],
      num_femmes: [0],
      start: [maDate.toJSON()],
      end: ['']
    });
    
  }

  option(){
    this.menuCtl.enable(true, 'options');
    this.menuCtl.enable(false, 'connexion');
    this.menuCtl.enable(false, 'profile');
    this.menuCtl.toggle()
  }

  profile(){
    this.menuCtl.enable(false, 'options');
    this.menuCtl.enable(false, 'connexion');
    this.menuCtl.enable(true, 'profile');
    this.menuCtl.toggle()
  }

  connexion(){
    this.menuCtl.enable(false, 'options');
    this.menuCtl.enable(true, 'connexion');
    this.menuCtl.enable(false, 'profile');
    this.menuCtl.toggle() 
  }

  sync(){
    this.servicePouchdb.syncAvecToast(this.ionViewDidEnter());
  }


  //fait la conbinaison de caractere de gauche vers la droite en variant la taille a la recherche d'un code disponible
  genererCodeOP(){
    
    let nom = this.nom_op;
     nom = nom.replace(' ' || '  ' || '    ' || '     ' || '      ' , '');
     let taille_nom = nom.length;
     let an = nom;
    //taille initiale: deux aractères
    let taille_code = 2;
    let code: string = '';
    this.code_op = code.toUpperCase()
    let p = 0;
    let last_position = 0;
    let trouve: boolean;

    if(taille_nom >= 2){
      while(taille_code <= taille_nom){
        last_position = taille_code - 1;
        trouve  = false;
        code = '';
        for(let i = 0; i < taille_code; i++){
          code += nom.charAt(i).toString() ;
        }

        do{
            code = code.substr(0, code.length - 1);
            code += nom.charAt(last_position).toString() ;
            p = 0;
            for(let pos=0; pos < this.allOP.length; pos++){
              let op = this.allOP[pos];
              if(op.data.code_OP === code.toUpperCase()){
                trouve = true;
                break ;
              }else{
                trouve = false;
              }
            }
            
            last_position++;

          }while(trouve && last_position < taille_nom);
          //
          if(last_position === taille_nom && trouve){
            //non disponible, augmenter la taille du code
            taille_code++;
        
            //au cas ou on teste toutes les combinaisons, sant trouver de combinaison disponible, on ajoute des chiffre
            if(taille_code > taille_nom){
              //non disponible, augmenter la taille et utiliser des chiffres
              taille_code = 3;
              nom = an + '123456789'.toString();
              taille_nom = nom.length;
            }
          }else{
              this.code_op = code.toUpperCase();
              break;
            
          }
      }
      
    }
    
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

  this.servicePouchdb.remoteSaved.getSession((err, response) => {
        if (response.userCtx.name) {
          this.aProfile = true;
        }else{
          this.aProfile = false;
        }
    }, err => {
      if(global.info_user != null){
        this.aProfile = true;
      }else{
        this.aProfile = false;
      }
      //console.log(err)
    }); 
        
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

    this.servicePouchdb.getPlageDocs('fuma:op','fuma:op:\uffff').then((opsA) => {
         this.servicePouchdb.getPlageDocs('koboSubmission_fuma-op','koboSubmission_fuma-op\uffff').then((opsK) => {
          this.allOP = opsA.concat(opsK);
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
      let model = this.modelCtl.create('AjouterVillagePage', {'id_commune':this.confLocaliteEnquete.commune.id, 'nom_commune': this.confLocaliteEnquete.commune.nom});
      model.present();
      model.onDidDismiss(() => {
        this.chargerVillages(this.confLocaliteEnquete.commune.id);
        this.selectedVillage = '';
      })
      this.nom_autre_village = '';
    }
  }

  chargerUnion(){
    this.servicePouchdb.getPlageDocs('fuma:union','fuma:union:\uffff').then((uA) => {
         this.servicePouchdb.getPlageDocs('koboSubmission_fuma-union','koboSubmission_fuma-union\uffff').then((uK) => {
          this.unions = uA.concat(uK);
          //this.unions.push(this.autreUnion);
      }, err => console.log(err));

      }, err => console.log(err)); 
  }

  chargerAutreNomUnion(u){
    if(u !== 'AUTRE'){
      this.nom_autre_union = 'NA';
    }else{
      let model = this.modelCtl.create('AjouterUnionPage', {'confLocaliteEnquete': this.confLocaliteEnquete});
        model.present();
        model.onDidDismiss(() => {
          this.chargerUnion();
          this.selectedUnion = '';
      })
      this.nom_autre_union = '';
    }
  }


  verifierUniqueNon(op){
    let res = 1;
    this.allOP.forEach((o, index) => {
      if(/*(op.nom_OP === o.data.nom_OP) ||*/ (op.num_aggrement === o.data.num_aggrement)){
        res = 0;
      }
    });
    return res;
  }

   ajouter(){
    let date = new Date();
    let op = this.opForm.value;

    if(this.verifierUniqueNon(op) === 0){
      alert('Le nom de l\'OP et le numéro de la reférence doivent être uniques!');
    }else{
      op.village = this.selectedVillage.id;
      op.village_nom = this.selectedVillage.nom;
      if(!this.num_aggrement_union){
        op.union = this.selectedUnion.data.num_aggrement;
        op.union_nom = this.selectedUnion.data.nom_union;
      }

      op.deviceid = this.device.uuid;
      op.phonenumber = this.phonenumber;
      op.imei = this.imei;
      let id = this.servicePouchdb.generateId('op', op.pays, op.region, op.departement,op.commune, op.village);
      //union._id = 'fuma'+ id;
      op.end = date.toJSON();

      let opFinal: any = {};
      opFinal._id = 'fuma'+ id;
      opFinal.data = op
      this.servicePouchdb.createDoc(opFinal);
      /*if(this.selectedUnion.data.num_aggrement !== 'AUTRE'){
        this.selectedUnion.data.num_OP++;
        this.servicePouchdb.updateDoc(this.selectedUnion);
      }*/
      let toast = this.toastCtl.create({
        message: 'OP bien enregistré!',
        position: 'top',
        duration: 2000
      });
      this.navCtrl.pop();
      toast.present();
      

    }

  } 

  annuler(){
    this.navCtrl.pop();
  }

}
