import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, IonicPage } from 'ionic-angular';
import { Validators, FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { PouchdbProvider } from '../../../providers/pouchdb-provider';


/*
  Generated class for the ModifierCulture page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

@IonicPage()
@Component({
  selector: 'page-modifier-culture',
  templateUrl: 'modifier-culture.html'
})
export class ModifierCulturePage {

  cultureForm: any;
  allCulture: any = [];
  culture: any;
  grandCulture: any;


 constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtl: ToastController, public servicePouchdb: PouchdbProvider, public formBuilder: FormBuilder, public storage: Storage) {
    
    this.grandCulture = this.navParams.data.culture
    this.culture = this.grandCulture.data
    this.cultureForm = this.formBuilder.group({
     // _id:[''],
      nom: [this.culture.nom, Validators.required],
    });
    

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModifierCulturePage');
  }

  ionViewDidEnter() {
    this.servicePouchdb.getPlageDocs('fuma:culture','fuma:culture:\uffff').then((c) => {
        this.allCulture = c;

      }, err => console.log(err));      
  }

  verifierUniqueNon(culture, id){
  
    let res = 1;
    this.allCulture.forEach((c, index) => {
      if(((id !== c._id) && (culture.nom.toString().toLowerCase() === c.data.nom.toString().toLowerCase()))){
        res = 0;
      }
    });

    return res;
  }

   modifier(){
      //  let date = new Date();
    let culture = this.cultureForm.value;
    if(this.verifierUniqueNon(culture, this.grandCulture._id) === 0){
      alert('Le nom de la culture doit être unique!');
    }else{

      culture.nom = culture.nom.toString().toUpperCase();
      this.culture.nom = culture.nom;
      
        this.grandCulture.data = this.culture;
        this.servicePouchdb.updateDoc(this.grandCulture);
      
        let toast = this.toastCtl.create({
          message: 'Culture bien sauvegardée!',
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
