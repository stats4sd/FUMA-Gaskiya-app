import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, MenuController, Events, IonicPage } from 'ionic-angular';
import { Validators, FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { PouchdbProvider } from '../../../providers/pouchdb-provider';
import { global } from '../../../global-variables/variable'

/*
  Generated class for the ModifierEssai page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

@IonicPage()
@Component({
  selector: 'page-modifier-essai',
  templateUrl: 'modifier-essai.html'
})
export class ModifierEssaiPage {


  essai: any;
  grandEssai: any;
  selectedAnnee: any;
  ancienneAnnee: any;
  allEssai: any;
  annees: any = [];

  essaiForm: any;
  producteurs: any = [];
  selectedProducteur: any;
  ancienSelectedProducteur: any;
  nom_producteur: any;
  champs: any = [];
  selectedChamps: any;
  traitements: any = [];
  selectedTraitement: any;
  sites: any = [];
  selectedSite: any;
  site_producteur: any;
  sex_producteur: any;
  classe_producteur: any;
  villages: any = [];
  selectedVillage: any;
  village_producteur: any;
  ancientCode_essai: any;
  allEssais: any;
  superficie: any;
  type_sole: any;
  longitude: any;
  latitude: any;
  code_essai: any;
  id_ch: any;
  nom_champs: any;
  nom_entree: any;
   aProfile: boolean = true;
   superficie_tr: any;

  //annees: any = [];

  
  constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtl: MenuController, public events: Events, public toastCtl: ToastController, public servicePouchdb: PouchdbProvider, public formBuilder: FormBuilder) {
    
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

    this.grandEssai = this.navParams.data.essai;
    this.essai = this.grandEssai.data;
    this.nom_producteur = this.essai.nom_producteur;
    this.selectedProducteur = this.essai.matricule_producteur;
    this.ancienSelectedProducteur = this.essai.matricule_producteur;
    this.selectedChamps = this.essai.id_champs;
    this.selectedTraitement = this.essai.code_traitement;
    this.nom_entree = this.essai.nom_entree;
    this.site_producteur = this.essai.site_producteur;
    this.sex_producteur = this.essai.sex_producteur;
    this.classe_producteur = this.essai.classe_producteur;
    this.village_producteur = this.essai.village_producteur;
    this.superficie = this.essai.superficie;
    this.superficie_tr = this.essai.superficie_essai;
    this.type_sole = this.essai.type_sole;
    this.longitude = this.essai.longitude;
    this.latitude = this.essai.latitude;
    this.code_essai = this.essai.code_essai;
    this.ancientCode_essai = this.essai.code_essai;
    this.nom_champs = this.essai.nom_champs;
    //charger les producteurs
    let p: any = [];
    this.servicePouchdb.getPlageDocs('fuma:op:membre','fuma:op:membre:\uffff').then((mbrA) => {
      
        this.servicePouchdb.getPlageDocs('koboSubmission_fuma-op-membre','koboSubmission_fuma-op-membre\uffff').then((mbrK) => {
        this.producteurs = mbrA.concat(mbrK);
        //this.ServiceAutoCompletion.data = this.producteurs;
        //this.allMembres = this.membres
    }, err => console.log(err));

    }, err => console.log(err)); 

  
    let maDate = new Date();
    let today = this.createDate(maDate.getDate(), maDate.getMonth(), maDate.getFullYear());

    for(let i=0; i<=50; i++){
      this.annees.push(2000 + i)
    }
    this.annees.push('Tous');

    this.selectedAnnee = this.essai.annee_essai;//maDate.getFullYear();
    this. chargerTraitements(this.selectedAnnee)
    this.chargerChamps(this.selectedProducteur)

    this.essaiForm = this.formBuilder.group({
     // _id:[''],
      code_essai:[this.essai.code_essai, Validators.required],
      annee_essai: [this.essai.annee_essai, Validators.required],
      today: [this.essai.today],
      //id_site:['', , Validators.required],
      site_producteur:[this.essai.site_producteur, Validators.required],
      //id_village:['', , Validators.required],
      village_producteur:[this.essai.village_producteur, Validators.required], 
      matricule_producteur: [this.essai.matricule_producteur],
      nom_producteur: [this.essai.nom_producteur, Validators.required],
      sex_producteur: [this.essai.sex_producteur, Validators.required],
      //id_classe_producteur: [''],
      classe_producteur: [this.essai.classe_producteur],
      //id_traitement: [''],
      code_traitement: [this.essai.code_traitement],
      nom_entree: [this.essai.nom_entree],
      id_champs: [this.essai.id_champs, Validators.required],
      superficie: [this.essai.superficie, Validators.required],
      superficie_essai: [this.essai.superficie_essai, Validators.required],
      type_sole: [this.essai.type_sole, Validators.required],
      longitude:[this.essai.longitude],
      latitude: [this.essai.latitude],
      date_semis: [this.essai.date_semis],
      NPL: [this.essai.NPL],
      gestion: [this.essai.gestion],
      date_recolte: [this.essai.date_recolte],
      NPR: [this.essai.NPR],
      PDE: [this.essai.PDE],
      observation: [this.essai.observation],
      objectif_essai: [this.essai.objectif_essai],
      estValide: [this.essai.estValide],
      effort_personnel: [this.essai.effort_personnel],
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

    this.servicePouchdb.getPlageDocs('fuma:essai','fuma:essai:\uffff').then((e) => {
       if(e){
          this.allEssais = e;
       }
      }, err => console.log(err));      
  }

    chargerProducteur(selectedProducteur){
    //alert(ev.code_produit);

    this.chargerChamps(selectedProducteur);
    if(this.ancienSelectedProducteur !== selectedProducteur){
       this.code_essai = this.generateId(selectedProducteur);
    }else{
      this.code_essai = this.ancientCode_essai;
    }

    this.producteurs.forEach((prod, index) => {
      if(prod.data.matricule_Membre === selectedProducteur){
        //this.selectedProducteur = prod;
        //nom producteur
        this.nom_producteur = prod.data.nom_Membre;

        //sex producteur
        this.sex_producteur = prod.data.genre;
        
        //site
        if((prod.data.commune != 'AUTRE') && (!prod.data.commune_nom)){
          this.site_producteur = prod.data.commune
        }else if(prod.data.commune != 'AUTRE' && prod.data.commune_nom){
          this.site_producteur = prod.data.commune_nom;
        }else{
          this.site_producteur = prod.data.commune_autre;
        }

        //village
        if((prod.data.village != 'AUTRE') && (!prod.data.village_nom)){
          this.village_producteur = prod.data.village
        }else if(prod.data.village != 'AUTRE' && prod.data.village_nom){
          this.village_producteur = prod.data.village_nom;
        }else{
          this.village_producteur = prod.data.village_autre;
        }

        //classe
        if((prod.data.classe != 'AUTRE') && (!prod.data.classe_nom)){
          this.classe_producteur = prod.data.classe
        }else if(prod.data.classe != 'AUTRE' && prod.data.classe_nom){
          this.classe_producteur = prod.data.classe_nom;
        }else{
          this.classe_producteur = prod.data.classe_autre
        }
      }
    });
  }

    chargerChamps(matricule){
      let chmp: any = [];
      this.servicePouchdb.getPlageDocs('fuma:champs', 'fuma:champs:\uffff').then((c) => {
          if(c){
            c.forEach((ch, i) => {
              if(ch.data.matricule_producteur === matricule){
                chmp.push(ch);
              }
            });
            this.champs = chmp;
          }
        });
    }

    chargerTraitements(annee){
      let trm: any = [];
      this.servicePouchdb.getPlageDocs('fuma:traitement', 'fuma:traitement:\uffff').then((t) => {
          if(t){
            t.forEach((tr, i) => {
              if(tr.data.annee === annee){
                trm.push(tr);
              }
            })
            this.traitements = trm;
          }
        });
    }

    chargerInfoChamps(id){
      this.servicePouchdb.getPlageDocs('fuma:champs', 'fuma:champs:\uffff').then((c) => {
          if(c){
            c.forEach((champs, i) => {
              if(champs.data.id_champs === id){
                this.type_sole = champs.data.type_sole;
                this.superficie = champs.data.superficie;
                this.longitude = champs.data.longitude;
                this.latitude = champs.data.latitude;
                this.nom_champs = champs.data.nom;
              }
            });
          }
        });
    }
    chargerInfoTraitement(selectedTraitement){
      this.traitements.forEach((t, i) => {
        if(t.data.code_traitement === selectedTraitement){
          this.nom_entree = t.data.nom_entree;
          this.superficie = t.data.superficie
        }
      })
    }

    generateId(matricule){
    var chars='ABCDEFGHIJKLMNPQRSTUVWYZ'
    var numbers='0123456789'
    var randomArray=[]
    for(let i=0;i<3;i++){
      var rand = Math.floor(Math.random()*10)
      randomArray.push(numbers[rand])
    }
    //randomArray.push('-')
    //var rand = Math.floor(Math.random()*24)
    //randomArray.push(chars[rand])
    var randomString=randomArray.join("");
    var Id= matricule+' '+'ES-'+/*+pays+'-'+region+'-'+department+'-'+commune +'-' +village+ */+randomString 
    return Id;
  }

    modifier(){
      let date = new Date();
      let essai = this.essaiForm.value;
      //essai.code_traitement = this.selectedTraitement.data.code_traitement;
      //essai.nom_entree = this.nom_entree;
      //essai.id_champs = this.selectedChamps.data.id_champs;
      essai.nom_champs = this.nom_champs;
      essai.nom_entree = this.nom_entree;
      essai.nom_champs = this.nom_champs;
      //essai.matricule_producteur = this.selectedProducteur.data.matricule_Membre;
      
      //union._id = 'fuma'+ id;
      //essai.code_essai = id;
      //champs.id_champs = id;

      this.essai.code_essai = essai.code_essai;
      this.essai.annee_essai = essai.annee_essai;
      //today: [today],
      //id_site:['', , Validators.required],
      this.essai.site_producteur = essai.site_producteur;
      //id_village:['', , Validators.required],
      this.essai.village_producteur = essai.village_producteur; 
      this.essai.matricule_producteur = essai.matricule_producteur;
      this.essai.nom_producteur = essai.nom_producteur;
      this.essai.sex_producteur = essai.sex_producteur;
      //id_classe_producteur: [''],
      this.essai.classe_producteur = essai.classe_producteur;
      //id_traitement: [''],
      this.essai.code_traitement = essai.code_traitement;
      this.essai.nom_entree = essai.nom_entree;
      this.essai.id_champs = essai.id_champs;
      this.essai.superficie = essai.superficie;
      this.essai.superficie_essai = essai.superficie_essai;
      this.essai.type_sole = essai.type_sole;
      this.essai.longitude = essai.longitude;
      this.essai.latitude = essai.latitude;
      this.essai.date_semis = essai.date_semis;
      this.essai.NPL = essai.NPL;
      this.essai.gestion = essai.gestion;
      this.essai.date_recolte = essai.date_recolte;
      this.essai.NPR = essai.NPR;
      this.essai.PDE = essai.PDE;
      this.essai.observation = essai.observation;
      this.essai.objectif_essai = essai.objectif_essai;
      this.essai.estValide = essai.estValide;
      this.essai.effort_personnel = essai.effort_personnel;
     
      //let essaiFinal: any = {};
      this.grandEssai.data = this.essai
      this.servicePouchdb.createDoc(this.grandEssai);
      /*let toast = this.toastCtl.create({
        message: 'Essai bien enregistré!',
        position: 'top',
        duration: 2000,
        showCloseButton: true,
        closeButtonText: 'ok',
        dismissOnPageChange: true
      });*/

      this.navCtrl.pop();
      //toast.present();
      

   // }
    
  }

  annuler(){
    this.navCtrl.pop();
  }


}
