import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, AlertController, ToastController, MenuController, Events } from 'ionic-angular';
//import { ModifierEssaiPage } from '../modifier-essai/modifier-essai';
import { PouchdbProvider } from '../../../providers/pouchdb-provider';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { global } from '../../../global-variables/variable';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';


/*
  Generated class for the DetailEssai page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

@IonicPage()
@Component({
  selector: 'page-detail-essai',
  templateUrl: 'detail-essai.html'
})
export class DetailEssaiPage {
 
   essai: any = {};
  essaiID: any;
  aProfile: boolean = true;

  essai1: any;
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
  selectedTraitementInfoComplet: any;
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
  modifierFrom: boolean = false;
  superficie_tr: any;
  NPR: any;
  NPL: any;
  mode_semis: any = ['sec', 'humide'];


   constructor(public servicePouchdb: PouchdbProvider, public formBuilder: FormBuilder, public menuCtl: MenuController, public events: Events, public toastCtl: ToastController, public navCtrl: NavController, public navParams: NavParams, public alertCtl: AlertController) {
    
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
    
    
    this.essai = this.navParams.data.essai;
    this.essaiID = this.essai._id;
  }

  initForm(){
    this.grandEssai = this.navParams.data.essai;
    this.essai1 = this.grandEssai.data;
    this.nom_producteur = this.essai.nom_producteur;
    this.selectedProducteur = this.essai1.matricule_producteur;
    this.ancienSelectedProducteur = this.essai1.matricule_producteur;
    this.selectedChamps = this.essai1.id_champs;
    this.selectedTraitement = this.essai1.code_traitement;
    this.nom_entree = this.essai1.nom_entree;
    this.site_producteur = this.essai1.site_producteur;
    this.sex_producteur = this.essai1.sex_producteur;
    this.classe_producteur = this.essai1.classe_producteur;
    this.village_producteur = this.essai1.village_producteur;
    this.superficie = this.essai1.superficie;
    this.superficie_tr = this.essai1.superficie_essai;
    this.type_sole = this.essai1.type_sole;
    this.longitude = this.essai1.longitude;
    this.latitude = this.essai1.latitude;
    this.code_essai = this.essai1.code_essai;
    this.ancientCode_essai = this.essai1.code_essai;
    this.nom_champs = this.essai1.nom_champs;
    this.nom_producteur = this.essai1.nom_producteur;
    this.sex_producteur = this.essai1.sex_producteur;
    this.site_producteur = this.essai1.site_producteur;
    this.village_producteur = this.essai1.village_producteur;
    this.classe_producteur = this.essai1.classe_producteur;
    this.NPL = this.essai1.NPL;
    this.NPR = this.essai1.NPR;
      
    //charger les producteurs
    let p: any = [];
  
    let maDate = new Date();
    let today = this.createDate(maDate.getDate(), maDate.getMonth(), maDate.getFullYear());

    for(let i=0; i<=50; i++){
      this.annees.push(2000 + i)
    }
    this.annees.push('Tous');

    this.selectedAnnee = this.essai1.annee_essai;//maDate.getFullYear();

    this.essaiForm = this.formBuilder.group({
     // _id:[''],
      code_essai:[this.essai1.code_essai, Validators.required],
      annee_essai: [this.essai1.annee_essai, Validators.required],
      today: [this.essai1.today],
      //id_site:['', , Validators.required],
      site_producteur:[this.essai1.site_producteur, Validators.required],
      //id_village:['', , Validators.required],
      village_producteur:[this.essai1.village_producteur, Validators.required], 
      matricule_producteur: [this.essai1.matricule_producteur],
      nom_producteur: [this.essai1.nom_producteur, Validators.required],
      sex_producteur: [this.essai1.sex_producteur, Validators.required],
      //id_classe_producteur: [''],
      classe_producteur: [this.essai1.classe_producteur],
      //id_traitement: [''],
      code_traitement: [this.essai1.code_traitement],
      nom_entree: [this.essai1.nom_entree],
      id_champs: [this.essai1.id_champs, Validators.required],
      superficie: [this.essai1.superficie, Validators.required],
      superficie_essai: [this.essai1.superficie_essai, Validators.required],
      type_sole: [this.essai1.type_sole, Validators.required],
      longitude:[this.essai1.longitude],
      latitude: [this.essai1.latitude],
      date_semis: [this.essai1.date_semis],
      NPL: [this.essai1.NPL],
      gestion: [this.essai1.gestion],
      date_recolte: [this.essai1.date_recolte],
      NPR: [this.essai1.NPR],
      PDE: [this.essai1.PDE],
      mode_semis: [this.essai1.mode_semis],
      observation: [this.essai1.observation],
      objectif_essai: [this.essai1.objectif_essai],
      estValide: [this.essai1.estValide],
      effort_personnel: [this.essai1.effort_personnel],
    });

    this. chargerTraitements(this.selectedAnnee)
    //this.chargerChamps(this.selectedProducteur)
    
  }

  controlNPL(){
    if(this.selectedTraitementInfoComplet.max_NPL){
      let multiple: any = this.superficie_tr / this.selectedTraitementInfoComplet.superficie;
      let vMax: any = this.selectedTraitementInfoComplet.max_NPL * multiple;

      if(parseInt(this.NPL) > parseInt(vMax)){
        alert('Valeur du NPL invalide. Elle doit être inférieur ou égale à '+vMax+'');
        this.NPL = '';
      }
    }else{
      alert('Le contrôle du NPL n\'est pas défini!');
      this.NPL = '';
    }
    
  }

  controlNPR(){
    if(this.NPL && this.NPL !== ''){
      
      if( parseInt(this.NPR) > parseInt(this.NPL)){
        alert('Valeur du NPR invalide. Elle doit être inférieur ou égale à '+this.NPL);
        this.NPR = '';
      }else{
        let multiple: any = this.superficie_tr / this.selectedTraitementInfoComplet.superficie;
        let vMax: any = this.selectedTraitementInfoComplet.max_NPR * multiple;
        if(parseInt(this.NPR) > parseInt(vMax)){
          alert('Valeur du NPR invalide. Elle doit être inférieur ou égale à '+vMax);
          this.NPR = '';
        }
      }
    }else{
      alert('Vous devez d\'abord définir la valeur du NPL');
      this.NPR = '';
    }
  }

  getAllMemebre(){
     this.servicePouchdb.getPlageDocs('fuma:op:membre','fuma:op:membre:\uffff').then((mbrA) => {
        this.servicePouchdb.getPlageDocs('koboSubmission_fuma-op-membre','koboSubmission_fuma-op-membre\uffff').then((mbrK) => {
        this.producteurs = mbrA.concat(mbrK);
        //this.ServiceAutoCompletion.data = this.producteurs;
        //this.allMembres = this.membres
        this.chargerProducteur(this.selectedProducteur);
        this.chargerChamps(this.selectedProducteur)
     }, err => console.log(err));

    }, err => console.log(err)); 
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

  getAllEssai(){
      this.servicePouchdb.getPlageDocs('fuma:essai','fuma:essai:\uffff').then((e) => {
       if(e){
          this.allEssais = e;
       }
      }, err => console.log(err)); 
  }

  chargerInfoInitiale(prod){
    this.nom_producteur = prod.data.nom_producteur;
    //sex producteur
    this.sex_producteur = prod.data.sex_producteur;
    //site
    this.site_producteur = prod.data.site_producteur
    //village
    this.village_producteur = prod.data.village_producteur
    //classe
    this.classe_producteur = prod.data.classe_producteur
       
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
            if(this.selectedTraitement){
              this.chargerInfoTraitement(this.selectedTraitement, false);
            }
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
    chargerInfoTraitement(selectedTraitement, selected = true ){
      this.traitements.forEach((t, i) => {
        if(t.data.code_traitement === selectedTraitement){
          if(selected){
            this.nom_entree = t.data.nom_entree;
            this.superficie = t.data.superficie
          }
    
          this.selectedTraitementInfoComplet = t.data;
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

    modifierEssai(){
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

      this.essai1.code_essai = essai.code_essai;
      this.essai1.annee_essai = essai.annee_essai;
      //today: [today],
      //id_site:['', , Validators.required],
      this.essai1.site_producteur = essai.site_producteur;
      //id_village:['', , Validators.required],
      this.essai1.village_producteur = essai.village_producteur; 
      this.essai1.matricule_producteur = essai.matricule_producteur;
      this.essai1.nom_producteur = essai.nom_producteur;
      this.essai1.sex_producteur = essai.sex_producteur;
      //id_classe_producteur: [''],
      this.essai1.classe_producteur = essai.classe_producteur;
      //id_traitement: [''],
      this.essai1.code_traitement = essai.code_traitement;
      this.essai1.nom_entree = essai.nom_entree;
      this.essai1.id_champs = essai.id_champs;
      this.essai1.superficie = essai.superficie;
      this.essai1.superficie_essai = essai.superficie_essai;
      this.essai1.type_sole = essai.type_sole;
      this.essai1.longitude = essai.longitude;
      this.essai1.latitude = essai.latitude;
      this.essai1.date_semis = essai.date_semis;
      this.essai1.NPL = essai.NPL;
      this.essai1.gestion = essai.gestion;
      this.essai1.date_recolte = essai.date_recolte;
      this.essai1.NPR = essai.NPR;
      this.essai1.PDE = essai.PDE;
      this.essai1.observation = essai.observation;
      this.essai1.objectif_essai = essai.objectif_essai;
      this.essai1.estValide = essai.estValide;
      this.essai1.effort_personnel = essai.effort_personnel;
      this.essai1.mode_semis = essai.mode_semis;
     
      //let essaiFinal: any = {};
      this.grandEssai.data = this.essai1
      this.servicePouchdb.createDocReturn(this.grandEssai).then((res) => {
        this.grandEssai._rev = res.rev;
        this.essai = this.grandEssai;
        this.modifierFrom = false;

      let toast = this.toastCtl.create({
        message: 'Essai bien enregistré!',
        position: 'top',
        duration: 1000,
        showCloseButton: true,
        closeButtonText: 'ok',
        dismissOnPageChange: true
      });

      //this.navCtrl.pop();
      toast.present();
      }) ;
      /*let toast = this.toastCtl.create({
        message: 'Essai bien enregistré!',
        position: 'top',
        duration: 2000,
        showCloseButton: true,
        closeButtonText: 'ok',
        dismissOnPageChange: true
      });*/

      //this.navCtrl.pop();
      //toast.present();
      

   // }
    
  }

  annuler(){
    //this.navCtrl.pop();
    this.modifierFrom = false;
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

    //console.log('ionViewDidLoad DetailUnionPage');
    /*this.servicePouchdb.getDocById(this.essaiID).then((e) => {
      this.essai = e;
    }, err => console.log(err))*/

    this.initForm();
    this.getAllEssai();
    this.getAllMemebre();
  }

  editer(essai){
    //this.navCtrl.push('ModifierEssaiPage', {'essai': essai});
    this.modifierFrom = true;
  }

  supprimer(essai){
    let alert = this.alertCtl.create({
      title: 'Suppression Essai',
      message: 'Etes vous sûr de vouloir supprimer cet essai ?',
      buttons:[
        {
          text: 'Non',
          handler: () => console.log('suppression annulée')
 
        },
        {
          text: 'Oui',
          handler: () => {
            this.servicePouchdb.deleteDoc(essai);
            let toast = this.toastCtl.create({
              message:'Essai bien supprié',
              position: 'top',
              duration: 3000
            });

            toast.present();
            this.navCtrl.pop();
          }
        }
      ]
    });

    alert.present();
  }

}
