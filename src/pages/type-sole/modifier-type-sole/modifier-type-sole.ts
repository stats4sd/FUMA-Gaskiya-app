import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Validators, FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { PouchdbProvider } from '../../../providers/pouchdb-provider';

/*
  Generated class for the ModifierTypeSole page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-modifier-type-sole',
  templateUrl: 'modifier-type-sole.html'
})
export class ModifierTypeSolePage { 

  typeSole: any;
  grandTypeSole: any;
  typeSoleForm: any;
  allTypeSoles: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtl: ToastController, public servicePouchdb: PouchdbProvider, public formBuilder: FormBuilder, public storage: Storage) {
    this.grandTypeSole = this.navParams.data.typeSole;
    this.typeSole = this.grandTypeSole.data;
    
    this.typeSoleForm = this.formBuilder.group({

      nom: [this.typeSole.nom, Validators.required],
      description: [this.typeSole.description],
      today: [this.typeSole.today, Validators.required],
    });
  }


  ionViewDidEnter() {
      this.servicePouchdb.getPlageDocs('fuma:type-sole','fuma:type-sole:\uffff').then((typeSoles) => {
        if(typeSoles){
          this.allTypeSoles = typeSoles;
        }
      }, err => console.log(err));
    }

    verifierUniqueNon(typeSole, id){
    let res = 1;
    this.allTypeSoles.forEach((ts, index) => {
      if(((id !== ts._id) && (typeSole.nom === ts.data.nom))){
        res = 0;
      }
    });
    return res;
  }

  modifier(){
      //  let date = new Date();
    let typeSole = this.typeSoleForm.value;

    this.typeSole.nom = typeSole.nom;
    this.typeSole.description = typeSole.description;
    
    if(this.verifierUniqueNon(typeSole, this.grandTypeSole._id) === 0){
      alert('Le nom du type de sole doit être uniques!');
    }else{
      this.grandTypeSole.data = this.typeSole;
      this.servicePouchdb.updateDoc(this.grandTypeSole);
    
      let toast = this.toastCtl.create({
        message: 'Type de sole bien sauvegardée!',
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
