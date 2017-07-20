import { Component } from '@angular/core';
import { NavController,IonicPage, NavParams, ToastController, ModalController, MenuController, Events } from 'ionic-angular';
import { Validators, FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { PouchdbProvider } from '../../../providers/pouchdb-provider';
import { global } from '../../../global-variables/variable'


/*
  Generated class for the ModifierUnion page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()
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
  code_union: string = '';
  nom_union: string = '';
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
    
    
    this.grandeUnion = this.navParams.data.union;
    this.union = this.grandeUnion.data;
    this.selectedVillageID = this.union.village;
    this.selectedPaysID = this.union.pays;
    this.selectedRegionID = this.union.region;
    this.selectedDepartementID = this.union.departement;
    this.selectedCommuneID = this.union.commune;
    this.nom_union = this.union.nom_union;
    this.code_union = this.union.code_union;

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
      code_union: [this.union.code_union, Validators.required],
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
     this.servicePouchdb.getPlageDocs('fuma:union','fuma:union:\uffff').then((unionsA) => {
        /*if(unionsA){
          this.unionsApplication = unionsA;
          //this.allUnions = unions;
        }*/
         this.servicePouchdb.getPlageDocs('koboSubmission_fuma-union','koboSubmission_fuma-union\uffff').then((unionsK) => {
          this.allUnions = unionsA.concat(unionsK);
          //this.genererCodeUnion();
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
       let model = this.modelCtl.create('AjouterVillagePage', {'id_commune':this.union.commune, 'nom_commune': this.union.commune_nom});
      model.present();
      model.onDidDismiss(() => {
        this.chargerVillages(this.union.commune);
        this.selectedVillageID = '';
      })
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

  //fait la conbinaison de caractere de gauche vers la droite en variant la taille a la recherche d'un code disponible
  genererCodeUnion(){
    let taille_nom = this.nom_union.length;
    let nom = this.nom_union;
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
            for(let pos=0; pos < this.allUnions.length; pos++){
              let u = this.allUnions[pos];
              if(u.data.code_union === code.toUpperCase()){
                //alert('trouve '+code.toUpperCase())
                trouve = true;
                //alert('trouver '+trouve)
                break ;
              }else{
                //alert('non trouve '+code.toUpperCase())
                trouve = false;
              }
            }
            /*this.allUnions.forEach((u, i) => {
              p++;
              if(u.data.code_union === code.toUpperCase()){
                //alert('trouve '+code.toUpperCase())
                trouve = true;
                //alert('trouver '+trouve)
                return ;
              }else{
                //alert('non trouve '+code.toUpperCase())
                trouve = false;
              } 
            });*/
            
            //avancer sur la lettre suivante
            //if(p === this.allUnions.length){
              //last_position = 
            //}else{
              last_position++;
            //}
            

          }while(trouve && last_position < taille_nom);
          //
          if(last_position === taille_nom && trouve){
            //non disponible, augmenter la taille du code
            taille_code++;
            //alert('ici')
            //au cas ou on teste toutes les combinaisons, sant trouver de combinaison disponible, on ajoute des chiffre
            if(taille_code > taille_nom){
              //non disponible, augmenter la taille et utiliser des chiffres
              taille_code = 3;
              nom = this.nom_union.toString() + '123456789'.toString();
              taille_nom = nom.length;
            }
          }else{
              //trouvé
              this.code_union = code.toUpperCase();
              break;
            
          }
      }
      
    }
    
  }


  modifier(){
      //  let date = new Date();
    let union = this.unionForm.value;

    this.union.nom_union = union.nom_union;
    this.union.code_union = union.code_union;
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
