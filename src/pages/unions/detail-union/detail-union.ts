import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, IonicPage, ToastController, MenuController, Events } from 'ionic-angular';
//import { ModifierUnionPage } from '../modifier-union/modifier-union';
import { PouchdbProvider } from '../../../providers/pouchdb-provider';
import { Validators, FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { OpPage } from '../../op/op'
import { global } from '../../../global-variables/variable'

/*
  Generated class for the DetailUnion page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()
@Component({
  selector: 'page-detail-union',
  templateUrl: 'detail-union.html'
})
export class DetailUnionPage {
  union: any = {};
  selectedSource: any;
  unionID: any;
  aProfile: boolean = true;

 
  constructor(public servicePouchdb: PouchdbProvider, public menuCtl: MenuController, public events: Events, public toastCtl: ToastController, public navCtrl: NavController, public navParams: NavParams, public alertCtl: AlertController) {
    
    this.menuCtl.enable(false, 'options');
    this.menuCtl.enable(false, 'connexion');
    this.menuCtl.enable(false, 'profile');
    
    events.subscribe('user:login', () => {
      this.servicePouchdb.remoteSaved.getSession((err, response) => {
        if (response.userCtx.name) {
          this.aProfile = true;
        }else{
          this.aProfile = false;
        }
      }, err => console.log(err));
    });
    
    this.union = this.navParams.data.union;
    this.selectedSource = this.navParams.data.selectedSource;
    this.unionID = this.union._id;
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
    this.servicePouchdb.syncAvecToast(this.ionViewDidEnter());
  }

  ionViewDidEnter() {

     this.servicePouchdb.remoteSaved.getSession((err, response) => {
        if (response.userCtx.name) {
          this.aProfile = true;
        }else{
          this.aProfile = false;
        }
    }, err => {
      if(global.info_user != null){
        this.aProfile = true;
      }else{
        this.aProfile = false;
      }
      //console.log(err)
    }); 

    //console.log('ionViewDidLoad DetailUnionPage');
    this.servicePouchdb.getDocById(this.unionID).then((u) => {
      this.union = u;
    }, err => console.log(err))
  } 

  editer(union){
    this.navCtrl.push('ModifierUnionPage', {'union': union});
  }

  opUnion(num_aggrement, nom_union){
    this.navCtrl.push(OpPage, {'num_aggrement_union': num_aggrement, 'nom_union': nom_union});
  }

  supprimer(union){
    let alert = this.alertCtl.create({
      title: 'Suppression union',
      message: 'Etes vous sûr de vouloir supprimer cette union ?',
      buttons:[
        {
          text: 'Annuler',
          handler: () => console.log('suppression annulée')
 
        },
        {
          text: 'Confirmer',
          handler: () => {
            this.servicePouchdb.deleteDoc(union);
            let toast = this.toastCtl.create({
              message:'Union bien suppriée',
              position: 'top',
              duration: 3000
            });

            toast.present();
            this.navCtrl.pop();
          }
        }
      ]
    });

    alert.present();
  }

}
