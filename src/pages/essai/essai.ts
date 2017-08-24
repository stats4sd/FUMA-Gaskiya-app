import { Component, NgZone } from '@angular/core';
import { NavController, IonicApp, ToastController, NavParams, LoadingController, ViewController, App, AlertController, Platform, ModalController, IonicPage, MenuController, Events  } from 'ionic-angular';
import { PouchdbProvider } from '../../providers/pouchdb-provider';
//import { AjouterEssaiPage } from './ajouter-essai/ajouter-essai';
//import { DetailEssaiPage } from './detail-essai/detail-essai';
import { Storage } from '@ionic/storage'; 
import { File } from '@ionic-native/file';
import { global } from '../../global-variables/variable';
import * as FileSaver from 'file-saver';
import { Printer, PrintOptions } from '@ionic-native/printer';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AutoCompletion } from '../../providers/auto-completion';
import { Device } from '@ionic-native/device';
import { Sim } from '@ionic-native/sim';
declare var cordova: any;
//import { FileService } from '../../providers/file.service'
//declare var cordova: any;

/*
  Generated class for the Essai page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

@IonicPage()
@Component({
  selector: 'page-essai',
  templateUrl: 'essai.html'
})
export class EssaiPage {

  essai: any;
  detailEssai: boolean = false;
  allTraitements: any = [];
  essais: any = [];
  essais1: any = [];
  allEssais: any = [];
  annee: any = '';
  selectedAnnee: any;
  ancien_selectedAnnee: any;
  matricule_producteur: any;
  matricule_producteur1: any;
  nom_producteur: any;
  storageDirectory: string = '';
  a_matricule: boolean = false;

  annees: any = [];
  selectedStyle: any = 'liste';
  aProfile: boolean = false;
  membre: any; 
  selectedLimit: any = 10;
  limits: any = [10, 25, 50, 100, 500, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 'Tous'];
  mode_semis: any = ['sec', 'humide'];
  mode_semi: any = '';
  typeRecherche: any = 'matricule'
  //champs: any = [];
  //traitements: any = [];


  essai1: any;
  grandEssai: any;
  essaiForm: any;
  producteurs: any = [];
  selectedProducteur: any;
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
  imei: any = '';
  phonenumber: any = '';
  superficie: any;
  type_sole: any;
  longitude: any;
  latitude: any;
  code_essai: any;
  //nom_producteur: any;
  superficie_tr: any;
  ajoutForm: boolean = false;
  //modifierEssai: boolean = false;
  verifieT: boolean = false;
  NPR: any;
  NPR_controle: any;
  NPL: any;
  NPL_controle: any;
  ancien_NPR: any;
  ancien_NPR_controle: any;
  ancien_NPL: any;
  ancien_NPL_controle: any;
  ancien_PDE: any;
  ancien_PDE_controle: any;
  selectedTraitementInfoComplet: any;
  id_traitement: any;

  ancienSelectedProducteur: any;
  id_ch: any;
  nom_champs: any;
  nom_entree: any;
  nom_controle: any;
  modifierFrom: boolean = false;
  ancientCode_essai: any;

  annee_essai: any;
  today: any;
  //id_traitement: [''],
  code_traitement: any;
  ancien_code_traitement: any;
  id_champs: any;
  superficie_essai: any;
  date_semis: any;
  gestion: any;
  date_recolte: any;
  PDE: any;
  PDE_controle: any;
  observation: any;
  objectif_essai: any;
  estValide: any;
  effort_personnel: any;
  essaiAModifier: any;
  estInstancier: boolean = false;
  a_champs: boolean = false;
  dateAjout:any;
  dateSemis: any;
  dateRecolte: any;


  constructor(public navCtrl: NavController, public loadtingCtl: LoadingController, public toastCtl: ToastController, public ionicApp: IonicApp, public viewCtl: ViewController, public formBuilder: FormBuilder, public ServiceAutoCompletion: AutoCompletion, public sim: Sim, public device: Device, public modelCtl: ModalController, public a: App, public events: Events, public zone: NgZone, public navParams: NavParams, public menuCtl: MenuController, public printer: Printer, public file: File, public platform: Platform, public storage: Storage, public servicePouchdb: PouchdbProvider, public alertCtl: AlertController) {
    this.menuCtl.enable(false, 'options');
    this.menuCtl.enable(false, 'connexion');
    this.menuCtl.enable(false, 'profile');
  
    //this.servicePouchdb.reset()
    //this.zone = new NgZone({enableLongStackTrace: true})
    events.subscribe('user:login', () => {
      this.servicePouchdb.remoteSaved.getSession((err, response) => {
        if (response.userCtx.name) {
          this.aProfile = true;
        }else{
          this.aProfile = false;
        }
      }, err => console.log(err));
    });

    /*events.subscribe('ajout-essai', (essai) => {
      this.zone.run(() => {
        this.essais.push(essai)
      })
    });*/
    
    if(this.navParams.data.matricule_producteur){
      this.matricule_producteur = this.navParams.data.matricule_producteur;
      this.matricule_producteur1 = this.navParams.data.matricule_producteur;
      this.nom_producteur = this.navParams.data.nom_producteur;
      this.membre = this.navParams.data.membre;

      //this.viewCtl.showBackButton(false);
      this.a_matricule = true;
      this.selectedLimit = 'Tous';
      
    }

     //générer des années de 2000 à 2050
    //this.storageDirectory = cordova.file.externalDataDirectory;
    for(let i=0; i<=50; i++){
      this.annees.push(2000 + i)
    } 
    this.annees.push('Tous');
 
    let date = new Date();
    this.selectedAnnee = date.getFullYear();
   // this.getEssais()
  }

 /* exportExcel() {
    //let blob = new Blob([],
    let table = document.getElementById('tableau').innerHTML;
    this.fileService.save(this.storageDirectory, "exportEssais.xls", "application/vnd.ms-excel", table);
  }*/

  fusionnerEssais(){
    let loading = this.loadtingCtl.create({
      content: 'Application des changeme,ts sur les essais en cours...'
    });
    loading.present();

    let tous_essais: any = [];
    let tous_essais2: any = [];
    //let tous_membres: any = [];
    let essais_membre: any = [];
    //let nb_essais_membres: any;
    //let nbm: any = 0;
    let essai1: any = {};
    let essai2: any = {};
    this.servicePouchdb.getPlageDocsRapide('fuma:op:membre', 'fuma:op:membre:\uffff').then((membres) => {
      if(membres){
        //tous_membres = membres;
        //this.servicePouchdb.getPlageDocsRapide('fuma:essai', 'fuma:essai:\uffff').then((essais) => {
        //  if(essais){
          //  tous_essais = essais;
            //tous_essais2 = essais;
            //alert('nbm l '+membres.length)
            //alert('nbe l '+essais.length)
            membres.map((membre) => {
              essais_membre = [];
              //nb_essais_membres = 0;
              this.servicePouchdb.getPlageDocsRapide('fuma:essai:'+membre.doc.data.matricule_Membre, 'fuma:essai:'+membre.doc.data.matricule_Membre+' \uffff').then((essais_mb) => {
                if(essais_mb){
                  essais_membre = essais_mb;

                  //if(essais_membre.length){
                  let nb_essais_membres: any = essais_membre.length;
                  //tous_essais = tous_essais2;
                  //}else{
                  //  nb_essais_membres = 0;
                  //}
                  
                  //if(nb_essais_membres > 1){
                    //alert('nb_essais_membres = '+nb_essais_membres)
                    while(nb_essais_membres > 1){
                      essai1 = essais_membre[0].doc;
                      //essai2 = '';
                      essais_membre.splice(0, 1);
                      nb_essais_membres--;
                      
                      if(essai1.data.nom_entree ===  'Boule NPK'){
                        for(let ii = 0; ii < essais_membre.length; ii++) {
                          //alert(essai1.data.nom_entree +' '+ essais_membre[ii].data.nom_entree)
                          if(essais_membre[ii].doc.data.nom_entree ===  'Semis ordinaire '){
                            //alert(essai1.data.nom_entree + '===> '+essais_membre[ii].data.nom_entree);
                            essai2 = essais_membre[ii].doc;
                            
                            essai1.data.NPL_controle = essai2.data.NPL;
                            essai1.data.NPR_controle = essai2.data.NPR;
                            essai1.data.PDE_controle = essai2.data.PDE;

                            this.servicePouchdb.updateDoc(essai1);
                            this.servicePouchdb.deleteDoc(essai2)
                            essais_membre.splice(ii, 1);
                            nb_essais_membres--;

                            //essai2 = '';

                            //ii = essais_membre.length;
                            break;
                          }
                        }

                      }else if(essai1.data.nom_entree ===  'Boule cendre'){
                        for(let ii = 0; ii < essais_membre.length; ii++) {
                          if(essais_membre[ii].doc.data.nom_entree ===  'Semis ordinaire '){
                           // alert(essai1.data.nom_entree + '===> '+essais_membre[ii].data.nom_entree)
                            essai2 = essais_membre[ii].doc;
                          
                            essai1.data.NPL_controle = essai2.data.NPL;
                            essai1.data.NPR_controle = essai2.data.NPR;
                            essai1.data.PDE_controle = essai2.data.PDE;

                            this.servicePouchdb.updateDoc(essai1);
                            this.servicePouchdb.deleteDoc(essai2);

                            essais_membre.splice(ii, 1);
                            nb_essais_membres--;

                            //essai2 = '';

                            //ii = essais_membre.length;
                            break;
                          }
                        }

                      
                      }else if(essai1.data.nom_entree ===  'Semis ordinaire '){
                        for(let ii = 0; ii < essais_membre.length; ii++) {
                          if(essais_membre[ii].doc.data.nom_entree ===  'Boule cendre' || essais_membre[ii].doc.data.nom_entree ===  'Boule NPK'){
                            essai2 = essais_membre[ii].doc;
                            //alert(essai1.data.nom_entree + '===> '+essais_membre[ii].data.nom_entree)
                            
                            essai2.data.NPL_controle = essai1.data.NPL;
                            essai2.data.NPR_controle = essai1.data.NPR;
                            essai2.data.PDE_controle = essai1.data.PDE;

                            this.servicePouchdb.updateDoc(essai2);
                            this.servicePouchdb.deleteDoc(essai1)
                            essais_membre.splice(ii, 1);
                            nb_essais_membres--;


                            //ii = essais_membre.length;
                            break;
                          }
                        }
                      }else if(essai1.data.nom_entree ===  'OGA'){
                        for(let ii = 0; ii < essais_membre.length; ii++) {
                          if(essais_membre[ii].doc.data.nom_entree ===  'SANS OGA'){
                            essai2 = essais_membre[ii].doc;
                            //alert(essai1.data.nom_entree + '===> '+essais_membre[ii].data.nom_entree)
                            
                            essai1.data.NPL_controle = essai2.data.NPL;
                            essai1.data.NPR_controle = essai2.data.NPR;
                            essai1.data.PDE_controle = essai2.data.PDE;

                            this.servicePouchdb.updateDoc(essai1);
                            this.servicePouchdb.deleteDoc(essai2);

                            essais_membre.splice(ii, 1);
                            nb_essais_membres--;


                            //ii = essais_membre.length;
                            break;
                          }
                        }                  
                      }else if(essai1.data.nom_entree ===  'SANS OGA'){
                        for(let ii = 0; ii < essais_membre.length; ii++) {
                          if(essais_membre[ii].doc.data.nom_entree ===  'OGA'){
                            essai2 = essais_membre[ii].doc;
                            //alert(essai1.data.nom_entree + '===> '+essais_membre[ii].data.nom_entree)
                            essai2.data.NPL_controle = essai1.data.NPL;
                            essai2.data.NPR_controle = essai1.data.NPR;
                            essai2.data.PDE_controle = essai1.data.PDE;

                            this.servicePouchdb.updateDoc(essai2);
                            this.servicePouchdb.deleteDoc(essai1);

                            essais_membre.splice(ii, 1);
                            nb_essais_membres--;

                            //ii = essais_membre.length;
                            break;
                          }
                        }
                      }
                    }
                    }
              });

              
             /* tous_essais.forEach((e, i) => {
                if(e.doc.data.matricule_producteur === membre.doc.data.matricule_Membre){
                  essais_membre.push(e.doc);
                  tous_essais2.splice(i, 1);
                }
              });*/
             

                
             // }
            // nbm++;
            });


            loading.dismissAll();

            //alert('nbm '+nbm)

             let toast = this.toastCtl.create({
                message: 'Changement bien appliqué!',
                position: 'top',
                duration: 3000
              });

              toast.present();
         // }
      //  });
      }
    });
  }

  setDate(ev: any){
    let d = new Date(ev)
    this.today = this.createDate(d.getDate(), d.getMonth(), d.getFullYear());
    //alert(ev +' -> d = '+d +' -> dd = '+dd);
    this.dateAjout = ev;
  }

  autreActionDate(ev: any){
    let d = new Date(ev)
    this.today = this.createDate(d.getDate(), d.getMonth(), d.getFullYear());
    //alert(ev +' -> d = '+d +' -> dd = '+dd);
    this.dateAjout = ev;
    
  }

  setDateSemis(ev: any){
    let d = new Date(ev)
    this.date_semis = this.createDate(d.getDate(), d.getMonth(), d.getFullYear());
    //alert(ev +' -> d = '+d +' -> dd = '+dd);
    this.dateSemis = ev;
    if(this.ajoutForm){
      this.dateRecolte = ev;
    }

    if(this.modifierFrom){
      if(this.date_recolte){
        let dd = new Date(this.date_recolte);
        if(d < dd){
          this.date_recolte = '';
          this.dateRecolte = ev;
        }
      }else{
        this.dateRecolte = ev;
      }
    }

  }

  autreActionSemis(){
    if(this.date_semis || this.date_semis !== ''){
      let alert = this.alertCtl.create({
        title: 'Autres actions',
        message: 'Voulez vous réinitialiser la date de sémis ? <br> Ce-ci réinitialisera la date de recolte aussi!',
        buttons: [
          {
            text: 'Oui',
            handler: () => {
              this.date_semis = '';
              this.dateSemis = new Date();
              this.dateRecolte = this.dateSemis;
              this.date_recolte = '';
            }
          },
           {
            text: 'Non',
            handler: () => console.log('non')
          }
        ]
      });

      alert.present();
    }
  }

  setDateRecolte(ev: any){
    let d = new Date(ev)
    this.date_recolte = this.createDate(d.getDate(), d.getMonth(), d.getFullYear());
    //alert(ev +' -> d = '+d +' -> dd = '+dd);
    this.dateRecolte = ev;

  }
  
  autreActionRecolte(){
    if(this.date_semis || this.date_semis !== ''){
      let alert = this.alertCtl.create({
        title: 'Autres actions',
        message: 'Voulez vous réinitialiser la date de recolte ?',
        buttons: [
          {
            text: 'Oui',
            handler: () => {
              this.dateRecolte = this.dateSemis;
              this.date_recolte = '';
            }
          },
           {
            text: 'Non',
            handler: () => console.log('non')
          }
        ]
      });

      alert.present();
    }

  }

  dismiss(){
    this.viewCtl.dismiss(this.essais);
    this.a_matricule = false;
  }
  closeToast(){
   let toast = this.ionicApp._toastPortal.getActive();
    toast.dismiss();
  }

  initForm(){
    let maDate = new Date();
    this.dateAjout = maDate;
     let today = this.createDate(maDate.getDate(), maDate.getMonth(), maDate.getFullYear());
     this.essaiForm = this.formBuilder.group({
     // _id:[''],
      type:['essai'],
      code_essai:['', Validators.required],
      annee_essai: [maDate.getFullYear(), Validators.required],
      //today: [today],
      //id_site:['', , Validators.required],
      site_producteur:['', Validators.required],
      //id_village:['', , Validators.required],
      village_producteur:['', Validators.required], 
      matricule_producteur: [''],
      nom_producteur: ['', Validators.required],
      sex_producteur: ['', Validators.required],
      //id_classe_producteur: [''],
      classe_producteur: [''],
      //id_traitement: [''],
      code_traitement: [''],
      nom_entree: ['', Validators.required],
      nom_controle: ['', Validators.required],
      id_champs: ['', Validators.required],
      superficie: ['', Validators.required],
      superficie_essai: ['', Validators.required],
      type_sole: ['', Validators.required],
      longitude:[''],
      latitude: [''],
      date_semis: [''],
      NPL: [''],
      NPL_controle: [''],
      gestion: [''],
      mode_semis: [''],
      date_recolte: [''],
      NPR: [''],
      NPR_controle: [''],
      PDE: [''],
      PDE_controle: [''],
      observation: [''],
      objectif_essai: [''],
      effort_personnel: [false],
      estValide: [true],
      today: [today, Validators.required],
      deviceid: [''],
      imei: [''],
      phonenumber: [''],
      start: [maDate.toJSON()],
      end: ['']
    });
    
  }

   pourCreerForm(){

      if(this.navParams.data.matricule_producteur){
        //this.matricule_producteur = this.navParams.data.matricule_producteur;
        //this.nom_producteur = this. navParams.data.nom_producteur;
        //this.membre = this.navParams.data.membre;
        //this.annee = this.navParams.data.annee;
        this.producteurSelected(this.matricule_producteur1, this.nom_producteur)
        //this.chargerChamps(essai.data.matricule_producteur, essai.data.nom_producteur);
      }else{
      //charger les producteurs
      let p: any = [];
      this.servicePouchdb.getPlageDocsRapide('fuma:op:membre','fuma:op:membre:\uffff').then((mbrA) => {
        
          this.servicePouchdb.getPlageDocsRapide('koboSubmission_fuma-op-membre','koboSubmission_fuma-op-membre\uffff').then((mbrK) => {
          this.producteurs = mbrA.concat(mbrK);

          this.producteurs.forEach((prod, index) => {
            p.push(prod.doc.data); 
          });

          this.ServiceAutoCompletion.data = p;

      }, err => console.log(err));

      }, err => console.log(err)); 
    }
    
      //let maDate = new Date();
      //let today = this.createDate(maDate.getDate(), maDate.getMonth(), maDate.getFullYear());

      /*for(let i=0; i<=50; i++){
        this.annees.push(2000 + i)
      }
      this.annees.push('Tous');

      this.selectedAnnee = maDate.getFullYear();*/
      this.chargerTraitements(this.selectedAnnee)
  }

  getInfoSimEmei(){
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
/*
      this.servicePouchdb.getPlageDocs('fuma:essai','fuma:essai:\uffff').then((e) => {
        if(e){
            this.allEssais = e;
        }
        }, err => console.log(err)); */

  }


  chargerT(t){
    if(t.data){
      if(t.data.superficie){
        this.superficie_tr = t.data.superficie;
      }else{
        this.superficie_tr = '';
      }
      
      if(t.data.nom_controle){
        this.nom_controle = t.data.nom_controle;
      }else{
        this.nom_controle = '';
      }

      this.id_traitement = t._id;
      this.selectedTraitementInfoComplet = t.data;
    }
    
  }



  dechargerT(){
    if(this.matricule_producteur1){
      this.code_essai = this.generateId(this.matricule_producteur1);
    }else{
      this.code_essai = '';
    }
     
     this.selectedTraitement = {};
     this.superficie_tr = '';
     this.nom_controle = '';
     this.selectedTraitementInfoComplet = '';
     //this.date_semis = '';
     this.NPL = '';
     this.NPL_controle = '';
     //this.gestion = '';
     //this.mode_semi = '';
     //this.date_recolte = '';
     this.NPR = '';
     this.NPR_controle = '';
     this.PDE = '';
     this.PDE_controle = '';
     this.objectif_essai = '';
     this.effort_personnel = false;
     this.estValide = true;
     this.observation = '';

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

  itemSelected(ev: any){
    //alert(ev.code_produit);
    if(ev.matricule_Membre && ev.matricule_Membre != ''){
      this.matricule_producteur = ev.matricule_Membre;
      this.chargerChamps(ev.matricule_Membre, ev.nom_Membre);
      this.code_essai = this.generateId(ev.matricule_Membre);

      this.producteurs.forEach((prod, index) => {
        prod = prod.doc;
        if(prod.data.matricule_Membre === ev.matricule_Membre){
          this.selectedProducteur = prod;
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

  }

  reinitForm(){
    this.matricule_producteur = null;
    //this.chargerChamps('');
    this.champs = [];
    this.code_essai = '';
    
    this.selectedProducteur = null;
    this.selectedChamps = null;
    //nom producteur
    this.nom_producteur = '';

    //sex producteur
    this.sex_producteur = '';
    
    //site
    
      this.site_producteur = '';
    

    //village
    
      this.village_producteur = '';
    
      this.classe_producteur = '';
  }

   producteurSelectedProdConnu(matricule){
    
    this.code_essai = this.generateId(matricule);

    
        this.selectedProducteur = this.membre;
        //nom producteur
        this.nom_producteur = this.membre.data.nom_Membre;

        //sex producteur
        this.sex_producteur = this.membre.data.genre;
        
        //site
        if((this.membre.data.commune != 'AUTRE') && (!this.membre.data.commune_nom)){
          this.site_producteur = this.membre.data.commune
        }else if(this.membre.data.commune != 'AUTRE' && this.membre.data.commune_nom){
          this.site_producteur = this.membre.data.commune_nom;
        }else{
          this.site_producteur = this.membre.data.commune_autre;
        }

        //village
        if((this.membre.data.village != 'AUTRE') && (!this.membre.data.village_nom)){
          this.village_producteur = this.membre.data.village
        }else if(this.membre.data.village != 'AUTRE' && this.membre.data.village_nom){
          this.village_producteur = this.membre.data.village_nom;
        }else{
          this.village_producteur = this.membre.data.village_autre;
        }

        //classe
        if((this.membre.data.classe != 'AUTRE') && (!this.membre.data.classe_nom)){
          this.classe_producteur = this.membre.data.classe
        }else if(this.membre.data.classe != 'AUTRE' && this.membre.data.classe_nom){
          this.classe_producteur = this.membre.data.classe_nom;
        }else{
          this.classe_producteur = this.membre.data.classe_autre
        }
  }

    producteurSelected(matricule, nom){
    //alert('ici');

    this.chargerChamps(matricule, nom);
    this.code_essai = this.generateId(matricule);

    
        this.selectedProducteur = this.membre;
        //nom producteur
        this.nom_producteur = this.membre.data.nom_Membre;

        //sex producteur
        this.sex_producteur = this.membre.data.genre;
        
        //site
        if((this.membre.data.commune != 'AUTRE') && (!this.membre.data.commune_nom)){
          this.site_producteur = this.membre.data.commune
        }else if(this.membre.data.commune != 'AUTRE' && this.membre.data.commune_nom){
          this.site_producteur = this.membre.data.commune_nom;
        }else{
          this.site_producteur = this.membre.data.commune_autre;
        }

        //village
        if((this.membre.data.village != 'AUTRE') && (!this.membre.data.village_nom)){
          this.village_producteur = this.membre.data.village
        }else if(this.membre.data.village != 'AUTRE' && this.membre.data.village_nom){
          this.village_producteur = this.membre.data.village_nom;
        }else{
          this.village_producteur = this.membre.data.village_autre;
        }

        //classe
        if((this.membre.data.classe != 'AUTRE') && (!this.membre.data.classe_nom)){
          this.classe_producteur = this.membre.data.classe
        }else if(this.membre.data.classe != 'AUTRE' && this.membre.data.classe_nom){
          this.classe_producteur = this.membre.data.classe_nom;
        }else{
          this.classe_producteur = this.membre.data.classe_autre
        }
  }

  producteurSelected1(matricule){
    //alert(ev.code_produit);

    //this.chargerChamps(matricule);
    this.code_essai = this.generateId(matricule);

    
        this.selectedProducteur = this.membre;
        //nom producteur
        this.nom_producteur = this.membre.data.nom_Membre;

        //sex producteur
        this.sex_producteur = this.membre.data.genre;
        
        //site
        if((this.membre.data.commune != 'AUTRE') && (!this.membre.data.commune_nom)){
          this.site_producteur = this.membre.data.commune
        }else if(this.membre.data.commune != 'AUTRE' && this.membre.data.commune_nom){
          this.site_producteur = this.membre.data.commune_nom;
        }else{
          this.site_producteur = this.membre.data.commune_autre;
        }

        //village
        if((this.membre.data.village != 'AUTRE') && (!this.membre.data.village_nom)){
          this.village_producteur = this.membre.data.village
        }else if(this.membre.data.village != 'AUTRE' && this.membre.data.village_nom){
          this.village_producteur = this.membre.data.village_nom;
        }else{
          this.village_producteur = this.membre.data.village_autre;
        }

        //classe
        if((this.membre.data.classe != 'AUTRE') && (!this.membre.data.classe_nom)){
          this.classe_producteur = this.membre.data.classe
        }else if(this.membre.data.classe != 'AUTRE' && this.membre.data.classe_nom){
          this.classe_producteur = this.membre.data.classe_nom;
        }else{
          this.classe_producteur = this.membre.data.classe_autre
        }
  }


    chargerChamps(matricule, nom){
      //let chmp: any = [];

      this.servicePouchdb.getPlageDocsRapide('fuma:champs:'+matricule, 'fuma:champs:'+matricule+' \uffff').then((c) => {
          if(c){
            this.champs = c;
            if(this.champs.length <= 0){
              this.a_champs = false;
              //alert('Avertissement: Ce producteur n\'a aucun champs!') 
              if(!this.matricule_producteur1){
                  let alert = this.alertCtl.create({
                  title: 'Avertissement!',
                  message: 'Ce producteur ('+matricule+') n\'a aucun champs.',
                  buttons: [
                    {
                      text: 'Définir champs',
                      handler:  () => {
                        let membre: any = {
                          data: {
                            nom_Membre: nom,
                            matricule_Membre: matricule
                          }
                        };
                      // membre.data.nom_Membre = nom;
                        //membre.data.matricule_Membre = matricule;
                        //this.navCtrl.push('ChampsPage', {'matricule_producteur': matricule, 'nom_producteur': nom, 'membre': membre}) ;
                        let model = this.modelCtl.create('ChampsPage', {'matricule_producteur': matricule, 'nom_producteur': nom, 'membre': membre}) ;
                        model.present();
                        model.onDidDismiss((ch) => {
                          if(ch && ch.length > 0){
                            this.champs = ch;
                            
                          }else{
                            //this.ajoutForm = false;
                            //this.reinitForm();
                            //this.dechargerT();
                            this.chargerChamps(matricule, nom)
                          }
                        })
                      }        
                    },
                    {
                      text: 'Annuler',
                      handler: () => {
                        console.log('annuler')
                        if(!this.modifierFrom){
                          this.ajoutForm = false;
                          this.reinitForm();
                          this.dechargerT();
                        }
                        
                      }
                    }
                  ]
                });

                alert.present();
              }

            }else{
              this.a_champs = true;
              //this.ajoutForm = true;
            }
          }
        });

    }

    chargerChampsProdConnu(){
        
      if(this.champs.length <= 0){
        //alert('Avertissement: Ce producteur n\'a aucun champs!') 
        let alert = this.alertCtl.create({
          title: 'Avertissement!',
          message: 'Ce producteur n\'a aucun champs.',
          buttons: [
            {
              text: 'Définir champs',
              handler:  () => {
                let membre: any = {};
                membre.data.nom_Membre = this.nom_producteur;
                membre.data.matricule_Membre = this.matricule_producteur;
                //this.navCtrl.push('ChampsPage', {'matricule_producteur': this.matricule_producteur});
                this.navCtrl.push('ChampsPage', {'matricule_producteur': this.matricule_producteur, 'nom_producteur': this.nom_producteur, 'membre': membre})
              }        
            },
            {
              text: 'Annuler',
              handler: () => console.log('annuler')
            }
          ]
        });

        alert.present();
      }
    }


    chargerTraitements(annee){
  
      if(this.ajoutForm){
        this.virifierT(annee);
      }else{
        let trm: any = [];
        this.servicePouchdb.getPlageDocsRapide('fuma:traitement', 'fuma:traitement:\uffff').then((t) => {
            if(t){
              this.allTraitements = t;

              t.map((row) => {
            
                  if(row.doc.data.annee === annee){
                      trm.push(row);
                    }
              });
              this.traitements = trm;

              if(this.traitements.length <= 0){
                this.verifieT = false
              // alert(this.verifieT)
                /*let alert = this.alertCtl.create({
                  title: 'Avertissement',
                  message: 'Le traitement pour l\'années '+annee+' n\'est pas défini!',
                  buttons: [
                    {
                      text: 'Définir traitement',
                      handler:  () => {
                        this.navCtrl.push('AjouterTraitementPage', {'annee': annee});
                      }        
                    },
                    {
                      text: 'Annuler',
                      handler: () => console.log('annuler')
                    }
                  ]
                });

                alert.present();*/
              }else{
                this.verifieT = true
              }
              
              }
          });
        }
      
    }

    chargerTraitementsProdConnu(){
     
            if(this.traitements.length <= 0){
              let alert = this.alertCtl.create({
                title: 'Avertissement',
                message: 'Le traitement pour l\'années '+this.annee+' n\'est pas défini!',
                buttons: [
                  {
                    text: 'Définir traitement',
                    handler:  () => {
                      this.navCtrl.push('AjouterTraitementPage', {'annee': this.annee});
                    }        
                  },
                  {
                    text: 'Annuler',
                    handler: () => console.log('annuler')
                  }
                ]
              });

              alert.present();
            }
          }

    chargerInfoChamps(champs){
      if(champs){
        this.type_sole = champs.type_sole;
        this.superficie = champs.superficie;
        this.longitude = champs.longitude;
        this.latitude = champs.latitude;
        //this.nom_champs = champs.nom_champs;
      }
    }

    chargerInfoChampsID(id){
      this.champs.forEach((champs, i) => {
        champs = champs.doc;
        if(champs.data.id_champs === id){
          this.type_sole = champs.data.type_sole;
          this.superficie = champs.data.superficie;
          this.longitude = champs.data.longitude;
          this.latitude = champs.data.latitude;
          this.nom_champs = champs.data.nom;
          this.essai1.nom_champs = champs.data.nom;
        }
      });
    }

    chargerInfoTraitement(selectedTraitement, selected = true ){
      this.traitements.forEach((t, i) => {
        t = t.doc;
        if(t.data.code_traitement === selectedTraitement){
          if(selected){
            this.nom_entree = t.data.nom_entree;
            this.id_traitement = t._id;
            this.nom_controle = t.data.nom_controle;
            this.code_traitement = selectedTraitement;
            //this.superficie = t.data.superficie
            //this.selectedTraitement = this.nom_entree;
            if(t.data.superficie){
              this.superficie_tr = t.data.superficie;
            }else{
              this.superficie_tr = '';
            }
            
            //this.selectedTraitementInfoComplet = 
          }

          if(this.selectedTraitement !== this.ancien_code_traitement){
            this.NPL = '';
            this.NPL_controle = '';
            this.NPR = '';
            this.NPR_controle = '';
            this.PDE = '';
            this.PDE_controle = '';
          }else{
            this.NPL = this.ancien_NPL;
            this.NPL_controle = this.ancien_NPL_controle;
            this.NPR = this.ancien_NPR;
            this.NPR_controle = this.ancien_NPR_controle;
            this.PDE = this.ancien_PDE;
            this.PDE_controle = this.ancien_PDE_controle;

          }
          
          this.selectedTraitementInfoComplet = t.data;
        }
      })
    }

    chargerInfoTraitement1(selectedTraitement){
      this.traitements.forEach((t, i) => {
        t = t.doc;
        if(t.data.code_traitement === selectedTraitement){      
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

    actionForm(){
      if(this.ajoutForm && !this.modifierFrom){
         let date = new Date();
         let essai = this.essaiForm.value;
          //traitement.matricule_producteur = this.selectedProducteur.data.matricule_Membre;
          //champs.nom_producteur = this.selectedProducteur.data.nom_Membre;
          /*if(this.verifierUniqueNon(traitement) === 0){
            alert('Le nom et code du traitement doivent être uniques par an!');
          }else{*/
          essai.code_traitement = this.selectedTraitement.data.code_traitement;
          essai.nom_entree = this.selectedTraitement.data.nom_entree;
          essai.nom_controle = this.selectedTraitement.data.nom_controle;
          essai.id_traitement = this.id_traitement;
          essai.id_champs = this.selectedChamps.data.id_champs;
          essai.nom_champs = this.selectedChamps.data.nom;
          essai.matricule_producteur = this.selectedProducteur.data.matricule_Membre;
          essai.deviceid = this.device.uuid;
          essai.phonenumber = this.phonenumber;
          essai.imei = this.imei; 
          
          //union._id = 'fuma'+ id;
          essai.end = date.toJSON();
          //essai.code_essai = id;
          //champs.id_champs = id;
        
          let essaiFinal: any = {};
          essaiFinal._id = 'fuma'+':essai:'+ this.code_essai;
          essaiFinal.data = essai
          let EF: any;
          this.servicePouchdb.createDocReturn(essaiFinal).then((res) => {
          /* let toast = this.toastCtl.create({
              message: 'Essai bien enregistré!',
              position: 'top',
              duration: 1000
            });*/
            
            
            //alert(res.rev)
            essaiFinal._rev = res.rev;
            let E: any = {};
            E.doc = essaiFinal;
            
            //this.viewCtl.dismiss(essaiFinal);
          // this.zone.run(() => {
            if(this.matricule_producteur1){

              this.essais1.push(E);
              this.dechargerT()
            }else{
              this.essais.push(E);
              this.ajoutForm = false;
              this.reinitForm();
              this.dechargerT();
            }
              
            //});

          
            
            //toast.present();
          });
          

          //this.navCtrl.pop();
          //toast.present();
          

      // }
      
      }else if(this.modifierFrom){
        let date = new Date();
        let essai = this.essaiForm.value;
        //essai.code_traitement = this.selectedTraitement.data.code_traitement;
        //essai.nom_entree = this.nom_entree;
        //essai.id_champs = this.selectedChamps.data.id_champs;
        //essai.nom_champs = this.nom_champs;
        essai.nom_entree = this.nom_entree;
        essai.nom_controle = this.nom_controle;
        essai.code_traitement = this.code_traitement;
        essai.id_traitement = this.id_traitement;
        //essai.nom_champs = this.nom_champs;
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
        this.essai1.nom_controle = essai.nom_controle;
        this.essai1.id_champs = essai.id_champs;
        this.essai1.superficie = essai.superficie;
        this.essai1.superficie_essai = essai.superficie_essai;
        this.essai1.type_sole = essai.type_sole;
        this.essai1.longitude = essai.longitude;
        this.essai1.latitude = essai.latitude;
        this.essai1.date_semis = this.date_semis; // essai.date_semis;
        this.essai1.NPL = essai.NPL;
        this.essai1.NPL_controle = essai.NPL_controle;
        this.essai1.gestion = this.gestion;// essai.gestion;
        this.essai1.date_recolte =  this.date_recolte;// essai.date_recolte;
        this.essai1.NPR = essai.NPR;
        this.essai1.NPR_controle = essai.NPR_controle;
        this.essai1.PDE = essai.PDE;
        this.essai1.PDE_controle = essai.PDE_controle;
        this.essai1.observation = essai.observation;
        this.essai1.objectif_essai = essai.objectif_essai;
        this.essai1.estValide = essai.estValide;
        this.essai1.effort_personnel = essai.effort_personnel;
        this.essai1.mode_semis = this.mode_semi;// essai.mode_semis;
      
        //let essaiFinal: any = {};
        this.grandEssai.data = this.essai1
        this.servicePouchdb.createDocReturn(this.grandEssai).then((res) => {
          this.grandEssai._rev = res.rev;
          this.essai = this.grandEssai;
          //this.essais[this.essais.indexOf(this.essaiAModifier)] = e;
          this.reinitFormModifier();
          this.modifierFrom = false;
          this.detailEssai = true
          this.ajoutForm = false;

        /*let toast = this.toastCtl.create({
          message: 'Essai bien enregistré!',
          position: 'top',
          duration: 1000,
          showCloseButton: true,
          closeButtonText: 'ok',
          dismissOnPageChange: true
        });

        //this.navCtrl.pop();
        toast.present();*/

        let e: any = {};
          e.doc = this.essai;
          this.essais.forEach((es, i) => {
            if(es.doc._id === this.essaiAModifier._id){
              this.essais[i] = e ;
            }
            
          });
        });
      }
    
  }

  annuler(){
    if(this.matricule_producteur1){
      let E: any = this.essais;
      E = E.concat(this.essais1);
      this.essais = E;
      this.allEssais = this.essais;
      this.essais1 = [];
     this.ajoutForm = false;
    }else{
      this.ajoutForm = false;
    }

    if(this.modifierFrom){
      this.modifierFrom = false;
      this.ajoutForm = false;
      this.detailEssai = true;
      this.reinitFormModifier();
    }  
  }

  fermerDetail(){
      this.detailEssai = false;
      //this.essai = {};
    
  }

  supprimer(essai){
    let e: any = {};
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
            this.servicePouchdb.deleteDocReturn(essai).then((res) => {
              //let e: any = {};
              //e.doc = essai;
              this.essais.forEach((es, i) => {
                if(es.doc._id === essai._id){
                  this.essais.splice(i, 1);
                }
                
              });
              //this.essais.splice(this.essais.indexOf(e), 1);
              /*let toast = this.toastCtl.create({
                message:'Essai bien supprimé',
                position: 'top',
                duration: 1000
              });

              toast.present();*/
              this.detailEssai = false;
              //this.navCtrl.pop();
            }, err => {
              console.log(err)
            }) ;
            
          }
        }
      ]
    });

    alert.present();
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
    this.servicePouchdb.syncAvecToast(this.getEssais());
  }

  exportExcel(){

    let date = new Date();
    //let dateHeure = date.toLocaleDateString()+ date.toLocaleTimeString();// + date.getTime().toLocaleString();
    let nom = date.getDate().toString() +'_'+ (date.getMonth() + 1).toString() +'_'+ date.getFullYear().toString() +'_'+ date.getHours().toString() +'_'+ date.getMinutes().toString() +'_'+ date.getSeconds().toString();

    let blob = new Blob([document.getElementById('tableau').innerHTML], {
      //type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
      type: "text/plain;charset=utf-8"
      //type: 'application/vnd.ms-excel;charset=utf-8'
      //type: "application/vnd.ms-excel;charset=utf-8"
    });

    if(!this.platform.is('android')){
      FileSaver.saveAs(blob, 'Combinee_'+nom+'.xls');
    }else{

      let fileDestiny: string = cordova.file.externalRootDirectory;
      this.file.writeFile(fileDestiny, 'Combinee_'+nom+'.xls', blob, true).then(()=> {
          alert("Fichier créé dans: " + fileDestiny);
      }).catch(()=>{
          alert("Erreur de création du fichier dans: " + fileDestiny);
      })
    }
  }

  onPrint(){
    let options: PrintOptions = {
        //name: 'Rapport',
        //printerId: 'printer007',
        duplex: true,
        landscape: true,
        grayscale: true
    };
    let content = document.getElementById('tableau').innerHTML;
    this.printer.print(content, options);
  }

  /*ionViewWillEnter(){
    if (global.estConnecte) {
      this.aProfile = true;
    }else{
      this.aProfile = false;
    }
  }*/

  ionViewDidEnter(){
    if(!this.estInstancier){
      this.getEssais();
      this.estInstancier = true;
    }
    
    this.pourCreerForm();
    this.getInfoSimEmei();
    if(this.matricule_producteur1 && this.nom_producteur){
      this.chargerChamps(this.matricule_producteur1, this.nom_producteur)
      //this.getEssais();
      if(!this.estInstancier){
        this.getEssais();
        this.estInstancier = true;
      }
    }

    this.estInstancier = true;

    ///this.corrigerErreur();
    //this.servicePouchdb.findByTypeData()
  }

  ionViewDidLoad() {
    //this.getEssais()
    this.initForm();
//    this.storage.remove('info_db')
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

  controlNPLControle(){
    if(this.selectedTraitementInfoComplet.max_NPL){
      let multiple: any = this.superficie_tr / this.selectedTraitementInfoComplet.superficie;
      let vMax: any = this.selectedTraitementInfoComplet.max_NPL * multiple;

      if(parseInt(this.NPL_controle) > parseInt(vMax)){
        alert('Valeur du NPL du controle invalide. Elle doit être inférieur ou égale à '+vMax+'');
        this.NPL_controle = '';
      }
    }else{
      alert('Le contrôle du NPL n\'est pas défini!');
      this.NPL_controle = '';
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

  controlNPRControle(){
    if(this.NPL_controle && this.NPL_controle !== ''){
      
      if( parseInt(this.NPR_controle) > parseInt(this.NPL_controle)){
        alert('Valeur du NPR du controle invalide. Elle doit être inférieur ou égale à '+this.NPL_controle);
        this.NPR_controle = '';
      }else{
        let multiple: any = this.superficie_tr / this.selectedTraitementInfoComplet.superficie;
        let vMax: any = this.selectedTraitementInfoComplet.max_NPR * multiple;
        if(parseInt(this.NPR_controle) > parseInt(vMax)){
          alert('Valeur du NPR du controle invalide. Elle doit être inférieur ou égale à '+vMax);
          this.NPR_controle = '';
        }
      }
    }else{
      alert('Vous devez d\'abord définir la valeur du NPL');
      this.NPR_controle = '';
    }
  }


  choixLimit(){
    if(this.selectedAnnee === 'Tous'){
      if(this.selectedLimit === 'Tous'){
       // this.servicePouchdb.getPlageDocs('fuma:essai', 'fuma:essai:\uffff').then((e) => {
         //   if(e){
              //cas ou le producteur est connu
              if(this.matricule_producteur1){
                this.servicePouchdb.getPlageDocsRapide('fuma:essai:'+this.matricule_producteur1, 'fuma:essai:'+this.matricule_producteur1+' \uffff').then((e) => {
                  if(e){
                    this.essais = e;
                    this.allEssais = e;
                  }
                 // this.champs = c;
                  //this.allChamps = c;
                })
                /*let ep: any = [];
                e.forEach((ess, i) => {
                  if(ess.data.matricule_producteur === this.matricule_producteur){
                    ep.push(ess);
                  }
                });
                this.essais = ep;
                this.allEssais = ep;*/
              }else{
                //sinon
                this.servicePouchdb.getPlageDocsRapide('fuma:essai', 'fuma:essai:\uffff').then((e) => {
                  if(e){
                     this.essais = e;
                     this.allEssais = e;
                  }
                });
               
              }
          
          //  }
         // });
        }else{
         // this.servicePouchdb.getPlageDocsAvecLimit('fuma:essai', 'fuma:essai:\uffff', this.selectedLimit).then((e) => {
           // if(e){
              //cas ou le producteur est connu
              if(this.matricule_producteur1){
                this.servicePouchdb.getPlageDocsRapideAvecLimit('fuma:essai:'+this.matricule_producteur1, 'fuma:essai:'+this.matricule_producteur1+' \uffff', this.selectedLimit).then((e) => {
                  if(e){
                    this.essais = e;
                    this.allEssais = e;
                  }
                });
                /*let ep: any = [];
                e.forEach((ess, i) => {
                  if(ess.data.matricule_producteur === this.matricule_producteur){
                    ep.push(ess);
                  }
                });
                this.essais = ep;
                this.allEssais = ep;*/
              }else{
                //sinon
                this.servicePouchdb.getPlageDocsRapideAvecLimit('fuma:essai', 'fuma:essai:\uffff', this.selectedLimit).then((e) => {
                  if(e){
                    this.essais = e;
                    this.allEssais = e;
                  }

                });
                
              }
          
          //  }
        //  });
        }
    }else{
      if(this.selectedLimit === 'Tous'){
        //let ess: any = [];
        //this.servicePouchdb.getPlageDocs('fuma:essai', 'fuma:essai:\uffff').then((e) => {
          //  if(e){
             /* e.forEach((es, i) => {
                if(es.data.annee_essai === this.selectedAnnee){
                  ess.push(es);
                }
              });*/

              if(this.matricule_producteur1){
                 this.servicePouchdb.getPlageDocsRapide('fuma:essai:'+this.matricule_producteur1, 'fuma:essai:'+this.matricule_producteur1+' \uffff').then((e) => {
                  if(e){
                     let ess: any = [];
                     e.forEach((es, i) => {
                        if(es.doc.data.annee_essai === this.selectedAnnee){
                          ess.push(es);
                        }
                      });
                    this.essais = ess;
                    this.allEssais = ess;
                  }
                });
               
                /*let ep: any = [];
                ess.forEach((essai, i) => {
                  if(essai.data.matricule_producteur === this.matricule_producteur){
                    ep.push(essai);
                  }
                });
                this.essais = ep;
                this.allEssais = ep;*/
              }else{
                //sinon
                this.servicePouchdb.getPlageDocsRapide('fuma:essai', 'fuma:essai:\uffff').then((e) => {
                  if(e){
                    let ess: any = [];
                     e.forEach((es, i) => {
                        if(es.doc.data.annee_essai === this.selectedAnnee){
                          ess.push(es);
                        }
                      });
                    this.essais = ess;
                    this.allEssais = ess;
                  }
                });
                
              }
          //  }
        //  });
        }else{
          //let ess: any = [];
          //this.servicePouchdb.getPlageDocsAvecLimit('fuma:essai', 'fuma:essai:\uffff', this.selectedLimit).then((e) => {
              /*if(e){
                e.forEach((es, i) => {
                  if(es.data.annee_essai === this.selectedAnnee){
                    ess.push(es);
                  }
                });*/

                if(this.matricule_producteur1){
                  this.servicePouchdb.getPlageDocsRapideAvecLimit('fuma:essai:'+this.matricule_producteur1, 'fuma:essai:'+this.matricule_producteur1+' \uffff', this.selectedLimit).then((e) => {
                  if(e){
                     let ess: any = [];
                     e.forEach((es, i) => {
                        if(es.doc.data.annee_essai === this.selectedAnnee){
                          ess.push(es);
                        }
                      });
                    this.essais = ess;
                    this.allEssais = ess;
                  }
                });
               
                  /*let ep: any = [];
                  ess.forEach((essai, i) => {
                    if(essai.data.matricule_producteur === this.matricule_producteur){
                      ep.push(essai);
                    }
                  });
                  this.essais = ep;
                  this.allEssais = ep;*/
                }else{
                  //sinon
                   this.servicePouchdb.getPlageDocsRapideAvecLimit('fuma:essai', 'fuma:essai:\uffff', this.selectedLimit).then((e) => {
                     if(e){
                       let ess: any = [];
                        e.forEach((es, i) => {
                            if(es.doc.data.annee_essai === this.selectedAnnee){
                              ess.push(es);
                            }
                          });
                      this.essais = ess;
                      this.allEssais = ess;
                     }
                   })
                  
                }
             // }
           // });
          }
      }

  }

/*
    chargerChamps(matricule){
      let chmp: any = [];

      this.servicePouchdb.getPlageDocs('fuma:champs:'+matricule, 'fuma:champs:'+matricule+' \uffff').then((c) => {
          if(c){
            this.champs = c;
          }
        });
      }

      chargerTraitements(annee){
      let trm: any = [];
      this.servicePouchdb.getPlageDocs('fuma:traitement', 'fuma:traitement:\uffff').then((t) => {
          if(t){

             t.map((row) => {
          
                if(row.data.annee === annee){
                    trm.push(row);
                  }
            });
            /*t.forEach((tr, i) => {
              if(tr.data.annee === annee){
                trm.push(tr);
              }
            })*
            this.traitements = trm;
            
            }
        });
    }

*/

  corrigerErreur(){
    this.servicePouchdb.getPlageDocs('fuma:essai', 'fuma:essai:\uffff').then((e) => {
      let n = 0;  
      if(e){
          e.forEach((es, i) => {
            if(parseInt(es.data.superficie_essai) === 200){
              es.data.superficie_essai = 100;
              n++;
              this.servicePouchdb.updateDoc(es)
            }
          
          })
         alert('n = '+n);
          
          //this.essais = e;
          //this.allEssais = e;
        }
        // this.champs = c;
        //this.allChamps = c;
      });
}

  getEssais(){
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

    if(this.selectedAnnee === 'Tous'){
      if(this.selectedLimit === 'Tous'){
       // this.servicePouchdb.getPlageDocs('fuma:essai', 'fuma:essai:\uffff').then((e) => {
         //   if(e){
              //cas ou le producteur est connu
              if(this.matricule_producteur1){
                this.servicePouchdb.getPlageDocsRapide('fuma:essai:'+this.matricule_producteur1, 'fuma:essai:'+this.matricule_producteur1+' \uffff').then((e) => {
                  if(e){
                    this.essais = e;
                    this.allEssais = e;
                  }
                 // this.champs = c;
                  //this.allChamps = c;
                });
                //this.chargerChamps(this.matricule_producteur);
                //let maDate = new Date();
                //this.chargerTraitements(this.selectedAnnee);
                /*let ep: any = [];
                e.forEach((ess, i) => {
                  if(ess.data.matricule_producteur === this.matricule_producteur){
                    ep.push(ess);
                  }
                });
                this.essais = ep;
                this.allEssais = ep;*/
              }else{
                //sinon
                this.servicePouchdb.getPlageDocsRapide('fuma:essai', 'fuma:essai:\uffff').then((e) => {
                  if(e){
                     this.essais = e;
                     this.allEssais = e;
                  }
                });
               
              }
          
          //  }
         // });
        }else{
         // this.servicePouchdb.getPlageDocsAvecLimit('fuma:essai', 'fuma:essai:\uffff', this.selectedLimit).then((e) => {
           // if(e){
              //cas ou le producteur est connu
              if(this.matricule_producteur1){
                this.servicePouchdb.getPlageDocsRapideAvecLimit('fuma:essai:'+this.matricule_producteur1, 'fuma:essai:'+this.matricule_producteur1+' \uffff', this.selectedLimit).then((e) => {
                  if(e){
                    this.essais = e;
                    this.allEssais = e;
                  }
                });
                //this.chargerChamps(this.matricule_producteur);
                //let maDate = new Date();
                //this.chargerTraitements(this.selectedAnnee);
                /*let ep: any = [];
                e.forEach((ess, i) => {
                  if(ess.data.matricule_producteur === this.matricule_producteur){
                    ep.push(ess);
                  }
                });
                this.essais = ep;
                this.allEssais = ep;*/
              }else{
                //sinon
                this.servicePouchdb.getPlageDocsRapideAvecLimit('fuma:essai', 'fuma:essai:\uffff', this.selectedLimit).then((e) => {
                  if(e){
                    this.essais = e;
                    this.allEssais = e;
                  }

                });
                
              }
          
          //  }
        //  });
        }
    }else{
      if(this.selectedLimit === 'Tous'){
        //let ess: any = [];
        //this.servicePouchdb.getPlageDocs('fuma:essai', 'fuma:essai:\uffff').then((e) => {
          //  if(e){
             /* e.forEach((es, i) => {
                if(es.data.annee_essai === this.selectedAnnee){
                  ess.push(es);
                }
              });*/

              if(this.matricule_producteur1){
                 this.servicePouchdb.getPlageDocsRapide('fuma:essai:'+this.matricule_producteur1, 'fuma:essai:'+this.matricule_producteur1+' \uffff').then((e) => {
                  if(e){
                     let ess: any = [];
                     e.forEach((es, i) => {
                        if(es.doc.data.annee_essai === this.selectedAnnee){
                          ess.push(es);
                        }
                      });
                    this.essais = ess;
                    this.allEssais = ess;
                  }
                });

                //this.chargerChamps(this.matricule_producteur);
                //let maDate = new Date();
                //this.chargerTraitements(this.selectedAnnee);
               
                /*let ep: any = [];
                ess.forEach((essai, i) => {
                  if(essai.data.matricule_producteur === this.matricule_producteur){
                    ep.push(essai);
                  }
                });
                this.essais = ep;
                this.allEssais = ep;*/
              }else{
                //sinon
                this.servicePouchdb.getPlageDocsRapide('fuma:essai', 'fuma:essai:\uffff').then((e) => {
                  if(e){
                    let ess: any = [];
                     e.forEach((es, i) => {
                        if(es.doc.data.annee_essai === this.selectedAnnee){
                          ess.push(es);
                        }
                      });
                    this.essais = ess;
                    this.allEssais = ess;
                  }
                });
                
              }
          //  }
        //  });
        }else{
          //let ess: any = [];
          //this.servicePouchdb.getPlageDocsAvecLimit('fuma:essai', 'fuma:essai:\uffff', this.selectedLimit).then((e) => {
              /*if(e){
                e.forEach((es, i) => {
                  if(es.data.annee_essai === this.selectedAnnee){
                    ess.push(es);
                  }
                });*/

                if(this.matricule_producteur1){
                  this.servicePouchdb.getPlageDocsRapideAvecLimit('fuma:essai:'+this.matricule_producteur1, 'fuma:essai:'+this.matricule_producteur1+' \uffff', this.selectedLimit).then((e) => {
                  if(e){
                     let ess: any = [];
                     e.forEach((es, i) => {
                        if(es.doc.data.annee_essai === this.selectedAnnee){
                          ess.push(es);
                        }
                      });
                    this.essais = ess;
                    this.allEssais = ess;
                  }
                });
               
               //this.chargerChamps(this.matricule_producteur);
                //let maDate = new Date();
                //this.chargerTraitements(this.selectedAnnee);
                  /*let ep: any = [];
                  ess.forEach((essai, i) => {
                    if(essai.data.matricule_producteur === this.matricule_producteur){
                      ep.push(essai);
                    }
                  });
                  this.essais = ep;
                  this.allEssais = ep;*/
                }else{
                  //sinon
                   this.servicePouchdb.getPlageDocsRapideAvecLimit('fuma:essai', 'fuma:essai:\uffff', this.selectedLimit).then((e) => {
                     if(e){
                       let ess: any = [];
                        e.forEach((es, i) => {
                            if(es.doc.data.annee_essai === this.selectedAnnee){
                              ess.push(es);
                            }
                          });
                      this.essais = ess;
                      this.allEssais = ess;
                     }
                   })
                  
                }
             // }
           // });
          }
      }


    /*if(this.selectedAnnee === 'Tous'){
      if(this.selectedLimit === 'Tous'){
        this.servicePouchdb.getPlageDocs('fuma:essai', 'fuma:essai:\uffff').then((e) => {
            if(e){
              //cas ou le producteur est connu
              if(this.matricule_producteur){
                let ep: any = [];
                e.forEach((ess, i) => {
                  if(ess.data.matricule_producteur === this.matricule_producteur){
                    ep.push(ess);
                  }
                });
                this.essais = ep;
                this.allEssais = ep;
              }else{
                //sinon
                this.essais = e;
                this.allEssais = e;
              }
          
            }
          });
        }else{
          this.servicePouchdb.getPlageDocsAvecLimit('fuma:essai', 'fuma:essai:\uffff', this.selectedLimit).then((e) => {
            if(e){
              //cas ou le producteur est connu
              if(this.matricule_producteur){
                let ep: any = [];
                e.forEach((ess, i) => {
                  if(ess.data.matricule_producteur === this.matricule_producteur){
                    ep.push(ess);
                  }
                });
                this.essais = ep;
                this.allEssais = ep;
              }else{
                //sinon
                this.essais = e;
                this.allEssais = e;
              }
          
            }
          });
        }
    }else{
      if(this.selectedLimit === 'Tous'){
        let ess: any = [];
        this.servicePouchdb.getPlageDocs('fuma:essai', 'fuma:essai:\uffff').then((e) => {
            if(e){
              e.forEach((es, i) => {
                if(es.data.annee_essai === this.selectedAnnee){
                  ess.push(es);
                }
              });

              if(this.matricule_producteur){
                let ep: any = [];
                ess.forEach((essai, i) => {
                  if(essai.data.matricule_producteur === this.matricule_producteur){
                    ep.push(essai);
                  }
                });
                this.essais = ep;
                this.allEssais = ep;
              }else{
                //sinon
                this.essais = ess;
                this.allEssais = ess;
              }
            }
          });
        }else{
          let ess: any = [];
          this.servicePouchdb.getPlageDocsAvecLimit('fuma:essai', 'fuma:essai:\uffff', this.selectedLimit).then((e) => {
              if(e){
                e.forEach((es, i) => {
                  if(es.data.annee_essai === this.selectedAnnee){
                    ess.push(es);
                  }
                });

                if(this.matricule_producteur){
                  let ep: any = [];
                  ess.forEach((essai, i) => {
                    if(essai.data.matricule_producteur === this.matricule_producteur){
                      ep.push(essai);
                    }
                  });
                  this.essais = ep;
                  this.allEssais = ep;
                }else{
                  //sinon
                  this.essais = ess;
                  this.allEssais = ess;
                }
              }
            });
        }
    }*/

  }

/*
  ionViewDidEnter() {
    //alert(this.navCtrl.getActive().component.name)
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

    if(this.selectedAnnee === 'Tous'){
      this.servicePouchdb.getPlageDocs('fuma:essai', 'fuma:essai:\uffff').then((e) => {
          if(e){
            //cas ou le producteur est connu
            if(this.matricule_producteur){
              let ep: any = [];
              e.forEach((ess, i) => {
                if(ess.data.matricule_producteur === this.matricule_producteur){
                  ep.push(ess);
                }
              });
              this.essais = ep;
              this.allEssais = ep;
            }else{
              //sinon
              this.essais = e;
              this.allEssais = e;
            }
        
          }
        });
    }else{
      let ess: any = [];
      this.servicePouchdb.getPlageDocs('fuma:essai', 'fuma:essai:\uffff').then((e) => {
          if(e){
            e.forEach((es, i) => {
              if(es.data.annee_essai === this.selectedAnnee){
                ess.push(es);
              }
            });

            if(this.matricule_producteur){
              let ep: any = [];
              ess.forEach((essai, i) => {
                if(essai.data.matricule_producteur === this.matricule_producteur){
                  ep.push(essai);
                }
              });
              this.essais = ep;
              this.allEssais = ep;
            }else{
              //sinon
              this.essais = ess;
              this.allEssais = ess;
            }
          }
        });
    }

    //this.servicePouchdb.reset();
  }
*/
  choixAnneeEssai(){
    if(this.selectedAnnee === 'Tous'){
      if(this.selectedLimit === 'Tous'){
       // this.servicePouchdb.getPlageDocs('fuma:essai', 'fuma:essai:\uffff').then((e) => {
         //   if(e){
              //cas ou le producteur est connu
              if(this.matricule_producteur1){
                this.servicePouchdb.getPlageDocsRapide('fuma:essai:'+this.matricule_producteur1, 'fuma:essai:'+this.matricule_producteur1+' \uffff').then((e) => {
                  if(e){
                    this.essais = e;
                    this.allEssais = e;
                  }
                 // this.champs = c;
                  //this.allChamps = c;
                })
                //this.chargerChamps(this.matricule_producteur);
                //let maDate = new Date();
                //this.chargerTraitements(this.selectedAnnee);
                /*let ep: any = [];
                e.forEach((ess, i) => {
                  if(ess.data.matricule_producteur === this.matricule_producteur){
                    ep.push(ess);
                  }
                });
                this.essais = ep;
                this.allEssais = ep;*/
              }else{
                //sinon
                this.servicePouchdb.getPlageDocsRapide('fuma:essai', 'fuma:essai:\uffff').then((e) => {
                  if(e){
                     this.essais = e;
                     this.allEssais = e;
                  }
                });
               
              }
          
          //  }
         // });
        }else{
         // this.servicePouchdb.getPlageDocsAvecLimit('fuma:essai', 'fuma:essai:\uffff', this.selectedLimit).then((e) => {
           // if(e){
              //cas ou le producteur est connu
              if(this.matricule_producteur1){
                this.servicePouchdb.getPlageDocsRapideAvecLimit('fuma:essai:'+this.matricule_producteur1, 'fuma:essai:'+this.matricule_producteur1+' \uffff', this.selectedLimit).then((e) => {
                  if(e){
                    this.essais = e;
                    this.allEssais = e;
                  }
                });
                //this.chargerChamps(this.matricule_producteur);
                //let maDate = new Date();
                ///this.chargerTraitements(this.selectedAnnee);
                /*let ep: any = [];
                e.forEach((ess, i) => {
                  if(ess.data.matricule_producteur === this.matricule_producteur){
                    ep.push(ess);
                  }
                });
                this.essais = ep;
                this.allEssais = ep;*/
              }else{
                //sinon
                this.servicePouchdb.getPlageDocsRapideAvecLimit('fuma:essai', 'fuma:essai:\uffff', this.selectedLimit).then((e) => {
                  if(e){
                    this.essais = e;
                    this.allEssais = e;
                  }

                });
                
              }
          
          //  }
        //  });
        }
    }else{
      if(this.selectedLimit === 'Tous'){
        //let ess: any = [];
        //this.servicePouchdb.getPlageDocs('fuma:essai', 'fuma:essai:\uffff').then((e) => {
          //  if(e){
             /* e.forEach((es, i) => {
                if(es.data.annee_essai === this.selectedAnnee){
                  ess.push(es);
                }
              });*/

              if(this.matricule_producteur1){
                 this.servicePouchdb.getPlageDocsRapide('fuma:essai:'+this.matricule_producteur1, 'fuma:essai:'+this.matricule_producteur1+' \uffff').then((e) => {
                  if(e){
                     let ess: any = [];
                     e.forEach((es, i) => {
                        if(es.doc.data.annee_essai === this.selectedAnnee){
                          ess.push(es);
                        }
                      });
                    this.essais = ess;
                    this.allEssais = ess;
                  }
                });
               
               //this.chargerChamps(this.matricule_producteur);
                //let maDate = new Date();
                //this.chargerTraitements(this.selectedAnnee);
                /*let ep: any = [];
                ess.forEach((essai, i) => {
                  if(essai.data.matricule_producteur === this.matricule_producteur){
                    ep.push(essai);
                  }
                });
                this.essais = ep;
                this.allEssais = ep;*/
              }else{
                //sinon
                this.servicePouchdb.getPlageDocsRapide('fuma:essai', 'fuma:essai:\uffff').then((e) => {
                  if(e){
                    let ess: any = [];
                     e.forEach((es, i) => {
                        if(es.doc.data.annee_essai === this.selectedAnnee){
                          ess.push(es);
                        }
                      });
                    this.essais = ess;
                    this.allEssais = ess;
                  }
                });
                
              }
          //  }
        //  });
        }else{
          //let ess: any = [];
          //this.servicePouchdb.getPlageDocsAvecLimit('fuma:essai', 'fuma:essai:\uffff', this.selectedLimit).then((e) => {
              /*if(e){
                e.forEach((es, i) => {
                  if(es.data.annee_essai === this.selectedAnnee){
                    ess.push(es);
                  }
                });*/

                if(this.matricule_producteur1){
                  this.servicePouchdb.getPlageDocsRapideAvecLimit('fuma:essai:'+this.matricule_producteur1, 'fuma:essai:'+this.matricule_producteur1+' \uffff', this.selectedLimit).then((e) => {
                  if(e){
                     let ess: any = [];
                     e.forEach((es, i) => {
                        if(es.doc.data.annee_essai === this.selectedAnnee){
                          ess.push(es);
                        }
                      });
                    this.essais = ess;
                    this.allEssais = ess;
                  }
                });
                //this.chargerChamps(this.matricule_producteur);
                //let maDate = new Date();
                //this.chargerTraitements(this.selectedAnnee);
               
                  /*let ep: any = [];
                  ess.forEach((essai, i) => {
                    if(essai.data.matricule_producteur === this.matricule_producteur){
                      ep.push(essai);
                    }
                  });
                  this.essais = ep;
                  this.allEssais = ep;*/
                }else{
                  //sinon
                   this.servicePouchdb.getPlageDocsRapideAvecLimit('fuma:essai', 'fuma:essai:\uffff', this.selectedLimit).then((e) => {
                     if(e){
                       let ess: any = [];
                        e.forEach((es, i) => {
                            if(es.doc.data.annee_essai === this.selectedAnnee){
                              ess.push(es);
                            }
                          });
                      this.essais = ess;
                      this.allEssais = ess;
                     }
                   })
                  
                }
             // }
           // });
          }

          
      }
      
      this.chargerTraitements(this.selectedAnnee)
      /*if(this.ajoutForm){
        this.virifierT(this.selectedAnnee)
      }*/
      

   /* if(this.selectedAnnee === 'Tous'){
      this.servicePouchdb.getPlageDocs('fuma:essai', 'fuma:essai:\uffff').then((e) => {
          if(e){
            //cas ou le producteur est connu
            if(this.matricule_producteur){
              let ep: any = [];
              e.forEach((ess, i) => {
                if(ess.data.matricule_producteur === this.matricule_producteur){
                  ep.push(ess);
                }  
              });
              this.essais = ep;
              this.allEssais = ep;
            }else{
              //sinon
              this.essais = e;
              this.allEssais = e;
            }
            //this.essais = e;
            //this.allEssais = e;
          }
        });
    }else{
      let ess: any = [];
      this.servicePouchdb.getPlageDocs('fuma:essai', 'fuma:essai:\uffff').then((e) => {
          if(e){
            e.forEach((es, i) => {
              if(es.data.annee_essai === this.selectedAnnee){
                ess.push(es);
              }
            });

            if(this.matricule_producteur){
              let ep: any = [];
              ess.forEach((essai, i) => {
                if(essai.data.matricule_producteur === this.matricule_producteur){
                  ep.push(essai);
                }
              });
              this.essais = ep;
              this.allEssais = ep;
            }else{
              //sinon
              this.essais = ess;
              this.allEssais = ess;
            }
            //this.essais = ess;
            //this.allEssais = ess;
          }
        });
    }*/
  }

  editer(essai){
    this.grandEssai = essai;
    this.essai1 = this.grandEssai.data;
    //this.nom_producteur = this.essai1.nom_producteur;
    this.selectedProducteur = this.essai1.matricule_producteur;
    this.ancienSelectedProducteur = this.essai1.matricule_producteur;
    this.selectedChamps = this.essai1.id_champs;
    this.selectedTraitement = this.essai1.code_traitement;
    this.ancien_code_traitement = this.essai1.code_traitement;
    this.nom_entree = this.essai1.nom_entree;
    this.nom_controle = this.essai1.nom_controle;
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
    //this.sex_producteur = this.essai1.sex_producteur;
    //this.site_producteur = this.essai1.site_producteur;
    //this.village_producteur = this.essai1.village_producteur;
    this.classe_producteur = this.essai1.classe_producteur;
    this.NPL = this.essai1.NPL;
    this.NPL_controle = this.essai1.NPL_controle;
    this.NPR = this.essai1.NPR;
    this.NPR_controle = this.essai1.NPR_controle;
    this.ancien_NPL = this.essai1.NPL;
    this.ancien_NPL_controle = this.essai1.NPL_controle;
    this.ancien_NPR = this.essai1.NPR;
    this.ancien_NPR_controle = this.essai1.NPR_controle;
    this.ancien_PDE = this.essai1.PDE;
    this.ancien_PDE_controle = this.essai1.PDE_controle;
    //this.code_essai = this.essai1.code_essai;
    this.annee_essai = this.essai1.annee_essai;
    this.today = this.essai1.today;
    if(this.essai1.today){
      this.dateAjout = new Date(this.essai1.today);
    }else if(!this.dateAjout){
      this.dateAjout = new Date();
    }
    //this.site_producteur = this.essai1.site_producteur;
    this.matricule_producteur = this.essai1.matricule_producteur;
    //this.sex_producteur = this.essai1.sex_producteur;
    this.code_traitement = this.essai1.code_traitement;
    this.id_champs = this.essai1.id_champs;
    this.superficie_essai = this.essai1.superficie_essai;
    
    if(this.essai1.date_semis){
      this.date_semis = this.essai1.date_semis;
      this.dateSemis = new Date(this.essai1.date_semis);
    }else if(!this.dateSemis){
      this.dateSemis = new Date();
    }

    if(this.essai1.gestion){
      this.gestion = this.essai1.gestion;
    }
    
    if(this.essai1.date_recolte){
      this.dateRecolte = new Date(this.essai1.date_recolte);
      if(this.dateSemis < this.dateRecolte){
        this.date_recolte = '';
        this.dateRecolte = this.dateSemis;
      }else{
        this.date_recolte = this.essai1.date_recolte;
      }

    }else if(!this.dateRecolte) {
      this.dateRecolte = this.dateSemis;// new Date();
    }
    
    this.PDE = this.essai1.PDE;
    this.PDE_controle = this.essai1.PDE_controle;
    if(this.essai1.mode_semis && this.essai1.mode_semis !== ''){
      this.mode_semi = this.essai1.mode_semis;
    }
    
    this.observation = this.essai1.observation;
    this.objectif_essai = this.essai1.objectif_essai;
    this.estValide = this.essai1.estValide;
    this.effort_personnel = this.essai1.effort_personnel;
    this.chargerInfoTraitement1(this.selectedTraitement); 
  
    //this.navCtrl.push('ModifierEssaiPage', {'essai': essai});
    this.detailEssai = false;

    this.ajoutForm = true;

    this.modifierFrom = true;
    this.essaiAModifier = essai;
    if(!this.matricule_producteur1){
      this.chargerChamps(this.matricule_producteur, this.nom_producteur);
       if(this.essai1.date_semis){
          this.dateSemis = new Date(this.essai1.date_semis);
        }else{
          this.dateSemis = new Date();
        }
        if(this.essai1.date_recolte){
          this.dateRecolte = new Date(this.essai1.date_recolte);
        }else{
          this.dateRecolte = new Date();
        }
    }
  }

  reinitFormModifier(){
    this.grandEssai = '';
    this.essai1 = '';
    this.nom_producteur = '';
    this.selectedProducteur = '';
    this.ancienSelectedProducteur = '';
    this.selectedChamps = '';
    this.selectedTraitement ='';
    this.ancien_code_traitement ='';
    this.nom_entree = '';
    this.nom_controle = '';
    this.site_producteur ='';
    this.sex_producteur = "";
    this.classe_producteur = '';
    this.village_producteur = '';
    this.superficie = '';
    this.superficie_tr = '';
    this.type_sole = '';
    this.longitude = '';
    this.latitude = '';
    this.code_essai = '';
    this.ancientCode_essai = '';
    this.nom_champs = '';
    this.nom_producteur = '';
    this.sex_producteur = '';
    this.site_producteur = '';
    this.village_producteur = '';
    this.classe_producteur = '';
    this.NPL = '';
    this.NPL_controle = '';
    this.NPR = '';
    this.NPR_controle = '';
    this.ancien_NPL = '';
    this.ancien_NPL_controle = '';
    this.ancien_NPR = '';
    this.ancien_NPR_controle = '';
    this.ancien_PDE = '';
    this.ancien_PDE_controle = '';

    //this.code_essai = this.essai1.code_essai;
    //this.annee_essai = '';
    //this.today = '';
    //this.dateAjout = '';
    //this.site_producteur = '';
    this.matricule_producteur = '';
    //this.sex_producteur = '';
    this.code_traitement = '';
    this.id_champs = '';
    this.superficie_essai = '';
    
    if(!this.matricule_producteur1){
      this.date_semis = '';
      this.gestion = '';
      this.dateSemis = new Date();
      this.date_recolte = '';
      this.dateRecolte = new Date();
      this.mode_semi = '';
    }
    
    this.PDE = '';
    this.PDE_controle = '';
    
    this.observation = '';
    this.objectif_essai ='';
    this.estValide = "";
    this.effort_personnel = ""; 
    this.selectedTraitementInfoComplet = '';
    //this.champs = [];
  }
  
  virifierT(annee){
    let trm: any = [];
      this.allTraitements.map((row) => {
  
        if(row.doc.data.annee === annee){
            trm.push(row);
          }
    });
    this.traitements = trm;

    if(this.traitements.length <= 0){
      this.verifieT = false

       let alert = this.alertCtl.create({
          title: 'Avertissement',
          message: 'Le traitement pour l\'années '+annee+' n\'est pas défini!',
          buttons: [
            {
              text: 'Définir traitement',
              handler:  () => {
                //this.navCtrl.push('AjouterTraitementPage', {'annee': this.selectedAnnee});
                let model = this.modelCtl.create('TraitementPage', {'annee': annee});
                
                model.onDidDismiss((tr) => {
                  let trm: any = [];
                  if(tr){
                    tr.map((row) => {
              
                    if(row.doc.data.annee === this.selectedAnnee){
                        trm.push(row);
                      }
                    });
                    this.traitements = trm;

                    if(this.traitements.length <= 0){
                      this.verifieT = false;
                      //this.ajouter();
                      this.virifierT(annee)
                      }else{
                        this.verifieT = true;
                        //this.ajouter();
                      }
                  }
                });

                model.present();
              }        
            },
            {
              text: 'Annuler',
              handler: () =>  {
                console.log('annuler')
                this.ajoutForm = false;
                this.reinitForm();
                this.dechargerT();
                if(this.ancien_selectedAnnee){
                  this.selectedAnnee = this.ancien_selectedAnnee;
                }
                
              }
            }
          ]
        });

        alert.present();
    }else{
      this.verifieT = true
      }
            
  }

   ajouter(){
     //this.modifierFrom
     this.ancien_selectedAnnee = this.selectedAnnee;
     if(this.verifieT){

      let maDate = new Date();
      let today = this.createDate(maDate.getDate(), maDate.getMonth(), maDate.getFullYear());
      //this. type = 'essai';
      this.annee_essai = maDate.getFullYear();
      
      this.effort_personnel = false;
      this.estValide = true;
      this.today = today;
      this.dateAjout = maDate;
      this.date_semis = '';
      this.dateSemis = maDate;
      this.date_recolte = '';
      this.dateRecolte = this.dateSemis;

      //this.start = maDate.toJSON();
      if(!this.matricule_producteur1){
        this.champs = [];
        this.ajoutForm = true;
      }else{
        if(!this.a_champs){
          let alert = this.alertCtl.create({
                title: 'Avertissement!',
                message: 'Ce producteur n\'a aucun champs.',
                buttons: [
                  {
                    text: 'Définir champs',
                    handler:  () => {
                      let membre: any = {
                        data: {
                          nom_Membre: this.navParams.data.nom_producteur,
                          matricule_Membre: this.navParams.data.matricule_producteur
                        }
                      };
                      //membre.data.matricule_Membre = matricule;
                      let model = this.modelCtl.create('ChampsPage', {'matricule_producteur': this.navParams.data.nom_producteur, 'nom_producteur': this.navParams.data.nom_producteur, 'membre': membre});
                      //this.navCtrl.push('ChampsPage', {'matricule_producteur': matricule, 'nom_producteur': nom, 'membre': membre}) ;
                      model.present();
                      model.onDidDismiss((ch) => {
                        if(ch && ch.length > 0){
                          this.champs = ch;
                          this.a_champs = true;
                          this.ajouter();
                          //this.ajoutForm = true;
                        }else{
                          this.a_champs = false;
                          this.ajouter();
                        }
                      })
                    }        
                  },
                  {
                    text: 'Annuler',
                    handler: () =>  {
                        console.log('annuler')
                        this.ajoutForm = false;
                        this.reinitForm();
                        this.dechargerT();
                      }
                  }
                ]
              });

              alert.present();
        }else{
          this.ajoutForm = true;
        }
      }

   
    
      
     }else{
       let alert = this.alertCtl.create({
          title: 'Avertissement',
          message: 'Le traitement pour l\'années '+this.selectedAnnee+' n\'est pas défini!',
          buttons: [
            {
              text: 'Définir traitement',
              handler:  () => {
                //this.navCtrl.push('AjouterTraitementPage', {'annee': this.selectedAnnee});
                let model = this.modelCtl.create('TraitementPage', {'annee': this.selectedAnnee});
                
                model.onDidDismiss((tr) => {
                  let trm: any = [];
                  if(tr){
                    tr.map((row) => {
              
                    if(row.doc.data.annee === this.selectedAnnee){
                        trm.push(row);
                      }
                    });
                    this.traitements = trm;

                    if(this.traitements.length <= 0){
                      this.verifieT = false;
                      this.ajouter();
                      }else{
                        this.verifieT = true;
                        this.ajouter();
                      }
                  }
                });

                model.present();
              }        
            },
            {
              text: 'Annuler',
              handler: () =>  {
                  console.log('annuler')
                  this.ajoutForm = false;
                  this.reinitForm();
                  this.dechargerT();
                  if(this.ancien_selectedAnnee){
                    this.selectedAnnee = this.ancien_selectedAnnee;
                  }
                }
            }
          ]
        });

        alert.present();
     }
    /* if(this.matricule_producteur){
      //this.navCtrl.push('AjouterEssaiPage', {'matricule_producteur': this.matricule_producteur, 'membre': this.membre}); 
      let model = this.modelCtl.create('AjouterEssaiPage', {'matricule_producteur': this.matricule_producteur, 'membre': this.membre})
      model.onDidDismiss(essais => {
        if (essais) {
          let E: any = this.essais;
          E = E.concat(essais);
         // this.allEssais.push(essai);
         // this.zone.run(() => {
            this.essais = E;
            this.allEssais = this.essais;
            //this.events.publish('ajout-essai', {'essai': essai});
          //});
          
          
        }
      });
      model.present();

     }else{
       //this.navCtrl.push('AjouterEssaiPage'); 
       let model = this.modelCtl.create('AjouterEssaiPage')
       model.onDidDismiss(essais => {
        if (essais) {
          let E: any = this.essais;
          E = E.concat(essais);
         // this.allEssais.push(essai);
         // this.zone.run(() => {
            this.essais = E;
            this.allEssais = this.essais;
            //this.allEssais.push(essai);
          //});
          
        }
      });
      model.present();
     }*/
       
  }

  detail(essai){
    this.essai = essai;
    this.detailEssai = true;
    /*this.gestion = '';
    this.date_semis = '';
    this.dateSemis = new Date();
    this.date_recolte = '';
    this.dateRecolte = new Date();*/

   /* if(!this.matricule_producteur1){
      this.chargerChamps(essai.data.matricule_producteur, essai.data.nom_producteur);
    }*/
    //this.navCtrl.push('DetailEssaiPage', {'essai': essai});
  }
  
    typeRechercheChange(){
    this.essais = this.allEssais;
  }


  getItems(ev: any) {
    // Reset items back to all of the items
    this.essais = this.allEssais;

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.essais = this.essais.filter((item) => {
        if(this.typeRecherche === 'matricule'){
          return (item.doc.data.matricule_producteur.toLowerCase().indexOf(val.toLowerCase()) > -1);
        }else if(this.typeRecherche === 'nom_entree'){
          return (item.doc.data.nom_entree.toLowerCase().indexOf(val.toLowerCase()) > -1);
        }
      });
    }
  } 
 

}
