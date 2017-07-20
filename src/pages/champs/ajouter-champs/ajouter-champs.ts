import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, ViewController, IonicPage } from 'ionic-angular';
import { Validators, FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { PouchdbProvider } from '../../../providers/pouchdb-provider';
import { AutoCompletion } from '../../../providers/auto-completion';
import { Device } from '@ionic-native/device';
import { Sim } from '@ionic-native/sim';
import { Geolocation } from '@ionic-native/geolocation'

 
/*
  Generated class for the AjouterChamps page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

@IonicPage()
@Component({
  selector: 'page-ajouter-champs',
  templateUrl: 'ajouter-champs.html'
})
export class AjouterChampsPage {

  champsForm: any;
  typeSoles: any = [];
  producteurs: any = [];
  selectedTypeSole: any;
  selectedProducteur: any = [];
  nom_producteur: any = '';
  allChamps: any;
  imei: any = '';
  phonenumber: any = '';
  matricule_producteur: any;
  longitude: any ='';
  latitude: any = '';
  membre: any;
  nom: any = '';
  champs: any = [];
  type_sole: any;
  superficie: any = '';
  code_champs: any = '';

  constructor(public navCtrl: NavController, public viewCtl: ViewController, public ServiceAutoCompletion: AutoCompletion, public navParams: NavParams, public sim: Sim, public geolocation: Geolocation, public device: Device, public toastCtl: ToastController, public servicePouchdb: PouchdbProvider, public formBuilder: FormBuilder, public storage: Storage) {
    
    if(this.navParams.data.matricule_producteur){
      this.matricule_producteur = this.navParams.data.matricule_producteur;
      this.selectedProducteur = this.navParams.data.membre
      this.nom_producteur = this.navParams.data.nom;
      this.generecodeChamps(this.selectedProducteur.data.matricule_Membre)
      //this.typeSoles = this.navParams.data.typeSoles
    
      //this.nom_producteur 
        //  this.producteurSelected(this.matricule_producteur);
    }else{

      let p: any = [];
    this.servicePouchdb.getPlageDocs('fuma:op:membre','fuma:op:membre:\uffff').then((mbrA) => {
      
        this.servicePouchdb.getPlageDocs('koboSubmission_fuma-op-membre','koboSubmission_fuma-op-membre\uffff').then((mbrK) => {
        this.producteurs = mbrA.concat(mbrK);

       
        this.producteurs.forEach((prod, index) => {
          p.push(prod.data); 
        });

        this.ServiceAutoCompletion.data = p;
        //this.ServiceAutoCompletion.data = this.producteurs;
        //this.allMembres = this.membres
    }, err => console.log(err));

    }, err => console.log(err)); 
  }
    //this.chergerTypeSole()
    let maDate = new Date();
    let today = this.createDate(maDate.getDate(), maDate.getMonth(), maDate.getFullYear());

    this.champsForm = this.formBuilder.group({
     // _id:[''],
      type:['champs'],
      nom: ['', Validators.required],
      longitude: [''],
      latitude: [''],
      superficie: ['', Validators.required],
      type_sole: ['', Validators.required],
      matricule_producteur: [''],
      nom_producteur: ['', Validators.required],
      today: [today, Validators.required],
      deviceid: [''],
      imei: [''],
      phonenumber: [''],
      start: [maDate.toJSON()],
      end: ['']
    });
    
  }

  chergerTypeSole(){
    
    this.servicePouchdb.getPlageDocs('fuma:type-sole','fuma:type-sole:\uffff').then((ts) => {
              this.typeSoles = ts;
    }, err => console.log(err)); 

    
  }

  msg(msg: string = ''){
    let toast = this.toastCtl.create({
      message: msg,
      position: 'top',
      duration: 3000
    });

    toast.present();
  }

  getPosition(){
    this.msg('Obtention des coordonnées en cours...');
    this.geolocation.getCurrentPosition().then((resp) => {
      this.longitude = resp.coords.longitude;
      this.latitude = resp.coords.latitude;
      this.msg('Coordonnées obtenues avec succes!')
    }, err => {
      this.msg('Une erreur c\'est produite lors de l\obtention des coordonnées. \nVeuillez reéssayer plus tard!')
      console.log('')
    });
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

  ionViewDidLoad() {
    
    this.chergerTypeSole();
  
    this.sim.getSimInfo().then(
      (info) => {
        if(info.cards.length > 0){
          info.cards.forEach((infoCard, i) => {
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

    this.servicePouchdb.getPlageDocs('fuma:champs','fuma:champs:\uffff').then((ch) => {
        this.allChamps = ch;

      }, err => console.log(err));      
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
    var Id= matricule+' '+'CH-'+/*+pays+'-'+region+'-'+department+'-'+commune +'-' +village+ */+randomString 
    return Id;
  }

  itemSelected(ev: any){
    //alert(ev.code_produit);
    this.producteurs.forEach((prod, index) => {
      if(prod.data.matricule_Membre === ev.matricule_Membre){
        this.selectedProducteur = prod;
        this.nom_producteur = prod.data.nom_Membre;
        this.generecodeChamps(this.selectedProducteur.data.matricule_Membre)
      }
    });
  }

  /*producteurSelected(matricule){
    this.nom_producteur = prod.data.nom_Membre;
    //alert(ev.code_produit);
   /* this.producteurs.forEach((prod, index) => {
      if(prod.data.matricule_Membre === matricule){
        this.selectedProducteur = prod;
        this.nom_producteur = prod.data.nom_Membre;
      }
    });/*
  }*/

  dechanfChamps(){
    this.longitude ='';
    this.latitude = '';
    this.nom = '';
    this.type_sole = '';
    this.superficie = '';
    this.generecodeChamps(this.selectedProducteur.data.matricule_Membre)
  }

  generecodeChamps(matricule){
    this.code_champs = this.generateId(matricule);
  }

  ajouter(){
    let date = new Date();
    let champs = this.champsForm.value;
    champs.matricule_producteur = this.selectedProducteur.data.matricule_Membre;
    //champs.nom_producteur = this.selectedProducteur.data.nom_Membre;
    champs.deviceid = this.device.uuid;
    champs.phonenumber = this.phonenumber;
    champs.imei = this.imei;
    
    //union._id = 'fuma'+ id;
    champs.end = date.toJSON();
    champs.id_champs = this.code_champs;

    let champsFinal: any = {};
    champsFinal._id = 'fuma'+':champs:'+ this.code_champs;
    champsFinal.data = champs
    this.servicePouchdb.createDocReturn(champsFinal).then((res) => {

      /*let toast = this.toastCtl.create({
        message: 'Champs bien enregistré!',
        position: 'top',
        duration: 1000
      });*/

       champsFinal._rev = res.rev;

       this.champs.push(champsFinal)
        //});

        this.dechanfChamps()
    });
    
    

    //this.navCtrl.pop();
    //toast.present();
    

  }

  /*annuler(){
    this.navCtrl.pop();
  }*/

  annuler(){
    //this.navCtrl.pop();
    if(this.champs.length <= 0){
      this.viewCtl.dismiss();
    }else{
      //this.essais.push(this.essais)
      this.viewCtl.dismiss(this.champs);
    }
    
  }

  back(){
    //this.viewCtl.dismiss();
     if(this.champs.length <= 0){
      this.viewCtl.dismiss();
    }else{
      //this.essais.push(this.essais)
      this.viewCtl.dismiss(this.champs);
    }
  }



}
