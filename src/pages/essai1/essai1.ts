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
//import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { AutoCompletion } from '../../providers/auto-completion';
import { Device } from '@ionic-native/device';
import { Sim } from '@ionic-native/sim';
import PouchDB from 'pouchdb';
import {TableExport} from 'tableexport';
//var tableExport = require('table-export');
//var tableExport2 = require('tableexport');
import { EssaiType } from '../../app/essai.class';
import { CultureType } from '../../app/culture-essai.class';

//import 'vega';
//import 'vega-util';
//import 'vega-tooltip';
//import 'vega-event-selector';
//import 'vega-lite';
//import embed from 'vega-embed';
import { from } from 'rxjs/observable/from';
//import { ArrayType } from '@angular/compiler/src/output/output_ast';

//declare var vg;
//declare var vega
//import 'd3';
//import 'vega';
//import 'vega-lite';
//import vegaEmbed from 'vega-embed';
//import * as vega from 'vega';
//import embed from 'vega-embed';
///import vegaEmbed, {Mode} from 'vega-embed';
//import 'vega-lite';
//import 'vega-embed';

//import vegaEmbed from 'vega-embed';
//import * as $ from 'jquery';
//var $  = require( 'jquery' );

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
  selector: 'page-essai1',
  templateUrl: 'essai1.html'
})
export class Essai1Page {

  estEdition: boolean = false;
  essai: any;
  //$  = require( 'jquery' );
  allEssais: any;
  //essaiType: Essai;
  variables: any = [];
  loading: boolean = true;
  rechercher: any = false;
  detailEssai: boolean = false;
  allTraitements: any = [];
  statistiqueTraitement: any = [];
  essais: any = [];
  essais_pour_annalyse: any = [];
  essais1: any = [];
  allOP: any = [];
  opEssai: any = [];
  annee: any = '';
  selectedAnnee: any;
  selectedGerants: any;
  selectedPrecedanteCultures: any;
  ancien_selectedAnnee: any;
  matricule_producteur: any;
  matricule_producteur1: any;
  nom_producteur1: any;
  refresher: any = '';
  //nom_producteur: any;
  //surnom_producteur: any;
  storageDirectory: string = '';
  a_matricule: boolean = false;
  recherche: any;// = global.config_app.code_structure+'-';
  //selectedDiff: any = 'PDE';
  //selectedVar: any = 'PDE';
  //selectedMed: any = 'PDE';
  //vegaData: any = [];
  //medianeData: any = [];
  selectedStyleTableau: any = 'standard';


  annees: any = [];
  selectedStyle: any = 'liste';
  //selectedStyle: any = 'tableau';
  aProfile: boolean = false;
  membre: any; 
  selectedLimit: any = 10;
  limits: any = [10, 25, 50, 100, 500, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 'Tous'];
  mode_semis: any = ['sec', 'humide'];
  //mode_semi: any = '';
  mode_semi_controle: any = '';
  typeRecherche: any = 'matricule';
  precedante_cultures: any = ['Arachide', 'Mil', 'Niébé', 'Sorgho', 'Souchet'];
  gerants: any = ['Moi', 'Mon mari', 'Ma femme', 'Mes fils', 'Mes frères', 'Mes soeurs', 'Manoeuvres'];
  //champs: any = [];
  //traitements: any = [];

  //code_union: any = '';
  essai1: any;
  grandEssai: any;
  //essaiForm: FormGroup;
  producteurs: any = [];
  selectedProducteur: any;
  champs: any = [];
  selectedChamps: any;
  traitements: any = [];
  selectedTraitement: any;
  sites: any = [];
  selectedSite: any;
  statistique: boolean = false;
  villages: any = [];
  selectedVillage: any;
  imei: any = '';
  phonenumber: any = '';
  //superficie_tr: any;
  ajoutForm: boolean = false;
  verifieT: boolean = false;
  selectedTraitementInfoComplet: any;
  id_traitement: any;

  ancienSelectedProducteur: any;
  modifierFrom: boolean = false;
  ancientCode_essai: any;
  statistiqueOk: boolean = false;
  ancien_code_traitement: any;

  essaiAModifier: any;
  estInstancier: boolean = false;
  a_champs: boolean = false;
  dateAjout:any;
  dateSemis: any;
  dateSemisControle: any;
  dateRecolte: any;
  testData: any = [];
  data:any
  user: any = global.info_user;
  global:any = global;
  estManager: boolean = false;
  estAnimataire: boolean = false;
  selectedProtocole: any;
  selectedProtocole1: any;
  selectedCultureProtocole: any;
  selectedCultureProtocole2: any;
  culturesProtocole1: any = [];
  culturesProtocole: any = [];
  culturesProtocole2: any = [];
  selectedCulture: any;
  protocoles: any = [];

  Essai: EssaiType;
  Culture_1: CultureType;
  Culture_2: CultureType;
  indexSelectedProtocole: number = -1;
  indexSelectedCultureProtocole: number;
  indexSelectedCultureProtocole1: number;
  indexSelectedCultureProtocole2: number;
  indexSelectedProtocoleAjout: number;
  repetitions: any = [];
  parcelles: any = [];
  blocs: any = [];
  systemes: any = [];
  typologies: any = []
 

