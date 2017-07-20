import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, ModalController, IonicPage, MenuController, Events } from 'ionic-angular';
import { Validators, FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { PouchdbProvider } from '../../../providers/pouchdb-provider';
import { global } from '../../../global-variables/variable'

/*
  Generated class for the ModifierOp page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()
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
  nom_op: string = '';
  code_op: any = '';
  aProfile: boolean = true;

  constructor(public navCtrl: NavController, public modelCtl: ModalController, public navParams: NavParams, public menuCtl: MenuController, public events: Events, public toastCtl: ToastController, public servicePouchdb: PouchdbProvider, public formBuilder: FormBuilder, public storage: Storage) {
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
    

     this.grandeOP = this.navParams.data.op;

     this.servicePouchdb.getPlageDocs('fuma:union','fuma:union:\uffff').then((uA) => {
         this.servicePouchdb.getPlageDocs('koboSubmission_fuma-union','koboSubmission_fuma-union\uffff').then((uK) => {
          this.unions = uA.concat(uK);
          //this.unions.push(this.autreUnion);
      }, err => console.log(err));

      }, err => console.log(err));


    this.op = this.grandeOP.data;
    this.selectedVillageID = this.op.village;
    this.selectedUnionID = this.op.union;
    this.ancienSelectedUnionID = this.op.union;
    this.nom_op = this.op.nom_OP;
    this.code_op = this.op.code_OP

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
      code_OP: [this.op.code_OP, Validators.required],
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

    this.storage.get('confLocaliteEnquete').then((confLocaliteEnquete) => {
      if(confLocaliteEnquete){
        this.confLocaliteEnquete = confLocaliteEnquete;
      }
      //this.chargerVillages(this.confLocaliteEnquete.commune.id);
    });


     this.servicePouchdb.getPlageDocs('fuma:op','fuma:op:\uffff').then((opA) => {
        /*if(unionsA){
          this.unionsApplication = unionsA;
          //this.allUnions = unions;
        }*/
         this.servicePouchdb.getPlageDocs('koboSubmission_fuma-op','koboSubmission_fuma-op\uffff').then((opK) => {
          this.allOP = opA.concat(opK);
          //this.genererCodeOP();
          //this.allUnions = this.unions

       /* if(unionsK){
          this.unionsKobo = unionsK;
          
        }*/
      }, err => console.log(err));

      }, err => console.log(err)); 
  }

  //fait la conbinaison de caractere de gauche vers la droite en variant la taille a la recherche d'un code disponible
  genererCodeOP(){
    let taille_nom = this.nom_op.length;
    let nom = this.nom_op;
    //taille initiale: deux aractères
    let taille_code = 2;
    let code: string = '';
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
              nom = this.nom_op.toString() + '123456789'.toString();
              taille_nom = nom.length;
            }
          }else{
              this.code_op = code.toUpperCase();
              break;
            
          }
      }
      
    }
    
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
       let model = this.modelCtl.create('AjouterVillagePage', {'id_commune':this.op.commune, 'nom_commune': this.op.commune_nom});
      model.present();
      model.onDidDismiss(() => {
        this.chargerVillages(this.op.commune);
        this.selectedVillageID = '';
      })
      this.nom_autre_village = '';
    }
  }

  chargerUnion(){
    this.servicePouchdb.getPlageDocs('fuma:union','fuma:union:\uffff').then((uA) => {
         this.servicePouchdb.getPlageDocs('koboSubmission_fuma-union','koboSubmission_fuma-union\uffff').then((uK) => {
          this.unions = uA.concat(uK);
          this.unions.push(this.autreUnion);
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
          this.selectedUnionID = '';
      })
      this.nom_autre_union = '';
    }
  }

   verifierUniqueNon(op){
    let res = 1;
    this.allOP.forEach((o, index) => {
      if((o._id !== this.grandeOP._id) && (/*(op.nom_OP === o.data.nom_OP) || */(op.num_aggrement === o.data.num_aggrement))){
        res = 0;
      }
    });
    return res;
  }


  modifier(){
      //  let date = new Date();
    let op = this.opForm.value;

    this.op.nom_OP = op.nom_OP;
    this.op.code_OP = op.code_OP;
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
      
      /*if(this.ancienSelectedUnionID !== this.selectedUnionID){
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
      }*/

      let toast = this.toastCtl.create({
        message: 'OP bien sauvegardée!',
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
