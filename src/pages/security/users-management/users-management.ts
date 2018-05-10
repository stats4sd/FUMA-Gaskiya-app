import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ViewController } from 'ionic-angular';
import { PouchdbProvider } from '../../../providers/pouchdb-provider';
import { Validators, FormBuilder } from '@angular/forms';

/**
 * Generated class for the UsersManagementPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-users-management',
  templateUrl: 'users-management.html',
})
export class UsersManagementPage {
  selectedStyle: any = 'liste';
  users: any = [];
  page: any = 'liste';
  user: any = {};
  userForm: any;
  nom: any;
  prenom: any;
  sex: any;
  roles: any = [];
  codes_unions: any = [];
  unions: any = [];

  constructor(public navCtrl: NavController, public alertCtl: AlertController, public loadingCtl: LoadingController, public formBuilder: FormBuilder, public navParams: NavParams, public viewCtrl: ViewController, public servicePouchdb: PouchdbProvider) {
    
    this.userForm = this.formBuilder.group({
        nom: [''],
        prenom: [''],
        //username: ['', Validators.required],
        //email: [this.user.email],
        //mdpass: ['', Validators.required],
        //confmdpass: ['', Validators.required],
        //date: [this.user.date, Validators.required],
        sex: [''],
        roles: [''],
        codes_unions: ['']
    })
  }

  /*ionViewDidLoad() {
    console.log('ionViewDidLoad UsersManagementPage');
  }*/

  ionViewDidEnter(){
    this.servicePouchdb.getAllUsers('admin', 'admin').then((users) => {
      if(users){
        this.users = users;
      }
    });

    this.getAllUnions();
  }

  detail(user){
    this.user = user;
    this.page = 'detail'
  }

  editer(user){
    this.nom = user.nom;
    this.prenom = user.prenom;
    this.sex = user.sex;
    this.roles = user.roles;
    this.codes_unions = user.codes_unions;

    this.page = 'edite'
  }

  getAllUnions(){
    this.servicePouchdb.managerGetAllUnions().then((unions) => {
      this.unions = unions;
    }).catch((err) => {
      alert(err)
    })    
  }

  
  sauvegarder(){
    let loading = this.loadingCtl.create({
      content: 'Mise à jour de l\'utilisateur en cours...'
    });
    loading.present();
    let user = this.userForm.value;
    let grand_user = this.user;
    grand_user.nom = user.nom;
    grand_user.prenom = user.prenom;
    grand_user.sex = user.sex;
    grand_user.roles = user.roles;
    grand_user.codes_unions = user.codes_unions;
    
    this.servicePouchdb.managerUpdateUser('admin','admin',grand_user).then((res) => {
      loading.dismiss();

      this.users[this.users.indexOf(user)] = user;
      this.user = grand_user;
      this.page = 'detail';
    }).catch((err) => {
       loading.dismiss();
      alert(err);
    })
    
  }

  annuler(){

    if(this.page === 'detail'){
      this.page = 'liste';
    }else if(this.page === 'edite'){
      this.page = 'detail';
    }else{
      this.viewCtrl.dismiss();
    }
  }


  supprimer(user){
    let e: any = {};
    let alert = this.alertCtl.create({
      title: 'Suppression utilisateur',
      message: 'Etes vous sûr de vouloir supprimer cet utilisateur ?',
      buttons:[
        {
          text: 'Non',
          handler: () => console.log('suppression annulée')
 
        },
        {
          text: 'Oui',
          handler: () => {
            this.servicePouchdb.managerDeleteUser('admin', 'admin', user).then((res) => {
              this.users.splice(this.users.indexOf(user), 1);
              this.page = 'liste';
              
            }, err => {
              console.log(err)
            }) ;
            
          }
        }
      ]
    });

    alert.present();
  }



}