  constructor(public navCtrl: NavController, public loadtingCtl: LoadingController, public toastCtl: ToastController, public ionicApp: IonicApp, public viewCtl: ViewController, public ServiceAutoCompletion: AutoCompletion, public sim: Sim, public device: Device, public modelCtl: ModalController, public a: App, public events: Events, public zone: NgZone, public navParams: NavParams, public menuCtl: MenuController, public printer: Printer, public file: File, public platform: Platform, public storage: Storage, public servicePouchdb: PouchdbProvider, public alertCtl: AlertController) {
    this.menuCtl.enable(false, 'options');
    this.menuCtl.enable(false, 'connexion');
    this.menuCtl.enable(false, 'profile');
    if(global.config_app.code_structure){
      this.recherche = global.config_app.code_structure+'-';
    }else{
      this.recherche = '';
    }
    
    this.Essai = new EssaiType();
    //this.servicePouchdb.reset()
    //this.zone = new NgZone({enableLongStackTrace: true})
    events.subscribe('user:login', (user) => {
      if(user){
        this.aProfile = true;
        this.estMangerConnecter(user)
        this.estAnimataireConnecter(user)
      }else{
        this.aProfile = false;
        this.estManager = false;
        this.estAnimataire = false;
        this.user = global.info_user;
      }

      
      //alert(user)
      /*this.servicePouchdb.remoteSaved.getSession((err, response) => {
        if (response.userCtx.name) {
          //this.aProfile = true;
          this.user = global.info_user;
        }else{
          this.aProfile = false;
          this.user = {};
        }
      }, err => console.log(err));*/
    });

    

    /*events.subscribe('ajout-essai', (essai) => {
      this.zone.run(() => {
        this.essais.push(essai)
      })
    });*/
    
    
    if(this.navParams.data.matricule_producteur){
      this.Essai.matricule_producteur = this.navParams.data.matricule_producteur;
      this.matricule_producteur1 = this.navParams.data.matricule_producteur;
      this.nom_producteur1 = this.navParams.data.nom_producteur;
      this.Essai.nom_producteur = this.navParams.data.nom_producteur;      
      this.membre = this.navParams.data.membre;
      this.Essai.surnom_producteur = this.navParams.data.surnom_producteur;

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

  choixCulture(protocole){
    if(protocole){
      this.changerCultureProtocole(protocole, true)
      this.selectedCulture = {};
      this.essais = [];
      this.allEssais = [];
    }
    
  }

  protocoleSelected(indexSelectedProtocole){
    if(indexSelectedProtocole > -1){
      this.selectedProtocole1 = this.protocoles[indexSelectedProtocole].doc.data;

      if(this.selectedProtocole1 && this.selectedProtocole1.type_culture != 'association'){
        this.selectedCulture = null;
        this.getEssaisByProtocole();
        //this.selectedCulture = {};
      }else if(this.selectedProtocole1 && this.selectedProtocole1.type_culture == 'association'){
        this.selectedCulture = null;
        this.indexSelectedCultureProtocole = -1;
        this.essais = [];
        this.allEssais = [];
        this.changerCultureProtocole(indexSelectedProtocole/*this.selectedProtocole1.code*/, true)
      }
    }
    
  }

  partager(_id){
    let ids: any = [];
    ids.push(_id);

    let alert = this.alertCtl.create({
      title: 'Information de connexion au du serveur',
      //cssClass: 'error',
      inputs: [
        {
          type: 'text',
          placeholder: 'Adrèsse hôte',
          name: 'ip',
          value: '@ip:5984'
        },
        {
          type: 'text',
          placeholder: 'Nom DB',
          name: 'nom_db',
          value: 'nom_db'
        },
        {
          type: 'text',
          placeholder: 'Nom d\'utilisateur',
          name: 'username',
          //value: info_db.ip
        },
        {
          type: 'password',
          placeholder: 'Mot de passe',
          name: 'passwd',
          //value: info_db.nom_db
        }
      ],
      buttons: [
        {
          //cssClass: 'error-border',
          text: 'Annuler',
          role: 'Cancel',
          handler: () => console.log('Changement ip serveur annuler')
        },
        {
          text: 'Valider',
          handler: (data) => {
            let ip = data.ip.toString();
            let nom_db = data.nom_db.toString();
            let username = data.username.toString();
            let passwd = data.passwd.toString();
            let ids:any = [];
            ids.push(_id);
            this.servicePouchdb.replicationByDocsId(ids, ip, nom_db, username, passwd);
          }
        }
      ]
    }); 

    alert.present();
    
  }


  choixEssai(/*culture*/){
    if(this.selectedProtocole1.code/* && culture*/){
      this.changerCultureProtocole1(this.selectedProtocole1);
      this.rechercher = true;
      if(this.selectedAnnee === 'Tous'){
        if(this.selectedLimit === 'Tous'){
        // this.servicePouchdb.getPlageDocs('fuma:essai', 'fuma:essai:\uffff').then((e) => {
          //   if(e){
                //cas ou le producteur est connu
                let ess: any = [];
                if(this.matricule_producteur1){
                  this.servicePouchdb.getPlageDocsRapide('fuma:essai:'+this.matricule_producteur1, 'fuma:essai:'+this.matricule_producteur1+' \uffff').then((e) => {
                    if(e){
                      e.forEach((es) => {
                        if(es.doc.data.code_protocole == this.selectedProtocole1.code/*choixEssai(selectedCulture.nom_culture)*/){
                          ess.push(es);
                        }
                      });
                      this.essais = ess;
                      this.allEssais = ess;
                      this.rechercher = false;
                    }else{
                      this.rechercher = false;
                    }

                  })
                }else{
                  //sinon
                  this.servicePouchdb.getPlageDocsRapide('fuma:essai', 'fuma:essai:\uffff').then((e) => {
                    if(e){
                      e.forEach((es) => {
                        if(es.doc.data.code_protocole == this.selectedProtocole1.code/*choixEssai(selectedCulture.nom_culture)*/){
                          ess.push(es);
                        }
                      });
                      this.essais = ess;
                      this.allEssais = ess;
                      this.rechercher = false;
                    }else{
                      this.rechercher = false;
                    }
                  });
                
                }
            
            //  }
          // });
          }else{
          // this.servicePouchdb.getPlageDocsAvecLimit('fuma:essai', 'fuma:essai:\uffff', this.selectedLimit).then((e) => {
            // if(e){
                //cas ou le producteur est connu
                let ess: any = [];
                if(this.matricule_producteur1){
                  this.servicePouchdb.getPlageDocsRapideAvecLimit('fuma:essai:'+this.matricule_producteur1, 'fuma:essai:'+this.matricule_producteur1+' \uffff', this.selectedLimit).then((e) => {
                    if(e){
                      e.forEach((es) => {
                        if(es.doc.data.code_protocole == this.selectedProtocole1.code/*choixEssai(selectedCulture.nom_culture)*/){
                          ess.push(es);
                        }
                      })
                      this.essais = ess;
                      //this.allEssais = e;
                      this.rechercher = false;
                    }else{
                      this.rechercher = false;
                    }
                  });

                  this.servicePouchdb.getPlageDocsRapide('fuma:essai:'+this.matricule_producteur1, 'fuma:essai:'+this.matricule_producteur1+' \uffff').then((e) => {
                    if(e){
                    // this.essais = e;
                    let ess1 :any = [];
                      e.forEach((es) => {
                        if(es.doc.data.code_protocole == this.selectedProtocole1.code/*choixEssai(selectedCulture.nom_culture)*/){
                          ess1.push(es);
                        }
                      })
                      this.allEssais = ess1;
                      //this.rechercher = false;
                    }
                  // this.champs = c;
                    //this.allChamps = c;
                  })

                }else{
                  //sinon
                  this.statistiqueOk = false;
                  this.servicePouchdb.getPlageDocsRapideAvecLimit('fuma:essai', 'fuma:essai:\uffff', this.selectedLimit).then((e) => {
                    if(e){
                      e.forEach((es) => {
                        if(es.doc.data.code_protocole == this.selectedProtocole1.code/*choixEssai(selectedCulture.nom_culture)*/){
                          ess.push(es);
                        }
                      })
                      this.essais = ess;
                      //this.allEssais = e;
                      this.rechercher = false;
                    }else{
                      this.rechercher = false;
                    }

                  });

                  this.servicePouchdb.getPlageDocsRapide('fuma:essai', 'fuma:essai:\uffff').then((e) => {
                    if(e){
                      let ess1: any = [];
                      e.forEach((es) => {
                        if(es.doc.data.code_protocole == this.selectedProtocole1.code/*choixEssai(selectedCulture.nom_culture)*/){
                          ess1.push(es);
                        }
                      })
                      this.allEssais = ess1;
                      this.statistiqueOk = true;
                      //this.rechercher = false;
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
                          if(es.doc.data.annee_essai === this.selectedAnnee && es.doc.data.code_protocole == this.selectedProtocole1.code/*choixEssai(selectedCulture.nom_culture)*/){
                            ess.push(es);
                          }
                        });
                      this.essais = ess;
                      this.allEssais = ess;
                      this.rechercher = false;
                    }else{
                      this.rechercher = false;
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
                  this.statistiqueOk = false;
                  this.servicePouchdb.getPlageDocsRapide('fuma:essai', 'fuma:essai:\uffff').then((e) => {
                    if(e){
                      let ess: any = [];
                      e.forEach((es, i) => {
                          if(es.doc.data.annee_essai === this.selectedAnnee && es.doc.data.code_protocole == this.selectedProtocole1.code/*choixEssai(selectedCulture.nom_culture)*/){
                            ess.push(es);
                          }
                        });
                      this.essais = ess;
                      this.allEssais = ess;
                      this.statistiqueOk =  true;
                      this.rechercher = false;
                    }else{
                      this.rechercher = false;
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

                  this.statistiqueOk =  false;
                  if(this.matricule_producteur1){
                    this.servicePouchdb.getPlageDocsRapideAvecLimit('fuma:essai:'+this.matricule_producteur1, 'fuma:essai:'+this.matricule_producteur1+' \uffff', this.selectedLimit).then((e) => {
                    if(e){
                      let ess: any = [];
                      e.forEach((es, i) => {
                          if(es.doc.data.annee_essai == this.selectedAnnee && es.doc.data.code_protocole == this.selectedProtocole1.code/*choixEssai(selectedCulture.nom_culture)*/){
                            ess.push(es);
                          }
                        });
                      this.essais = ess;
                      //this.allEssais = ess;
                      this.rechercher = false;
                    }else{
                      this.rechercher = false;
                    }
                  });

                  this.servicePouchdb.getPlageDocsRapide('fuma:essai:'+this.matricule_producteur1, 'fuma:essai:'+this.matricule_producteur1+' \uffff').then((e) => {
                    if(e){
                      let ess: any = [];
                      e.forEach((es, i) => {
                          if(es.doc.data.annee_essai === this.selectedAnnee && es.doc.data.code_protocole == this.selectedProtocole1.code/*choixEssai(selectedCulture.nom_culture)*/){
                            ess.push(es);
                          }
                        });
                    // this.essais = ess;
                      this.allEssais = ess;
                      this.statistiqueOk = true;
                      //this.rechercher = false;
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
                    this.statistiqueOk = false;
                    this.servicePouchdb.getPlageDocsRapideAvecLimit('fuma:essai', 'fuma:essai:\uffff', this.selectedLimit).then((e) => {
                      if(e){
                        let ess: any = [];
                          e.forEach((es, i) => {
                              if(es.doc.data.annee_essai === this.selectedAnnee && es.doc.data.code_protocole == this.selectedProtocole1.code/*choixEssai(selectedCulture.nom_culture)*/){
                                ess.push(es);
                              }
                            });
                        this.essais = ess;
                        //this.allEssais = ess;
                        this.rechercher = false;
                    }else{
                      this.rechercher = false;
                    }
                    });


                    this.servicePouchdb.getPlageDocsRapide('fuma:essai', 'fuma:essai:\uffff').then((e) => {
                    if(e){
                      let ess: any = [];
                      e.forEach((es, i) => {
                          if(es.doc.data.annee_essai === this.selectedAnnee && es.doc.data.code_protocole == this.selectedProtocole1.code/*choixEssai(selectedCulture.nom_culture)*/){
                            ess.push(es);
                          }
                        });
                      //this.essais = ess;
                      this.allEssais = ess;
                      this.statistiqueOk =  true;
                      //this.rechercher = false;
                    }
                  });
                    
                  }
              // }
            // });
            }

            
        }
        
       // this.chargerTraitements(this.selectedAnnee)
    }
    
  }

  resetEssai(){
    /*this.selectedChamps = null;
    this.selectedCultureProtocole = null;
    this.selectedGerants = null;
    this.selectedPrecedanteCultures = null;
    this.selectedProducteur = null;
    this.selectedProtocole = null;
    this.selectedSite = null;
    this.selectedVillage = null;*/
    this.Essai.today = null;
    this.Essai.type= null,
    this.Essai.code_essai= null
    this.Essai.code_union= null
    this.Essai.annee_essai= null;
    this.Essai.code_protocole= null;
    this.Essai.nom_protocole= null;
    //this.Essai.culture= null;
    this.Essai.id_site_producteur= null;
    this.Essai.site_producteur= null;
    this.Essai.id_village_producteur= null; 
    this.Essai.village_producteur= null; 
    this.Essai.matricule_producteur= null;
    this.Essai.nom_producteur= null;
    this.Essai.surnom_producteur= null;
    this.Essai.sex_producteur= null;
    this.Essai.code_traitement= null;
    this.Essai.superficie_standard= null;
    this.Essai.id_traitement= null;
    this.Essai.nom_entree= null;
    this.Essai.nom_controle= null;
    this.Essai.id_champs= null;
    this.Essai.nom_champs= null;
    this.Essai.superficie= null;
    //this.Essai.superficie_essai= null;
    this.Essai.type_sole= null;
    this.Essai.longitude = null;
    this.Essai.latitude= null;
    //this.Essai.variete= null;
    //this.Essai.variables = [],

    this.Essai.gerants = [],
    this.Essai.precedante_cultures = [],
    this.Essai.objectif_essai = null;
    this.Essai.effort_personnel = false,
    this.Essai.estValide = true,
    this.Essai.deviceid= null;
    this.Essai.imei= null;
    this.Essai.phonenumber= null;
    this.Essai.update_deviceid= null;
    this.Essai.update_phonenumber= null;
    this.Essai.update_imei= null;
    this.Essai.start= null;
    this.Essai.end= null;
  }

  chargerProtocole(annee){
    this.servicePouchdb.getPlageDocsRapide('fuma:protocole', 'fuma:protocole:\uffff').then((p) => {
      if(p){
        let ps: any = [];
        p.forEach((protocole) => {
          if(protocole.doc.data.annee == annee){
            ps.push(protocole);
          }
        });
        this.protocoles = ps;

        //Au cas ou il n'y q qu'un seul protocole, selectionnez le automatiquement afin de simplifier la tache d'ajout
        if(this.ajoutForm && (this.protocoles.length === 1)){
          this.indexSelectedProtocoleAjout = 0;
          this.changerCultureProtocole(this.indexSelectedProtocoleAjout, false)
        }

      }
    });


  }

  getEssais(refresher: any = ''){
    //this.refresher = refresher;
    if(this.selectedProtocole1 && this.selectedProtocole1.type_culture != 'association'){
      //this.changerCultureProtocole1(this.selectedProtocole1);
      this.getEssaisByProtocole(refresher);
      this.refrecheProtocoleAndCulture();
    }else if(this.selectedProtocole1 && this.indexSelectedCultureProtocole >= 0){
      this.indexSelectedCultureProtocole = 0;
      //this.selectedCulture = this.culturesProtocole[0].doc.data;
      this.getEssaisByProtocoleAndCulture(refresher);
      this.refrecheProtocoleAndCulture();
    }else{
      this.refresher = refresher;
      this.refresher.complete();
    }

  }


  refrecheProtocoleAndCulture(){
    this.servicePouchdb.getPlageDocsRapide('fuma:protocole', 'fuma:protocole:\uffff').then((p) => {
      if(p){
        let ps: any = [];
        p.forEach((protocole) => {
          if(protocole.doc.data.annee == this.selectedAnnee){
            ps.push(protocole);
          }
        });
        this.protocoles = ps;
        this.changerCultureProtocole(this.indexSelectedProtocole/*this.selectedProtocole1.code*/, true)
      }
    });
  }
  initEssai(){
    this.rechercher = true;
    this.servicePouchdb.getPlageDocsRapide('fuma:protocole', 'fuma:protocole:\uffff').then((p) => {
      if(p){
        let ps: any = [];
        p.forEach((protocole) => {
          if(protocole.doc.data.annee == this.selectedAnnee){
            ps.push(protocole);
          }
        });
        this.protocoles = ps;
        if(this.protocoles.length > 0){
          this.indexSelectedProtocole = 0;
          this.selectedProtocole1 = this.protocoles[0].doc.data;

          if(this.selectedProtocole1.type_culture != 'association'){
            //this.changerCultureProtocole1(this.selectedProtocole1);
            this.getEssaisByProtocole();
          }
          else{
            ///charger les cultures du protocole
            this.servicePouchdb.getPlageDocsRapide('fuma:culture-protocole', 'fuma:culture-protocole:\uffff').then((cp) => {
              if(cp){
                let cps:any = [];
                cp.forEach((cpro) => {
                  if(cpro.doc.data.code_protocole == this.selectedProtocole1.code){
                    cps.push(cpro);
                  }
                });
                this.culturesProtocole = cps;
                this.culturesProtocole1 = cps;
                if(this.culturesProtocole.length > 0){
                  this.indexSelectedCultureProtocole = 0;
                  //this.selectedCulture = this.culturesProtocole[0].doc.data;
                  this.getEssaisByProtocoleAndCulture();
                }else{
                  this.rechercher = false;
                }
              }else{
                this.rechercher = false;
              }
            });
          }


        }else{
          this.rechercher = false;
        }
      }else{
        this.rechercher = false;
      }
    });
  }


/*  initEssai(){
    this.rechercher = true;
    this.servicePouchdb.getPlageDocsRapide('fuma:protocole', 'fuma:protocole:\uffff').then((p) => {
      if(p){
        let ps: any = [];
        p.forEach((protocole) => {
          if(protocole.doc.data.annee == this.selectedAnnee){
            ps.push(protocole);
          }
        });
        this.protocoles = ps;
        if(this.protocoles.length > 0){
          this.selectedProtocole1 = this.protocoles[0].doc.data;
          ///charger les cultures du protocole
          this.servicePouchdb.getPlageDocsRapide('fuma:culture-protocole', 'fuma:culture-protocole:\uffff').then((cp) => {
            if(cp){
              let cps:any = [];
              cp.forEach((cpro) => {
                if(cpro.doc.data.code_protocole == this.selectedProtocole1.code){
                  cps.push(cpro);
                }
              });
              this.culturesProtocole = cps;
              if(this.culturesProtocole.length > 0){
                this.selectedCulture = this.culturesProtocole[0].doc.data;
                this.getEssais();
              }else{
                this.rechercher = false;
              }
            }else{
              this.rechercher = false;
            }
          });
        }else{
          this.rechercher = false;
        }
      }else{
        this.rechercher = false;
      }
    });
  }
*/

changerCultureProtocole1(selectedProtocole1){
  if(selectedProtocole1){
    this.servicePouchdb.getPlageDocsRapide('fuma:culture-protocole', 'fuma:culture-protocole:\uffff').then((cp) => {
      if(cp){
        let cps:any = [];
        cp.forEach((cpro) => {
          if(cpro.doc.data.code_protocole == selectedProtocole1.code){
            cps.push(cpro);
         
          }
        });
        this.culturesProtocole1 = cps;
      }
    });
  }
  
}

  changerCultureProtocole(indexSelectedProtocoleAjout, list: any = false, reAjou: boolean = false){
    if(!reAjou){
      if(indexSelectedProtocoleAjout > -1){
        this.selectedProtocole = this.protocoles[indexSelectedProtocoleAjout].doc.data;

        if(this.selectedProtocole){
          this.servicePouchdb.getPlageDocsRapide('fuma:culture-protocole', 'fuma:culture-protocole:\uffff').then((cp) => {
            if(cp){
              let cps:any = [];
              cp.forEach((cpro) => {
                if(/*!list && */cpro.doc.data.code_protocole == this.selectedProtocole.code){
                  cps.push(cpro);
                /*}else if(list && cpro.doc.data.code_protocole == this.selectedProtocole){
                  cps.push(cpro);*/
                }
              });
              this.culturesProtocole = cps;
              this.culturesProtocole2 = cps;
              if(list && this.culturesProtocole && this.culturesProtocole.length > 0){
                this.indexSelectedCultureProtocole = 0;
                //this.selectedCulture = this.culturesProtocole[0].doc.data;
                this.getEssaisByProtocoleAndCulture();
              }

              if(!list){
                this.Culture_1 = new CultureType();
                if(this.culturesProtocole.length){
                  this.indexSelectedCultureProtocole1 = 0;
                  this.changerInfoCultureProtocole(this.indexSelectedCultureProtocole1)
                }
                if(this.Essai.type_culture == 'association'){
                  this.Culture_2 = new CultureType();
                  if(this.culturesProtocole.length > 1){
                    this.indexSelectedCultureProtocole2 = 1;
                    this.changerInfoCultureProtocole2(this.indexSelectedCultureProtocole2)
                  }
                }
              }
            }
          });
      
          if(!list){
            this.Essai.nom_protocole = this.selectedProtocole.nom;
            this.Essai.traitement = this.selectedProtocole.traitement;
            this.Essai.code_protocole = this.selectedProtocole.code;
            this.Essai.type_culture = this.selectedProtocole.type_culture;
            this.Essai.type_essais = this.selectedProtocole.type_essais;
            if(this.selectedProtocole.avec_repetition == 'oui'){
              this.repetitions = [];
              for(let i = 1; i <= this.selectedProtocole.nb_repetition; i++){
                this.repetitions.push(i);
              }
            }

            if(this.selectedProtocole.avec_parcelle == 'oui'){
              this.parcelles = [];
              for(let i = 1; i <= this.selectedProtocole.nb_parcelle; i++){
                this.parcelles.push(i);
              }
            }

            if(this.selectedProtocole.avec_bloc == 'oui'){
              this.blocs = [];
              for(let i = 1; i <= this.selectedProtocole.nb_bloc; i++){
                this.blocs.push(i);
              }
            }

            if(this.selectedProtocole.avec_systeme == 'oui'){
              this.systemes = [];
              for(let i = 1; i <= this.selectedProtocole.nb_systeme; i++){
                this.systemes.push(i);
              }
            }
            

            
            //this.superficie_tr = t.data.superficie;
            //this.Essai.superficie_essai = t.data.superficie;
            if(this.selectedProtocole.traitement == 'non'){
              this.Culture_1.superficie_essai = this.selectedProtocole.superficie_essais;
              if(this.Essai.type_essais == 'avec controle'){
                this.Culture_1.superficie_controle = this.selectedProtocole.superficie_essais;
              }

              if(this.Essai.type_culture == 'association'){
                this.Culture_2.superficie_essai = this.selectedProtocole.superficie_essaise;
                if(this.Essai.type_essais == 'avec controle'){
                  this.Culture_2.superficie_controle = this.selectedProtocole.superficie_essais;
                }
              }
              this.Essai.superficie_standard = this.selectedProtocole.superficie_essais;
            }
          
            //this.selectedCulture = null;
            this.traitements = [];
            this.selectedTraitement = null;
            this.selectedCultureProtocole = null;
            this.culturesProtocole = [];
            //this.Essai.variete = null;
            //this.Essai.variables = [];
            if(this.Essai.traitement == 'oui'){
              this.reinitT();
              this.chargerTraitements(this.Essai.annee_essai, this.selectedProtocole);
            }

          }
          
        }

        this.Essai.typologie = this.selectedProtocole.typologie;
        if(this.selectedProtocole.typologie == 'oui'){
          this.Essai.annee_typologie = this.selectedProtocole.annee_typologie;
          this.getTypologieProducteur(this.Essai.matricule_producteur, this.Essai.annee_typologie)
        }else{
          this.Essai.classes_producteur = [];
        }
        
      }
    }else{
       
        this.Essai.nom_protocole = this.selectedProtocole.nom;
        this.Essai.traitement = this.selectedProtocole.traitement;
        this.Essai.code_protocole = this.selectedProtocole.code;
        this.Essai.type_culture = this.selectedProtocole.type_culture;
        this.Essai.type_essais = this.selectedProtocole.type_essais;
        if(this.selectedProtocole.avec_repetition == 'oui'){
          this.repetitions = [];
          for(let i = 1; i <= this.selectedProtocole.nb_repetition; i++){
            this.repetitions.push(i);
          }
        }

        if(this.selectedProtocole.avec_parcelle == 'oui'){
          this.parcelles = [];
          for(let i = 1; i <= this.selectedProtocole.nb_parcelle; i++){
            this.parcelles.push(i);
          }
        }

        if(this.selectedProtocole.avec_bloc == 'oui'){
          this.blocs = [];
          for(let i = 1; i <= this.selectedProtocole.nb_bloc; i++){
            this.blocs.push(i);
          }
        }

        if(this.selectedProtocole.avec_systeme == 'oui'){
          this.systemes = [];
          for(let i = 1; i <= this.selectedProtocole.nb_systeme; i++){
            this.systemes.push(i);
          }
        }

        this.Culture_1 = new CultureType();
        if(this.culturesProtocole.length){
          this.indexSelectedCultureProtocole1 = 0;
          this.changerInfoCultureProtocole(this.indexSelectedCultureProtocole1)
        }
        if(this.Essai.type_culture == 'association'){
          this.Culture_2 = new CultureType();
          if(this.culturesProtocole.length > 1){
            this.indexSelectedCultureProtocole2 = 1;
            this.changerInfoCultureProtocole2(this.indexSelectedCultureProtocole2)
          }
        }
        
        //this.superficie_tr = t.data.superficie;
        //this.Essai.superficie_essai = t.data.superficie;
        if(this.selectedProtocole.traitement == 'non'){
          this.Culture_1.superficie_essai = this.selectedProtocole.superficie_essais;
          if(this.Essai.type_essais == 'avec controle'){
            this.Culture_1.superficie_controle = this.selectedProtocole.superficie_essais;
          }

          if(this.Essai.type_culture == 'association'){
            this.Culture_2.superficie_essai = this.selectedProtocole.superficie_essaise;
            if(this.Essai.type_essais == 'avec controle'){
              this.Culture_2.superficie_controle = this.selectedProtocole.superficie_essais;
            }
          }
          this.Essai.superficie_standard = this.selectedProtocole.superficie_essais;
        }
      
        //this.selectedCulture = null;
        this.traitements = [];
        this.selectedTraitement = null;
        //this.selectedCultureProtocole = null;
        //this.culturesProtocole = [];
        //this.Essai.variete = null;
        //this.Essai.variables = [];
        if(this.Essai.traitement == 'oui'){
          this.reinitT();
          this.chargerTraitements(this.Essai.annee_essai, this.selectedProtocole);
        }
      
        this.Essai.typologie = this.selectedProtocole.typologie;
        if(this.selectedProtocole.typologie == 'oui'){
          this.Essai.annee_typologie = this.selectedProtocole.annee_typologie;
          this.getTypologieProducteur(this.Essai.matricule_producteur, this.Essai.annee_typologie)
        }else{
          this.Essai.classes_producteur = [];
        }
        
    }
    
    
  }


  changerCultureProtocoleCode(code_protocoole,  estEdition){
    this.servicePouchdb.getPlageDocsRapide('fuma:culture-protocole', 'fuma:culture-protocole:\uffff').then((cp) => {
      if(cp){
        let cps:any = [];
        let index = -1;
        cp.forEach((cpro) => {
          if(cpro.doc.data.code_protocole == code_protocoole){
            cps.push(cpro);
            index++;
            if(estEdition){
              //alert(cpro.doc.data.nom_culture+' == '+this.Essai.culture)
              if(cpro.doc.data.nom_culture == this.Essai.cultures[0].culture){
                this.indexSelectedCultureProtocole1 = index;
                this.selectedCultureProtocole = cpro.doc.data;
                //alert('ici '+this.selectedCultureProtocole.nom_culture)
                //this.Essai.culture = selectedCultureProtocole.nom_culture;
                //this.Essai.variables = selectedCultureProtocole.variables;
                //this.changerInfoCultureProtocole(this.selectedCultureProtocole);
              }

              if(this.Essai.type_culture == 'association' && (cpro.doc.data.nom_culture == this.Essai.cultures[1].culture)){
                this.selectedCultureProtocole2 = cpro.doc.data;
                this.indexSelectedCultureProtocole2 = index;
              }
            }
          }
        });
        this.culturesProtocole = cps;
        this.culturesProtocole2 = cps;
      }
    });

    if(!estEdition){
      this.chargerSlecteProtocole(code_protocoole);
    }
    
    //this.Essai.nom_protocole = selectedProtocole.nom;
    //this.Essai.code_essai = selectedProtocole.code;
  }


  changerInfoCultureProtocole(indexSelectedCultureProtocole1){
    if(this.culturesProtocole && this.culturesProtocole.length > 0 && indexSelectedCultureProtocole1 > -1){
      this.selectedCultureProtocole = this.culturesProtocole[indexSelectedCultureProtocole1].doc.data;
      if(!this.estEdition){
        this.Culture_1.culture = this.selectedCultureProtocole.nom_culture;
        if(this.selectedCultureProtocole.varietes.length == 1){
          this.Culture_1.variete = this.selectedCultureProtocole.varietes[0];
        }
        this.Culture_1.variables_essai = this.clone(this.selectedCultureProtocole.variables);
        if(this.Essai.type_essais == 'avec controle'){
          this.Culture_1.variables_controle = this.clone(this.selectedCultureProtocole.variables);
        }
      }
    }
    
  }

  changerInfoCultureProtocole2(indexSelectedCultureProtocole2){
    if(this.culturesProtocole2 && this.culturesProtocole2.length > 0 && indexSelectedCultureProtocole2 > -1){
      this.selectedCultureProtocole2 = this.culturesProtocole2[indexSelectedCultureProtocole2].doc.data;
      if(!this.estEdition){
        this.Culture_2.culture = this.selectedCultureProtocole2.nom_culture;
        if(this.selectedCultureProtocole2.varietes.length == 1){
          this.Culture_2.variete = this.selectedCultureProtocole2.varietes[0];
        }
        this.Culture_2.variables_essai = this.clone(this.selectedCultureProtocole2.variables);
        if(this.Essai.type_essais == 'avec controle'){
          this.Culture_2.variables_controle = this.clone(this.selectedCultureProtocole2.variables);
        }
      }
    }
  }

  clone(obj) {
    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) {return obj};

    // Handle Date
    if (obj instanceof Date) {
        var copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
        let copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = this.clone(obj[i]);
        }
        return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
        let copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = this.clone(obj[attr]);
        }
        return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
}

   estMangerConnecter(user){
    if(user && user.roles){
      this.estManager = global.estManager(user.roles);
    }
  }

  copierDB(){
    //this.servicePouchdb.copierDB();
  let codes_unions: any = {};
    //let unions: any = ['WA', 'DO']
    let loading = this.loadtingCtl.create({
      content: 'Transfert essais en cours...'
    });
    loading.present();
      if(this.allEssais){
        //alert('nbdoc == '+this.allEssais.length);
        this.allEssais.forEach((ess) => {
          let doc = ess.doc
          //copier les données vers la nouvelle base données
          /*if(doc.type && doc.type != '' && doc.type != 'photo' && doc.data){
            var newDoc: any = {};
            newDoc._id = doc._id;
            newDoc.type = doc.type;
            newDoc.data = doc.data;
            copie_db.put(newDoc);
          }else */
          if(doc.data.code_union == 'WA' || doc.data.code_union == 'DO' || doc.data.code_union == 'JA' || doc.data.code_union == 'HA' || doc.data.code_union == 'AM' || doc.data.code_union == 'SA' || !doc.data.code_union){
            var newDoc: any = {};
            newDoc._id = doc._id;
            newDoc.data = doc.data;
            newDoc.rev = doc._rev;

            this.updateCopieDoc(newDoc)
            //alert(doc._rev.substring(0, doc._rev.indexOf('-')))
            /*copie_db.put(newDoc).then((res) => {
              this.updateCopieDco(newDoc, doc);
            }) .catch(err => { alert('err '+err) });*/

          }/*else if(doc.type && doc.type != '' && doc.type == 'photo' && (doc.code_union == 'WA' || doc.code_union == 'DO' || doc.code_union == 'SA' || !doc.code_union)){
    
              //var fileName = photoDocId + '.jpeg';  
              var newPhoto: any = {};
              newPhoto._id = doc._id;
              //newPhoto._attachments[fileName] = doc._attachments[fileName];
              newPhoto.photoID =  doc.photoID;
              newPhoto.timestamp = doc.timestamp;
              newPhoto.type = doc.type;
              newPhoto.code_union = doc.code_union;
              newPhoto._attachments = doc._attachments;
              newPhoto.rev = doc._rev;
              this.updateCopieDoc(newPhoto)
              //copie_db.put(doc).catch(err => { alert('err tof '+err) })
        
          }*//*else{

          }*/
        });

        loading.dismiss();
      }

  }

  updateCopieDoc(newDoc){

     var copie_db = new PouchDB('http://'+ global.info_db.ip+'/copie_db', {
      /*auth: {
        username: 'admin',
        password: 'admin'
      }*/
      ajax: {
        timeout: 4800000,
      }
    });
    //let i = parseInt(doc._rev.substring(0, doc._rev.indexOf('-')))
    if(!newDoc._rev || newDoc._rev !== ''){
      //var newDoc: any = {};
      //newDoc._id = oldDoc._id;
      //newDoc.data = oldDoc.data;
      copie_db.put(newDoc).then((res) => {
        newDoc._rev = res.rev;
        //this.updateCopieDoc(newDoc);
      }).catch(err => { alert('err '+err) })
    }else{
      if(parseInt(newDoc._rev.substring(0, newDoc._rev.indexOf('-'))) < parseInt(newDoc.rev.substring(0, newDoc.rev.indexOf('-')))){
        copie_db.put(newDoc).then((res) => {
          newDoc._rev = res.rev;
          //this.updateCopieDoc(newDoc);
        }).catch(err => { alert('err rec '+err) })
      }
    }
    
    
  }

   estAnimataireConnecter(user){
    if(user && user.roles){
      this.estAnimataire = global.estAnimataire(user.roles);
    }
  }

  identify(index, essai){
    return essai.doc._id;
  }

  existeProducteur(matricule){
    for(let i = 0; i < this.producteurs.length; i++){
      if(matricule === this.producteurs[i].doc.data.matricule_Membre){
        return 1;
      }
    }

    return 0;
  }

  preparerDannePourAnnalyse(essai){
    let essai_data: any = [];
    essai.forEach((ess) => {
      essai_data.push(ess.doc.data);
    });

    return essai_data;
  }

  viewResearch(spec) {
    //this.navCtrl.push('ResearchViewPage', {'res': res})
    let modal = this.modelCtl.create('VegaLitePage', { 'visSpec': this.data });
    modal.present();
  }

  openMap(essais){
    let modal = this.modelCtl.create('LeafletPage', { 'essais': essais, 'type': 'essai' });
    modal.present();
  }


  myHeaderFn(record, recordIndex, records){
    if(recordIndex % 20 === 0){
      return '' + recordIndex;
    }

    return null;
  }


  setDateCulture1(ev: any, i){
    let d = new Date(ev)
    //this.today = this.createDate(d.getDate(), d.getMonth(), d.getFullYear());
    this.Culture_1.variables_essai[i].valeur_variable =  this.createDate(d.getDate(), d.getMonth(), d.getFullYear());
    //alert(ev +' -> d = '+d +' -> dd = '+dd);
    //this.dateAjout = ev;
  }

  setDateCulture1Controle(ev: any, i){
    let d = new Date(ev)
    //this.today = this.createDate(d.getDate(), d.getMonth(), d.getFullYear());
    this.Culture_1.variables_controle[i].valeur_variable =  this.createDate(d.getDate(), d.getMonth(), d.getFullYear());
    //alert(ev +' -> d = '+d +' -> dd = '+dd);
    //this.dateAjout = ev;
  }

  setDateCulture2(ev: any, i){
    let d = new Date(ev)
    //this.today = this.createDate(d.getDate(), d.getMonth(), d.getFullYear());
    this.Culture_2.variables_essai[i].valeur_variable =  this.createDate(d.getDate(), d.getMonth(), d.getFullYear());
    //alert(ev +' -> d = '+d +' -> dd = '+dd);
    //this.dateAjout = ev;
  }


  setDateCulture2Controle(ev: any, i){
    let d = new Date(ev)
    //this.today = this.createDate(d.getDate(), d.getMonth(), d.getFullYear());
    this.Culture_2.variables_controle[i].valeur_variable =  this.createDate(d.getDate(), d.getMonth(), d.getFullYear());
    //alert(ev +' -> d = '+d +' -> dd = '+dd);
    //this.dateAjout = ev;
  }
  autreActionDate(ev: any){
    let d = new Date(ev)
    //this.today = this.createDate(d.getDate(), d.getMonth(), d.getFullYear());
    //alert(ev +' -> d = '+d +' -> dd = '+dd);
    this.dateAjout = ev;
    
  }

  setDateSemis(ev: any){
    let d = new Date(ev)
    //this.date_semis = this.createDate(d.getDate(), d.getMonth(), d.getFullYear());
    //this.date_semis_controle = this.date_semis;
    //alert(ev +' -> d = '+d +' -> dd = '+dd);
    this.dateSemis = ev;
    this.dateSemisControle = ev;
    if(this.ajoutForm){
      this.dateRecolte = ev;
    }

    if(this.modifierFrom){
      /*if(this.date_recolte){
        let dd = new Date(this.date_recolte);
        if(d < dd){
          this.date_recolte = '';
          this.dateRecolte = ev;
        }
      }else{
        this.dateRecolte = ev;
      }*/
    }

  }

  setDateSemisControle(ev: any){
    let d = new Date(ev)
    //this.date_semis_controle = this.createDate(d.getDate(), d.getMonth(), d.getFullYear());
    //alert(ev +' -> d = '+d +' -> dd = '+dd);
    this.dateSemisControle = ev;
    if(this.ajoutForm){
      //this.dateRecolte = ev;
    }

    if(this.modifierFrom){
      /*if(this.date_recolte){
        let dd = new Date(this.date_recolte);
        if(d < dd){
          //this.date_recolte = '';
          //this.dateRecolte = ev;
        }
      }else{
        //this.dateRecolte = ev;
      }*/
    }

  }

  setModeSemiControl(m){
    this.mode_semi_controle = m;
  }

  setGestionControle(g){
    //this.gestion_controle = g;
  }

  autreActionSemis(){
    /*if(this.date_semis || this.date_semis !== ''){
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
    }*/
  }

  autreActionSemisControle(){
    /*if(this.date_semis_controle || this.date_semis_controle !== ''){
      let alert = this.alertCtl.create({
        title: 'Autres actions',
        message: 'Voulez vous réinitialiser la date de sémis du controle ? <br> Ce-ci réinitialisera la date de recolte aussi!',
        buttons: [
          {
            text: 'Oui',
            handler: () => {
              this.date_semis_controle = '';
              this.dateSemisControle = new Date();
              this.dateRecolte = this.dateSemisControle;
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
    }*/
  }

  setDateRecolte(ev: any){
    let d = new Date(ev)
    //this.date_recolte = this.createDate(d.getDate(), d.getMonth(), d.getFullYear());
    //alert(ev +' -> d = '+d +' -> dd = '+dd);
    this.dateRecolte = ev;

  }
  
  autreActionRecolte(){
    /*if(this.date_semis || this.date_semis !== ''){
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
    }*/

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
    /*let maDate = new Date();
    this.dateAjout = maDate;
     let today = this.createDate(maDate.getDate(), maDate.getMonth(), maDate.getFullYear());
     this.essaiForm = this.formBuilder.group({
     // _id:[''],
      type:['essai'],
      code_essai:['', Validators.required],
      annee_essai: [maDate.getFullYear(), Validators.required],
      site_producteur:['', Validators.required],
      village_producteur:['', Validators.required], 
      matricule_producteur: [''],
      nom_producteur: ['', Validators.required],
      surnom_producteur: [''],
      sex_producteur: ['', Validators.required],
      code_traitement: [''],
      nom_entree: ['', Validators.required],
      nom_controle: ['', Validators.required],
      id_champs: ['', Validators.required],
      superficie: ['', Validators.required],
      superficie_essai: ['', Validators.required],
      type_sole: ['', Validators.required],
      longitude:[''],
      latitude: [''],

      ///variables
      date_semis: [''],
      date_semis_controle: [''],
      NPL: [''],
      NPL_controle: [''],
      gestion: [''],
      gestion_controle: [''],
      mode_semis: [''],
      mode_semis_controle: [''],
      date_recolte: [''],
      NPR: [''],
      NPR_controle: [''],
      PDE: [''],
      PDE_controle: [''],
      observation: [''],
      observation_controle: [''],

      ///fin variables
      gerants: [''],
      precedante_cultures: [''],
      //objectif_essai: [''],
      effort_personnel: [false],
      estValide: [true],
      today: [today],
      deviceid: [''],
      imei: [''],
      phonenumber: [''],
      start: [maDate.toJSON()],
      end: [''],
      variables: this.formBuilder.array([
        //this.initVariable(),
    ]),
    });
    */
  }

   pourCreerForm(){

      if(this.matricule_producteur1){
        //this.matricule_producteur = this.navParams.data.matricule_producteur;
        //this.nom_producteur = this. navParams.data.nom_producteur;
        //this.membre = this.navParams.data.membre;
        //this.annee = this.navParams.data.annee;
        this.producteurSelected(this.matricule_producteur1, this.nom_producteur1)
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
      //this.chargerTraitements(this.selectedAnnee)
  }

  getInfoSimEmei(){
    this.sim.getSimInfo().then(
        (info) => {
          if(info && info.cards && info.cards.length > 0){
            info.cards.forEach((infoCard) => {
              if(infoCard.phoneNumber){
                this.Essai.phonenumber = infoCard.phoneNumber;
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
    if(t && t.data){
      if(t.data.superficie && this.selectedProtocole && this.selectedProtocole.traitement == 'oui'){
        //this.superficie_tr = t.data.superficie;
        //this.Essai.superficie_essai = t.data.superficie;
        this.Culture_1.superficie_essai = t.data.superficie;
        if(this.Essai.type_essais == 'avec controle'){
          this.Essai.nom_controle = t.data.nom_controle;
          this.Culture_1.superficie_controle = t.data.superficie;
        }

        if(this.Essai.type_culture == 'association'){
          this.Culture_2.superficie_essai = t.data.superficie;
          if(this.Essai.type_essais == 'avec controle'){
            this.Culture_2.superficie_controle = t.data.superficie;
          }
        }

        this.Essai.superficie_standard = t.data.superficie;
        //this.Essai.superficie_tr = t.data.superficie;
      }else{
        //this.superficie_tr = '';
        //this.Essai.superficie_essai = '';
        //this.Essai.superficie_tr = '';
        this.Culture_1.superficie_essai = '';
        if(this.Essai.type_essais == 'avec controle'){
          this.Culture_1.superficie_controle = '';
          this.Essai.nom_controle = '';
        }

        if(this.Essai.type_culture == 'association'){
          this.Culture_2.superficie_essai = '';
          if(this.Essai.type_essais == 'avec controle'){
            this.Culture_2.superficie_controle = '';
          }
        }

        this.Essai.superficie_standard = '';
      }
      
      /*if(t.data.nom_controle){
        this.Essai.nom_controle = t.data.nom_controle;
      }else{
        this.Essai.nom_controle = '';
      }*/

      this.Essai.id_traitement = t._id;
      this.selectedTraitementInfoComplet = t.data;
    }
    
  }

  reinitT(){
    
    if(this.selectedTraitement != this.Essai.code_traitement)
      //this.superficie_tr = null;
      //this.Essai.superficie_essai = null;
      //this.Essai.superficie_tr = null;
    
      this.Essai.nom_entree = null;
      this.Essai.nom_controle = null;
    
      this.Essai.id_traitement = null;
      this.selectedTraitementInfoComplet = null;
  }



  dechargerT(){
    if(this.matricule_producteur1){
      this.Essai.code_essai = this.generateId(this.matricule_producteur1);
    }else{
      this.Essai.code_essai = null;
    }
     
    //this.Essai.culture = null;
    //this.Essai.variete = null;
    this.selectedCultureProtocole = null;
    this.selectedCultureProtocole2 = null;
    this.selectedTraitement = {};
    this.selectedTraitementInfoComplet = '';
    this.selectedGerants = {};
    this.selectedPrecedanteCultures = {};
    //this.Essai.superficie_tr = null;
    this.Essai.nom_controle = '';
    
    //this.Essai.variables = [];
    this.Essai.objectif_essai = null;
    this.Essai.effort_personnel = false;
    this.Essai.estValide = true;
    this.Essai.gerants = [];
    this.Essai.precedante_cultures = [];

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
      this.Essai.matricule_producteur = ev.matricule_Membre;
      this.chargerChamps(ev.matricule_Membre, ev.nom_Membre);
      this.Essai.code_essai = this.generateId(ev.matricule_Membre);
      //this.Essai.code_essai =  this.Essai.code_essai;

      this.producteurs.forEach((prod, index) => {
        prod = prod.doc;
        if(prod.data.matricule_Membre === ev.matricule_Membre){
          this.selectedProducteur = prod;
          //nom producteur
          this.Essai.nom_producteur = prod.data.nom_Membre;
          this.Essai.surnom_producteur = prod.data.surnom_Membre;
          this.Essai.code_union = prod.data.code_union;

          //sex producteur
          this.Essai.sex_producteur = prod.data.genre;
          
          //site
          this.Essai.id_site_producteur = prod.data.commune;
          this.Essai.site_producteur = prod.data.commune_nom;
         

          //village
          this.Essai.id_village_producteur = prod.data.village;
          this.Essai.village_producteur = prod.data.village_nom;
         
/*
          //classe
          if((prod.data.classe != 'AUTRE') && (!prod.data.classe_nom)){
            this.classe_producteur = prod.data.classe
          }else if(prod.data.classe != 'AUTRE' && prod.data.classe_nom){
            this.classe_producteur = prod.data.classe_nom;
          }else{
            this.classe_producteur = prod.data.classe_autre
          }
          */
        }
      });

      this.dechargerInfoChamps()

      if(this.selectedProtocole && this.selectedProtocole.typologie == 'oui'){
        this.getTypologieProducteur(this.Essai.matricule_producteur, this.Essai.annee_typologie)
      }/*else{
        this.Essai.classes_producteur = [];
      }*/
    }

  }

  reinitForm(){
    //this.matricule_producteur = null;
    //this.chargerChamps('');
   // this.champs = [];
    //this.code_essai = '';
   // this.resetEssai();
    
    this.selectedProducteur = null;
    this.selectedChamps = null;
    //this.selectedPrecedanteCultures = {};
    this.ancienSelectedProducteur = '';
    this.selectedGerants = [];
    this.selectedPrecedanteCultures = []
    this.selectedTraitement ='';
    this.ancien_code_traitement ='';
    this.ancientCode_essai = '';
    this.selectedTraitementInfoComplet = '';
    this.selectedProtocole = null;
    this.indexSelectedCultureProtocole1 = -1;
    this.indexSelectedCultureProtocole2 = -1;
    this.indexSelectedProtocoleAjout = -1;
    this.selectedCultureProtocole = null;
    this.selectedCultureProtocole2 = null;
   // this.culturesProtocole = [];
    this.champs = [];    
  }

    producteurSelected(matricule, nom){
    //alert('ici');

    this.chargerChamps(matricule, nom);
    this.Essai.code_essai = this.generateId(matricule);

    
        this.selectedProducteur = this.membre;
        //nom producteur
        this.Essai.nom_producteur = this.membre.data.nom_Membre;
        this.Essai.surnom_producteur = this.membre.data.surnom_Membre;

        //sex producteur
        this.Essai.sex_producteur = this.membre.data.genre;
        this.Essai.code_union = this.membre.data.code_union;
        
        //site
        this.Essai.id_site_producteur = this.membre.data.commune
        this.Essai.site_producteur = this.membre.data.commune_nom;
        //village
        this.Essai.id_village_producteur = this.membre.data.village
        this.Essai.village_producteur = this.membre.data.village_nom;

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
                      text: 'Ok',
                      handler: () => {
                        console.log('Ok producteur sns champs')
                       /* if(!this.modifierFrom){
                          this.ajoutForm = false;
                          this.reinitForm();
                          this.dechargerT();
                        }*/
                        
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


    getTypologieProducteur(matricule_producteur, annee){
      //this.typologies = [];
      this.Essai.classes_producteur = [];
      if(matricule_producteur && annee){
        this.servicePouchdb.getPlageDocsRapide('fuma:typologie:'+matricule_producteur, 'fuma:typologie:'+matricule_producteur+' \uffff').then((t) => {
          if(t){
            for(let i = 0; i < t.length; i++){
              if(t[i].doc.data.annee == annee){
                this.Essai.classes_producteur = t[i].doc.data.classes;
                break;
              }
            }
          }
        });
      }
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
                membre.data.nom_Membre = this.Essai.nom_producteur;
                membre.data.surnom_Membre = this.Essai.surnom_producteur;
                membre.data.matricule_Membre = this.Essai.matricule_producteur;
                //this.navCtrl.push('ChampsPage', {'matricule_producteur': this.matricule_producteur});
                this.navCtrl.push('ChampsPage', {'matricule_producteur': this.Essai.matricule_producteur, 'nom_producteur': this.Essai.nom_producteur, 'membre': membre})
              }        
            },
            {
              text: 'Ok',
              handler: () => console.log('annuler')
            }
          ]
        });

        alert.present();
      }
    }


    chargerTraitements(annee, protocole, edition: any = false){

      //charger les protocole de l'année
      //this.chargerProtocole(annee);
  
      //charegr les traitement
     /* if(this.ajoutForm){
        this.virifierT(annee);
      }else{*/
        let trm: any = [];
        this.servicePouchdb.getPlageDocsRapide('fuma:traitement', 'fuma:traitement:\uffff').then((t) => {
            if(t){
              this.allTraitements = t;

              t.map((row) => {
            
                  if(row.doc.data.annee === annee && row.doc.data.code_protocole == protocole.code){
                      trm.push(row);
                    }
              });
              this.traitements = trm;

              if(this.traitements.length <= 0){
                this.verifieT = false;
                let alert = this.alertCtl.create({
                  title: 'Avertissement',
                  message: 'Le traitement pour l\'années '+annee+ ' du protocole '+ protocole.nom+' n\'est pas défini!',
                  buttons: [
                    {
                      text: 'Définir traitement',
                      handler:  () => {
                        //this.navCtrl.push('AjouterTraitementPage', {'annee': this.selectedAnnee});
                        let model = this.modelCtl.create('TraitementPage', {'annee': annee, 'protocole': protocole});
                        
                        model.onDidDismiss((tr) => {
                          let trm: any = [];
                          if(tr){
                            tr.map((row) => {
                      
                            if(row.doc.data.annee === this.selectedAnnee && row.doc.data.code_protocole === this.selectedProtocole.code){
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
                      text: 'Ok',
                      handler: () =>  {
                       /* this.annuler();
                        //console.log('annuler')
                        //this.ajoutForm = false;
                        //this.reinitForm();
                        //this.dechargerT();
                        if(this.ancien_selectedAnnee){
                          this.selectedAnnee = this.ancien_selectedAnnee;
                        }*/
                        
                      }
                    }
                  ]
                });

                alert.present();

              }else{
                this.verifieT = true;
                if(edition){
                  this.chargerInfoTraitement1(this.Essai.code_traitement);
                }
              }
              
              }
          });
       // }
      
    }
    chargerInfoChamps(champs){
      if(champs && this.Essai.matricule_producteur){
        this.Essai.type_sole = champs.type_sole;
        this.Essai.superficie = champs.superficie;
        this.Essai.longitude = champs.longitude;
        this.Essai.latitude = champs.latitude;
        //this.nom_champs = champs.nom_champs;
      }
    }

    dechargerInfoChamps(){
        this.selectedChamps = {};
        this.Essai.type_sole = null;
        this.Essai.superficie = null;
        this.Essai.longitude = null;
        this.Essai.latitude = null;
        this.Essai.nom_champs = null;
        this.Essai.id_champs = null;
    }

    chargerInfoChampsID(id){
      if(id){
        this.champs.forEach((champs, i) => {
          champs = champs.doc;
          if(champs.data.id_champs === id){
            this.Essai.type_sole = champs.data.type_sole;
            this.Essai.superficie = champs.data.superficie;
            this.Essai.longitude = champs.data.longitude;
            this.Essai.latitude = champs.data.latitude;
            this.Essai.nom_champs = champs.data.nom;
            //this.essai1.nom_champs = champs.data.nom;
          }
        });
      }
      
    }

    chargerInfoTraitement(selectedTraitement, selected = true ){
      if(selectedTraitement && this.traitements.length > 0 && this.selectedProtocole && this.selectedProtocole.traitement == 'oui'){
        this.traitements.forEach((t, i) => {
          t = t.doc;
          if(t.data.code_traitement === selectedTraitement){
            if(selected){
              this.Essai.nom_entree = t.data.nom_entree;
              this.Essai.id_traitement = t._id;
              this.Essai.nom_controle = t.data.nom_controle;
              this.selectedTraitement = this.Essai.code_traitement;
              //this.superficie = t.data.superficie
              //this.selectedTraitement = this.nom_entree;
              if(t.data.superficie){
                //this.superficie_tr = t.data.superficie;
               // this.Essai.superficie_essai = t.data.superficie;
                this.Culture_1.superficie_essai = t.data.superficie;
                if(this.Essai.type_essais == 'avec controle'){
                  this.Culture_1.superficie_controle = t.data.superficie;
                }

                if(this.Essai.type_culture == 'association'){
                  this.Culture_2.superficie_essai = t.data.superficie;
                  if(this.Essai.type_essais == 'avec controle'){
                    this.Culture_2.superficie_controle = t.data.superficie;
                  }
                }

                this.Essai.superficie_standard = t.data.superficie;
               // this.Essai.superficie_tr = t.data.superficie;
              }else{
                //this.superficie_tr = '';
               // this.Essai.superficie_essai = '';
                this.Culture_1.superficie_essai = '';
                if(this.Essai.type_essais == 'avec controle'){
                  this.Culture_1.superficie_controle = '';
                }

                if(this.Essai.type_culture == 'association'){
                  this.Culture_2.superficie_essai = '';
                  if(this.Essai.type_essais == 'avec controle'){
                    this.Culture_2.superficie_controle = '';
                  }
                }

                this.Essai.superficie_standard = '';
                //this.Essai.superficie_tr = '';
              }
              
              //this.selectedTraitementInfoComplet = 
            }
  
            this.selectedTraitementInfoComplet = t.data;
          } 
        })
      }
     
      this.estEdition = false;
    }

    chargerInfoTraitement1(selectedTraitement){
      if(this.traitements.length > 0 && selectedTraitement){
        this.traitements.forEach((t, i) => {
          t = t.doc;
          if(t.data.code_traitement === selectedTraitement){      
            this.selectedTraitementInfoComplet = t.data;
          }
        })
      }
     
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

  estvalide(Essai: EssaiType){
    let msg: string = '';
    if(!Essai.code_essai || Essai.code_essai == ''){
      msg += '\nLe code d\'essai est vide!';
    }
    if(!Essai.today || Essai.today == ''){
      msg += '\nLa date d\'ajout est vide est vide!';
    }
    if(!Essai.code_protocole || Essai.code_protocole == '' || !Essai.nom_protocole || Essai.nom_protocole == ''){
      msg += '\nLe code ou le nom du protocole est vide!';
    }
    /*if(this.selectedProtocole && this.selectedProtocole.avec_code_association == 'oui'){
      if(!Essai.code_association || Essai.code_association == ''){
        msg +='\nLe code de l\'association est vide!';
      }
    }*/

    if(this.selectedProtocole && this.selectedProtocole.avec_systeme == 'oui'){
      if(!Essai.systeme || Essai.systeme == ''){
        msg +='\nLe système est vide!';
      }
    }
    if(this.selectedProtocole && this.selectedProtocole.avec_bloc == 'oui'){
      if(!Essai.bloc || Essai.bloc == ''){
        msg +='\nLe bloc est vide!';
      }
    }
    if(this.selectedProtocole && this.selectedProtocole.avec_parcelle == 'oui'){
      if(!Essai.parcelle || Essai.parcelle == ''){
        msg +='\nLa parcelle est vide!';
      }
    }
    if(this.selectedProtocole && this.selectedProtocole.avec_repetition == 'oui'){
      if(!Essai.repetition || Essai.repetition == ''){
        msg +='\nLa répétition est vide!';
      }
    }

    if(!Essai.type_culture || Essai.type_culture == ''){
      msg +='\nLe type de culture est vide!';
    }
    if(!Essai.type_essais || Essai.type_essais == ''){
      msg += '\nLe type des essais est vide!';
    }
    if(!Essai.traitement || Essai.traitement == ''){
      msg += '\nLe traitement est vide!';
    }
    if(!Essai.matricule_producteur || Essai.matricule_producteur == ''){
      msg += '\nLe matricule du producteur est vide!';
    }


   /* if(!Essai.matricule_producteur || Essai.matricule_producteur == ''){
      msg += '\nLe matricule du producteur est vide!';
    }*/
    if(!Essai.nom_producteur || Essai.nom_producteur == ''){
      msg += '\nLe nom du producteur est vide!';
    }
    if(!Essai.sex_producteur || Essai.sex_producteur == ''){
      msg += '\nLe sex du producteur est vide!';
    }
    if(!Essai.site_producteur || Essai.site_producteur == ''){
      msg += '\nLe site du producteur est vide!';
    }
    if(!Essai.village_producteur || Essai.village_producteur == ''){
      msg += '\nLe village du producteur est vide!';
    }
    if(!Essai.id_champs || Essai.id_champs == '' || !Essai.nom_champs || Essai.nom_champs == ''){
      msg += '\nLe id ou le nom du champ est vide!';
    }
    if(!Essai.type_sole || Essai.type_sole == ''){
      msg += '\nLe type de sole est vide!';
    }
    if(!Essai.superficie || Essai.superficie == ''){
      msg += '\nLa superficie du champ est vide!';
    }

    if(Essai.traitement == 'oui' && (!Essai.code_traitement || Essai.code_traitement == '')){
      msg += '\nLe code du traitement est vide!';
    }
    if(Essai.traitement == 'oui' && (!Essai.nom_entree || Essai.nom_entree == '')){
      msg += '\nLe nom de l\'entrée est vide!';
    }
    if(Essai.traitement == 'oui' && Essai.type_essais == 'avec controle' &&  (!Essai.nom_controle || Essai.nom_controle == '')){
      msg += '\nLe nom du controle est vide!';
    }

    if(!Essai.cultures || Essai.cultures.length <= 0){
      msg += '\nL\'information sur la culture est vide!';
    }
    if(!this.Culture_1 || !this.Culture_1.culture || this.Culture_1.culture == ''){
      msg += '\nLe nom de la culture est vide!';
    }
    if(this.Culture_1 && (!this.Culture_1.variete || this.Culture_1.variete == '')){
      msg += '\nLe nom de la variété sur la culture est vide!';
    }
    if(this.Culture_1 && (!this.Culture_1.superficie_essai || this.Culture_1.superficie_essai == '')){
      msg += '\nLa superficie de l\'essai est vide!';
    }
    if(Essai.type_essais == 'avec controle' && (!this.Culture_1.superficie_controle || this.Culture_1.superficie_controle == '')){
      msg += '\nLa superficie du controle est vide!';
    }
    if(Essai.type_culture == 'association'){
      if(!this.Culture_2 || !this.Culture_2.culture || this.Culture_2.culture == ''){
        msg += '\nLe nom de la culture 2 est vide!';
      }
      if(this.Culture_2 && (!this.Culture_2.variete || this.Culture_2.variete == '')){
        msg += '\nLe nom de la variété 2 sur la culture est vide!';
      }
      if(this.Culture_2 && (!this.Culture_2.superficie_essai || this.Culture_2.superficie_essai == '')){
        msg += '\nLa superficie de l\'essai 2 est vide!';
      }
      if(this.Culture_2 && Essai.type_essais == 'avec controle' && (!this.Culture_2.superficie_controle || this.Culture_2.superficie_controle == '')){
        msg += '\nLa superficie du controle 2 est vide!';
      }
    }


    return msg;
  }

    actionForm(){
      if(this.ajoutForm && !this.modifierFrom){
         let date = new Date();
         if(this.selectedTraitement){
          this.Essai.code_traitement = this.selectedTraitement.data.code_traitement;
          this.Essai.nom_entree = this.selectedTraitement.data.nom_entree;
          this.Essai.nom_controle = this.selectedTraitement.data.nom_controle;
         }
         if(this.selectedChamps){
          this.Essai.id_champs = this.selectedChamps.data.id_champs;
          this.Essai.nom_champs = this.selectedChamps.data.nom;
         }
          if(this.selectedProducteur){
            this.Essai.matricule_producteur = this.selectedProducteur.data.matricule_Membre;
          }
          
          ///ajouter les cultures
          if(this.Essai.cultures.length <= 0){
            this.Essai.cultures.push(this.Culture_1);
            if(this.Essai.type_culture == 'association'){
              this.Essai.cultures.push(this.Culture_2);
            }
          }else{
            this.Essai.cultures[0] = this.Culture_1;
            if(this.Essai.type_culture == 'association'){
              this.Essai.cultures[1] = this.Culture_2;
            }
          }

          /*if(this.Essai.typologie == 'non'){
            this.Essai.annee_typologie = null;
          }

          if(this.selectedProtocole.avec_systeme == 'non'){
            this.Essai.systeme = null;
          }

          if(this.selectedProtocole.avec_bloc == 'non'){
            this.Essai.bloc = null;
          }

          if(this.selectedProtocole.avec_parcelle == 'non'){
            this.Essai.parcelle = null;
          }

          if(this.selectedProtocole.avec_repetition == 'non'){
            this.Essai.repetition = null;
          }*/
          
          this.Essai.deviceid = this.device.uuid;
          this.Essai.phonenumber = this.phonenumber;
          this.Essai.imei = this.imei; 
          this.Essai.update_deviceid = this.device.uuid;
          this.Essai.update_phonenumber = this.phonenumber;
          this.Essai.update_imei = this.imei;

          //ici ce fait lr chargement des variables
          
          //union._id = 'fuma'+ id;
          this.Essai.end = date.toJSON();
          //essai.code_essai = id;
          //champs.id_champs = id;
        if(this.estvalide(this.Essai) == ''){
            let essaiFinal: any = {};
            essaiFinal._id = 'fuma'+':essai:'+ this.Essai.code_essai;
            essaiFinal.data = this.Essai;
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
                 // this.ajoutForm = false;
                  this.reAjouterEssaiProducteurConnu();
                  //this.dechargerT();
                  //this.dechargerT()
                }else{
                  this.essais.push(E);
                  this.ajoutForm = false;
                  this.reinitForm();
                  //this.dechargerT();
                  //this.ajoutForm = false;
                  //this.reinitForm();
                  //this.dechargerT();
                }
              }).catch((err) => {
                alert('Erreur d\'enregistrement => '+err);
              });

          }else{
            alert(this.estvalide(this.Essai));
          }

           /* if(this.matricule_producteur1){

                //this.essais1.push(E);
                this.dechargerT()
              }else{
                //this.essais.push(E);
                this.ajoutForm = false;
                this.reinitForm();
                this.dechargerT();
              }
            */

            //this.navCtrl.pop();
            //toast.present();
            

      // }
      }else if(this.modifierFrom){
        let date = new Date();
       
        this.Essai.update_deviceid = this.device.uuid;
        this.Essai.update_phonenumber = this.phonenumber;
        this.Essai.update_imei = this.imei;
        this.Essai.cultures[0] = this.Culture_1;
          if(this.Essai.type_culture == 'association'){
            this.Essai.cultures[1] = this.Culture_2;
        }
        //let essaiFinal: any = {};
        //this.grandEssai.data = this.essai1
        if(this.estvalide(this.Essai) == ''){
          this.grandEssai.data = this.Essai
          this.servicePouchdb.updateDocReturn(this.grandEssai).then((res) => {
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
          }).catch((err) => alert('Erreur enregistrement => '+err));
  
        }else{
          alert(this.estvalide(this.Essai))
        }

        /*this.reinitFormModifier();
        this.modifierFrom = false;
        this.detailEssai = true
        this.ajoutForm = false;*/
      }
    
  }

  annuler(){
    if(this.matricule_producteur1){
      let E: any = this.essais;
      E = E.concat(this.essais1);
      this.essais = E;
      this.allEssais = this.essais;
      this.essais1 = [];
      //this.Culture_1 = null;
      //this.Culture_2 = null;
     this.ajoutForm = false;
     this.reAjouterEssaiProducteurConnu();
    }else{
      this.ajoutForm = false;
      this.reinitForm();
    }

    if(this.modifierFrom){
      this.modifierFrom = false;
      this.ajoutForm = false;
      this.detailEssai = true;
      this.reinitFormModifier();
    } 
    
    if(this.statistique){
      this.statistique = false;
    }

    this.estEdition = false;
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
      inputs: [
        {
          type: 'checkbox',
          label: 'Supprimer définitivement!',
          value: 'oui',
          checked: false
          }
      ],
      buttons:[
        {
          text: 'Non',
          handler: () => console.log('suppression annulée')
 
        },
        {
          text: 'Oui',
          handler: (data) => {
            if(data.toString() === 'oui'){
              //suppression complete
              this.servicePouchdb.deleteReturn(essai).then((res) => {
                this.essais.forEach((es, i) => {
                  if(es.doc._id === essai._id){
                    this.essais.splice(i, 1);
                  }
                  
                });
                this.detailEssai = false;
              }, err => {
                console.log(err)
              }) ;
            }else{
              //corbeille
              this.servicePouchdb.deleteDocReturn(essai).then((res) => {
                this.essais.forEach((es, i) => {
                  if(es.doc._id === essai._id){
                    this.essais.splice(i, 1);
                  }
                  
                });
                this.detailEssai = false;
              }, err => {
                console.log(err)
              }) ;
            }
            
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
    this.servicePouchdb.syncAvecToast();
    this.pourCreerForm();
  }

  replicationDepuisServeur(){
    this.servicePouchdb.replicationDepuisServeur();
  }

  replicationVersServeur(){
    this.servicePouchdb.replicationVersServeur();
  }

  exportExcel(){

    // dom id, filename, type: json, txt, csv, xml, doc, xls , image, pdf
    //tableExport('tableau1', 'test', 'xls');
    let date = new Date();
    //let dateHeure = date.toLocaleDateString()+ date.toLocaleTimeString();// + date.getTime().toLocaleString();
    let nom = date.getDate().toString() +'_'+ (date.getMonth() + 1).toString() +'_'+ date.getFullYear().toString() +'_'+ date.getHours().toString() +'_'+ date.getMinutes().toString() +'_'+ date.getSeconds().toString();

    /*TableExport(document.getElementsByTagName("table"), {
       formats: ['xls', 'csv', 'txt'],
       filename: 'Export_Essais_'+nom,    // (id, String), filename for the downloaded file, (default: 'id')
    });*/
    //TableExport({type:'excel',escape:'false'}, document.getElementsByTagName("tableau"));
    
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
      this.file.writeFile(fileDestiny, 'Combinee_'+nom+'.xls', blob).then(()=> {
          alert("Fichier créé dans: " + fileDestiny);
      }).catch(()=>{
          alert("Erreur de création du fichier dans: " + fileDestiny);
      })
    }
  }

  export(){
    if(this.platform.is('android')/* || this.platform.is('windows') || this.platform.is('ios')*/){
      this.exportExcel();
    }else{
      let date = new Date();
      //let dateHeure = date.toLocaleDateString()+ date.toLocaleTimeString();// + date.getTime().toLocaleString();
      let nom = date.getDate().toString() +'_'+ (date.getMonth() + 1).toString() +'_'+ date.getFullYear().toString() +'_'+ date.getHours().toString() +'_'+ date.getMinutes().toString() +'_'+ date.getSeconds().toString();

      new TableExport(document.getElementsByTagName("table"), {
          filename: 'Essais_'+nom,    // (id, String), filename for the downloaded file, (default: 'id')
      });
    }
    
  }

  calculStatisitque(essais, traitements){
    let model = this.modelCtl.create('RestitutionPage', {'type': 'essai', 'essais': essais, 'traitements': traitements, 'producteurs': this.producteurs});
    model.present();
    //this.calculerMembreAyantFaitUnEssai(essais);
    //this.calculerNombreEssaiParTraitement(essais, traitements);
    //this.visualisation(essais);
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
        //this.getEssais()
    this.servicePouchdb.remoteSaved.getSession((err, response) => {
        if (err) {
          // network error
          //this.events.publish('user:login');
          //alert('network')
          this.aProfile = false;
        } else if (!response.userCtx.name) {
          // nobody's logged in
          //this.events.publish('user:login');
          //alert('nobady')
          this.aProfile = false;
        } else {
          // response.userCtx.name is the current user
          //this.events.publish('user:login', response.userCtx);
          //alert(response.userCtx.name)
          this.aProfile = true;
        }
      });
    

    //setInterval(this.servicePouchdb.testConnexion(), 2000)
    if(!this.estInstancier){
      this.initEssai();
      this.estInstancier = true;
    }
    
    this.pourCreerForm();
    this.getInfoSimEmei();
    if(this.matricule_producteur1 && this.nom_producteur1){
      this.chargerChamps(this.matricule_producteur1, this.nom_producteur1)
      //this.getEssais();
      /*if(!this.estInstancier){
        this.getEssais();
        this.estInstancier = true;
      }*/
    }

    //this.estInstancier = true;

    ///this.corrigerErreur();
    //this.servicePouchdb.findByTypeData()
  }

  ionViewDidLoad() { 
   /* this.servicePouchdb.remoteSaved.getSession((err, response) => {
      alert('oui')
        if (response.userCtx.name) {
          this.aProfile = true;
        }else{
          this.aProfile = false;
        }
    }, err => {
      alert('oui '+err)
      this.aProfile = false;
      /*if(global.info_user != null){
        this.aProfile = true;
      }else{
        this.aProfile = false;
      }****
      //console.log(err)
    }); */

    //this.initForm();
//    this.storage.remove('info_db')
  }

    controlNPL(){
    /*if(this.selectedTraitementInfoComplet.max_NPL){
      let multiple: any = this.superficie_tr / this.selectedTraitementInfoComplet.superficie;
      let vMax: any = this.selectedTraitementInfoComplet.max_NPL * multiple;

      if(parseInt(this.NPL) > parseInt(vMax)){
        alert('Valeur du NPL invalide. Elle doit être inférieur ou égale à '+vMax+'');
        this.NPL = '';
      }
    }else{
      alert('Le contrôle du NPL n\'est pas défini!');
      this.NPL = '';
    }*/
    
  }

  controlNPLControle(){
   /* if(this.selectedTraitementInfoComplet.max_NPL){
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
    */
  }

  controlNPR(){
   /* if(this.NPL && this.NPL !== ''){
      
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
    }*/
  }

  controlNPRControle(){
    /*if(this.NPL_controle && this.NPL_controle !== ''){
      
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
    }*/
  }

  choixLimit(){
    this.rechercher = true;
    if(this.selectedLimit !== 'Tous'){
      this.essais = this.allEssais.slice(0, this.selectedLimit);
      this.rechercher = false;
    }else{
      this.essais = this.allEssais;
      this.rechercher = false;
    }
    
  }

  choixLimit1(){
    this.rechercher = true;
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
                    this.rechercher = false;
                  }else{
                    this.rechercher = false;
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
                     this.rechercher = false;
                  }else{
                    this.rechercher = false;
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
                    this.rechercher = false;
                  }else{
                    this.rechercher = false;
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
                    this.rechercher = false;
                  }else{
                    this.rechercher = false;
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
                    this.rechercher = false;
                  }else{
                    this.rechercher = false;
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
                    this.rechercher = false;
                  }else{
                    this.rechercher = false;
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
                    this.rechercher = false;
                  }else{
                    this.rechercher = false;
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
                      this.rechercher = false;
                  }else{
                    this.rechercher = false;
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

  getEssaisByProtocole(refresher: any = ''){
    
    this.changerCultureProtocole1(this.selectedProtocole1);
    if(this.selectedProtocole1.code/* && this.selectedCulture*/){
      this.refresher = refresher;
      if(this.refresher === ''){
        this.rechercher = true;
      }
  
  
      if(this.selectedAnnee === 'Tous'){
        if(this.selectedLimit === 'Tous'){
        // this.servicePouchdb.getPlageDocs('fuma:essai', 'fuma:essai:\uffff').then((e) => {
          //   if(e){
                //cas ou le producteur est connu
                let ess: any = [];
                if(this.matricule_producteur1){
                  this.servicePouchdb.getPlageDocsRapide('fuma:essai:'+this.matricule_producteur1, 'fuma:essai:'+this.matricule_producteur1+' \uffff').then((e) => {
                    if(e){
                      e.forEach((es) => {
                        if(es.doc.data.code_protocole == this.selectedProtocole1.code/* && es.doc.data.culture == this.selectedCulture.nom_culture*/){
                          ess.push(es);
                        }
                      });
                      this.essais = ess;
                      this.allEssais = ess;
                      this.rechercher = false;
                      if(this.refresher !== ''){
                        this.refresher.complete();
                      }
                    }else{
                      this.rechercher = false;
                      if(this.refresher !== ''){
                        this.refresher.complete();
                      }
                    }
  
                  })
                }else{
                  //sinon
                  this.servicePouchdb.getPlageDocsRapide('fuma:essai', 'fuma:essai:\uffff').then((e) => {
                    if(e){
                      e.forEach((es) => {
                        if(es.doc.data.code_protocole == this.selectedProtocole1.code/* && es.doc.data.culture == this.selectedCulture.nom_culture*/){
                          ess.push(es);
                        }
                      });
                      this.essais = ess;
                      this.allEssais = ess;
                      this.rechercher = false;
                      if(this.refresher !== ''){
                        this.refresher.complete();
                      }
                    }else{
                      this.rechercher = false;
                      if(this.refresher !== ''){
                        this.refresher.complete();
                      }
                    }
                  });
                
                }
            
            //  }
          // });
          }else{
                //cas ou le producteur est connu
                let ess: any = [];
                if(this.matricule_producteur1){
                  this.servicePouchdb.getPlageDocsRapideAvecLimit('fuma:essai:'+this.matricule_producteur1, 'fuma:essai:'+this.matricule_producteur1+' \uffff', this.selectedLimit).then((e) => {
                    if(e){
                      e.forEach((es) => {
                        if(es.doc.data.code_protocole == this.selectedProtocole1.code/* && es.doc.data.culture == this.selectedCulture.nom_culture*/){
                          ess.push(es);
                        }
                      })
                      this.essais = ess;
                      //this.allEssais = e;
                      this.rechercher = false;
                      if(this.refresher !== ''){
                        this.refresher.complete();
                      }
                    }else{
                      this.rechercher = false;
                      if(this.refresher !== ''){
                        this.refresher.complete();
                      }
                    }
                  });
  
                  this.servicePouchdb.getPlageDocsRapide('fuma:essai:'+this.matricule_producteur1, 'fuma:essai:'+this.matricule_producteur1+' \uffff').then((e) => {
                    if(e){
                    // this.essais = e;
                    let ess1 :any = [];
                      e.forEach((es) => {
                        if(es.doc.data.code_protocole == this.selectedProtocole1.code/* && es.doc.data.culture == this.selectedCulture.nom_culture*/){
                          ess1.push(es);
                        }
                      })
                      this.allEssais = ess1;
                      //this.rechercher = false;
                    }
                  // this.champs = c;
                    //this.allChamps = c;
                  })
  
                }else{
                  //sinon
                  this.statistiqueOk = false;
                  this.servicePouchdb.getPlageDocsRapideAvecLimit('fuma:essai', 'fuma:essai:\uffff', this.selectedLimit).then((e) => {
                    if(e){
                      e.forEach((es) => {
                        if(es.doc.data.code_protocole == this.selectedProtocole1.code/* && es.doc.data.culture == this.selectedCulture.nom_culture*/){
                          ess.push(es);
                        }
                      })
                      this.essais = ess;
                      //this.allEssais = e;
                      this.rechercher = false;
                      if(this.refresher !== ''){
                        this.refresher.complete();
                      }
                    }else{
                      this.rechercher = false;
                      if(this.refresher !== ''){
                        this.refresher.complete();
                      }
                    }
  
                  });
  
                  this.servicePouchdb.getPlageDocsRapide('fuma:essai', 'fuma:essai:\uffff').then((e) => {
                    if(e){
                      let ess1: any = [];
                      e.forEach((es) => {
                        if(es.doc.data.code_protocole == this.selectedProtocole1.code/* && es.doc.data.culture == this.selectedCulture.nom_culture*/){
                          ess1.push(es);
                        }
                      })
                      this.allEssais = ess1;
                      this.statistiqueOk = true;
                      //this.rechercher = false;
                    }
                  });
                  
                }
            
            //  }
          //  });
          }
      }else{
        if(this.selectedLimit === 'Tous'){
                if(this.matricule_producteur1){
                  this.servicePouchdb.getPlageDocsRapide('fuma:essai:'+this.matricule_producteur1, 'fuma:essai:'+this.matricule_producteur1+' \uffff').then((e) => {
                    if(e){
                      let ess: any = [];
                      e.forEach((es, i) => {
                          if(es.doc.data.annee_essai === this.selectedAnnee && es.doc.data.code_protocole == this.selectedProtocole1.code/* && es.doc.data.culture == this.selectedCulture.nom_culture*/){
                            ess.push(es);
                          }
                        });
                      this.essais = ess;
                      this.allEssais = ess;
                      this.rechercher = false;
                      if(this.refresher !== ''){
                        this.refresher.complete();
                      }
                    }else{
                      this.rechercher = false;
                      if(this.refresher !== ''){
                        this.refresher.complete();
                      }
                    }
                  });
                
                }else{
                  //sinon
                  this.statistiqueOk = false;
                  this.servicePouchdb.getPlageDocsRapide('fuma:essai', 'fuma:essai:\uffff').then((e) => {
                    if(e){
                      let ess: any = [];
                      e.forEach((es, i) => {
                          if(es.doc.data.annee_essai === this.selectedAnnee && es.doc.data.code_protocole == this.selectedProtocole1.code/* && es.doc.data.culture == this.selectedCulture.nom_culture*/){
                            ess.push(es);
                          }
                        });
                      this.essais = ess;
                      this.allEssais = ess;
                      this.statistiqueOk =  true;
                      this.rechercher = false;
                      if(this.refresher !== ''){
                        this.refresher.complete();
                      }
                    }else{
                      this.rechercher = false;
                      if(this.refresher !== ''){
                        this.refresher.complete();
                      }
                    }
                  });
                  
                }
            //  }
          //  });
          }else{

                  this.statistiqueOk =  false;
                  if(this.matricule_producteur1){
                    this.servicePouchdb.getPlageDocsRapideAvecLimit('fuma:essai:'+this.matricule_producteur1, 'fuma:essai:'+this.matricule_producteur1+' \uffff', this.selectedLimit).then((e) => {
                    if(e){
                      let ess: any = [];
                      e.forEach((es, i) => {
                          if(es.doc.data.annee_essai == this.selectedAnnee && es.doc.data.code_protocole == this.selectedProtocole1.code/* && es.doc.data.culture == this.selectedCulture.nom_culture*/){
                            ess.push(es);
                          }
                        });
                      this.essais = ess;
                      //this.allEssais = ess;
                      this.rechercher = false;
                      if(this.refresher !== ''){
                        this.refresher.complete();
                      }
                    }else{
                      this.rechercher = false;
                      if(this.refresher !== ''){
                        this.refresher.complete();
                      }
                    }
                  });
  
                  this.servicePouchdb.getPlageDocsRapide('fuma:essai:'+this.matricule_producteur1, 'fuma:essai:'+this.matricule_producteur1+' \uffff').then((e) => {
                    if(e){
                      let ess: any = [];
                      e.forEach((es, i) => {
                          if(es.doc.data.annee_essai === this.selectedAnnee && es.doc.data.code_protocole == this.selectedProtocole1.code/* && es.doc.data.culture == this.selectedCulture.nom_culture*/){
                            ess.push(es);
                          }
                        });
                    // this.essais = ess;
                      this.allEssais = ess;
                      this.statistiqueOk = true;
                      //this.rechercher = false;
                    }
                  });
                  }else{
                    //sinon
                    this.statistiqueOk = false;
                    this.servicePouchdb.getPlageDocsRapideAvecLimit('fuma:essai', 'fuma:essai:\uffff', this.selectedLimit).then((e) => {
                      if(e){
                        let ess: any = [];
                          e.forEach((es, i) => {
                              if(es.doc.data.annee_essai === this.selectedAnnee && es.doc.data.code_protocole == this.selectedProtocole1.code/* && es.doc.data.culture == this.selectedCulture.nom_culture*/){
                                ess.push(es);
                              }
                            });
                        this.essais = ess;
                        //this.allEssais = ess;
                        this.rechercher = false;
                        if(this.refresher !== ''){
                          this.refresher.complete();
                        }
                    }else{
                      this.rechercher = false;
                      if(this.refresher !== ''){
                        this.refresher.complete();
                      }
                    }
                    });
  
  
                    this.servicePouchdb.getPlageDocsRapide('fuma:essai', 'fuma:essai:\uffff').then((e) => {
                    if(e){
                      let ess: any = [];
                      e.forEach((es, i) => {
                          if(es.doc.data.annee_essai === this.selectedAnnee && es.doc.data.code_protocole == this.selectedProtocole1.code/* && es.doc.data.culture == this.selectedCulture.nom_culture*/){
                            ess.push(es);
                          }
                        });
                      //this.essais = ess;
                      this.allEssais = ess;
                      this.statistiqueOk =  true;
                      //this.rechercher = false;
                    }
                  });
                    
                  }
              // }
            // });
            }
  
            
        }  
    }
    
    
  }


  getEssaisByProtocoleAndCulture(refresher: any = ''){

    if(this.culturesProtocole && this.culturesProtocole.length > 0 && this.indexSelectedCultureProtocole > -1){
      this.selectedCulture = this.culturesProtocole[this.indexSelectedCultureProtocole].doc.data;
    }
    
    if(this.selectedProtocole1 && this.selectedCulture){
      this.refresher = refresher;
      if(this.refresher === ''){
        this.rechercher = true;
      }
  
  
      if(this.selectedAnnee === 'Tous'){
        if(this.selectedLimit === 'Tous'){
        // this.servicePouchdb.getPlageDocs('fuma:essai', 'fuma:essai:\uffff').then((e) => {
          //   if(e){
                //cas ou le producteur est connu
                let ess: any = [];
                if(this.matricule_producteur1){
                  this.servicePouchdb.getPlageDocsRapide('fuma:essai:'+this.matricule_producteur1, 'fuma:essai:'+this.matricule_producteur1+' \uffff').then((e) => {
                    if(e){
                      e.forEach((es) => {
                        if(es.doc.data.code_protocole == this.selectedProtocole1.code && es.doc.data.cultures[0].culture == this.selectedCulture.nom_culture){
                          ess.push(es);
                        }
                      });
                      this.essais = ess;
                      this.allEssais = ess;
                      this.rechercher = false;
                      if(this.refresher !== ''){
                        this.refresher.complete();
                      }
                    }else{
                      this.rechercher = false;
                      if(this.refresher !== ''){
                        this.refresher.complete();
                      }
                    }
  
                  })
                }else{
                  //sinon
                  this.servicePouchdb.getPlageDocsRapide('fuma:essai', 'fuma:essai:\uffff').then((e) => {
                    if(e){
                      e.forEach((es) => {
                        if(es.doc.data.code_protocole == this.selectedProtocole1.code && es.doc.data.cultures[0].culture == this.selectedCulture.nom_culture){
                          ess.push(es);
                        }
                      });
                      this.essais = ess;
                      this.allEssais = ess;
                      this.rechercher = false;
                      if(this.refresher !== ''){
                        this.refresher.complete();
                      }
                    }else{
                      this.rechercher = false;
                      if(this.refresher !== ''){
                        this.refresher.complete();
                      }
                    }
                  });
                
                }
            
            //  }
          // });
          }else{
                //cas ou le producteur est connu
                let ess: any = [];
                if(this.matricule_producteur1){
                  this.servicePouchdb.getPlageDocsRapideAvecLimit('fuma:essai:'+this.matricule_producteur1, 'fuma:essai:'+this.matricule_producteur1+' \uffff', this.selectedLimit).then((e) => {
                    if(e){
                      e.forEach((es) => {
                        if(es.doc.data.code_protocole == this.selectedProtocole1.code && es.doc.data.cultures[0].culture == this.selectedCulture.nom_culture){
                          ess.push(es);
                        }
                      })
                      this.essais = ess;
                      //this.allEssais = e;
                      this.rechercher = false;
                      if(this.refresher !== ''){
                        this.refresher.complete();
                      }
                    }else{
                      this.rechercher = false;
                      if(this.refresher !== ''){
                        this.refresher.complete();
                      }
                    }
                  });
  
                  this.servicePouchdb.getPlageDocsRapide('fuma:essai:'+this.matricule_producteur1, 'fuma:essai:'+this.matricule_producteur1+' \uffff').then((e) => {
                    if(e){
                    // this.essais = e;
                    let ess1 :any = [];
                      e.forEach((es) => {
                        if(es.doc.data.code_protocole == this.selectedProtocole1.code && es.doc.data.cultures[0].culture == this.selectedCulture.nom_culture){
                          ess1.push(es);
                        }
                      })
                      this.allEssais = ess1;
                      //this.rechercher = false;
                    }
                  // this.champs = c;
                    //this.allChamps = c;
                  })
  
                }else{
                  //sinon
                  this.statistiqueOk = false;
                  this.servicePouchdb.getPlageDocsRapideAvecLimit('fuma:essai', 'fuma:essai:\uffff', this.selectedLimit).then((e) => {
                    if(e){
                      e.forEach((es) => {
                        if(es.doc.data.code_protocole == this.selectedProtocole1.code && es.doc.data.cultures[0].culture == this.selectedCulture.nom_culture){
                          ess.push(es);
                        }
                      })
                      this.essais = ess;
                      //this.allEssais = e;
                      this.rechercher = false;
                      if(this.refresher !== ''){
                        this.refresher.complete();
                      }
                    }else{
                      this.rechercher = false;
                      if(this.refresher !== ''){
                        this.refresher.complete();
                      }
                    }
  
                  });
  
                  this.servicePouchdb.getPlageDocsRapide('fuma:essai', 'fuma:essai:\uffff').then((e) => {
                    if(e){
                      let ess1: any = [];
                      e.forEach((es) => {
                        if(es.doc.data.code_protocole == this.selectedProtocole1.code && es.doc.data.cultures[0].culture == this.selectedCulture.nom_culture){
                          ess1.push(es);
                        }
                      })
                      this.allEssais = ess1;
                      this.statistiqueOk = true;
                      //this.rechercher = false;
                    }
                  });
                  
                }
            
            //  }
          //  });
          }
      }else{
        if(this.selectedLimit === 'Tous'){
                if(this.matricule_producteur1){
                  this.servicePouchdb.getPlageDocsRapide('fuma:essai:'+this.matricule_producteur1, 'fuma:essai:'+this.matricule_producteur1+' \uffff').then((e) => {
                    if(e){
                      let ess: any = [];
                      e.forEach((es, i) => {
                          if(es.doc.data.annee_essai === this.selectedAnnee && es.doc.data.code_protocole == this.selectedProtocole1.code && es.doc.data.cultures[0].culture == this.selectedCulture.nom_culture){
                            ess.push(es);
                          }
                        });
                      this.essais = ess;
                      this.allEssais = ess;
                      this.rechercher = false;
                      if(this.refresher !== ''){
                        this.refresher.complete();
                      }
                    }else{
                      this.rechercher = false;
                      if(this.refresher !== ''){
                        this.refresher.complete();
                      }
                    }
                  });
                
                }else{
                  //sinon
                  this.statistiqueOk = false;
                  this.servicePouchdb.getPlageDocsRapide('fuma:essai', 'fuma:essai:\uffff').then((e) => {
                    if(e){
                      let ess: any = [];
                      e.forEach((es, i) => {
                          if(es.doc.data.annee_essai === this.selectedAnnee && es.doc.data.code_protocole == this.selectedProtocole1.code && es.doc.data.cultures[0].culture == this.selectedCulture.nom_culture){
                            ess.push(es);
                          }
                        });
                      this.essais = ess;
                      this.allEssais = ess;
                      this.statistiqueOk =  true;
                      this.rechercher = false;
                      if(this.refresher !== ''){
                        this.refresher.complete();
                      }
                    }else{
                      this.rechercher = false;
                      if(this.refresher !== ''){
                        this.refresher.complete();
                      }
                    }
                  });
                  
                }
            //  }
          //  });
          }else{

                  this.statistiqueOk =  false;
                  if(this.matricule_producteur1){
                    this.servicePouchdb.getPlageDocsRapideAvecLimit('fuma:essai:'+this.matricule_producteur1, 'fuma:essai:'+this.matricule_producteur1+' \uffff', this.selectedLimit).then((e) => {
                    if(e){
                      let ess: any = [];
                      e.forEach((es, i) => {
                          if(es.doc.data.annee_essai == this.selectedAnnee && es.doc.data.code_protocole == this.selectedProtocole1.code && es.doc.data.cultures[0].culture == this.selectedCulture.nom_culture){
                            ess.push(es);
                          }
                        });
                      this.essais = ess;
                      //this.allEssais = ess;
                      this.rechercher = false;
                      if(this.refresher !== ''){
                        this.refresher.complete();
                      }
                    }else{
                      this.rechercher = false;
                      if(this.refresher !== ''){
                        this.refresher.complete();
                      }
                    }
                  });
  
                  this.servicePouchdb.getPlageDocsRapide('fuma:essai:'+this.matricule_producteur1, 'fuma:essai:'+this.matricule_producteur1+' \uffff').then((e) => {
                    if(e){
                      let ess: any = [];
                      e.forEach((es, i) => {
                          if(es.doc.data.annee_essai === this.selectedAnnee && es.doc.data.code_protocole == this.selectedProtocole1.code && es.doc.data.cultures[0].culture == this.selectedCulture.nom_culture){
                            ess.push(es);
                          }
                        });
                    // this.essais = ess;
                      this.allEssais = ess;
                      this.statistiqueOk = true;
                      //this.rechercher = false;
                    }
                  });
                  }else{
                    //sinon
                    this.statistiqueOk = false;
                    this.servicePouchdb.getPlageDocsRapideAvecLimit('fuma:essai', 'fuma:essai:\uffff', this.selectedLimit).then((e) => {
                      if(e){
                        let ess: any = [];
                          e.forEach((es, i) => {
                              if(es.doc.data.annee_essai === this.selectedAnnee && es.doc.data.code_protocole == this.selectedProtocole1.code && es.doc.data.cultures[0].culture == this.selectedCulture.nom_culture){
                                ess.push(es);
                              }
                            });
                        this.essais = ess;
                        //this.allEssais = ess;
                        this.rechercher = false;
                        if(this.refresher !== ''){
                          this.refresher.complete();
                        }
                    }else{
                      this.rechercher = false;
                      if(this.refresher !== ''){
                        this.refresher.complete();
                      }
                    }
                    });
  
  
                    this.servicePouchdb.getPlageDocsRapide('fuma:essai', 'fuma:essai:\uffff').then((e) => {
                    if(e){
                      let ess: any = [];
                      e.forEach((es, i) => {
                          if(es.doc.data.annee_essai === this.selectedAnnee && es.doc.data.code_protocole == this.selectedProtocole1.code && es.doc.data.cultures[0].culture == this.selectedCulture.nom_culture){
                            ess.push(es);
                          }
                        });
                      //this.essais = ess;
                      this.allEssais = ess;
                      this.statistiqueOk =  true;
                      //this.rechercher = false;
                    }
                  });
                    
                  }
              // }
            // });
            }
  
            
        }  
    }
    
    
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
  choixAnneeEssai(selectedAnnee, list: any = false){
    if(list){
      this.selectedProtocole1 = null;
      this.essais = [];
      this.allEssais = [];
      this.selectedCulture = {};
      if(/*this.indexSelectedCultureProtocole && */this.indexSelectedCultureProtocole >= 0){
        this.indexSelectedCultureProtocole = -1;
      }
      
      this.culturesProtocole = [];
      this.culturesProtocole2 = [];
      //this.indexSelectedCultureProtocole1 = -1;
      //this.selectedCultureProtocole2 = -1;
      this.initEssai();
    }
    
    if(!this.estEdition){
      this.traitements = [];
      this.selectedTraitement = null;
      this.selectedProtocole = null;
      if(/*this.indexSelectedProtocoleAjout &&*/ this.indexSelectedProtocoleAjout >= 0){
        this.indexSelectedProtocoleAjout = -1;
      }
      this.protocoles = [];
      this.selectedCultureProtocole = null;
      this.selectedCultureProtocole2 = null;
      if(/*this.indexSelectedCultureProtocole1 &&*/ this.indexSelectedCultureProtocole1 >= 0){
        this.indexSelectedCultureProtocole1 = -1;
      }
      if(/*this.indexSelectedCultureProtocole2 && */this.indexSelectedCultureProtocole2 >= 0){
        this.indexSelectedCultureProtocole2 = -1;
      }

      this.Essai.nom_protocole = '';
      this.Essai.traitement = '';
      this.Essai.code_protocole = '';
      this.Essai.type_culture = '';
      this.Essai.type_essais = '';
      this.Essai.typologie = ''
      this.Essai.annee_typologie = null;
      this.Essai.bloc = '';
      this.Essai.systeme = '';
      this.Essai.parcelle = '';
      this.Essai.repetition = '';
      this.Culture_1 = null;
      this.Culture_2 = null;
      //this.selectedCulture = null;
      this.culturesProtocole = [];
      this.culturesProtocole2 = [];
      //this.selectedCulture = null;
      //this.culturesProtocole = [];
      //this.Essai.variete = null;
      //this.Essai.variables = [];
      this.reinitT();
    }

    this.chargerProtocole(selectedAnnee);
    
  }

  editer(essai, dbclick: boolean = false){

    
    if(!dbclick || (dbclick && this.user && this.user.roles && global.estAnimataire(this.user.roles))){
      this.estEdition = true;
      this.Essai = new EssaiType();
      this.grandEssai = essai;
      this.essai1 = this.grandEssai.data;
      this.Essai = this.grandEssai.data;
      //this.nom_producteur = this.essai1.nom_producteur;
      this.Culture_1 = new CultureType();
      this.Culture_1 = this.Essai.cultures[0];
      this.selectedProducteur = this.essai1.matricule_producteur;
      this.ancienSelectedProducteur = this.essai1.matricule_producteur;
      this.selectedChamps = this.essai1.id_champs;
      this.selectedTraitement = this.Essai.code_traitement;
      this.selectedGerants = this.essai1.gerants;
      this.selectedPrecedanteCultures = this.essai1.precedante_cultures;
      //this.chargerInfoTraitement1(this.Essai.code_traitement); 
      //this.chargerProtocole(this.Essai.annee_essai);
      if(this.Essai.type_culture == 'association'){
        this.Culture_2 = new CultureType();
        this.Culture_2 = this.Essai.cultures[1];
      }
      this.chargerSlecteProtocole(this.Essai.code_protocole);
      this.changerCultureProtocoleCode(this.Essai.code_protocole, true);
      //this.chargerTraitements(this.Essai.annee_essai, true)

    
      //this.navCtrl.push('ModifierEssaiPage', {'essai': essai});
      this.detailEssai = false;

      this.ajoutForm = true;

      this.modifierFrom = true;
      this.essaiAModifier = essai;
      if(!this.matricule_producteur1){

        this.chargerChamps(this.Essai.matricule_producteur, this.Essai.nom_producteur);
      }

      //pour le code d'union
      if(!this.Essai.code_union && this.Essai.code_union == ''){
        for(let k = 0; k < this.producteurs.length; k++) {
          if(this.producteurs[k].doc.data.matricule_Membre === this.selectedProducteur){
            this.Essai.code_union = this.producteurs[k].doc.data.code_union;
            break;
          }
        }
      }
   }
  }


  chargerSlecteProtocole(code){
    //this.selectedProtocole = null;
    for(let i = 0; i < this.protocoles.length; i++){
      if(this.protocoles[i].doc.data.code == code){
        this.Essai.nom_protocole = this.protocoles[i].doc.data.nom;
        this.Essai.traitement = this.protocoles[i].doc.data.traitement;
        this.Essai.type_culture = this.protocoles[i].doc.data.type_culture;
        this.Essai.type_essais = this.protocoles[i].doc.data.type_essais;
        this.selectedProtocole = this.protocoles[i].doc.data;

        this.Essai.typologie = this.selectedProtocole.typologie;
        if(this.selectedProtocole.typologie == 'oui'){
          this.Essai.annee_typologie = this.selectedProtocole.annee_typologie;
          this.getTypologieProducteur(this.Essai.matricule_producteur, this.Essai.annee_typologie)
        }else{
          this.Essai.classes_producteur = [];
        }

        if(this.selectedProtocole.avec_repetition == 'oui'){
          this.repetitions = [];
          for(let i = 1; i <= this.selectedProtocole.nb_repetition; i++){
            this.repetitions.push(i);
          }
        }

        if(this.selectedProtocole.avec_parcelle == 'oui'){
          this.parcelles = [];
          for(let i = 1; i <= this.selectedProtocole.nb_parcelle; i++){
            this.parcelles.push(i);
          }
        }

        if(this.selectedProtocole.avec_bloc == 'oui'){
          this.blocs = [];
          for(let i = 1; i <= this.selectedProtocole.nb_bloc; i++){
            this.blocs.push(i);
          }
        }

        if(this.selectedProtocole.avec_systeme == 'oui'){
          this.systemes = [];
          for(let i = 1; i <= this.selectedProtocole.nb_systeme; i++){
            this.systemes.push(i);
          }
        }

        if(this.selectedProtocole.traitement == 'non'){
          this.Culture_1.superficie_essai = this.selectedProtocole.superficie_essais;
          if(this.Essai.type_essais == 'avec controle'){
            this.Culture_1.superficie_controle = this.selectedProtocole.superficie_essais;
          }

          if(this.Essai.type_culture == 'association'){
            this.Culture_2.superficie_essai = this.selectedProtocole.superficie_essaise;
            if(this.Essai.type_essais == 'avec controle'){
              this.Culture_2.superficie_controle = this.selectedProtocole.superficie_essais;
            }
          }
          this.Essai.superficie_standard = this.selectedProtocole.superficie_essais;
        }
        
        if(this.Essai.traitement == 'oui'){
          this.chargerTraitements(this.Essai.annee_essai, this.protocoles[i].doc.data, true)
        }
        
        break;
      }
    }
  }

  reinitFormModifier(){
    this.grandEssai = null;
    this.essai1 = null;
    //this.resetEssai();
    this.selectedProducteur = '';
    this.ancienSelectedProducteur = '';
    this.selectedChamps = '';
    this.champs = [];
    
    this.selectedGerants = [];
    this.selectedPrecedanteCultures = []
    this.selectedTraitement ='';
    this.ancien_code_traitement ='';
    this.ancientCode_essai = '';
    this.selectedTraitementInfoComplet = '';
    this.selectedProtocole = null;
    this.selectedCultureProtocole = null;
    this.selectedCultureProtocole2 = null;

    this.indexSelectedCultureProtocole1 = -1;
    this.indexSelectedCultureProtocole2 = -1;
    this.indexSelectedProtocoleAjout = -1;
    //this.culturesProtocole = [];
    
    
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
              text: 'Ok',
              handler: () =>  {
                console.log('ok traitement vide')
                
                /*this.ajoutForm = false;
                this.reinitForm();
                this.dechargerT();
                if(this.ancien_selectedAnnee){
                  this.selectedAnnee = this.ancien_selectedAnnee;
                }*/
                
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

    if(this.selectedProtocole){
      this.changerCultureProtocole(this.selectedProtocole, false)
    }
     //this.reinitForm();
     this.Essai = new EssaiType();
     let maDate = new Date();
     this.Essai.start = maDate.toJSON();
     if(!this.Essai.annee_essai){
      this.Essai.annee_essai = this.selectedAnnee;
     }
     this.ancien_selectedAnnee = this.selectedAnnee;
     this.Essai.type = 'essai';
     let today = this.createDate(maDate.getDate(), maDate.getMonth(), maDate.getFullYear());
     this.Essai.effort_personnel = false;
     this.Essai.estValide = true;
     this.Essai.today = today;

     //Au cas ou il n'y q qu'un seul protocole, selectionnez le automatiquement afin de simplifier la tache d'ajout
     if(this.protocoles.length === 1){
       this.indexSelectedProtocoleAjout = 0;
       this.changerCultureProtocole(this.indexSelectedProtocoleAjout, false)
     }

     //if(this.verifieT){
      
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
                          surnom_Membre: this.Essai.surnom_producteur,
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
                    text: 'Ok',
                    handler: () =>  {
                        console.log('ok producteur sans champs')
                        //this.ajoutForm = false;
                        //this.reinitForm();
                        //this.dechargerT();
                      }
                  }
                ]
              });

              alert.present();
        }else{

          if(!this.matricule_producteur && !this.Essai.nom_producteur){
           
            this.rechergerInfoProducteur(this.matricule_producteur1, this.nom_producteur1)
          }

          this.ajoutForm = true;
        }
      }

  }

  reAjouterEssaiProducteurConnu(){

     this.Essai = new EssaiType();
     let maDate = new Date();
     this.Essai.start = maDate.toJSON();
     if(!this.Essai.annee_essai){
      this.Essai.annee_essai = this.selectedAnnee;
     }
     this.ancien_selectedAnnee = this.selectedAnnee;
     this.Essai.type = 'essai';
     let today = this.createDate(maDate.getDate(), maDate.getMonth(), maDate.getFullYear());
     this.Essai.effort_personnel = false;
     this.Essai.estValide = true;
     this.Essai.today = today;
     //Charger proto
     this.changerCultureProtocole(this.indexSelectedProtocoleAjout, false, true)
     //this.changerCultureProtocole(this.selectedProtocole, false);

     //recharger les info du protocole
     //recharger les info du producteur
     this.rechergerInfoProducteur(this.matricule_producteur1, this.nom_producteur1);
     //recherger les info du champs
     if(this.selectedChamps.data){
      this.chargerInfoChamps(this.selectedChamps.data);
     }

     //this.selectedCultureProtocole = null;
     //this.selectedCultureProtocole2 = null;

     this.selectedTraitement = null;
     this.selectedTraitementInfoComplet = null;

     /*if(this.indexSelectedCultureProtocole1 >= 0){
      //this.indexSelectedCultureProtocole1 = -1;
      this.changerInfoCultureProtocole(this.indexSelectedCultureProtocole1)
     }
     if(this.indexSelectedCultureProtocole2 >= 0){
      //this.indexSelectedCultureProtocole2 = -1;
      this.changerInfoCultureProtocole2(this.indexSelectedCultureProtocole2)
     }*/
  }


  rechergerInfoProducteur(matricule, nom){
    //alert('ici');

    //this.chargerChamps(matricule, nom);
    this.Essai.code_essai = this.generateId(matricule);

    this.selectedProducteur = this.membre;
    //nom producteur
    this.Essai.matricule_producteur = matricule;
    this.Essai.nom_producteur = this.membre.data.nom_Membre;
    this.Essai.surnom_producteur = this.membre.data.surnom_Membre;
    this.Essai.code_union = this.membre.data.code_union;

    //sex producteur
    this.Essai.sex_producteur = this.membre.data.genre;
    
    //site
    this.Essai.id_site_producteur = this.membre.data.commune
    this.Essai.site_producteur = this.membre.data.commune_nom;

    //village
    this.Essai.id_village_producteur = this.membre.data.village
    this.Essai.village_producteur = this.membre.data.village_nom;
/*
      //classe
      if((this.membre.data.classe != 'AUTRE') && (!this.membre.data.classe_nom)){
        this.classe_producteur = this.membre.data.classe
      }else if(this.membre.data.classe != 'AUTRE' && this.membre.data.classe_nom){
        this.classe_producteur = this.membre.data.classe_nom;
      }else{
        this.classe_producteur = this.membre.data.classe_autre
      }*/
  }

  trasformerEssaisPourAnnalyse(old_essais){
    let new_essais: any = [];
     let new_essais1: any = [];
    new_essais = old_essais;
    let new_essai: any = {};
    /*old_essais.forEach((essai) => {
       new_essais.push(essai);
    })*/
      for(let i = 0; i < old_essais.length; i++){
       new_essais.push(old_essais[i]);
      }

    /* for(let i = 0; i < old_essais.length; i++){
       new_essai = old_essais[i];
        new_essai.doc.data.nom_entree = old_essais[i].doc.data.nom_controle;
        new_essai.doc.data.date_semis = old_essais[i].doc.data.date_semis_controle;
        new_essai.doc.data.NPL = old_essais[i].doc.data.NPL_controle;
        new_essai.doc.data.gestion = old_essais[i].doc.data.gestion_controle;
        new_essai.doc.data.NPR = old_essais[i].doc.data.NPR_controle;
        new_essai.doc.data.PDE = old_essais[i].doc.data.PDE_controle;
        //new_essai.doc.data.date_semis = essai.doc.data.date_semis_controle;
        new_essais.push(new_essai);
        new_essai = {}
     }*/

    old_essais.forEach((essai) => {
      new_essai = essai;
      new_essai.doc.data.nom_entree = essai.doc.data.nom_controle;
      new_essai.doc.data.date_semis = essai.doc.data.date_semis_controle;
      new_essai.doc.data.NPL = essai.doc.data.NPL_controle;
      new_essai.doc.data.gestion = essai.doc.data.gestion_controle;
      new_essai.doc.data.NPR = essai.doc.data.NPR_controle;
      new_essai.doc.data.PDE = essai.doc.data.PDE_controle;
      //new_essai.doc.data.date_semis = essai.doc.data.date_semis_controle;
      new_essais1.push(new_essai);
      new_essai = {}
    });

    //let E: any = this.essais;
      this.essais_pour_annalyse = new_essais.concat(new_essais1);

    //this.essais_pour_annalyse = new_essais;
  }

  changerStyleAffichageTableau(essais, selectedStyleTableau){
    if(selectedStyleTableau === 'avance'){
      this.trasformerEssaisPourAnnalyse(essais)
    }else{

    }
  }


  detail(essai){
    this.essai = essai;

    //alert(essai.data.matricule_producteur.substr(essai.data.matricule_producteur.indexOf('-') +1, essai.data.matricule_producteur.indexOf(' ') -3))
    this.detailEssai = true;
    //this.reinitFormModifier();
    
  }
  
    typeRechercheChange(){
    //this.essais = this.allEssais;
  }


  getItems(ev: any) {
    // Reset items back to all of the items
    //this.essais = this.allEssais;

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '' && val.trim() != global.config_app.code_structure+'-' && val.trim() != global.config_app.code_structure.toString().toLowerCase()+'-') {
      this.essais = this.allEssais.filter((item, index) => {
        if(this.typeRecherche === 'matricule'){
          return (item.doc.data.matricule_producteur.toLowerCase().indexOf(val.toLowerCase()) > -1);
        }else if(this.typeRecherche === 'nom_membre'){
          return (item.doc.data.nom_producteur.toLowerCase().indexOf(val.toLowerCase()) > -1);
        }else if(this.typeRecherche === 'surnom_membre'){
          if(item.doc.data.surnom_producteur){
            return (item.doc.data.surnom_producteur.toLowerCase().indexOf(val.toLowerCase()) > -1);
          }
        }else if(this.typeRecherche === 'nom_entree'){
          return (item.doc.data.nom_entree.toLowerCase().indexOf(val.toLowerCase()) > -1);
        }else if(this.typeRecherche === 'type_sole'){
          return (item.doc.data.type_sole.toLowerCase().indexOf(val.toLowerCase()) > -1);
        }else if(this.typeRecherche === 'site'){
          return (item.doc.data.site_producteur.toLowerCase().indexOf(val.toLowerCase()) > -1);
        }else if(this.typeRecherche === 'village'){
          return (item.doc.data.village_producteur.toLowerCase().indexOf(val.toLowerCase()) > -1);
        }
      });
    }else{
      this.choixLimit();
    }
  } 
 

}
