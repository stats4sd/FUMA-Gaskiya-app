import { Component } from '@angular/core';
import { NavController, ViewController, NavParams, IonicPage } from 'ionic-angular';
import { PouchdbProvider } from '../../../providers/pouchdb-provider';
//import { ModifierProfilePage } from './modifier-profile/modifier-profile';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';
import { global } from '../../../global-variables/variable';

/*
  Generated class for the Profile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()
@Component({
  selector: 'page-profile-user',
  templateUrl: 'profile-user.html'
})
export class ProfileUserPage {

  user: any = {} ; 
  estAdmin: any = false;
 
  constructor(public translate: TranslateService, public viewCtl: ViewController, public storage:Storage, public navCtrl: NavController, public navParams: NavParams, public gestionService: PouchdbProvider) {
    this.translate.setDefaultLang(global.langue);
  }

       dismiss(){
    this.viewCtl.dismiss();
  }
  
  ionViewDidLoad() {
    //console.log('ionViewDidLoad ProfileUserPage');
  }

  ionViewDidEnter() {
    this.translate.use(global.langue);
    //this.user = global.info_user;
    this.gestionService.remoteSaved.getSession((err, response) => {
      if (err) {
        // network error
        alert('Erreur du réseau');
        this.user = global.info_user;
        alert('Information de l\'anciènne connexion chargées');
        /*this.storage.get('info_user').then((user) => {
          if(user){
            this.user = user;
            alert('Information de l\'anciènne connexion chargées');
          }
        });*/
      } else if (!response.userCtx.name) {
        // nobody's logged in
        alert('Personne n\'est connecté');
        this.user = global.info_user;
        alert('Information de l\'anciènne connexion chargées');
        /*this.storage.get('info_user').then((user) => {
          if(user){
            this.user = user;
            alert('Information de l\'anciènne connexion chargées');
          }
        });*/
      } else {
        // response.userCtx.name is the current user
        this.gestionService.remoteSaved.getUser(response.userCtx.name, (err, us) => {
          if (err) {
            if (err.name === 'not_found') {
              // typo, or you don't have the privileges to see this user
              alert('Privilèges insuffiasants:'+response.userCtx.name+"  "+response.userCtx.roles);
              this.user = global.info_user;
              alert('Information de l\'anciènne connexion chargées');
            } else {
              // some other error
              alert('Erreur');
              this.user = global.info_user;
              alert('Information de l\'anciènne connexion chargées');
            }
          } else {
            // response is the user object
            this.user = us;
            global.info_user = us;
            this.storage.set('info_user', us);
          }
        });
      }
    });
  }
 
 editer(user, motif){
  this.navCtrl.push('ModifierProfilePage', {'user': user, 'motif': motif})
 }
}
