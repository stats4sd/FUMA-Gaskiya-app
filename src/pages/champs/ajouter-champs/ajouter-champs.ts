import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Validators, FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { PouchdbProvider } from '../../../providers/pouchdb-provider';
import { AutoCompletion } from '../../../providers/auto-completion';
import { Device } from '@ionic-native/device';
import { Sim } from '@ionic-native/sim';

/*
  Generated class for the AjouterChamps page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
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

  constructor(public navCtrl: NavController, public ServiceAutoCompletion: AutoCompletion, public navParams: NavParams, public sim: Sim, public device: Device, public toastCtl: ToastController, public servicePouchdb: PouchdbProvider, public formBuilder: FormBuilder, public storage: Storage) {
    
    this.servicePouchdb.getPlageDocs('fuma:type-sole','fuma:type-sole:\uffff').then((ts) => {
          this.typeSoles = ts;
      }, err => console.log(err)); 
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

    this.sim.getSimInfo().then(
      (info) => {
        this.phonenumber = info.phoneNumber;
        this.imei = info.deviceId;
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
      }
    });
  }


  ajouter(){
    let date = new Date();
    let champs = this.champsForm.value;
    champs.matricule_producteur = this.selectedProducteur.data.matricule_Membre;
    //champs.nom_producteur = this.selectedProducteur.data.nom_Membre;
    champs.deviceid = this.device.uuid;
    champs.phonenumber = this.phonenumber;
    champs.imei = this.imei;
    let id = this.generateId(this.selectedProducteur.data.matricule_Membre);
    //union._id = 'fuma'+ id;
    champs.end = date.toJSON();
    champs.id_champs = id;

    let champsFinal: any = {};
    champsFinal._id = 'fuma'+':champs:'+ id;
    champsFinal.data = champs
    this.servicePouchdb.createDoc(champsFinal);
    let toast = this.toastCtl.create({
      message: 'Champs bien enregistré!',
      position: 'top',
      duration: 3000
    });

    toast.present();
    this.navCtrl.pop();

  }

  annuler(){
    this.navCtrl.pop();
  }


}
