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
import PouchDB from 'pouchdb';
import {TableExport} from 'tableexport';

//import 'vega';
//import 'vega-util';
//import 'vega-tooltip';
//import 'vega-event-selector';
//import 'vega-lite';
import embed from 'vega-embed';

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
  loading: boolean = true;
  rechercher: any = false;
  detailEssai: boolean = false;
  allTraitements: any = [];
  statistiqueTraitement: any = [];
  essais: any = [];
  essais_pour_annalyse: any = [];
  essais1: any = [];
  allEssais: any = [];
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
  nom_producteur: any;
  surnom_producteur: any;
  storageDirectory: string = '';
  a_matricule: boolean = false;
  recherche: any = 'FM-';
  selectedDiff: any = 'PDE';
  selectedVar: any = 'PDE';
  selectedMed: any = 'PDE';
  vegaData: any = [];
  medianeData: any = [];
  selectedStyleTableau: any = 'standard';

  annees: any = [];
  selectedStyle: any = 'liste';
  aProfile: boolean = false;
  membre: any; 
  selectedLimit: any = 10;
  limits: any = [10, 25, 50, 100, 500, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 'Tous'];
  mode_semis: any = ['sec', 'humide'];
  mode_semi: any = '';
  mode_semi_controle: any = '';
  typeRecherche: any = 'matricule';
  precedante_cultures: any = ['Arachide', 'Mil', 'Niébé', 'Sorgho', 'Souchet'];
  gerants: any = ['Moi', 'Mon mari', 'Ma femme', 'Mes fils', 'Mes frères', 'Mes soeurs', 'Manoeuvres'];
  //champs: any = [];
  //traitements: any = [];

  code_union: any = '';
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
  nbTotalEssa: any = 0;
  uniqueMembres: any = [];
  statistique: boolean = false;
  //classe_producteur: any;
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
  statistiqueOk: boolean = false;

  annee_essai: any;
  today: any;
  //id_traitement: [''],
  code_traitement: any;
  ancien_code_traitement: any;
  id_champs: any;
  superficie_essai: any;
  date_semis: any;
  date_semis_controle: any;
  gestion: any;
  gestion_controle: any;
  date_recolte: any;
  PDE: any;
  PDE_controle: any;
  observation: any;
  observation_controle: any;
  objectif_essai: any;
  estValide: any;
  effort_personnel: any;
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


  constructor(public navCtrl: NavController, public loadtingCtl: LoadingController, public toastCtl: ToastController, public ionicApp: IonicApp, public viewCtl: ViewController, public formBuilder: FormBuilder, public ServiceAutoCompletion: AutoCompletion, public sim: Sim, public device: Device, public modelCtl: ModalController, public a: App, public events: Events, public zone: NgZone, public navParams: NavParams, public menuCtl: MenuController, public printer: Printer, public file: File, public platform: Platform, public storage: Storage, public servicePouchdb: PouchdbProvider, public alertCtl: AlertController) {
    this.menuCtl.enable(false, 'options');
    this.menuCtl.enable(false, 'connexion');
    this.menuCtl.enable(false, 'profile');
    
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
      this.matricule_producteur = this.navParams.data.matricule_producteur;
      this.matricule_producteur1 = this.navParams.data.matricule_producteur;
      this.nom_producteur1 = this.navParams.data.nom_producteur;
      this.nom_producteur = this.navParams.data.nom_producteur;      
      this.membre = this.navParams.data.membre;
      this.surnom_producteur = this.navParams.data.surnom_producteur;

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

   estMangerConnecter(user){
    if(user && user.roles){
      this.estManager = global.estManager(user.roles);
    }
  }


  export(){
    let date = new Date();
    //let dateHeure = date.toLocaleDateString()+ date.toLocaleTimeString();// + date.getTime().toLocaleString();
    let nom = date.getDate().toString() +'_'+ (date.getMonth() + 1).toString() +'_'+ date.getFullYear().toString() +'_'+ date.getHours().toString() +'_'+ date.getMinutes().toString() +'_'+ date.getSeconds().toString();

    new TableExport(document.getElementsByTagName("table"), {
        filename: 'Essais_'+nom,    // (id, String), filename for the downloaded file, (default: 'id')
    });
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

  visualisation(essais){
    //let data: any = this.preparerDannePourAnnalyse(essai);
    let essai: any = [];
    let data: any = [];
    let ess: any = {};
    essais.forEach((item) => {
      essai.push(item);
    });

    essai.forEach((e) =>{
       /*if(essai[i].doc.data.NPL && essai[i].doc.data.NPL !== ""){
        //ess.doc.data.PDE = 0;
        //alert('ok')
        data.push(essai[i].doc.data);
       }*/

       ess = e.doc.data;
       if(e.doc.data.PDE)
        {ess.PDE = parseFloat(e.doc.data.PDE);}
       if(e.doc.data.PDE_controle)
       {ess.PDE_controle = parseFloat(e.doc.data.PDE_controle);}
       if(e.doc.data.NPL)
       {ess.NPL = parseInt(e.doc.data.NPL);}
       if(e.doc.data.NPL_controle)
       {ess.NPL_controle = parseInt(e.doc.data.NPL_controle);}
       if(e.doc.data.NPR)
       {ess.NPR = parseInt(e.doc.data.NPR);}
       if(e.doc.data.NPR_controle)
       {ess.NPR_controle = parseInt(e.doc.data.NPR_controle);}


       if(e.doc.data.PDE && e.doc.data.PDE_controle)
       {ess.diff_PDE = parseFloat(e.doc.data.PDE) - parseFloat(e.doc.data.PDE_controle);
      }else if(e.doc.data.PDE && !e.doc.data.PDE_controle){
        ess.diff_PDE = parseFloat(e.doc.data.PDE);
      }else if(!e.doc.data.PDE && e.doc.data.PDE_controle){
        ess.diff_PDE = - parseFloat(e.doc.data.PDE_controle);
      }else{
        ess.diff_PDE = '';
      }

      if(e.doc.data.NPL && e.doc.data.NPL_controle)
       {ess.diff_NPL = parseInt(e.doc.data.NPL) - parseInt(e.doc.data.NPL_controle);
      }else if(e.doc.data.NPL && !e.doc.data.NPL_controle || e.doc.data.NPL_controle === ''){
        ess.diff_NPL = parseInt(e.doc.data.NPL);
      }else if(!e.doc.data.NPL || e.doc.data.NPL === '' && e.doc.data.NPL_controle){
        ess.diff_NPL= - parseInt(e.doc.data.NPL_controle);
      }else{
        ess.diff_NPL = '';
      }

       if(e.doc.data.NPR && e.doc.data.NPR_controle)
       {ess.diff_NPR = parseInt(e.doc.data.NPR) - parseInt(e.doc.data.NPR_controle);
      }else if(e.doc.data.NPR && !e.doc.data.NPR_controle){
        ess.diff_NPR = parseInt(e.doc.data.NPR);
      }else if(!e.doc.data.NPR && e.doc.data.NPR_controle){
        ess.diff_NPR= - parseInt(e.doc.data.NPR_controle);
      }else{
        ess.diff_NPR = '';
      }

      if(ess.PDE === ess.PDE_controle){
        ess.mediane_PDE = ess.PDE;
      }
      if(ess.NPL === ess.NPL_controle){
        ess.mediane_NPL = ess.NPL;
      }
      if(ess.NPR === ess.NPR_controle){
        ess.mediane_NPR = ess.NPR;
      }

       //ess.diff_NPL = parseInt(e.doc.data.NPL) - parseInt(e.doc.data.NPL_controle);
       //ess.diff_NPR = parseInt(e.doc.data.NPR) - parseInt(e.doc.data.NPR_controle);

      data.push(ess);
      ess = {};
    });

    this.vegaData = data;

    /*data.forEach((d, i) => {
      var ese :any = {};
      var control: any = {};
      var commun: any = {}
      control.matricule_producteur = d.matricule_producteur;
      control.nom_producteur = d.nom_producteur;
      control.type_sole = d.type_sole;
      control.genre = d.genre;
      control.nom_entree = d.nom_entree;
      control.mediane_NPL = d.mediane_NPL;
      control.mediane_NPR  = d.mediane_NPR;
      control.mediane_PDE = d.mediane_PDE;
      
      ese.matricule_producteur = d.matricule_producteur;
      ese.nom_producteur = d.nom_producteur;
      ese.type_sole = d.type_sole;
      ese.genre = d.genre;
      ese.nom_entree = d.nom_entree;
      ese.mediane_NPL = d.mediane_NPL;
      ese.mediane_NPR  = d.mediane_NPR;
      ese.mediane_PDE = d.mediane_PDE;

      //ese = commun;
      //control = commun;
      control.type = 'controle';
      ese.type = 'essai';
      
      ese.NPL = d.NPL;
      control.NPL_controle = d.NPL_controle;
      ese.PDE = d.PDE;
      control.PDE_controle = d.PDE_controle;
      ese.NPR = d.NPR;
      control.NPR_controle = d.NPR_controle;
      this.medianeData.push(ese);
      this.medianeData.push(control);
        //essai = {};
      //control = {}
    });
    */

    //alert(data.length+',' +essai.length);
    this.visualiserTouts(data, this.selectedVar);
    this.visualiserDifferenceEssaiControle(data, this.selectedDiff);
    this.visualiserMediane(data, this.selectedMed);
   

  }

  visualiserTouts(data, selectedVar){

    let variable:any;

   if(selectedVar === 'NPL controle'){
      variable = 'NPL_controle'
    }else if(selectedVar === 'NPR controle'){
      variable = 'NPL_controle'
    }else if(selectedVar === 'PDE controle'){
      variable = 'PDE_controle'
    }else {
      variable = selectedVar
    }

     var vlSpec = {
    "data": {
      "values": JSON.stringify(data)
    }
    ,
    "mark": "point",
    "encoding": {
     "x": { "field": "matricule_producteur", "type": "nominal" },
     "y": { "field": variable, "type": "quantitative" },
     "color": { "field": "nom_entree", "type": "nominal" },
     //"shape": { "field": "type_sole", "type": "nominal" }
    }
  };

/*var embedSpec = {
  mode: "vega-lite",
  spec: vlSpec
}

var opt = {
  'mode': 'vega'

}*/

    embed('#vis1', vlSpec, { mode: "vega-lite"}).then(function(result) {
      // access view as result.view
    }).catch(console.error);
  }


   visualiserDifferenceEssaiControle(data, selectedDiff){
     this.loading = true;
     let diff: string;

     if(selectedDiff === 'NPL'){
        diff = "diff_NPL";
        let v: any;
        for(let i = 0; i < data.length -1; i++){
          v = data[i];
          for(let j = i; j < data.length; j++){
            if(v.diff_NPL > data[j].diff_NPL){
              data[i] = data[j];
              data[j] = v;
              v = data[i];
            }
          }
        }
  /*      data.sort((a, b) => {
            if ( a.diff_NPL < b.diff_NPL ){
              return -1;
            }
            if ( a.diff_NPL > b.diff_NPL ){
              return 1;
            }else{
              return 0;
            }
        });
*/
     }else if(selectedDiff === 'NPR'){
        diff = "diff_NPR"; 
        data.sort((a, b) => {
            if ( a.diff_NPR < b.diff_NPR )
                {return -1;}
            if ( a.diff_NPR > b.diff_NPR )
                {return 1;}
            else
            {return 0;}
        });
     }else{
       diff = "diff_PDE";
       data.sort((a, b) =>{
            if ( a.diff_PDE < b.diff_PDE )
                {return -1;}
            if ( a.diff_PDE > b.diff_PDE )
                {return 1;}
            else
            {return 0;}
        });
     }
     var vlSpec = {
      "data": {
        "values": data
      },
      
      "mark": "bar",
      "encoding": {
        "y": { "field": diff, "type": "quantitative"},
        "x": { "field": "matricule_producteur", "type": "nominal",
        "sort": false,
      },
      "color": { "field": "nom_entree", "type": "nominal" },
      //"shape": { "field": "type_sole", "type": "nominal" }
      }
    };

   /* var embedSpec = {
      mode: "vega-lite",
      spec: vlSpec
    }

    var opt = {
    }*/
      
    embed('#visDiff1', vlSpec, { mode: "vega-lite"}).then(function(result) {
      // access view as result.view
    }).catch(console.error);
    this.loading = false
  }


   visualiserMediane(data, selectedMed){

    let variable:any;
    let med: any;

    if(selectedMed === 'NPL'){
        variable = 'NPL_controle';
        med = 'mediane_NPL';
      }else if(selectedMed === 'NPR'){
        variable = 'NPR_controle';
        med = 'mediane_NPR';
      }else if(selectedMed === 'PDE'){
        variable = 'PDE_controle';
        med = 'mediane_PDE';
      }

     var vlSpec = {
    "data": {
      "values": data
    },
    "layer": [
      {
        "mark": "point",
        "encoding": {
          "x": {
            "field": variable,
            "type": "quantitative"

          },
          "y": {
            "field": selectedMed,
            "type": "quantitative"
          },
          "color": { "field": "type", "type": "nominal" },
          "shape": { "field": "type_sole", "type": "nominal" }
        }
      },
      {
      "mark": "line",
      "encoding": {
        "x": {
          "field": med,
          "type": "quantitative",
          "color": {"value": "firebrick"}
        },
        "y": {
          "field": med,
          "type": "quantitative",
          "axis": {
            "grid": false
          },
          //"scale": {"zero": false}
        },
        "color": {"value": "firebrick"}
      }
    }
    ],
  "resolve": {"scale": {"y": "independent"}} 
  };

    /*var embedSpec = {
      mode: "vega-lite",
      spec: vlSpec
    }

    var opt = {
    }*/

    embed('#visMediane1', vlSpec, { mode: "vega-lite"}).then(function(result) {
      // access view as result.view
    }).catch(console.error);
  }

  calculStatisitque(essais, traitements){
    let model = this.modelCtl.create('RestitutionPage', {'type': 'essai', 'essais': essais, 'traitements': traitements, 'producteurs': this.producteurs});
    model.present();
    //this.calculerMembreAyantFaitUnEssai(essais);
    //this.calculerNombreEssaiParTraitement(essais, traitements);
    //this.visualisation(essais);
  }


    calculerMembreAyantFaitUnEssai(dd){
    let temp: any = 0
    let membreNbEssais: any = {}
    this.uniqueMembres = [];
    let d: any = [];

    dd.forEach((item) => {
      d.push(item);
    });
//let d: any = [];
    //d = this.allEssais;
    //var uniqueField='';
    for(let i = 0; i < d.length -1 ; i++){
      temp = 1;
      for(let j=1; j< d.length; j++){
        if((d[i].doc.data.matricule_producteur === d[j].doc.data.matricule_producteur)){
          temp++;
          d.splice(j, 1);
        }
        //temp.push(data[i]);
      }

      membreNbEssais.matricule_Membre = d[i].doc.data.matricule_producteur;
      membreNbEssais.nom_Membre = d[i].doc.data.nom_producteur;
      membreNbEssais.code_op = d[i].doc.data.matricule_producteur.toString().substr(d[i].doc.data.matricule_producteur.toString().indexOf('-') +1, d[i].doc.data.matricule_producteur.toString().indexOf(' ') -3)
      membreNbEssais.nb_Essai = temp;
      this.uniqueMembres.push(membreNbEssais);
      membreNbEssais = {};
    }

    let nb = 0;
    this.uniqueMembres.forEach((item) => {
      nb += item.nb_Essai;
    });

    this.nbTotalEssa = nb;
    this.statistique = true;
    


    if(this.allOP.length > 0){
      this.calculerOPAyantParticipeAuxEssai(this.uniqueMembres, this.allOP)
    }else{
      this.servicePouchdb.getPlageDocsRapide('fuma:op:','fuma:op:\uffff').then((ops) => {
        if(ops){
          //opss = ops;
          ops.forEach((o, index) => {
            if(!o.doc.data.op/* || o.data.op !== ''*/){
              this.allOP.push(o)
            }
          });

          this.calculerOPAyantParticipeAuxEssai(this.uniqueMembres, this.allOP)
        }
      });
    }

    //this.uniqueMembres;
  }

  calculerOPAyantParticipeAuxEssai(mbr, op){
    let temp: any = 0
    let opEssai: any = {}
    this.opEssai = [];
    let membres: any = [];

    if(mbr.length > 0){
      mbr.forEach((item) => {
        membres.push(item);
      });
      
      //let uniqueOp
      

      for(let i = 0; i < op.length; i++){
        temp = 0;
        for(let j=0; j< membres.length; j++){
          if(op[i].doc.data.code_OP === membres[j].code_op){
            temp++;
            membres.splice(j, 1);
          }
          //temp.push(data[i]);
        }

        if(temp > 0){
          opEssai.nom_op = op[i].doc.data.nom_OP
          opEssai.code_op = op[i].doc.data.code_OP
          opEssai.nb_Membre = temp;
          this.opEssai.push(opEssai);
          opEssai = {};
        }
        
      }
    }
    
    //return membreNbEssais;
  }


  calculerNombreEssaiParTraitement(essai, traitement){
    let tr: any = [];
    let t: any = {};
    traitement.forEach((item) => {
      t.nom_entree = item.doc.data.nom_entree;
      t.value = 0;
      tr.push(t);
      t = {};
    });

    essai.map((es) => {
      for(let i =0; i <tr.length; i++){
        if(es.doc.data.nom_entree === tr[i].nom_entree){
          tr[i].value++;
          break;
        }
      }
    });

    this.statistiqueTraitement = tr;
  }


  myHeaderFn(record, recordIndex, records){
    if(recordIndex % 20 === 0){
      return '' + recordIndex;
    }

    return null;
  }

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
    this.date_semis_controle = this.date_semis;
    //alert(ev +' -> d = '+d +' -> dd = '+dd);
    this.dateSemis = ev;
    this.dateSemisControle = ev;
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

  setDateSemisControle(ev: any){
    let d = new Date(ev)
    this.date_semis_controle = this.createDate(d.getDate(), d.getMonth(), d.getFullYear());
    //alert(ev +' -> d = '+d +' -> dd = '+dd);
    this.dateSemisControle = ev;
    if(this.ajoutForm){
      //this.dateRecolte = ev;
    }

    if(this.modifierFrom){
      if(this.date_recolte){
        let dd = new Date(this.date_recolte);
        if(d < dd){
          //this.date_recolte = '';
          //this.dateRecolte = ev;
        }
      }else{
        //this.dateRecolte = ev;
      }
    }

  }

  setModeSemiControl(m){
    this.mode_semi_controle = m;
  }

  setGestionControle(g){
    this.gestion_controle = g;
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

  autreActionSemisControle(){
    if(this.date_semis_controle || this.date_semis_controle !== ''){
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
      surnom_producteur: [''],
      sex_producteur: ['', Validators.required],
      //id_classe_producteur: [''],
      //classe_producteur: [''],
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
      gerants: [''],
      precedante_cultures: [''],
      observation: [''],
      observation_controle: [''],
      objectif_essai: [''],
      effort_personnel: [false],
      estValide: [true],
      today: [today],
      deviceid: [''],
      imei: [''],
      phonenumber: [''],
      start: [maDate.toJSON()],
      end: ['']
    });
    
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
     this.selectedGerants = {};
     this.selectedPrecedanteCultures = {};
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
     this.observation_controle = '';

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
          this.surnom_producteur = prod.data.surnom_Membre;
          this.code_union = prod.data.code_union;

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
    }

  }

  reinitForm(){
    this.matricule_producteur = null;
    //this.chargerChamps('');
    this.champs = [];
    this.code_essai = '';
    
    this.selectedProducteur = null;
    this.selectedChamps = null;
    this.selectedGerants = {};
    this.selectedPrecedanteCultures = {};
    //nom producteur
    this.nom_producteur = '';
    this.surnom_producteur = '';
    this.code_union = '';

    //sex producteur
    this.sex_producteur = '';
    
    //site
    
      this.site_producteur = '';
    

    //village
    
      this.village_producteur = '';
    
      //this.classe_producteur = [];
  }

   producteurSelectedProdConnu(matricule){
    
    this.code_essai = this.generateId(matricule);

    
        this.selectedProducteur = this.membre;
        //nom producteur
        this.nom_producteur = this.membre.data.nom_Membre;
        this.surnom_producteur = this.membre.data.surnom_Membre;

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

    producteurSelected(matricule, nom){
    //alert('ici');

    this.chargerChamps(matricule, nom);
    this.code_essai = this.generateId(matricule);

    
        this.selectedProducteur = this.membre;
        //nom producteur
        this.nom_producteur = this.membre.data.nom_Membre;
        this.surnom_producteur = this.membre.data.surnom_Membre;

        //sex producteur
        this.sex_producteur = this.membre.data.genre;
        this.code_union = this.membre.data.code_union;
        
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

  producteurSelected1(matricule){
    //alert(ev.code_produit);

    //this.chargerChamps(matricule);
    this.code_essai = this.generateId(matricule);

    
        this.selectedProducteur = this.membre;
        //nom producteur
        this.nom_producteur = this.membre.data.nom_Membre;
        this.surnom_producteur = this.membre.data.surnom_Membre;

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
                membre.data.surnom_Membre = this.surnom_producteur;
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
          essai.code_union = this.code_union;
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
          essai.update_deviceid = this.device.uuid;
          essai.update_phonenumber = this.phonenumber;
          essai.update_imei = this.imei;
          
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
                //this.dechargerT()
              }else{
                this.essais.push(E);
                //this.ajoutForm = false;
                //this.reinitForm();
                //this.dechargerT();
              }
            });

            if(this.matricule_producteur1){

                //this.essais1.push(E);
                this.dechargerT()
              }else{
                //this.essais.push(E);
                this.ajoutForm = false;
                this.reinitForm();
                this.dechargerT();
              }
            

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
        this.essai1.surnom_producteur = essai.surnom_producteur;
        this.essai1.sex_producteur = essai.sex_producteur;
        //id_classe_producteur: [''],
        //this.essai1.classes_producteur = essai.classes_producteur;
        this.essai1.code_union = this.code_union;
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
        this.essai1.date_semis_controle = this.date_semis_controle; // essai.date_semis;
        this.essai1.NPL = essai.NPL;
        this.essai1.NPL_controle = essai.NPL_controle;
        this.essai1.gestion = this.gestion;// essai.gestion;
        this.essai1.gestion_controle = this.gestion_controle;// essai.gestion;
        this.essai1.date_recolte =  this.date_recolte;// essai.date_recolte;
        this.essai1.NPR = essai.NPR;
        this.essai1.NPR_controle = essai.NPR_controle;
        this.essai1.PDE = essai.PDE;
        this.essai1.PDE_controle = essai.PDE_controle;
        this.essai1.gerants = essai.gerants;
        this.essai1.precedante_cultures = essai.precedante_cultures;
        this.essai1.observation = essai.observation;
        this.essai1.observation_controle = essai.observation_controle;
        this.essai1.objectif_essai = essai.objectif_essai;
        this.essai1.estValide = essai.estValide;
        this.essai1.effort_personnel = essai.effort_personnel;
        this.essai1.mode_semis = this.mode_semi;// essai.mode_semis;
        this.essai1.mode_semis_controle = this.mode_semi_controle;// essai.mode_semis;
        
        this.essai1.update_deviceid = this.device.uuid;
        this.essai1.update_phonenumber = this.phonenumber;
        this.essai1.update_imei = this.imei;
      
        //let essaiFinal: any = {};
        this.grandEssai.data = this.essai1
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
        });

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
    
    if(this.statistique){
      this.statistique = false;
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
      this.file.writeFile(fileDestiny, 'Combinee_'+nom+'.xls', blob).then(()=> {
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
      this.getEssais();
      this.estInstancier = true;
    }
    
    this.pourCreerForm();
    this.getInfoSimEmei();
    if(this.matricule_producteur1 && this.nom_producteur1){
      this.chargerChamps(this.matricule_producteur1, this.nom_producteur1)
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

  getEssais(refresher: any = ''){
    if(refresher === ''){
      this.rechercher = true;
    }
    /*this.servicePouchdb.remoteSaved.getSession((err, response) => {
        if (response.userCtx.name) {
          this.aProfile = true;
        }else{
          this.aProfile = false;
        }
    }, err => {
      this.aProfile = false;
      /*if(global.info_user != null){
        this.aProfile = true;
      }else{
        this.aProfile = false;
      }****
      //console.log(err)
    }); */


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
                    if(refresher !== ''){
                      refresher.complete();
                    }
                  }else{
                    this.rechercher = false;
                    if(refresher !== ''){
                      refresher.complete();
                    }
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
                     this.rechercher = false;
                     if(refresher !== ''){
                      refresher.complete();
                    }
                  }else{
                    this.rechercher = false;
                    if(refresher !== ''){
                      refresher.complete();
                    }
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
                    //this.allEssais = e;
                    this.rechercher = false;
                    if(refresher !== ''){
                      refresher.complete();
                    }
                  }else{
                    this.rechercher = false;
                    if(refresher !== ''){
                      refresher.complete();
                    }
                  }
                });


                this.servicePouchdb.getPlageDocsRapide('fuma:essai:'+this.matricule_producteur1, 'fuma:essai:'+this.matricule_producteur1+' \uffff').then((e) => {
                  if(e){
                    this.allEssais = e;
                    //this.rechercher = false;
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
                    //this.allEssais = e;
                    this.rechercher = false;
                    if(refresher !== ''){
                      refresher.complete();
                    }
                  }else{
                    this.rechercher = false;
                    if(refresher !== ''){
                      refresher.complete();
                    }
                  }

                });

                this.servicePouchdb.getPlageDocsRapide('fuma:essai', 'fuma:essai:\uffff').then((e) => {
                  if(e){
                   
                    this.allEssais = e;
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
                        if(es.doc.data.annee_essai === this.selectedAnnee){
                          ess.push(es);
                        }
                      });
                    this.essais = ess;
                    this.allEssais = ess;
                    this.rechercher = false;
                    if(refresher !== ''){
                      refresher.complete();
                    }
                  }else{
                    this.rechercher = false;
                    if(refresher !== ''){
                      refresher.complete();
                    }
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
                    this.rechercher = false;
                    if(refresher !== ''){
                      refresher.complete();
                    }
                  }else{
                    this.rechercher = false;
                    if(refresher !== ''){
                      refresher.complete();
                    }
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
                   // this.allEssais = ess;
                    this.rechercher = false;
                    if(refresher !== ''){
                      refresher.complete();
                    }
                  }else{
                    this.rechercher = false;
                    if(refresher !== ''){
                      refresher.complete();
                    }
                  }
                });


                 this.servicePouchdb.getPlageDocsRapide('fuma:essai:'+this.matricule_producteur1, 'fuma:essai:'+this.matricule_producteur1+' \uffff').then((e) => {
                  if(e){
                     let ess: any = [];
                     e.forEach((es, i) => {
                        if(es.doc.data.annee_essai === this.selectedAnnee){
                          ess.push(es);
                        }
                      });
                    //this.essais = ess;
                    this.allEssais = ess;
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
                            if(es.doc.data.annee_essai === this.selectedAnnee){
                              ess.push(es);
                            }
                          });
                      this.essais = ess;//.slice(0, 5);
                      //this.allEssais = ess;
                      this.rechercher = false;
                      if(refresher !== ''){
                      refresher.complete();
                    }
                  }else{
                    this.rechercher = false;
                    if(refresher !== ''){
                      refresher.complete();
                    }
                  }
                   });

                  this.servicePouchdb.getPlageDocsRapide('fuma:essai', 'fuma:essai:\uffff').then((e) => {
                  if(e){
                    let ess: any = [];
                     e.forEach((es, i) => {
                        if(es.doc.data.annee_essai === this.selectedAnnee){
                          ess.push(es);
                        }
                      });
                    //this.essais = ess;
                    this.allEssais = ess;
                    this.statistiqueOk = true;
                   //let r =  this.calculerMembreAyantFaitUnEssai(this.allEssais);
                   //alert(r.length);
                    //this.rechercher = false;
                  }
                });
                  
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
                    //this.allEssais = e;
                    this.rechercher = false;
                  }else{
                    this.rechercher = false;
                  }
                });

                this.servicePouchdb.getPlageDocsRapide('fuma:essai:'+this.matricule_producteur1, 'fuma:essai:'+this.matricule_producteur1+' \uffff').then((e) => {
                  if(e){
                   // this.essais = e;
                    this.allEssais = e;
                    //this.rechercher = false;
                  }
                 // this.champs = c;
                  //this.allChamps = c;
                })
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
                this.statistiqueOk = false;
                this.servicePouchdb.getPlageDocsRapideAvecLimit('fuma:essai', 'fuma:essai:\uffff', this.selectedLimit).then((e) => {
                  if(e){
                    this.essais = e;
                    //this.allEssais = e;
                    this.rechercher = false;
                  }else{
                    this.rechercher = false;
                  }

                });

                this.servicePouchdb.getPlageDocsRapide('fuma:essai', 'fuma:essai:\uffff').then((e) => {
                  if(e){
                     //this.essais = e;
                     this.allEssais = e;
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
                        if(es.doc.data.annee_essai === this.selectedAnnee){
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
                        if(es.doc.data.annee_essai === this.selectedAnnee){
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
                        if(es.doc.data.annee_essai === this.selectedAnnee){
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
                            if(es.doc.data.annee_essai === this.selectedAnnee){
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
                        if(es.doc.data.annee_essai === this.selectedAnnee){
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

  editer(essai, dbclick: boolean = false){
    if(!dbclick || (dbclick && this.user && this.user.roles && global.estAnimataire(this.user.roles))){
      this.grandEssai = essai;
      this.essai1 = this.grandEssai.data;
      //this.nom_producteur = this.essai1.nom_producteur;
      this.selectedProducteur = this.essai1.matricule_producteur;
      this.ancienSelectedProducteur = this.essai1.matricule_producteur;
      this.selectedChamps = this.essai1.id_champs;
      this.selectedTraitement = this.essai1.code_traitement;
      this.selectedGerants = this.essai1.gerants;
      this.selectedPrecedanteCultures = this.essai1.precedante_cultures;
      this.ancien_code_traitement = this.essai1.code_traitement;
      this.nom_entree = this.essai1.nom_entree;
      this.nom_controle = this.essai1.nom_controle;
      this.site_producteur = this.essai1.site_producteur;
      this.sex_producteur = this.essai1.sex_producteur;
      //this.classes_producteur = this.essai1.classes_producteur;
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
      this.surnom_producteur = this.essai1.surnom_producteur;
      //this.sex_producteur = this.essai1.sex_producteur;
      //this.site_producteur = this.essai1.site_producteur;
      //this.village_producteur = this.essai1.village_producteur;
      //this.classe_producteur = this.essai1.classe_producteur;
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

      if(this.essai1.date_semis_controle){
        this.date_semis_controle = this.essai1.date_semis_controle;
        this.dateSemisControle = new Date(this.essai1.date_semis_controle);
      }else if(!this.dateSemisControle){
        this.dateSemisControle = new Date();
      }

      if(this.essai1.gestion){
        this.gestion = this.essai1.gestion;
      }

      if(this.essai1.gestion_controle){
        this.gestion_controle = this.essai1.gestion_controle;
      }
      
      if(this.essai1.date_recolte){
        this.dateRecolte = new Date(this.essai1.date_recolte);
        //this.date_recolte = this.essai1.date_recolte;
        if(this.dateSemis > this.dateRecolte){
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

      if(this.essai1.mode_semis_controle && this.essai1.mode_semis_controle !== ''){
        this.mode_semi_controle = this.essai1.mode_semis_controle;
      }
      
      if(this.essai1.observation){
        this.observation = this.essai1.observation;
      }else{
        this.observation = '';
      }
      
      if(this.essai1.observation_controle){
        this.observation_controle = this.essai1.observation_controle;
      }else{
        this.observation_controle = '';
      }
      
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

          if(this.essai1.date_semis_controle){
            this.dateSemisControle = new Date(this.essai1.date_semis_controle);
          }else{
            this.dateSemisControle = new Date();
          }
          if(this.essai1.date_recolte){
            this.dateRecolte = new Date(this.essai1.date_recolte);
          }else{
            this.dateRecolte = new Date();
          }
      }

      //pour le code d'union
      if(this.essai1.code_union && this.essai1.code_union !== ''){
        this.code_union = this.essai1.code_union
      }else{
        for(let k = 0; k < this.producteurs.length; k++) {
          if(this.producteurs[k].doc.data.matricule_Membre === this.selectedProducteur){
            this.code_union = this.producteurs[k].doc.data.code_union;
            break;
          }
        }
      }
   }
  }

  reinitFormModifier(){
    this.grandEssai = '';
    this.essai1 = '';
    this.selectedProducteur = '';
    this.ancienSelectedProducteur = '';
    this.selectedGerants = {};
    this.selectedPrecedanteCultures = {};
    this.selectedChamps = '';
    this.selectedTraitement ='';
    this.ancien_code_traitement ='';
    this.nom_entree = '';
    this.nom_controle = '';
    this.site_producteur ='';
    this.sex_producteur = "";
    //this.classe_producteur = [];
    this.village_producteur = '';
    this.superficie = '';
    this.superficie_tr = '';
    this.type_sole = '';
    this.longitude = '';
    this.latitude = '';
    this.code_essai = '';
    this.ancientCode_essai = '';
    this.nom_champs = '';
    //this.nom_producteur = '';
    this.sex_producteur = '';
    this.site_producteur = '';
    this.village_producteur = '';
    //this.classe_producteur = [];
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
    this.nom_producteur = '';
    this.surnom_producteur = '';
    //this.sex_producteur = '';
    this.code_traitement = '';
    this.id_champs = '';
    this.superficie_essai = '';
    this.observation_controle = '';
    
    if(!this.matricule_producteur1){
      this.date_semis = '';
      this.date_semis_controle = '';
      this.gestion = '';
      this.gestion_controle = '';
      this.dateSemis = new Date();
      this.dateSemisControle = new Date();
      this.date_recolte = '';
      this.dateRecolte = new Date();
      this.mode_semi = '';
      this.mode_semi_controle = '';
    }
    
    this.PDE = '';
    this.PDE_controle = '';
    
    this.observation = '';
    this.observation_controle = '';
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
      this.date_semis_controle = '';
      this.dateSemis = maDate;
      this.dateSemisControle = maDate;
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
                          surnom_Membre: this.surnom_producteur,
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

          if(!this.matricule_producteur && !this.nom_producteur){
           
            this.rechergerInfoProducteur(this.matricule_producteur1, this.nom_producteur1)
          }

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


  rechergerInfoProducteur(matricule, nom){
    //alert('ici');

    //this.chargerChamps(matricule, nom);
    this.code_essai = this.generateId(matricule);

    
      this.selectedProducteur = this.membre;
      //nom producteur
      this.matricule_producteur = matricule;
      this.nom_producteur = this.membre.data.nom_Membre;
      this.surnom_producteur = this.membre.data.surnom_Membre;

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

    ///this.servicePouchdb.createIdex();

//    alert(essai.data.code_essai.substr(essai.data.code_essai.indexOf(' '), essai.data.code_essai.length - essai.data.code_essai.indexOf(' ')))
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
    //this.essais = this.allEssais;
  }


  getItems(ev: any) {
    // Reset items back to all of the items
    //this.essais = this.allEssais;

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '' && val.trim() != 'FM-' && val.trim() != 'fm-') {
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
