import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Validators, FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { PouchdbProvider } from '../../../providers/pouchdb-provider';
import { Device } from '@ionic-native/device';
import { Sim } from '@ionic-native/sim';
/*
  Generated class for the AjouterTypeSole page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-ajouter-type-sole',
  templateUrl: 'ajouter-type-sole.html'
})
export class AjouterTypeSolePage { 

  typeSoleForm: any;
  imei: any = '';
  phonenumber: any = '';
  allTypeSoles: any;

  constructor(public sim: Sim, public device: Device, public navCtrl: NavController, public toastCtl: ToastController, public navParams: NavParams, public servicePouchdb: PouchdbProvider, public formBuilder: FormBuilder, public storage: Storage) {

    let maDate = new Date();
    let today = this.createDate(maDate.getDate(), maDate.getMonth(), maDate.getFullYear());
  
    this.typeSoleForm = this.formBuilder.group({
      //_id:[''],
      type:['type-sole'],
      nom: ['', Validators.required], 
      description: ['',],
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
      }, (err) => console.log('Unable to get sim info: ', err));

      this.servicePouchdb.getPlageDocs('fuma:type-sole','fuma:type-sole:\uffff').then((typeSoles) => {
        if(typeSoles){
          this.allTypeSoles = typeSoles;
        }
      }, err => console.log(err));
  }


  verifierUniqueNon(typeSole){
    let res = 1;
    this.allTypeSoles.forEach((ts, index) => {
      if((typeSole.nom === ts.data.nom)){
        res = 0;
      }
    });
    return res;
  }

  ajouter(){
    let date = new Date();
    let typeSole = this.typeSoleForm.value;

    if(this.verifierUniqueNon(typeSole) === 0){
      alert('Le nom du type de sole doit être unique!');
    }else{
      typeSole.deviceid = this.device.uuid;
      typeSole.phonenumber = this.phonenumber;
      typeSole.imei = this.imei;
      let id = this.servicePouchdb.generateOderId('type-sole');
      //union._id = 'fuma'+ id;
      typeSole.end = date.toJSON();

      let typeSoleFinal: any = {};
      typeSoleFinal._id = 'fuma'+ id;
      typeSoleFinal.data = typeSole
      this.servicePouchdb.createDoc(typeSoleFinal);
    
      let toast = this.toastCtl.create({
        message: 'Type de sole bien enregistré!',
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

