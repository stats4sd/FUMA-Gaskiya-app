import { Component } from '@angular/core';
import { NavController, IonicApp, ToastController, NavParams, LoadingController, ViewController, App, AlertController, Platform, ModalController, IonicPage, MenuController, Events  } from 'ionic-angular';
import { PouchdbProvider } from '../../providers/pouchdb-provider';
//import { AjouterEssaiPage } from './ajouter-essai/ajouter-essai';
//import { DetailEssaiPage } from './detail-essai/detail-essai';
import { Storage } from '@ionic/storage'; 
import { global } from '../../global-variables/variable';
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { Device } from '@ionic-native/device';
import { Sim } from '@ionic-native/sim';



/**
 * Generated class for the ConfigAppPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage() 
@Component({
  selector: 'page-config-app',
  templateUrl: 'config-app.html',
})
export class ConfigAppPage {

  id: any = '';
  
  config: any;
  config1: any;
  //configAModifier: any;
  grandConfig: any;
  configForm: any; 
  today: any;
  imei: any = '';
  phonenumber: any = '';
  user: any = global.info_user;
  global:any = global;
  estManager: boolean = false;
  estAnimataire: boolean = false;
  aProfile:boolean = false;
  modifierFrom: boolean = false;
  ajoutForm: boolean = false;

  constructor(public navCtrl: NavController, public loadtingCtl: LoadingController, public toastCtl: ToastController, public ionicApp: IonicApp, public viewCtl: ViewController, public formBuilder: FormBuilder, public sim: Sim, public device: Device, public modelCtl: ModalController, public navParams: NavParams, public menuCtl: MenuController, public platform: Platform, public storage: Storage, public servicePouchdb: PouchdbProvider, public alertCtl: AlertController) {
  
    this.menuCtl.enable(false, 'options');
      this.menuCtl.enable(false, 'connexion');
      this.menuCtl.enable(false, 'profile');
  }
  
    dismiss(){
      this.viewCtl.dismiss(/*this.protocoles*/);
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
  
    initForm(){
      let maDate = new Date();
      //this.dateAjout = maDate;
       let today = this.createDate(maDate.getDate(), maDate.getMonth(), maDate.getFullYear());
       this.configForm = this.formBuilder.group({
       // _id:[''],
        type:['config-app'],
        nom_structure:['', Validators.required],
        code_structure:['', [Validators.required, Validators.pattern('[A-Z0-9]{2,3}')]],
        //pays:['', Validators.required],
        //region:['', Validators.required],
        today: [today],
        deviceid: [''],
        imei: [''],
        phonenumber: [''],
        start: [maDate.toJSON()],
        end: ['']
      });
       
    }  
  

    initFormEdition(){
      //let maDate = new Date();
      //this.dateAjout = maDate;
       //let today = this.createDate(maDate.getDate(), maDate.getMonth(), maDate.getFullYear());
       this.configForm = this.formBuilder.group({
       // _id:[''],
        //type:[this.config.data.type],
        nom_structure:[this.config1.nom_structure, Validators.required],
        code_structure:[this.config1.code_structure, [Validators.required, Validators.pattern('[A-Z0-9]{2,3}')]],
        //pays:[this.config1.pays, Validators.required],
        //region:[this.config1.region, Validators.required],
        today: [this.config1.today],
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
  
  
    reinitForm(){

      //this.initForm();
      //this.avec_repetition = 'non';
      //this.avec_parcelle = 'non';
      //this.avec_bloc = 'non';
      //this.typologie = 'non';
      //this.traitement = 'oui';
    }
  
  generateId(){
      var chars='ABCDEFGHIJKLMNPQRSTUVWYZ'
      var numbers='0123456789'
      var randomArray=[]
      for(let i=0;i<4;i++){
        var rand = Math.floor(Math.random()*10)
        randomArray.push(numbers[rand])
      }
      randomArray.push('-')
      for(let i=0;i<4;i++){
        var rand = Math.floor(Math.random()*24)
        randomArray.push(chars[rand])
      }
      
      var randomString=randomArray.join("");
      var Id= /*+pays+'-'+region+'-'+department+'-'+commune +'-' +village+ */''+randomString 
      return Id;
    }
  
    


    actionForm(){
      let config = this.configForm.value;
          
      if(this.ajoutForm && !this.modifierFrom){
          let date = new Date();
          config.deviceid = this.device.uuid;
          config.phonenumber = this.phonenumber;
          config.imei = this.imei; 
          config.update_deviceid = this.device.uuid;
          config.update_phonenumber = this.phonenumber;
          config.update_imei = this.imei;
          config.end = date.toJSON();
          let configFinal: any = {};
          configFinal._id = 'config-app';
          configFinal.data = config
          this.servicePouchdb.createDocReturn(configFinal).then((res) => {

              configFinal._rev = res.rev;
              //let E: any = {};
             // E.doc = configFinal;
              this.config = configFinal;
              //this.viewCtl.dismiss(essaiFinal);
            // this.zone.run(() => {
            }); 
            this.ajoutForm = false;

      }else if(this.modifierFrom){
        let date = new Date();
        //let protocole = this.protocoleForm.value;
        this.config1.nom_structure = config.nom_structure;
        this.config1.code_structure = config.code_structure; 
        this.config1.pays = config.pays; 
        this.config1.region = config.region; 
     
       
        this.config1.update_deviceid = this.device.uuid;
        this.config1.update_phonenumber = this.phonenumber;
        this.config1.update_imei = this.imei;
      
        //let essaiFinal: any = {};
        this.grandConfig.data = this.config1
        this.servicePouchdb.updateDocReturn(this.grandConfig).then((res) => {
          this.grandConfig._rev = res.rev;
          this.config = this.grandConfig;
          //this.essais[this.essais.indexOf(this.essaiAModifier)] = e;
          
          
          //this.reinitFormModifier();
          this.modifierFrom = false;
          this.ajoutForm = false;
          //e.doc = this.protocole;

        });
      }
      
     
  }
  

  annuler(){
      this.ajoutForm = false;

    if(this.modifierFrom){
      this.modifierFrom = false;
      this.ajoutForm = false;
    } 
  }

  fermerDetail(){
      //this.detailProtocole = false;
      //this.essai = {};
    
  }

  supprimer(config){
    let e: any = {};
    let alert = this.alertCtl.create({
      title: 'Suppression configuration',
      message: 'Etes vous sûr de vouloir supprimer cette configuration ?',
      buttons:[
        {
          text: 'Non',
          handler: () => console.log('suppression annulée')
 
        },
        {
          text: 'Oui',
          handler: () => {
            this.servicePouchdb.deleteDocReturn(config).then((res) => {
              this.config = null;
            }, err => {
              console.log(err)
            }) ;
            
          }
        }
      ]
    });

    alert.present();
  }

  ionViewDidEnter(){
    
    this.getConfig();
    this.getInfoSimEmei();
  }

  ionViewDidLoad() { 

    this.initForm();

  }


 
  getConfig(){
    this.servicePouchdb.getDocById('config-app').then((c) => {
      if(c){
          this.config = c;
          global.config_app.nom_structure = this.config.data.nom_structure;
          global.config_app.code_structure = this.config.data.code_structure
        }
    }).catch((err) => console.log(err));
  }


  editer(config, dbclick: boolean = false){
    if(!dbclick || (dbclick && this.user && this.user.roles && global.estAnimataire(this.user.roles))){
      this.grandConfig = config;
      this.config1 = this.grandConfig.data;

      this.initFormEdition();
      //this.nom_producteur = this.protocole1.nom_producteur;

      
      
      //this.ajoutForm = true;

      this.modifierFrom = true;
      //this.configAModifier = config;
   }
  }

  reinitFormModifier(){
    /*this.grandProtocole = '';
    this.protocole1 = {};
    this.initForm();
    this.avec_repetition = 'non';
    this.avec_parcelle = 'non';
    this.avec_bloc = 'non';
    this.typologie = 'non';
    this.traitement = 'oui';*/
    
  }

  
   ajouter(){

      let maDate = new Date();
      this.today = this.createDate(maDate.getDate(), maDate.getMonth(), maDate.getFullYear());
      this.ajoutForm = true;
      
  }
  

}
