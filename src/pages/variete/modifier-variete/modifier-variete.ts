import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController, IonicPage } from 'ionic-angular';
import { Validators, FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { PouchdbProvider } from '../../../providers/pouchdb-provider';

/*
  Generated class for the ModifierVariete page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()
@Component({
  selector: 'page-modifier-variete',
  templateUrl: 'modifier-variete.html'
})
export class ModifierVarietePage {
varieteForm: any;
  cultures: any = [];
  allVariete: any = [];  
  grandVariete: any;
  variete: any;
  imei: any = '';
  phonenumber: any = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtl: ToastController, public servicePouchdb: PouchdbProvider, public alertCtl: AlertController, public formBuilder: FormBuilder, public storage: Storage) {

    this.grandVariete = this.navParams.data.variete;
    this.variete = this.grandVariete.data;
    this.servicePouchdb.getPlageDocs('fuma:culture','fuma:culture:\uffff').then((c) => {
        this.cultures = c;

      }, err => console.log(err)); 

    this.varieteForm = this.formBuilder.group({
     // _id:[''],
      nom: [this.variete.nom, Validators.required],
      code: [this.variete.code, Validators.required],
      culture: [this.variete.culture, Validators.required],
      pays_origine: [this.variete.pays_origine],
      region_origine: [this.variete.region_origine],
      longeur_tige: [this.variete.longeur_tige],
      //longeur_epi: [''],
      description: [this.variete.description],
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

  ionViewDidEnter() {

      this.servicePouchdb.getPlageDocs('fuma:variete','fuma:variete:\uffff').then((v) => {
        this.allVariete = v;

      }, err => console.log(err));      
  }


  verifierUniqueCode(variete, id){
  
    let res = 1;
    this.allVariete.forEach((c, index) => {
      if((id !== c._id) && (variete.code.toString().toLowerCase() === c.data.code.toString().toLowerCase())){
        res = 0;
      }
    });

    return res;
  }


   modifier(){
      //  let date = new Date();
    let variete = this.varieteForm.value;
    if(this.verifierUniqueCode(variete, this.grandVariete._id) === 0){
      alert('Le code de la variété doit être unique!');
    }else{

      this.variete.nom = variete.nom;
      this.variete.code = variete.code;
      this.variete.culture = variete.culture;
      this.variete.pays_origine = variete.pays_origine;
      this.variete.region_origine = variete.region_origine;
      this.variete.longeur_tige = variete.longeur_tige;
      this.variete.description = variete.description;
      
        this.grandVariete.data = this.variete;
        this.servicePouchdb.updateDoc(this.grandVariete);
      
        let toast = this.toastCtl.create({
          message: 'Variété bien sauvegardée!',
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
