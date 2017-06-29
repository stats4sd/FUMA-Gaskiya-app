import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, MenuController, ToastController, AlertController, Events, ViewController } from 'ionic-angular';
import { PouchdbProvider } from '../../../providers/pouchdb-provider';
//import { TabsPage } from '../tabs/tabs';
import { RegisterPage } from '../register/register';
import { Validators, FormBuilder } from '@angular/forms';
//import { MyApp } from '../../app/app.component';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';
import { global } from '../../../global-variables/variable';
//import { ConfigBoutiquePage } from '../accueil/config-boutique/config-boutique';
/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  //username: string;
  //mdpass: string;
  //adminOK: any = -1;
  loginForm: any;
  //tache: any = '';
  user: any = {
    'username': '',
    'mdpass': ''
  };
  //configOK: any = global.configOK;

  constructor(public alertCtl: AlertController, public events: Events, public translate: TranslateService, public viewCtl: ViewController, public toastCtl: ToastController, public servicePouchdb: PouchdbProvider, public navCtrl: NavController, public storage: Storage, public menuCtrl: MenuController, public formBuilder: FormBuilder, public navParams: NavParams, public loadinCtl: LoadingController) {
    /*this.storage.get('info_connexion').then((user) => {
      if(user){
        this.user = user;
      }
      
    }, err => console.log(err));*/

  
      if(global.info_connexion !== null){
        this.user = global.info_connexion;
      }

    this.translate.setDefaultLang(global.langue);
    //this.tache = this.navParams.data.tache;
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      mdpass: ['', Validators.required]
    });
  } 

  ionViewWillEnter() {
    this.translate.use(global.langue);
    //console.log('ionViewDidLoad LoginPage');
  }

  afficheMsg(msg: string){
    let toast = this.toastCtl.create({
      message: msg,
      position: 'top',
      duration: 3000
    });

    toast.present();
  }

  login(){
    
    let loading = this.loadinCtl.create({
      content: 'Connexion en cours...'
    });
    loading.present();
    let user = this.loginForm.value
    let ajaxOpts = {
      ajax: {
        headers: {
          Authorization: 'Basic ' + window.btoa(user.username + ':' + user.mdpass)
        }
      }
    };
    //this.remote.login(username, mdpass, ajaxOpts).then((err, response) =
    this.servicePouchdb.remoteSaved.login(user.username, user.mdpass, ajaxOpts, (err, response) => {
      if (err) {
        loading.dismissAll();
        if (err.name === 'unauthorized') {
          alert('Nom ou mot de passe incorrecte');
          
        } else {
          alert('Une erreur s\'est produite. Veuillez réessayer plus tard');
          
        }
      }else if(response){
        //alert('success');
        //this.MyApp.setPage();
        //let m = MyApp.g
        //m.setPage();
        //this.menuCtrl.enable(true, 'menu2');
        //this.menuCtrl.enable(false, 'menu1');
        this.storage.set('info_connexion', user);
        global.info_connexion = user;
        global.estConnecte = true;
        this.events.publish('user:login');
        this.servicePouchdb.remoteSaved.getUser(user.username, (err, us) => {
          if (err) {
            //this.viewCtl.dismiss();
             loading.dismissAll();
            if (err.name === 'not_found') {
              // typo, or you don't have the privileges to see this user
              alert('Privilèges insuffiasants');
            } else {
              // some other error
              alert('Erreur');
            }
          } else {
            loading.dismissAll();
           //this.user = us;
           this.storage.set('info_user', us);
           global.info_user = us;
           this.servicePouchdb.sync();
           this.afficheMsg('Connexion terminée avec succèes. \nVous êtes connectés!')
           this.viewCtl.dismiss();
           /*if(this.tache !== 'admin'){
              this.enableAuthenticatedMenu();
              //this.navCtrl.setRoot(TabsPage);
              
            }else{
            
              if(us.roles.indexOf('admin') >= 0){
                //global.typeUtilisateur = 'admin';
                this.gestionService.dbSyncAdmin();
                this.storage.set('tache', 'admin');
                this.viewCtl.dismiss();
                this.enableAuthenticatedMenu();
                //this.navCtrl.setRoot(TabsPage);
                
              }else{
                //global.typeUtilisateur = 'simple';
                this.viewCtl.dismiss();
                this.enableAuthenticatedMenu();
                //this.navCtrl.push(ConfigBoutiquePage);
                
                //this.gestionService.logout();
                //this.storage.remove('gerant');
                //alert('Désolé, provillèges isuffisants!')
              }
              
            }*/
           
          }
        });        
  
      }else{ 
        loading.dismissAll();
        alert('echec');
      }
    });
  }

  /*enableAuthenticatedMenu() {
    this.menuCtrl.enable(true, 'authenticated');
    this.menuCtrl.enable(false, 'unauthenticated');
  }*/

  register(){
    this.navCtrl.push(RegisterPage);
  }

  connexionUlterieur(){
    let avr: any = '';
    let att: any = '';

    let alert = this.alertCtl.create({
      title: avr,
      message: att, 
      buttons: [
        {
          text: 'Annuler',
          handler: () => console.log('annuler')
        },
        {
          text: 'OK',
          role: 'Cancel',
          handler: () => {
            this.viewCtl.dismiss();
            //this.navCtrl.push(ConfigBoutiquePage);
          }
        }
      ]
    });

    alert.present();
  }

}
