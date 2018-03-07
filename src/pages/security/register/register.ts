import { Component } from '@angular/core';
import { NavController, ViewController, NavParams, LoadingController, IonicPage, MenuController, ToastController } from 'ionic-angular';
//import { TabsPage } from '../tabs/tabs';
//import { LoginPage } from '../login/login';
//import { ConfigBoutiquePage } from '../accueil/config-boutique/config-boutique';
import { PouchdbProvider } from '../../../providers/pouchdb-provider';
import { Validators, FormBuilder } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';
import { global } from '../../../global-variables/variable';

/*
  Generated class for the Register page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  //nom: string;
  //username: string;
  //email: string;
  mdpass: string;
  confmdpass: string;
  registerForm: any;

  constructor(public translate: TranslateService, public viewCtl:ViewController, public toastCtl: ToastController, public navCtrl: NavController, public storage: Storage, public menuCtrl: MenuController, public formBuilder: FormBuilder, public navParams: NavParams, public loadinCtl: LoadingController, public gestionService: PouchdbProvider) {
    this.translate.setDefaultLang(global.langue);
    let d: Date = new Date();
    let s = this.createDate(d.getDate(), d.getMonth(), d.getFullYear());
    this.registerForm = this.formBuilder.group({
        nom: ['', Validators.required],
        prenom: ['', Validators.required],
        email: ['', Validators.required],
        mdpass: ['', Validators.required],
        confmdpass: ['', Validators.required],
        date: [s, Validators.required],
        sex: ['', Validators.required], 
        created_at: [d.toJSON()],
        updatet_at: [d.toJSON()],
        created_by: [''],
        updated_by: [''],
        //deleted_at: [d.toJSON()],
        //deleted_by: [d.toJSON()],
    });
  }

     dismiss(){
    this.viewCtl.dismiss();
  }

  afficheMsg(msg: string){
    let toast = this.toastCtl.create({
      message: msg,
      position: 'top',
      duration: 3000
    });

    toast.present();
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


  ionViewWillEnter() {
    this.translate.use(global.langue);
    console.log('ionViewDidLoad RegisterPage');
  }

  register(){
    if(this.mdpass !== this.confmdpass){
      alert('Le mot de passe et la confirmation ne sont pas conformes.');
      this.confmdpass = '';
    }else{
      //this.gestionService.logout();
      let user = this.registerForm.value;
      let meta = {
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
        date: user.date,
        sex: user.sex,
        db: 'frna',
        codes_unions: []
      }
 

      let loading = this.loadinCtl.create({
        content: 'Enregistrement...'
      });
      loading.present();

      //let db = new PouchDB('http://localhost:5984/stock-fuma');
      this.gestionService.remoteSaved.signup(user.email, user.mdpass,{metadata : meta}, (err, response) => {
        if(err){
          loading.dismissAll();
          if (err.name === 'conflict') {
              alert('L\'adresse mail existe déjà');
            }else  if (err.name === 'forbidden') {
              alert('L\'adresse mail invalide');
            } else{
              alert('Une erreur s\'est produite lors de la tentative de connexion au serveur');
            }
        }else if(response){
          loading.dismissAll();
          this.afficheMsg('Compte créé avec succèes');

          //connexion au nouveau compte
          ///this.loginUser(user.email, user.mdpass)
          this.navCtrl.pop();
          //this.navCtrl.setRoot(TabsPage);
        }else{
          loading.dismissAll();
          alert('echec d\'authentification');
        }
          
      });
    }
    
  }

  login(){
    this.navCtrl.push('LoginPage');
  }

 loginUser(username: any, mdpass: any){
    let loading = this.loadinCtl.create({
      content: 'Connexion...'
    });
    loading.present();
    let ajaxOpts = {
      ajax: {
        headers: {
          Authorization: 'Basic ' + window.btoa(username + ':' + mdpass)
        }
      }
    };
    this.gestionService.remoteSaved.login(username, mdpass, ajaxOpts, (err, response) => {
      let user: any = {
        'email': username,
        'mdpass': mdpass
      }
      if (err) {
        loading.dismissAll();
        if (err.name === 'unauthorized') {
          alert('nom ou mot de passe incorrecte');
          
        } else {
          alert('erreur');
          
        }
      }else if(response){
        
        //alert('success');
        //this.MyApp.setPage();
        //let m = MyApp.g
        //m.setPage();
        this.storage.set('info_connexion', user);
        global.info_connexion = user;
        this.gestionService.remoteSaved.getUser(username, (err, us) => {
          if (err) {
            if (err.name === 'not_found') {
              // typo, or you don't have the privileges to see this user
              alert('Privilèges insuffiasants');
            } else {
              // some other error
              alert('Erreur');
            }
          } else {
            // response is the user object
           this.storage.set('info_user', us);
           global.info_user = us;
          }
        });
        loading.dismissAll();
       /* if(global.configOK == false){
          this.enableAuthenticatedMenu();
          this.navCtrl.push(ConfigBoutiquePage);
        }else{
          this.enableAuthenticatedMenu();
          this.navCtrl.setRoot(TabsPage);
        }*/
        
        
  
      }else{ 
        loading.dismissAll();
        alert('echec');
      }
    });
  }

  enableAuthenticatedMenu() {
    this.menuCtrl.enable(true, 'authenticated');
    this.menuCtrl.enable(false, 'unauthenticated');
  }

}
