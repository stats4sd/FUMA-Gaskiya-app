import { Component } from '@angular/core';
import { NavController, IonicApp, ToastController, NavParams, LoadingController, ViewController, App, AlertController, Platform, ModalController, IonicPage, MenuController, Events  } from 'ionic-angular';
import { PouchdbProvider } from '../../../providers/pouchdb-provider';
//import { AjouterEssaiPage } from './ajouter-essai/ajouter-essai';
//import { DetailEssaiPage } from './detail-essai/detail-essai';
import { Storage } from '@ionic/storage'; 
import { File } from '@ionic-native/file';
import { global } from '../../../global-variables/variable';
import * as FileSaver from 'file-saver';
import { Printer, PrintOptions } from '@ionic-native/printer';
import { Device } from '@ionic-native/device';
import { Sim } from '@ionic-native/sim';

import {Culture} from '../../../app/culture.interface'
//import { from } from 'rxjs/observable/from';
//import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { variable } from '@angular/compiler/src/output/output_ast';

declare var cordova: any;
/**
 * Generated class for the CultureProtocolePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-culture-protocole',
  templateUrl: 'culture-protocole.html',
})
export class CultureProtocolePage {

  //cultureProtocoleForm: FormGroup;

  selectedCulture: any;
  selectedVarietes: any;
  culturesProtocoles: any = [];
  cultures: any = [];
  varietes: any = [];
  allCulturesProtocoles: any = [];
  id: any = '';
  loading: boolean = true;
  rechercher: any = false;
  detailCultureProtocole: boolean = false;
  selectedStyle: any = 'liste';
  cultureProtocole: any = {};
  cultureProtocole1: any;
  cultureProtocoleAModifier: any;
  grandCultureProtocole: any;
  selectedProtocole: any;
  selectedVariables: any = [];
  protocoles: any = [];

  //type_culture: any = 'Mil';
  selectedLimit: any = 'Tous';
  limits: any = [10, 25, 50, 100, 500, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 'Tous'];

  annee: any = '';
  code: any = '';
  code_protocole: any;
  today: any;
  start: any;
  imei: any = '';
  phonenumber: any = '';
  user: any = global.info_user;
  global:any = global;
  estManager: boolean = false;
  estAnimataire: boolean = false;
  aProfile:boolean = false;
  modifierFrom: boolean = false;
  estInstancier: boolean = false;
  ajoutForm: boolean = false;
  protocoleDefini: boolean = false;


  
  constructor(public navCtrl: NavController, public loadtingCtl: LoadingController, public toastCtl: ToastController, public ionicApp: IonicApp, public viewCtl: ViewController, /*public formBuilder: FormBuilder,*/ public sim: Sim, public device: Device, public modelCtl: ModalController, public a: App, public events: Events, public navParams: NavParams, public menuCtl: MenuController, public printer: Printer, public file: File, public platform: Platform, public storage: Storage, public servicePouchdb: PouchdbProvider, public alertCtl: AlertController) {
  
    this.menuCtl.enable(false, 'options');
      this.menuCtl.enable(false, 'connexion');
      this.menuCtl.enable(false, 'profile');
      
      if(navParams.data.protocole){
        this.selectedProtocole = navParams.data.protocole.data;
        this.protocoleDefini = true;
      }
    
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
  
  }
  
  dismiss(){
    this.viewCtl.dismiss(/*this.cultures*/);
    //this.a_matricule = false;
  }
  closeToast(){
   let toast = this.ionicApp._toastPortal.getActive();
    toast.dismiss();
  }
  estMangerConnecter(user){
    if(user && user.roles){
      this.estManager = global.estManager(user.roles);
    }
  }

   estAnimataireConnecter(user){
    if(user && user.roles){
      this.estAnimataire = global.estAnimataire(user.roles);
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


  getCultures(){
    this.servicePouchdb.getPlageDocsRapide('fuma:culture:', 'fuma:culture:\uffff').then((c) => {
      //let cs: any = [];
      if(c){
        /*c.forEach((culture) => {
          if(culture.doc.data.type == 'culture'){
            cs.push(culture)
          }
        })*/
        this.cultures = c;
        //this.rechercher = false;
      }
    });
  }

  

  changerVarietes(nom_culture){
    let vrs: any = [];
    //this.selectedVarietes = [];
    this.servicePouchdb.getPlageDocsRapide('fuma:variete', 'fuma:variete:\uffff').then((v) => {
      if(v){
        v.forEach((cl) => {
          if(nom_culture == cl.doc.data.culture){
            vrs.push(cl);
          }
        });

        this.varietes = vrs;
      }
    });

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
  }


  reinitForm(){
    //let maDate = new Date();
    //this.dateAjout = maDate;
    //this.today = this.createDate(maDate.getDate(), maDate.getMonth(), maDate.getFullYear());
    //this.chargerChamps('');
    //this.annee = '';
    
    //this.initForm();
  }

generateId(){
    var chars='ABCDEFGHIJKLMNPQRSTUVWYZ'
    var numbers='0123456789'
    var randomArray=[]
    for(let i=0;i<5;i++){
      var rand = Math.floor(Math.random()*10)
      randomArray.push(numbers[rand])
    }
    randomArray.push('-')
    for(let i=0;i<5;i++){
      var rand = Math.floor(Math.random()*24)
      randomArray.push(chars[rand])
    }
    
    var randomString=randomArray.join("");
    var Id= /*+pays+'-'+region+'-'+department+'-'+commune +'-' +village+ */''+randomString 
    return Id;
  }


  existe(cultureProtocole, code){
    //let c: any = {};
    let res: number = 0;
    //alert(producteur_connu+'  '+matricule_producteur)
    for(let i = 0; i < this.allCulturesProtocoles.length; i++){ 
      //c = this.allCultures[i];
      if(this.allCulturesProtocoles[i].doc.data.nom_culture == cultureProtocole.nom && (code  && this.allCulturesProtocoles[i].doc.data.code != code)){
        res = 1;
        break;
      }
    }
    return res;

    
  }


  actionForm(){
    //let culture = this.cultureForm.value;
    if(this.existe(this.selectedCulture, this.code) == 1){
      alert('Erreur! Impossible, cette culture existe déjà');
    }else{

      if(this.ajoutForm && !this.modifierFrom){
        let date = new Date();
        let cultureProtocole: any = {};
        cultureProtocole.today = this.today;
        cultureProtocole.start = this.start;
        cultureProtocole.type = 'culture-protocole';
        cultureProtocole.nom_culture = this.selectedCulture.nom;
        cultureProtocole.nom_protocole = this.selectedProtocole.nom;
        cultureProtocole.code_protocole = this.selectedProtocole.code;
        cultureProtocole.varietes = this.selectedVarietes;

        //charger les avriables selectionnez par l'utilisateur
        let selectedVaribles: any = [];
        this.selectedCulture.variables.forEach((variable) => {
          if(variable.est_selectionne){
            selectedVaribles.push(variable);
          }
        });

        cultureProtocole.variables = selectedVaribles;
        cultureProtocole.deviceid = this.device.uuid;
        cultureProtocole.phonenumber = this.phonenumber;
        cultureProtocole.imei = this.imei; 
        cultureProtocole.update_deviceid = this.device.uuid;
        cultureProtocole.update_phonenumber = this.phonenumber;
        cultureProtocole.update_imei = this.imei;
        cultureProtocole.code = this.id;
         
         //union._id = 'fuma'+ id;
         cultureProtocole.end = date.toJSON();
         //culture.code_essai = id;
         //champs.id_champs = id;
       
         let cultureProtocoleFinal: any = {};
         cultureProtocoleFinal._id = 'fuma'+':culture-protocole:'/*+this.selectedProtocole.code+':'*/+ this.id;
         cultureProtocoleFinal.data = cultureProtocole;
         let EF: any;
         this.servicePouchdb.createDocReturn(cultureProtocoleFinal).then((res) => {
           /* let toast = this.toastCtl.create({
               message: 'Essai bien enregistré!',
               position: 'top',
               duration: 1000
             });*/
             
             
             //alert(res.rev)
             cultureProtocoleFinal._rev = res.rev;
             let E: any = {};
             E.doc = cultureProtocoleFinal;
             this.getCultures();
             
             //this.viewCtl.dismiss(essaiFinal);
           // this.zone.run(() => {
             this.culturesProtocoles.push(E);
           }).catch((err) => alert('err ajout '+err));
 
          
           this.ajoutForm = false;
          // this.reinitForm();

        }else if(this.modifierFrom){
          let date = new Date();
          //let culture = this.cultureForm.value;
          //this.cultureProtocole1.nom = culture.nom;
          this.cultureProtocole1.nom_culture = this.selectedCulture.nom;
          this.cultureProtocole1.varietes = this.selectedVarietes;
          this.cultureProtocole1.nom_protocole = this.selectedProtocole.nom;
          this.cultureProtocole1.code_protocole = this.selectedProtocole.code;
          //charger les avriables selectionnez par l'utilisateur
          let selectedVaribles: any = [];
          this.selectedCulture.variables.forEach((variable) => {
            if(variable.est_selectionne){
              selectedVaribles.push(variable);
            }
          });

          this.cultureProtocole1.variables = selectedVaribles;
          this.cultureProtocole1.update_deviceid = this.device.uuid;
          this.cultureProtocole1.update_phonenumber = this.phonenumber;
          this.cultureProtocole1.update_imei = this.imei;
          this.grandCultureProtocole.data = this.cultureProtocole1;
          this.servicePouchdb.updateDocReturn(this.grandCultureProtocole).then((res) => {
            this.grandCultureProtocole._rev = res.rev;
            this.cultureProtocole = this.grandCultureProtocole;
            //this.reinitFormModifier();
            this.modifierFrom = false;
            this.detailCultureProtocole = true
            this.ajoutForm = false;
            
          
          let e: any = {};
            e.doc = this.cultureProtocole;
            this.culturesProtocoles.forEach((es, i) => {
              if(es.doc._id === this.cultureProtocoleAModifier._id){
                this.culturesProtocoles[i] = e ;
              }
              
            });

            this.getCultures();
          });
        }
      
    }
    
}


getProtocoles(){
  this.servicePouchdb.getPlageDocsRapide('fuma:protocole', 'fuma:protocole:\uffff').then((p) => {
    if(p){
        this.protocoles = p;
    }
  });

}



annuler(){
  this.ajoutForm = false;

if(this.modifierFrom){
  this.modifierFrom = false;
  this.ajoutForm = false;
  this.detailCultureProtocole = true;
  //this.reinitFormModifier();
} 

this.getCultures();
}

fermerDetail(){
  this.detailCultureProtocole = false;
  //this.essai = {};

}

supprimer(cultureProtocole){
let e: any = {};
let alert = this.alertCtl.create({
  title: 'Suppression culture',
  message: 'Etes vous sûr de vouloir supprimer cette culture du protocole ?',
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
          this.servicePouchdb.deleteReturn(cultureProtocole).then((res) => {
            //let e: any = {};
            //e.doc = essai;
            this.cultures.forEach((es, i) => {
              if(es.doc._id === cultureProtocole._id){
                this.culturesProtocoles.splice(i, 1);
              }
              
            });
  
            this.detailCultureProtocole = false;
            //this.navCtrl.pop();
          }, err => {
            console.log(err)
          }) ;
        }else{
          this.servicePouchdb.deleteDocReturn(cultureProtocole).then((res) => {
            //let e: any = {};
            //e.doc = essai;
            this.cultures.forEach((es, i) => {
              if(es.doc._id === cultureProtocole._id){
                this.culturesProtocoles.splice(i, 1);
              }
              
            });
  
            this.detailCultureProtocole = false;
            //this.navCtrl.pop();
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
this.servicePouchdb.syncAvecToast(this.getCulturesProtocoles());
//this.pourCreerForm();
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
  FileSaver.saveAs(blob, 'cultures'+nom+'.xls');
}else{

  let fileDestiny: string = cordova.file.externalRootDirectory;
  this.file.writeFile(fileDestiny, 'cultures_'+nom+'.xls', blob).then(()=> {
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
this.getCulturesProtocoles();
this.getCultures();
this.getProtocoles();
this.getInfoSimEmei();
this.estInstancier = true;
}

//this.pourCreerForm()
//this.estInstancier = true;

///this.corrigerErreur();
//this.servicePouchdb.findByTypeData()
}



ionViewDidLoad() { 

  //this.initForm();

}


choixLimit(){
  this.rechercher = true;
  if(this.selectedLimit !== 'Tous'){
    this.cultures = this.allCulturesProtocoles.slice(0, this.selectedLimit);
    this.rechercher = false;
  }else{
    this.cultures = this.allCulturesProtocoles;
    this.rechercher = false;
  }
  
}

choixLimit1(){
  this.rechercher = true;

  if(this.selectedLimit === 'Tous'){
    this.servicePouchdb.getPlageDocsRapide('fuma:culture-protocole', 'fuma:culture-protocole:\uffff').then((c) => {
      if(c){
          this.culturesProtocoles = c;
          this.allCulturesProtocoles = c;
          this.rechercher = false;
      }else{
        this.rechercher = false;
      }
    });

    }else{
      this.servicePouchdb.getPlageDocsRapideAvecLimit('fuma:culture-protocole', 'fuma:culture-protocole:\uffff', this.selectedLimit).then((p) => {
        if(p){
          this.culturesProtocoles = p;
          this.allCulturesProtocoles = p;
          this.rechercher = false;
        }else{
          this.rechercher = false;
        }

      });

  }
}

 getCulturesProtocoles(refresher: any = ''){
  if(refresher === ''){
    this.rechercher = true;
  }



  if(this.selectedLimit === 'Tous'){
    // this.servicePouchdb.getPlageDocs('fuma:essai', 'fuma:essai:\uffff').then((e) => {
      //   if(e){
          //cas ou le producteur est connu

            this.servicePouchdb.getPlageDocsRapide('fuma:culture-protocole', 'fuma:culture-protocole:\uffff').then((cp) => {
              if(cp){
                  if(this.protocoleDefini){
                    let cps:any = [];
                    cp.forEach((cpro) => {
                      if(cpro.doc.data.code_protocole == this.selectedProtocole.code){
                        cps.push(cpro);
                      }
                    })
                    this.culturesProtocoles = cps;
                    this.allCulturesProtocoles = cps;
                    this.rechercher = false;
                    if(refresher !== ''){
                      refresher.complete();
                    }
                  }else{
                    this.culturesProtocoles = cp;
                    this.allCulturesProtocoles = cp;
                    this.rechercher = false;
                    if(refresher !== ''){
                      refresher.complete();
                    }
                  }
              }else{
                this.rechercher = false;
                if(refresher !== ''){
                  refresher.complete();
                }
              }
            });

      
      //  }
      // });
    }else{

  
        this.servicePouchdb.getPlageDocsRapideAvecLimit('fuma:culture-protocole', 'fuma:culture-protocole:\uffff', this.selectedLimit).then((cp) => {
          if(cp){

            if(this.protocoleDefini){
              let cps:any = [];
              cp.forEach((cpro) => {
                if(cpro.doc.data.code_protocole == this.selectedProtocole.code){
                  cps.push(cpro);
                }
              })
              this.culturesProtocoles = cps;
              //this.allEssais = e;
              this.rechercher = false;
              if(refresher !== ''){
                refresher.complete();
              }
            }else{
              this.culturesProtocoles = cp;
              //this.allEssais = e;
              this.rechercher = false;
              if(refresher !== ''){
                refresher.complete();
              }
            }
          }else{
            this.rechercher = false;
            if(refresher !== ''){
              refresher.complete();
            }
          }

        });

        this.servicePouchdb.getPlageDocsRapide('fuma:culture-protocole', 'fuma:culture-protocole:\uffff').then((cp) => {
          if(cp){
            if(this.protocoleDefini){
              let cps:any = [];
              cp.forEach((cpro) => {
                if(cpro.doc.data.code_protocole == this.selectedProtocole.code){
                  cps.push(cpro);
                }
              })
              this.allCulturesProtocoles = cps;
            }else{
              this.allCulturesProtocoles = cp;
            }
            
            //this.rechercher = false;
          }
        });

    }
}



editer(cultureProtocole, dbclick: boolean = false){
  if(!dbclick || (dbclick && this.user && this.user.roles && global.estAnimataire(this.user.roles))){
    this.grandCultureProtocole = cultureProtocole;
    this.cultureProtocole1 = this.grandCultureProtocole.data;
    this.selectedVarietes = this.cultureProtocole1.varietes;
    if(this.cultureProtocole1.variables)
      this.selectedVariables = this.cultureProtocole1.variables;
    else
      this.selectedVariables = [];

    this.code = this.cultureProtocole1.code;

    this.detailCultureProtocole = false;

    this.ajoutForm = false;

    this.modifierFrom = true;
    this.cultureProtocoleAModifier = cultureProtocole;
// }
    this.cultures.forEach((cl) => {
      if(cl.doc.data.nom == this.cultureProtocole1.nom_culture){
        this.selectedCulture = cl.doc.data;
      }
    });

    //recharger les variables selectionnées
    this.selectedVariables.forEach((vr) => {
      for(let i = 0; i < this.selectedCulture.variables.length; i++){
        if(this.selectedCulture.variables[i].nom_variable == vr.nom_variable){
          this.selectedCulture.variables[i] = vr;
          break;
        }
      }
    });

    for(let i = 0; i < this.protocoles.length; i++){
      if(this.protocoles[i].doc.data.code == this.cultureProtocole1.code_protocole){
        this.selectedProtocole = this.protocoles[i].doc.data;
        break;
      }
    }

    this.changerVarietes(this.cultureProtocole1.nom_culture)
  }
}

reinitFormModifier(){
  this.grandCultureProtocole = {};
  this.cultureProtocole1 = {};
  //this.cultureForm.reset({variables: []});

  //this.initForm();
  //this.type_culture = '';
  //this.annee = '';
}


 ajouter(){

    let maDate = new Date();
    this.today = this.createDate(maDate.getDate(), maDate.getMonth(), maDate.getFullYear());
    this.start = maDate.toJSON();
    this.id = this.generateId();
    this.ajoutForm = true;
    this.code = '';
    if(this.selectedCulture){
      this.selectedCulture = null;
    }
      

    if(this.selectedProtocole && !this.protocoleDefini)
      this.selectedProtocole = null

    if(this.selectedVarietes)
      this.selectedVarietes = null;

    if(this.selectedVariables)
      this.selectedVariables = null;  
    
}


detail(cultureProtocole){
  this.cultureProtocole = cultureProtocole;

  this.detailCultureProtocole = true;

}



getItems(ev: any) {
  // Reset items back to all of the items
  //this.essais = this.allEssais;

  // set val to the value of the searchbar
  let val = ev.target.value;

  // if the value is an empty string don't filter the items
  if (val && val.trim() != '' && val.trim() != 'FM-' && val.trim() != 'fm-') {
    this.culturesProtocoles = this.allCulturesProtocoles.filter((item, index) => {
      return (item.doc.data.nom_culture.toLowerCase().indexOf(val.toLowerCase()) > -1);
    });
  }else{
    this.choixLimit();
  }
} 



}
