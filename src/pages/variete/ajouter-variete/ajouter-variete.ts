import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController, IonicPage } from 'ionic-angular';
import { Validators, FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { PouchdbProvider } from '../../../providers/pouchdb-provider';
import { Device } from '@ionic-native/device';
import { Sim } from '@ionic-native/sim';

/*
  Generated class for the AjouterVariete page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()
@Component({
  selector: 'page-ajouter-variete',
  templateUrl: 'ajouter-variete.html'
})
export class AjouterVarietePage {

  varieteForm: any;
  cultures: any = [];
  allVariete: any = [];  
  imei: any = '';
  phonenumber: any = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, public sim: Sim, public device: Device, public toastCtl: ToastController, public servicePouchdb: PouchdbProvider, public alertCtl: AlertController, public formBuilder: FormBuilder, public storage: Storage) {
    let maDate = new Date();
    let today = this.createDate(maDate.getDate(), maDate.getMonth(), maDate.getFullYear());

    this.servicePouchdb.getPlageDocs('fuma:culture','fuma:culture:\uffff').then((c) => {
        this.cultures = c;

      }, err => console.log(err)); 

    this.varieteForm = this.formBuilder.group({
     // _id:[''],
      type:['variete'],
      nom: ['', Validators.required],
      code: ['', Validators.required],
      culture: ['', Validators.required],
      pays_origine: [''],
      region_origine: [''],
      longeur_tige: [''],
      //longeur_epi: [''],
      description: [''],
      today: [today, Validators.required],
      deviceid: [''],
      imei: [''],
      phonenumber: [''],
      start: [maDate.toJSON()],
      end: ['']
    });
    
  }

  msg(msg: string = ''){
    let toast = this.toastCtl.create({
      message: msg,
      position: 'top',
      duration: 3000
    });

    toast.present();
  }

  verifierUniqueCode(variete){
  
    let res = 1;
    this.allVariete.forEach((c, index) => {
      if((variete.code.toString().toLowerCase() === c.data.code.toString().toLowerCase())){
        res = 0;
      }
    });

    return res;
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

      this.servicePouchdb.getPlageDocs('fuma:variete','fuma:variete:\uffff').then((v) => {
        this.allVariete = v;

      }, err => console.log(err));      
  }

  generateId(){
    var chars='ABCDEFGHIJKLMNPQRSTUVWYZ'
    var numbers='0123456789'
    var randomArray=[]
    for(let i=0;i<10;i++){
      var rand = Math.floor(Math.random()*10)
      randomArray.push(numbers[rand])
    }
    randomArray.push('-')
    for(let i=0;i<10;i++){
      var rand = Math.floor(Math.random()*24)
      randomArray.push(chars[rand])
    }
   
    var randomString=randomArray.join("");
    var Id= randomString 
    return Id;
  }

   ajouter(){
    
    let date = new Date();
    let variete = this.varieteForm.value;
    if(this.verifierUniqueCode(variete) === 0){
      alert('Le code de la variété doit être unique!');
    }else{
      variete.deviceid = this.device.uuid;
      variete.phonenumber = this.phonenumber;
      variete.imei = this.imei;
      let id = this.generateId();
      //union._id = 'fuma'+ id;
      variete.end = date.toJSON();

      let varieteFinal: any = {};
      varieteFinal._id = 'fuma'+':variete:'+ id;
      varieteFinal.data = variete
      this.servicePouchdb.createDoc(varieteFinal);
      let toast = this.toastCtl.create({
        message: 'Variété bien enregistrée!',
        position: 'top',
        duration: 3000
      });

      toast.present();
      this.navCtrl.pop();
    }
  }

  annuler(){
    this.navCtrl.pop();
  }

}
