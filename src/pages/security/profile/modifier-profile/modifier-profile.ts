import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, IonicPage, ToastController } from 'ionic-angular';
import { Validators, FormBuilder } from '@angular/forms';
import { PouchdbProvider } from '../../../../providers/pouchdb-provider';
//import { ProfileUserPage } from '../../profile/profile-user';
import { TranslateService } from '@ngx-translate/core';
import { global } from '../../../../global-variables/variable';
import { Storage } from '@ionic/storage';

/*
  Generated class for the ModifierProfile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()
@Component({
  selector: 'page-modifier-profile',
  templateUrl: 'modifier-profile.html'
})
export class ModifierProfilePage {
  user: any;
  registerForm: any;
  l: any = global.langue;

  constructor(public translate: TranslateService, public navCtrl: NavController, public toastCtl: ToastController, public storage: Storage, public navParams: NavParams, public formBuilder: FormBuilder, public loadingCtl: LoadingController, public gestionService: PouchdbProvider) {
    this.translate.setDefaultLang(global.langue);
    this.user = this.navParams.data.user;

    this.registerForm = this.formBuilder.group({
        nom: [this.user.nom],
        //username: ['', Validators.required],
        email: [this.user.email],
        //mdpass: ['', Validators.required],
        //confmdpass: ['', Validators.required],
        date: [this.user.date, Validators.required],
        sex: [this.user.sex, Validators.required],
    })
  }

  afficheMsg(msg: string){
    let toast = this.toastCtl.create({
      message: msg,
      position: 'top',
      duration: 3000
    });

    toast.present();
  }

  ionViewWillEnter() {
    this.translate.use(global.langue);
    console.log('ionViewDidLoad ModifierProfilePage');
  }

  modifier(){
    let newUserInfo = this.registerForm.value;
    this.gestionService.remoteSaved.putUser(this.user.name, {
      metadata : {
        email : newUserInfo.email,
        date : newUserInfo.date,
        sex : newUserInfo.sex,
        nom: newUserInfo.nom
      }
    }, (err, response) => {
      if(err){
        alert('Erreur');
      }else if(response){
        this.gestionService.remoteSaved.getUser(this.user.name, (err, us) => {
          if (!err) {
            global.info_user = us;
            this.storage.set('info_user', us);
            this.afficheMsg('Profile mis à jour avec succès!')
            this.navCtrl.pop();
          }else{
            this.afficheMsg('Profile mis à jour avec succès!')
            this.navCtrl.pop();
          }
        });
      }
      
    });
  }
 


}
