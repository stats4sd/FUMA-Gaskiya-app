import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, IonicPage } from 'ionic-angular';
import { Validators, FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { PouchdbProvider } from '../../../providers/pouchdb-provider';
import { Device } from '@ionic-native/device';
import { Sim } from '@ionic-native/sim';

/*
  Generated class for the AjouterCulture page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

@IonicPage()
@Component({
  selector: 'page-ajouter-culture',
  templateUrl: 'ajouter-culture.html'
})
export class AjouterCulturePage {

  cultureForm: any;
  allCulture: any = [];
  imei: any = '';
  phonenumber: any = '';

 constructor(public navCtrl: NavController, public navParams: NavParams, public sim: Sim, public device: Device, public toastCtl: ToastController, public servicePouchdb: PouchdbProvider, public formBuilder: FormBuilder, public storage: Storage) {
    let maDate = new Date();
    let today = this.createDate(maDate.getDate(), maDate.getMonth(), maDate.getFullYear());

    this.cultureForm = this.formBuilder.group({
     // _id:[''],
      type:['culture'],
      nom: ['', Validators.required],
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

  verifierUniqueNon(culture){
  
    let res = 1;
    this.allCulture.forEach((c, index) => {
      if((culture.nom.toString().toLowerCase() === c.data.nom.toString().toLowerCase() )){
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

    this.servicePouchdb.getPlageDocs('fuma:culture','fuma:culture:\uffff').then((c) => {
        this.allCulture = c;

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
    let culture = this.cultureForm.value;
    if(this.verifierUniqueNon(culture) === 0){
      alert('Le nom de la culture doit être unique!');
    }else{
      culture.deviceid = this.device.uuid;
      culture.nom = culture.nom.toString().toUpperCase();
      culture.phonenumber = this.phonenumber;
      culture.imei = this.imei;
      let id = this.generateId();
      //union._id = 'fuma'+ id;
      culture.end = date.toJSON();

      let cultureFinal: any = {};
      cultureFinal._id = 'fuma'+':culture:'+ id;
      cultureFinal.data = culture
      this.servicePouchdb.createDoc(cultureFinal);
      let toast = this.toastCtl.create({
        message: 'Culture bien enregistrée!',
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
