import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, MenuController, App, IonicApp, ToastController, ModalController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//import { TabsPage } from '../pages/tabs/tabs';
//import { HomePage  } from '../pages/tabs/home/home'
import { Storage } from '@ionic/storage'
//import { AdminPage } from '../pages/tabs/admin/admin'
//import { ConfLocaliteEnquetePage } from '../pages/configuration/conf-localite-enquete/conf-localite-enquete';
//import { LanguePage } from '../pages/langue/langue'
//import { CollectPage } from '../pages/tabs/collect/collect'
//import { TypeSolePage } from '../pages/type-sole/type-sole'
//import { ChampsPage } from '../pages/champs/champs'
//import { TraitementPage } from '../pages/essai/traitement/traitement'
//import { ProfileUserPage } from '../pages/security/profile/profile-user'
//import { CulturePage } from '../pages/culture/culture'
//import { VarietePage } from '../pages/variete/variete'
//import { LoginPage } from '../pages/security/login/login'
//import { RegisterPage } from '../pages/security/register/register'
//import { EssaiPage } from '../pages/essai/essai'
import { PouchdbProvider } from '../providers/pouchdb-provider'
import { global } from '../global-variables/variable';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = '';
  pages: Array<{title: string, component: any}>;
  profiles: Array<{title: string, component: any}>; 
  connexions: Array<{title: string, component: any}>; 
  name: any;
  quiter: boolean = false;

  @ViewChild(Nav) nav: Nav;
  //@ViewChild('content') nav: Nav;

  constructor(public platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public ionicApp: IonicApp, public app: App, public toastCtl: ToastController, public modalCtl: ModalController, public gestionService: PouchdbProvider, public storage: Storage, public menuCtrl: MenuController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      //this.chergerInfoDB();
      //back button handle
      //Registration of push in Android and Windows Phone
      this. chergerInfoDB();
      var lastTimeBackPress = 0;
      var timePeriodToExit  = 2000;

      platform.registerBackButtonAction(() => {
          // get current active page
          let nav = this.app.getActiveNav()
          let activeModal = this.ionicApp._modalPortal.getActive() || 
                            this.ionicApp._loadingPortal.getActive() ||
                            this.ionicApp._overlayPortal.getActive();// ||
                            //this.ionicApp._toastPortal.getActive();
          
          if(activeModal){
            //close modal or alert or loading
            activeModal.dismiss();
          }else if (nav.canGoBack()) {
              // go to previous page
              nav.pop();
          } else {
              //Double check to exit app
              if (new Date().getTime() - lastTimeBackPress < timePeriodToExit) {
                  this.platform.exitApp(); //Exit from app
              } else {
                  this.affMsg('Appuyez sur la touche retour à nouveau pour quitter!')
                  lastTimeBackPress = new Date().getTime();
              }
          }
      });

           
      this.chargerInfo();
      this.setPage();

      this.storage.get('langue').then((langue) => {
        if(langue){
          this.rootPage = 'TabsPage'
          //alert(this.nav.getActive().component.name)
        }else{
          this.rootPage = 'HomePage';
          //alert(this.nav.getActive().component.name)
        }
      }, err => this.rootPage = 'HomePage')

    });
/*
    this.setPage();

    this.storage.get('langue').then((langue) => {
      if(langue){
        this.rootPage = TabsPage
      }else{
        this.rootPage = HomePage;
      }
    }, err => this.rootPage = HomePage)*/
  }

  chergerInfoDB(){
    this.storage.get('info_db').then((info_db) => {
      if(info_db){
        global.info_db.ip = info_db.ip;
        global.info_db.nom_db =  info_db.nom_db;
      }
    }).catch((err) => console.log(err));
  }
            

  close(){
    this.menuCtrl.close()
     this.menuCtrl.enable(false, 'options');
    this.menuCtrl.enable(false, 'connexion');
    this.menuCtrl.enable(false, 'profile');
  }

  affMsg(msg){
    let toast = this.toastCtl.create({
      message: msg,
      position: 'middle',
      duration: 3000
    });

    toast.present();
  }


  setPage(){

    this.pages = [
            //{ title: 'Changer la langue', component: LanguePage },
            { title: 'Changer la langue', component: 'LanguePage' },
            { title: 'Formulaires ODK', component: 'CollectPage' },
            { title: 'Config Localité Enquete', component: 'ConfLocaliteEnquetePage' },
            { title: 'Gestion types soles', component: 'TypeSolePage' },
            { title: 'Gestion champs', component: 'ChampsPage' },
            { title: 'Gestion traitements', component: 'TraitementPage' },
            { title: 'Gestion cultures', component: 'CulturePage' },
            { title: 'Gestion variétés', component: 'VarietePage' },
            { title: 'Admin', component: 'AdminPage' },
           
     ];

     this.profiles = [
            /*{ title: 'Connexion', component: LoginPage },
            { title: 'Connexion', component: LoginPage },
            { title: 'Enregistrement', component: RegisterPage },*/
            //{ title: 'Profile', component: ProfileUserPage },
            { title: 'Profile', component: 'ProfileUserPage' },
            { title: 'Déconnexion', component: '' }
          ];

    this.connexions = [
            /*{ title: 'Connexion', component: LoginPage },
            { title: 'Connexion', component: LoginPage },
            { title: 'Enregistrement', component: RegisterPage },*/
            //{ title: 'Connexion', component: LoginPage },
            { title: 'Connexion', component: 'LoginPage' },
            { title: 'Creéer un compte', component: 'RegisterPage' },
          ];
    
      /*this.gestionService.remoteSaved.getSession((err, response) => {
         if (response.userCtx.name) {
          
          this.name = response.userCtx.name; 
        }
      });*/
  } 

  chargerInfo(){
    this.storage.get('info_user').then((info_user) => {
      if(info_user){
        global.info_user = info_user;
        //this.name = 
      }
    });
    this.storage.get('info_connexion').then((info_connexion) => {
      if(info_connexion){
         global.info_connexion = info_connexion; 
      }
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
   //this.nav.push(page.component);
   if(page.component){
     let modal = this.modalCtl.create(page.component);
     modal.present();
     this.menuCtrl.close();
      /*modal.onDidDismiss(() => {
      EssaiPage.prototype.ionViewWillEnter();
     })*/
   }else if(page.title === 'Déconnexion'){
      this.gestionService.logout();
      global.estConnecte = false; 
      this.menuCtrl.close();
      //this.enableUnAuthenticatedMenu();
    }else{
     this.gestionService.logout();
     this.menuCtrl.close();
     global.estConnecte = false; 
     //EssaiPage.prototype.ionViewWillEnter();
   } 
    
  }
/*
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if(page.component){
      this.nav.push(page.component);
      this.menuCtrl.close();
    }else if(page.title === 'Déconnexion'){
      this.gestionService.logout();
      this.menuCtrl.close();
      //this.enableUnAuthenticatedMenu();
    }
    
  }*/

}
