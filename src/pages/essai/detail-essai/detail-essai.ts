import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController, MenuController, Events } from 'ionic-angular';
import { ModifierEssaiPage } from '../modifier-essai/modifier-essai';
import { PouchdbProvider } from '../../../providers/pouchdb-provider';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { global } from '../../../global-variables/variable'

/*
  Generated class for the DetailEssai page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-detail-essai',
  templateUrl: 'detail-essai.html'
})
export class DetailEssaiPage {
 
   essai: any = {};
  essaiID: any;
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
    
    
    this.essai = this.navParams.data.essai;
    this.essaiID = this.essai._id;
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
    this.servicePouchdb.getDocById(this.essaiID).then((e) => {
      this.essai = e;
    }, err => console.log(err))
  }

  editer(essai){
    this.navCtrl.push(ModifierEssaiPage, {'essai': essai});
  }

  supprimer(essai){
    let alert = this.alertCtl.create({
      title: 'Suppression Essai',
      message: 'Etes vous sûr de vouloir supprimer cet essai ?',
      buttons:[
        {
          text: 'Non',
          handler: () => console.log('suppression annulée')
 
        },
        {
          text: 'Oui',
          handler: () => {
            this.servicePouchdb.deleteDoc(essai);
            let toast = this.toastCtl.create({
              message:'Essai bien supprié',
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
