import { Component, ViewChild } from '@angular/core';
import { NavController, IonicApp, Slides, ToastController, NavParams, LoadingController, ViewController, App, AlertController, Platform, ModalController, IonicPage, MenuController, Events  } from 'ionic-angular';
import { PouchdbProvider } from '../../providers/pouchdb-provider';
//import { AjouterEssaiPage } from './ajouter-essai/ajouter-essai';
//import { DetailEssaiPage } from './detail-essai/detail-essai';
import { Storage } from '@ionic/storage'; 
import { File } from '@ionic-native/file';
import { global } from '../../global-variables/variable';
import * as FileSaver from 'file-saver';
import { Printer, PrintOptions } from '@ionic-native/printer';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Device } from '@ionic-native/device';
import { Sim } from '@ionic-native/sim';
import { AutoCompletion } from '../../providers/auto-completion';
import PouchDB from 'pouchdb';

declare var cordova: any;
/**
 * Generated class for the TypologiePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-typologie',
  templateUrl: 'typologie.html',
})
export class TypologiePage {
  @ViewChild(Slides) slides: Slides;
  
  typologies: any = [];
  typologies1: any = [];
  allTypologies: any = [];
  allTypologiesMembreSelectionnee: any = [];
  typologie: any;
  typologie1: any;
  recherche: any = 'FM-';
  typologieAModifier: any;
  grandTypologie: any;
  typologieForm: any;
  date_naissance: any;
  producteurs: any = [];
  producteur_connu: boolean = false;
  producteur: any;
  surnon_defini: boolean = false;
  age_defini: boolean = false;
  typeRecherche: any = 'matricule';
  age_typologie: any;

  tailleSlides: any = 0;
  id: any = '';
  loading: boolean = true;
  rechercher: any = false;
  detailTypologie: boolean = false;
  selectedStyle: any = 'liste';
  selectedLimit: any = 10;
  limits: any = [10, 25, 50, 100, 500, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 'Tous'];
  today: any;
  imei: any = '';
  phonenumber: any = '';
  user: any = global.info_user;
  global:any = global;
  estManager: boolean = false;
  estAnimataire: boolean = false;
  aProfile:boolean = false;
  modifierFrom: boolean = false;
  estInstancier: boolean = false;
  ajoutForm: boolean = false;

  age: any;
  sex: any;
  annee: any;
  ancienne_annee: any;
  matricule_producteur: any;
  nom_producteur: any;
  surnom_producteur: any;
  departement_producteur: any;
  code_union: any;
  code_op: any;
  classes: any = [];
  question1: any;
  reponse1: any;
  classe1: any;
  question2: any;
  reponse2: any;
  classe2: any;
  question3: any;
  reponse3: any;
  classe3: any;
  question4: any;
  reponse4: any;
  classe4: any;
  question5: any;
  reponse5: any;
  classe5: any;
  question6: any;
  reponse6: any;
  classe6: any;
  question7: any;
  reponse7: any;
  classe7: any;
  question8: any;
  reponse8: any;
  classe8: any = [];
  question8_1: any;
  reponse8_1: any;
  classe8_1: any;
  question8_2: any;
  reponse8_2: any;
  classe8_2: any;
  question9: any;
  reponse9: any;
  classe9: any = [];
  question9_1: any;
  reponse9_1: any;
  classe9_1: any;
  question9_2: any;
  reponse9_2: any;
  classe9_2: any;
  question10: any;
  reponse10: any;
  classe10: any;
  question10_1: any;
  reponse10_1: any;
  classe10_1: any;
  question10_2: any;
  reponse10_2: any;
  classe10_2: any;
  question11: any;
  reponse11: any;
  classe11: any;
  question12: any;
  reponse12: any;
  classe12: any;
  annees: any = [];

  

  constructor(public navCtrl: NavController, public loadtingCtl: LoadingController, public ServiceAutoCompletion: AutoCompletion, public toastCtl: ToastController, public ionicApp: IonicApp, public viewCtl: ViewController, public formBuilder: FormBuilder, public sim: Sim, public device: Device, public modelCtl: ModalController, public a: App, public events: Events, public navParams: NavParams, public menuCtl: MenuController, public printer: Printer, public file: File, public platform: Platform, public storage: Storage, public servicePouchdb: PouchdbProvider, public alertCtl: AlertController) {
  
    this.menuCtl.enable(false, 'options');
    this.menuCtl.enable(false, 'connexion');
    this.menuCtl.enable(false, 'profile');
    
  
    events.subscribe('user:login', (user) => {
        if(user){
          this.aProfile = true;
          this.estMangerConnecter(user)
          this.estAnimataireConnecter(user)
        }else{
          this.aProfile = false;
          this.estManager = false;
          this.estAnimataire = false;
          this.user = global.info_user;
        }
      });

      
      for(let i=0; i<=50; i++){
        this.annees.push(2000 + i)
      } 

      let date = new Date();
      this.annee = date.getFullYear() -1 ;


      if(navParams.data.producteur){
        this.producteur = navParams.data.producteur;
        this.producteur_connu = true;
        this.selectedLimit = 'Tous';
        this.matricule_producteur = this.producteur.matricule_Membre;
        this.nom_producteur = this.producteur.nom_Membre;
        this.code_union = this.producteur.code_union;
        this.code_op = this.producteur.op_code;
        
        if(this.producteur.surnom_Membre){
          this.surnom_producteur = this.producteur.surnom_Membre;
          this.surnon_defini = true;
        }else{
          this.surnom_producteur = '';
          this.surnon_defini = false;
        }
        if(this.producteur.date_naissance && this.producteur.date_naissance !== ''){
          this.date_naissance = this.producteur.date_naissance;
          let date_naiss = new Date(this.date_naissance);
          //let d = this.createDate(1,0, this.annee);
          //let date_de_reference = new Date(d);
          let date_de_reference = new Date();
          this.age = date_de_reference.getFullYear() - date_naiss.getFullYear();
          this.reponse1 = this.age;
          //alert(this.producteur.date_naissance + ' '+date_naiss+'  '+d+'  '+date_de_reference+ '  '+this.age)
          
          this.getClasseReponse1(this.age)
          this.age_defini = true;
          
        }else{
          this.date_naissance = '';
          this.age_defini = false;
        }
        
        this.departement_producteur = this.producteur.departement_nom;
        
        this.sex = this.producteur.genre;        
      }

  }


   copierDB(){
    //this.servicePouchdb.copierDB();
  let codes_unions: any = {};
    //let unions: any = ['WA', 'DO']
    let loading = this.loadtingCtl.create({
      content: 'Transfert typologie en cours...'
    });
    loading.present();
      if(this.allTypologies){
        //alert('nbdoc == '+this.allTypologies.length);
        this.allTypologies.forEach((ty) => {
          let doc = ty.doc
          //copier les données vers la nouvelle base données
          /*if(doc.type && doc.type != '' && doc.type != 'photo' && doc.data){
            var newDoc: any = {};
            newDoc._id = doc._id;
            newDoc.type = doc.type;
            newDoc.data = doc.data;
            copie_db.put(newDoc);
          }else */
          if(doc.data.code_union == 'WA' || doc.data.code_union == 'DO' || doc.data.code_union == 'JA' || doc.data.code_union == 'HA' || doc.data.code_union == 'AM' || doc.data.code_union == 'SA' || !doc.data.code_union){
            var newDoc: any = {};
            newDoc._id = doc._id;
            newDoc.data = doc.data;
            newDoc.rev = doc._rev;

            this.updateCopieDoc(newDoc)
            //alert(doc._rev.substring(0, doc._rev.indexOf('-')))
            /*copie_db.put(newDoc).then((res) => {
              this.updateCopieDco(newDoc, doc);
            }) .catch(err => { alert('err '+err) });*/

          }/*else if(doc.type && doc.type != '' && doc.type == 'photo' && (doc.code_union == 'WA' || doc.code_union == 'DO' || doc.code_union == 'SA' || !doc.code_union)){
    
              //var fileName = photoDocId + '.jpeg';  
              var newPhoto: any = {};
              newPhoto._id = doc._id;
              //newPhoto._attachments[fileName] = doc._attachments[fileName];
              newPhoto.photoID =  doc.photoID;
              newPhoto.timestamp = doc.timestamp;
              newPhoto.type = doc.type;
              newPhoto.code_union = doc.code_union;
              newPhoto._attachments = doc._attachments;
              newPhoto.rev = doc._rev;
              this.updateCopieDoc(newPhoto)
              //copie_db.put(doc).catch(err => { alert('err tof '+err) })
        
          }*//*else{

          }*/
        });

        loading.dismiss();
      }

  }

  updateCopieDoc(newDoc){

     var copie_db = new PouchDB('http://'+ global.info_db.ip+'/copie_db', {
      /*auth: {
        username: 'admin',
        password: 'admin'
      }*/
      ajax: {
        timeout: 4800000,
      }
    });
    //let i = parseInt(doc._rev.substring(0, doc._rev.indexOf('-')))
    if(!newDoc._rev || newDoc._rev !== ''){
      //var newDoc: any = {};
      //newDoc._id = oldDoc._id;
      //newDoc.data = oldDoc.data;
      copie_db.put(newDoc).then((res) => {
        newDoc._rev = res.rev;
        //this.updateCopieDoc(newDoc);
      }).catch(err => { alert('err '+err) })
    }else{
      if(parseInt(newDoc._rev.substring(0, newDoc._rev.indexOf('-'))) < parseInt(newDoc.rev.substring(0, newDoc.rev.indexOf('-')))){
        copie_db.put(newDoc).then((res) => {
          newDoc._rev = res.rev;
          //this.updateCopieDoc(newDoc);
        }).catch(err => { alert('err rec '+err) })
      }
    }
    
    
  }


  anneeModifiee(){
    /*if(this.date_naissance && this.date_naissance !== ''){
      let date_naiss = new Date(this.date_naissance);
      let d = this.createDate(1,0, this.annee);
      let date_de_reference = new Date(d);
      this.age = date_de_reference.getFullYear() - date_naiss.getFullYear();
      this.reponse1 = this.age;
      this.getClasseReponse1(this.age)
    }*/

    if(this.reponse1 && this.reponse1 != ''){
      this.getClasseReponse1(this.reponse1)
    }else if(this.age && this.age != ''){
      this.getClasseReponse1(this.age)
    }
  }
  chargerMembres(){
    let p: any = [];
      this.servicePouchdb.getPlageDocsRapide('fuma:op:membre','fuma:op:membre:\uffff').then((mbrA) => {
        
          this.servicePouchdb.getPlageDocsRapide('koboSubmission_fuma-op-membre','koboSubmission_fuma-op-membre\uffff').then((mbrK) => {
          this.producteurs = mbrA.concat(mbrK);

          this.producteurs.forEach((prod, index) => {
            p.push(prod.doc.data); 
          });

          this.ServiceAutoCompletion.data = p;

      }, err => console.log(err));

      }, err => console.log(err)); 
    }

  dismiss(){
    this.viewCtl.dismiss(/*this.typologies*/);
    //this.a_matricule = false;
  }
  closeToast(){
   let toast = this.ionicApp._toastPortal.getActive();
    toast.dismiss();
  }
  estMangerConnecter(user){
    if(user && user.roles){
      this.estManager = global.estManager(user.roles);
    }
  }

   estAnimataireConnecter(user){
    if(user && user.roles){
      this.estAnimataire = global.estAnimataire(user.roles);
    }
  }

  /*ionViewDidEnter() {
    //console.log('ionViewDidLoad TypologiePage');
    this.tailleSlides = this.slides.length();
    this.slides.startAutoplay()
    //alert(this.slides.getActiveIndex())
    if(this.slides.getActiveIndex() === 5){
      this.slides.lockSwipeToNext(true)
    }
  }*/

  initForm(){
    let maDate = new Date();
    //this.dateAjout = maDate;
     let today = this.createDate(maDate.getDate(), maDate.getMonth(), maDate.getFullYear());
     this.typologieForm = this.formBuilder.group({
     // _id:[''],
      type:['typologie'],
      annee:['', Validators.required],
      matricule_producteur: ['', Validators.required],
      nom_producteur:['', Validators.required],
      surnom_producteur:[''],
      departement_producteur:['', Validators.required], 
      code_union:['', Validators.required], 
      reponse1: ['', Validators.required],
      reponse2: ['', Validators.required],
      reponse3: ['', Validators.required],
      reponse4: ['', Validators.required],
      reponse5: ['', Validators.required],
      reponse6: ['', Validators.required],
      reponse7: ['', Validators.required],
      reponse8: ['', Validators.required],
      reponse8_1: [''],
      reponse8_2: [''],
      reponse9: ['', Validators.required],
      reponse9_1: [''],
      reponse9_2: [''],
      reponse10: ['', Validators.required],
      reponse10_1: [''],
      reponse10_2: [''],
      reponse11: ['', Validators.required],
      reponse12: ['', Validators.required],
      today: [today],
      deviceid: [''],
      imei: [''],
      phonenumber: [''],
      start: [maDate.toJSON()],
      end: ['']
    });
    
  }


  getClasseReponse1(age){
    //age = parseInt(age)
    this.age = age;

    if(age >= 15){
        let now: Date = new Date();
        let annee = now.getFullYear() - age;
        //this.createDate(1,1, annee)
        //alert(annee)
        if(!this.age_defini){
          this.date_naissance = this.createDate(1,0, annee);
        }

        let date_naiss =  new Date(this.date_naissance);
        let d = this.createDate(1,0, this.annee);
        let date_de_reference = new Date(d);
        this.age_typologie = date_de_reference.getFullYear() - date_naiss.getFullYear();
        //alert(this.age_typologie)
        //age1 = parseInt(age1);
        //alert(age1);
        if(this.age_typologie < 36){
          this.classe1 = 'jeune'
        }else if(this.age_typologie >= 36 && this.age_typologie < 41){
          this.classe1 = 'adulte'
        }else if(this.age_typologie >= 41 && this.age_typologie < 66){
          this.classe1 = 'adulte'
        }else{
          this.classe1 = 'vieillard';
          //this.reponse1 = '';
        }
      }else{
        this.classe1 = '';
        //this.reponse1 = '';
      }


    /*if(this.date_naissance){
      if(age >= 15){
        if(age < 36){
          this.classe1 = 'jeune'
        }else if(age >= 36 && age < 41){
          this.classe1 = 'adulte'
        }else if(age >= 41 && age < 66){
          this.classe1 = 'adulte'
        }else{
          this.classe1 = 'vieillard';
          //this.reponse1 = '';
        }
      }else{
        this.classe1 = '';
        //this.reponse1 = '';
      }
    }else{
      if(age >= 15){
        let now: Date = new Date();
        let annee = now.getFullYear() - age;
        //this.createDate(1,1, annee)
        //alert(annee)
        this.date_naissance = this.createDate(1,0, annee);

        let date_naiss =  new Date(this.date_naissance);
        let d = this.createDate(1,0, this.annee);
        let date_de_reference = new Date(d);
        let age1 = date_de_reference.getFullYear() - date_naiss.getFullYear();

        //age1 = parseInt(age1);
        //alert(age1);
        if(age1 < 36){
          this.classe1 = 'jeune'
        }else if(age1 >= 36 && age1 < 41){
          this.classe1 = 'adulte'
        }else if(age1 >= 41 && age1 < 66){
          this.classe1 = 'adulte'
        }else{
          this.classe1 = 'vieillard';
          //this.reponse1 = '';
        }
      }else{
        this.classe1 = '';
        //this.reponse1 = '';
      }
    }*/
     
  }

  getClasseReponse2(reponse2){
    if(reponse2.length && reponse2.length === 1){
      if(reponse2.indexOf('moi-même') !== -1){
        this.classe2 = 'autonome';
      }else{
        alert('Choix invalide!');
        this.classe2 = '';
        this.reponse2 = '';
      }
    }else if(reponse2.length && reponse2.length === 2){
      if((reponse2.indexOf('moi-même') !== -1 && (reponse2.indexOf('mon mari') !== -1) || reponse2.indexOf('ma femme') !== -1)){
        this.classe2 = 'conjugale';
      }else if(reponse2.indexOf('moi-même') !== -1 && reponse2.indexOf('mes fils') !== -1){
        this.classe2 = 'semi-familiale';
      }else if(reponse2.indexOf('moi-même') !== -1 && reponse2.indexOf('mes parents') !== -1){
        this.classe2 = 'semi-gandou';
      }else {
        alert('Choix invalide!');
        this.classe2 = '';
        this.reponse2 = '';
      }
    }else if(reponse2.length && reponse2.length === 3){
      if(reponse2.indexOf('moi-même') !== -1 && (reponse2.indexOf('mon mari') !== -1 || reponse2.indexOf('ma femme') !== -1) && reponse2.indexOf('mes fils') !== -1){
        this.classe2 = 'familiale '
      }else if(reponse2.indexOf('moi-même') !== -1 && reponse2.indexOf('mes parents') !== -1 && reponse2.indexOf('mes frères') !== -1){
        this.classe2 = 'gandou '
      }else {
        alert('Choix invalide!');
        this.classe2 = '';
        this.reponse2 = '';
      }
    }else if(reponse2.length && reponse2.length > 3){
      alert('Choix invalide!');
      this.classe2 = '';
      this.reponse2 = '';
    }else{
      this.classe2 = '';
      this.reponse2 = '';
    }
  }

  getClasseReponse3(reponse3){
    if(reponse3.length && reponse3.length === 1){
      if(reponse3.indexOf('auto consommation') !== -1){
        this.classe3 = 'consommation';
      }else if(reponse3.indexOf('vente') !== -1){
        this.classe3 = 'commerce';
      }else/* if(reponse3.indexOf('nourrir les animaux') !== -1)*/{
        this.classe3 = 'alimentation bétail';
      }
    }else if(reponse3.length && reponse3.length === 2){
      if(reponse3.indexOf('auto consommation') !== -1 && reponse3.indexOf('vente') !== -1){
        this.classe3 = 'consommation et vente';
      }else if(reponse3.indexOf('auto consommation') !== -1 && reponse3.indexOf('nourrir les animaux') !== -1){
        this.classe3 = 'auto consommation';
      }else/* if(reponse3.indexOf('vente') !== -1 && reponse3.indexOf('nourrir les animaux') !== -1)*/{
        this.classe3 = 'commerce et alimentation bétail';
      }
    }else if(reponse3.length && reponse3.length === 3){
      //if(reponse3.indexOf('auto consommation') !== -1 && reponse3.indexOf('vente') !== -1 && reponse3.indexOf('nourrir les animaux') !== -1){
        this.classe3 = 'auto consommation et commerce'
      /*}else {
        alert('Choix invalide!');
        this.classe3 = '';
        this.reponse3 = '';
      }*/
    }else {
        //alert('Choix invalide!');
        this.classe3 = '';
        //this.reponse3 = '';
    }
  }

  getClasseReponse4(reponse4){
    if(reponse4.length && reponse4.length === 1){
      if(reponse4.indexOf('mil') !== -1 || reponse4.indexOf('sorgho') !== -1){
        this.classe4 = 'pure pluviale';
      //}else if(reponse4.indexOf('niébé') !== -1 || reponse4.indexOf('arachide') !== -1 || reponse4.indexOf('souchet') !== -1){
      //  this.classe4 = 'pure rente';
      }else/* if(reponse3.indexOf('nourrir les animaux') !== -1)*/{
        this.classe4 = 'pure rente';
      }
    }else if(reponse4.length && reponse4.length === 2){
      if(reponse4.indexOf('mil') !== -1 && reponse4.indexOf('sorgho') !== -1){
        this.classe4 = 'association pluviale';
      }else if(reponse4.indexOf('niébé') !== -1 && reponse4.indexOf('arachide') !== -1){
        this.classe4 = 'association rente';
      }else if((reponse4.indexOf('mil') !== -1 && reponse4.indexOf('arachide') !== -1) || (reponse4.indexOf('mil') !== -1 && reponse4.indexOf('souchet') !== -1) || (reponse4.indexOf('mil') !== -1 && reponse4.indexOf('niébé') !== -1)
          || (reponse4.indexOf('sorgho') !== -1 && reponse4.indexOf('arachide') !== -1) || (reponse4.indexOf('sorgho') !== -1 && reponse4.indexOf('niébé') !== -1) || (reponse4.indexOf('sorgho') !== -1 && reponse4.indexOf('souchet') !== -1)
        ){
          this.classe4 = 'association pluviale rente';
        }else{
        alert('Choix invalide!');
        this.classe4 = '';
        this.reponse4 = '';
      }
    }else if(reponse4.length && reponse4.length === 3){
      if((reponse4.indexOf('mil') !== -1 && reponse4.indexOf('sorgho') !== -1 && reponse4.indexOf('niébé') !== -1) || (reponse4.indexOf('mil') !== -1 && reponse4.indexOf('sorgho') !== -1 && reponse4.indexOf('arachide') !== -1) || (reponse4.indexOf('mil') !== -1 && reponse4.indexOf('niébé') !== -1 && reponse4.indexOf('arachide') !== -1) || (reponse4.indexOf('sorgho') !== -1 && reponse4.indexOf('niébé') !== -1 && reponse4.indexOf('arachide') !== -1)){
        this.classe4 = 'association pluviale rente';
      }else {
        alert('Choix invalide!');
        this.classe4 = '';
        this.reponse4 = '';
      }
    }else if(reponse4.length && reponse4.length === 4){
      if((reponse4.indexOf('mil') !== -1 && reponse4.indexOf('sorgho') !== -1 && reponse4.indexOf('arachide') !== -1 && reponse4.indexOf('niébé') !== -1)
      ){
        this.classe4 = 'association pluviale rente';
      }else {
        alert('Choix invalide!');
        this.classe4 = '';
        this.reponse4 = '';
      }
    }else {
        //alert('Choix invalide!');
        this.classe4 = '';
        //this.reponse3 = '';
    }
  }


  getClasseReponse5(reponse5){
    if(this.departement_producteur !== 'Madarounfa'){
      if(reponse5 < 2){
        this.classe5 = 'petit producteur';
      }else if(reponse5 >= 2 && reponse5 <= 4){
        this.classe5 = 'producteur moyen';
      }else if(reponse5 > 4){
        this.classe5 = 'grand producteur'
      }else{
        this.classe5 = '';
      } 
    }else{
        if(reponse5 < 1){
          this.classe5 = 'petit producteur';
        }else if(reponse5 >= 1 && reponse5 <= 2){
          this.classe5 = 'producteur moyen';
        }else if(reponse5 > 2){
          this.classe5 = 'grand producteur'
        }else{
          this.classe5 = '';
      } 
    } 
  }

  getClasseReponse6(reponse6){
    if(reponse6 == 0){
      this.classe6 = 'sans appui';
    }else if(reponse6 == 1){
      this.classe6 = 'appui négligeable';
    }else if(reponse6 > 1 && reponse6 <= 3 ){
      this.classe6 = 'appui moyen';
    }else if(reponse6 > 3){
      this.classe6 = 'grand appui';
    }else{
      this.classe6 = '';
    } 
  }

  getClasseReponse7(reponse7){
    if(reponse7 == 0){
      this.classe7 = 'talaka talaou';
    }else if(reponse7 == 1){
      this.classe7 = 'ba kouka ba gouda';
    }else if(reponse7 > 1 && reponse7 <= 3 ){
      this.classe7 = 'mai dama dama';
    }else if(reponse7 > 3){
      this.classe7 = 'alhamdoulillah';
    }else{
      this.classe7 = '';
    } 
  }

  getClasseReponse8(reponse8){
    if(reponse8 === 'oui'){
      this.classe8 = [];
    }else if(reponse8 === 'non'){
      //this.classe8 = 'non mécanisé';
      this.classe8.push('non mécanisé')
    }else{
      this.classe8 = [];
    } 
  }

  getClasseReponse8_1(reponse8_1){
    if(reponse8_1.length && reponse8_1.length === 1){
      this.classe8_1 = 'début de mécanisation';
      //this.classe8.push(this.classe8_1)
    }else if(reponse8_1.length && reponse8_1.length > 1 && reponse8_1.length <= 3){
      this.classe8_1 = 'mécanisation moyenne';
      //this.classe8.push(this.classe8_1)
    }else if(reponse8_1.length && reponse8_1.length > 3){
      this.classe8_1 = 'mécanisation avancée';
      //this.classe8.push(this.classe8_1)
    }else{
      this.classe8_1 = '';
    }

    this.classe8 = [];
    if(this.classe8_1 && this.classe8_1 !== ''){
      this.classe8.push(this.classe8_1)
    }

    if(this.classe8_2 && this.classe8_2 !== ''){
      this.classe8.push(this.classe8_2)
    }
    
  }

  getClasseReponse8_2(reponse8_2){
    if(reponse8_2.length && reponse8_2.length === 1){
      if(reponse8_2.indexOf('prêt') !== -1){
        this.classe8_2 = 'pas assez engagé';
      } else if(reponse8_2.indexOf('location') !== -1){
        this.classe8_2 = 'peu engagé';
      } else{
        this.classe8_2 = 'engagé';
      }
    }else if(reponse8_2.length && reponse8_2.length === 2){
      if(reponse8_2.indexOf('location') !== -1 && reponse8_2.indexOf('prêt') !== -1){
        this.classe8_2 = 'assez engagé';
      } else if(reponse8_2.indexOf('miennes') !== -1 && reponse8_2.indexOf('prêt') !== -1){
        this.classe8_2 = 'bien engagé';
      } else{
        this.classe8_2 = 'très engagé';
      }
    }else if(reponse8_2.length && reponse8_2.length === 3){
      this.classe8_2 = 'très bien engagé';
    }else{
      this.classe8_2 = '';
    } 

    this.classe8 = [];
    if(this.classe8_1 && this.classe8_1 !== ''){
      this.classe8.push(this.classe8_1)
    }

    if(this.classe8_2 && this.classe8_2 !== ''){
      this.classe8.push(this.classe8_2)
    }
  }

   getClasseReponse9(reponse9){
    if(reponse9 === 'oui'){
      this.classe9 = [];
    }else if(reponse9 === 'non'){
      //this.classe9 = 'sans fumure organique';
      this.classe9.push('sans fumure organique')
    }else{
      this.classe9 = [];
    } 
  }

  getClasseReponse9_1(reponse9_1){
    if(reponse9_1 < 25){
      this.classe9_1 = 'peu couverte';
    }else if(reponse9_1 >= 25 && reponse9_1 <= 50){
      this.classe9_1 = 'moyennement couverte';
    }else if(reponse9_1 > 50){
      this.classe9_1 = 'assez couverte';
    }else{
      this.classe9_1 = '';
    } 

    this.classe9.push(this.classe9_1)

    this.classe9 = [];
    if(this.classe9_1 && this.classe9_1 !== ''){
      this.classe9.push(this.classe9_1)
    }

    if(this.classe9_2 && this.classe9_2 !== ''){
      this.classe9.push(this.classe9_2)
    }
  }

  getClasseReponse9_2(reponse9_2){
    if(reponse9_2.length && reponse9_2.length === 1){
      if(reponse9_2.indexOf('produite par mes animaux') !== -1){
        this.classe9_2 = 'locale';
      } else if(reponse9_2.indexOf('achat') !== -1){
        this.classe9_2 = 'externe';
      } else{
        this.classe9_2 = 'contrat';
      }
    }else if(reponse9_2.length && reponse9_2.length === 2){
      if(reponse9_2.indexOf('produite par mes animaux') !== -1 && reponse9_2.indexOf('achat') !== -1){
        this.classe9_2 = 'locale et externe';
      } else {
        alert('Combinaison invalide!')
        this.classe9_2 = '';
        this.reponse9_2 = '';
      }
    }else if(reponse9_2.length && reponse9_2.length === 3){
      alert('Combinaison invalide!')
      this.classe9_2 = '';
      this.reponse9_2 = '';
    }else{
      this.classe9_2 = '';
    }

    this.classe9.push(this.classe9_1)

    this.classe9 = [];
    if(this.classe9_1 && this.classe9_1 !== ''){
      this.classe9.push(this.classe9_1)
    }

    if(this.classe9_2 && this.classe9_2 !== ''){
      this.classe9.push(this.classe9_2)
    }
  }

  getClasseReponse10(reponse10){
    if(reponse10 === 'oui'){
      this.classe10 = '';
    }else if(reponse10 === 'non'){
      this.classe10 = 'sans engrais chimique';
    }else{
      this.classe10 = '';
    } 
  }

   getClasseReponse10_1(reponse10_1){
    if(reponse10_1 < 1){
      this.classe10_1 = 'pauvre';
    }else if(reponse10_1 >= 1 && reponse10_1 <= 3){
      this.classe10_1 = 'moyen';
    }else if(reponse10_1 > 3 ){
      this.classe10_1 = 'riche';
    }else{
      this.classe10_1 = '';
    } 

    this.classe10 = this.classe10_1;
  }

  getClasseReponse11(reponse11){
    if(reponse11 === 'non'){
      this.classe11 = 'non averti';
    }else if(reponse11 === 'quelques fois'){
      this.classe11 = 'peu averti';
    }else if(reponse11 === 'régulièrement'){
      this.classe11 = 'bien averti';
    }else{
      this.classe11 = '';
    } 
  }

   getClasseReponse12(reponse12){
    if(reponse12 < 3){
      this.classe12 = 'très vulnérable';
    }else if(reponse12 >= 3 && reponse12 <= 5){
      this.classe12 = 'vulnérable';
    }else if(reponse12 > 5 && reponse12 <= 8){
      this.classe12 = 'semi-vulnérable';
    }else if(reponse12 > 8 && reponse12 <= 10){
      this.classe12 = 'peu vulnérable';
    }else if(reponse12 > 10){
      this.classe12 = 'pas vulnérable';
    }else{
      this.classe12 = '';
    } 
  }

  setClasses(){
    this.classes = [];
    if(this.classe1 && this.classe1 !== ''){
      this.classes.push(this.classe1)
    }
    if(this.classe2 && this.classe2 !== ''){
      this.classes.push(this.classe2)
    }
    if(this.classe3 && this.classe3 !== ''){
      this.classes.push(this.classe3)
    }
    if(this.classe4 && this.classe4 !== ''){
      this.classes.push(this.classe4)
    }
    if(this.classe5 && this.classe5 !== ''){
      this.classes.push(this.classe5)
    }
    if(this.classe6 && this.classe6 !== ''){
      this.classes.push(this.classe6)
    }
    if(this.classe7 && this.classe7 !== ''){
      this.classes.push(this.classe7)
    }
    if(this.classe8 && this.classe8.length){
      this.classes = this.classes.concat(this.classe8)
    }
    if(this.classe9 && this.classe9.length){
      this.classes = this.classes.concat(this.classe9)
    }
    if(this.classe10 && this.classe10 !== ''){
      this.classes.push(this.classe10)
    }
    if(this.classe11 && this.classe11 !== ''){
      this.classes.push(this.classe11)
    }
    if(this.classe12 && this.classe12 !== ''){
      this.classes.push(this.classe12)
    }

  }

  slideChanged(){
    //let currentIndex = this.slides.getActiveIndex();
    //alert("Current index is " + currentIndex + '  '+this.slides.isEnd());
    if(this.slides.isEnd()){
      this.setClasses();
    }
  }


  getInfoSimEmei(){
    this.sim.getSimInfo().then(
        (info) => {
          if(info.cards.length > 0){
            info.cards.forEach((infoCard) => {
              if(infoCard.phoneNumber){
                this.phonenumber = infoCard.phoneNumber;
              }
              if(infoCard.deviceId){
                this.imei = infoCard.deviceId;
              }
            })
          }else{
            this.phonenumber = info.phoneNumber;
            this.imei = info.deviceId;
          }

        },
        (err) => console.log('Unable to get sim info: ', err)
      );
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


  reinitForm(){
    let maDate = new Date();
    //this.dateAjout = maDate;
    //this.today = this.createDate(maDate.getDate(), maDate.getMonth(), maDate.getFullYear());
    //this.age = ''; /// a calculer
    //let now =new Date();
    //let date_naiss = new Date(this.date_naissance);
    //this.age = now.getFullYear() - date_naiss.getFullYear();
    
    if(!this.producteur_connu){
      this.matricule_producteur = '';
      this.nom_producteur = '';
      this.surnom_producteur = '';
      this.date_naissance = '';
      this.age = '';
      this.code_op = '';
      this.code_union = '';
      this.departement_producteur = '';
      this.id = this.generateId();
      this.producteur_connu = false;
      this.age_defini = false;
      this.surnon_defini = false;
    }

    this.reponse1 = '';
    this.classe1 = '';
    this.age_typologie = '';

    this.reponse2 = '';
    this.classe2 = '';
    this.reponse3 = '';
    this.classe3 = '';
    this.reponse4 = '';
    this.classe4 = '';
    this.reponse5 = '';
    this.classe5 = '';
    this.reponse6 = '';
    this.classe6 = '';
    this.reponse7 = '';
    this.classe7 = '';
    this.reponse8 = '';
    this.reponse8_1 = '';
    this.reponse8_1 = '';
    this.classe8 = [];
    this.classe8_1 = '';
    this.classe8_2 = '';
    this.reponse9 = '';
    this.reponse9_1 = '';
    this.reponse9_2 = '';
    this.classe9 = [];
    this.classe9_1 = '';
    this.classe9_2 = '';
    this.reponse10 = '';
    this.classe10 = '';
    this.reponse10_1 = '';
    this.classe10_1 = '';
    this.reponse10_2 = '';
    this.classe10_2 = '';
    this.reponse11 = '';
    this.classe11 = '';
    this.reponse12 = '';
    this.classe12 = '';
    
    this.classes = [];

  }

generateId(){
    var chars='ABCDEFGHIJKLMNPQRSTUVWYZ'
    var numbers='0123456789'
    var randomArray=[]
    for(let i=0;i<3;i++){
      var rand = Math.floor(Math.random()*10)
      randomArray.push(numbers[rand])
    }
    //randomArray.push('-')
    //var rand = Math.floor(Math.random()*24)
    //randomArray.push(chars[rand])
    var randomString=randomArray.join("");
    var Id= 'TY-'+/*+pays+'-'+region+'-'+department+'-'+commune +'-' +village+ */+randomString 
    return Id;
  }

  chargerTypologieMembre(matricule_producteur){
    this.allTypologiesMembreSelectionnee = [];
    this.servicePouchdb.getPlageDocsRapide('fuma:typologie:'+matricule_producteur, 'fuma:typologie:'+matricule_producteur+' \uffff').then((t) => {
      if(t){
        this.allTypologiesMembreSelectionnee = t; 
      }

    });
  }

  estUniqueTypologieMembreParAnnee(producteur_connu,matricule_producteur, annee, id){
    let ty: any = {};
    let res: number = 0;
    //alert(producteur_connu+'  '+matricule_producteur)
    if(producteur_connu){
       for(let i = 0; i < this.allTypologies.length; i++){
         
         ty = this.allTypologies[i];
         //alert(ty.doc._id+' != '+id+' && '+ty.doc.data.matricule_producteur+' == '+matricule_producteur+' && '+ty.doc.data.annee+' == '+annee)
        if(ty.doc._id != id && ty.doc.data.matricule_producteur == matricule_producteur && ty.doc.data.annee == annee){
          res = 1;
          break;
        }
      }
      return res;
    }else{
      for(let i = 0; i < this.allTypologiesMembreSelectionnee.length; i++){
        ty = this.allTypologiesMembreSelectionnee[i];
        if(ty.doc._id != id && ty.doc.data.matricule_producteur == matricule_producteur && ty.doc.data.annee == annee){
         res = 1;
         break;
        }
      }

      return res;
    }
    
  }

  partager(_id){
    let ids: any = [];
    ids.push(_id);

    let alert = this.alertCtl.create({
      title: 'Information de connexion au du serveur',
      //cssClass: 'error',
      inputs: [
        {
          type: 'text',
          placeholder: 'Adrèsse hôte',
          name: 'ip',
          value: '@ip:5984'
        },
        {
          type: 'text',
          placeholder: 'Nom DB',
          name: 'nom_db',
          value: 'nom_db'
        },
        {
          type: 'text',
          placeholder: 'Nom d\'utilisateur',
          name: 'username',
          //value: info_db.ip
        },
        {
          type: 'password',
          placeholder: 'Mot de passe',
          name: 'passwd',
          //value: info_db.nom_db
        }
      ],
      buttons: [
        {
          //cssClass: 'error-border',
          text: 'Annuler',
          role: 'Cancel',
          handler: () => console.log('Changement ip serveur annuler')
        },
        {
          text: 'Valider',
          handler: (data) => {
            let ip = data.ip.toString();
            let nom_db = data.nom_db.toString();
            let username = data.username.toString();
            let passwd = data.passwd.toString();
            let ids:any = [];
            ids.push(_id);
            this.servicePouchdb.replicationByDocsId(ids, ip, nom_db, username, passwd);
          }
        }
      ]
    }); 

    alert.present();
    
  }


    actionForm(){
      if(this.ajoutForm && !this.modifierFrom){
        let id = 'fuma'+':typologie:'+this.matricule_producteur+' '+ this.id;
        if(this.estUniqueTypologieMembreParAnnee(this.producteur_connu, this.matricule_producteur, this.annee, id) == 1){
          alert('Erreur! Impossible d\'enregistrer cette typologie.\nCe membre possède déjà une typologie en '+this.annee);
        }else{
         let date = new Date();
         let typologie = this.typologieForm.value;
          //les classes
          typologie.age = this.age;
          typologie.age_typologie = this.age_typologie;
          typologie.question1 = this.question1;
          typologie.classe1 = this.classe1
          typologie.question2 = this.question2;
          typologie.classe2 = this.classe2;
          typologie.question3 = this.question3;
          typologie.classe3 = this.classe3;
          typologie.question4 = this.question4;
          typologie.classe4 = this.classe4;
          typologie.question5 = this.question5;
          typologie.classe5 = this.classe5;
          typologie.question6 = this.question6;
          typologie.classe6 = this.classe6;
          typologie.question7 = this.question7;
          typologie.classe7 = this.classe7;
          typologie.question8 = this.question8;
          typologie.classe8 = this.classe8;
          typologie.question8_1 = this.question8_1;
          typologie.classe8_1 = this.classe8_1;
          typologie.question8_2 = this.question8_2;
          typologie.classe8_2 = this.classe8_2;
          typologie.question9 = this.question9;
          typologie.classe9 = this.classe9;
          typologie.question9_1 = this.question9_1;
          typologie.classe9_1 = this.classe9_1;
          typologie.question9_2 = this.question9_2;
          typologie.classe9_2 = this.classe9_2;
          typologie.question10 = this.question10;
          typologie.classe10 = this.classe10;
          typologie.question10_1 = this.question10_1;
          typologie.classe10_1 = this.classe10_1;
          typologie.question10_2 = this.question10_2;
          typologie.classe10_2 = this.classe10_2;
          typologie.question11 = this.question11;
          typologie.classe11 = this.classe11;
          //typologie.classes = this.classes;
          typologie.question12 = this.question12;
          typologie.classe12 = this.classe12;
          typologie.classes = this.classes;
          typologie.code = this.id;



          typologie.deviceid = this.device.uuid;
          typologie.phonenumber = this.phonenumber;
          typologie.imei = this.imei; 
          typologie.update_deviceid = this.device.uuid;
          typologie.update_phonenumber = this.phonenumber;
          typologie.update_imei = this.imei;
          typologie.end = date.toJSON();
          //typologie.code_essai = id;
          //champs.id_champs = id;
        
          //alert('fuma'+':typologie:'+this.matricule_producteur+' '+ this.id)
          let typologieFinal: any = {};
          typologieFinal._id = 'fuma'+':typologie:'+this.matricule_producteur+' '+ this.id;
          typologieFinal.data = typologie
          let EF: any;
          this.servicePouchdb.createDocReturn(typologieFinal).then((res) => {
            /* let toast = this.toastCtl.create({
                message: 'Essai bien enregistré!',
                position: 'top',
                duration: 1000
              });*/
              
              
              //alert(res.rev)
              //ajouter les classes au essais du membre
              //alert(this.matricule_producteur + '  '+this.code_op)
              this.appliquerChangementAuxEssais(this.matricule_producteur, this.classes, this.annee, this.annee);
              //completer les info du memebre (age et surnom si défin)
              this.updateProducteur(this.matricule_producteur, this.surnom_producteur, this.code_op, this.age);
              typologieFinal._rev = res.rev;
              let T: any = {};
              T.doc = typologieFinal;
              
              //this.viewCtl.dismiss(essaiFinal);
            // this.zone.run(() => {
              //this.typologies.push(T);
              if(!this.producteur_connu){

                this.typologies1.push(T);
                this.slides.slideTo(0, 10);
                this.reinitForm();
                //this.dechargerT()
              }else{
                this.typologies.push(T);
                //this.ajoutForm = false;
                //this.reinitForm();
                //this.dechargerT();
                this.ajoutForm = false;
                this.reinitForm();
              }
            });

           
            //this.ajoutForm = false;
            //this.reinitForm();
            

            /*if(!this.producteur_connu){

                //this.essais1.push(E);
                this.reinitForm();
              }else{
                //this.essais.push(E);
                this.ajoutForm = false;
                this.reinitForm();
                //this.dechargerT();
              }*/
            //this.navCtrl.pop();
            //toast.present();
            

      // }
       }
      }else if(this.modifierFrom){
        if(this.estUniqueTypologieMembreParAnnee(this.producteur_connu, this.matricule_producteur, this.annee, this.grandTypologie._id) === 1){
          alert('Erreur! Impossible d\'enregistrer cette typologie.\nCe membre possède déjà une typologie en '+this.annee);
        }else{
            let date = new Date();
            let typologie = this.typologieForm.value;
            this.typologie1.annee = typologie.annee;
            this.typologie1.reponse1 = typologie.reponse1;
            this.typologie1.age_typologie = typologie.age_typologie;
            this.typologie1.classe1 = this.classe1;
            this.typologie1.reponse2 = typologie.reponse2;
            this.typologie1.classe2 = this.classe2;
            this.typologie1.reponse3 = typologie.reponse3;
            this.typologie1.classe3 = this.classe3;
            this.typologie1.reponse4 = typologie.reponse4;
            this.typologie1.classe4 = this.classe4;
            this.typologie1.reponse5 = typologie.reponse5;
            this.typologie1.classe5 = this.classe5;
            this.typologie1.reponse6 = typologie.reponse6;
            this.typologie1.classe6 = this.classe6;
            this.typologie1.reponse7 = typologie.reponse7;
            this.typologie1.classe7 = this.classe7;
            this.typologie1.reponse8 = typologie.reponse8;
            this.typologie1.classe8 = this.classe8;
            this.typologie1.reponse8_1 = typologie.reponse8_1;
            this.typologie1.classe8_1 = this.classe8_1;
            this.typologie1.reponse8_2 = typologie.reponse8_2;
            this.typologie1.classe8_2 = this.classe8_2;
            this.typologie1.reponse9 = typologie.reponse9;
            this.typologie1.classe9 = this.classe9;
            this.typologie1.reponse9_1 = typologie.reponse9_1;
            this.typologie1.classe9_1 = this.classe9_1;
            this.typologie1.reponse9_2 = typologie.reponse9_2;
            this.typologie1.classe9_2 = this.classe9_2;
            this.typologie1.reponse10 = typologie.reponse10;
            this.typologie1.classe10 = this.classe10;
            this.typologie1.reponse10_1 = typologie.reponse10_1;
            this.typologie1.classe10_1 = this.classe10_1;
            this.typologie1.reponse10_2 = typologie.reponse10_2;
            this.typologie1.classe10_2 = this.classe10_2;
            this.typologie1.reponse11 = typologie.reponse11;
            this.typologie1.classe11 = this.classe11;
            this.typologie1.reponse12 = typologie.reponse12;
            this.typologie1.classe12 = this.classe12;
            this.typologie1.classes = this.classes;
            
            this.typologie1.update_deviceid = this.device.uuid;
            this.typologie1.update_phonenumber = this.phonenumber;
            this.typologie1.update_imei = this.imei;
            if(this.navParams.data.producteur){
              this.typologie1.nom_producteur = this.producteur.nom_Membre;
              this.typologie1.surnom_producteur = this.producteur.surnom_Membre;
              this.typologie1.code_union = this.producteur.code_union;
            }
            
          
            //let essaiFinal: any = {};
            this.grandTypologie.data = this.typologie1
            this.servicePouchdb.updateDocReturn(this.grandTypologie).then((res) => {
              this.grandTypologie._rev = res.rev;
              this.typologie = this.grandTypologie;

              //ajouter classes au essais
              this.appliquerChangementAuxEssais(this.matricule_producteur, this.classes, this.ancienne_annee, this.annee);
              //completer les info du memebre (age et surnom si défin)
              //this.updateProducteur(this.matricule_producteur, this.code_op);
              //this.essais[this.essais.indexOf(this.essaiAModifier)] = e;
              
              
              this.reinitFormModifier();
              this.modifierFrom = false;
              this.detailTypologie = true
              this.ajoutForm = false;

            
            let t: any = {};
              t.doc = this.typologie;
              this.typologies.forEach((tp, i) => {
                if(tp.doc._id === this.typologieAModifier._id){
                  this.typologies[i] = t ;
                }
                
              });
            });
          }
      }
    
  }

  appliquerChangementAuxEssais(matricule, classes, ancienne_annee, nouvelle_annee){
    this.servicePouchdb.getPlageDocsRapide('fuma:essai:'+matricule, 'fuma:essai:'+matricule+'\uffff').then((essais) => {
      if(essais){
        essais.forEach((essai) => {
          //cas d'un ajout de typologie
          if(ancienne_annee === nouvelle_annee){
            if(essai.doc.data.typologie == 'oui' && essai.doc.data.annee_typologie == nouvelle_annee){
              essai.doc.data.classes_producteur = classes;
              this.servicePouchdb.updateDoc(essai.doc);
            }
          }else{
            //cas d'une modification
            //mise à jour, cas du changer de l'annee => supprimer les classes sur les essais de l'annee anterieur
            if(essai.doc.data.typologie == 'oui' && essai.doc.data.annee_typologie == nouvelle_annee){
              essai.doc.data.classes_producteur = classes;
              this.servicePouchdb.updateDoc(essai.doc);
            }

            if(essai.doc.data.typologie == 'oui' && essai.doc.data.annee_typologie == ancienne_annee){
              essai.doc.data.classes_producteur = [];
              this.servicePouchdb.updateDoc(essai.doc);
            }
          }
          
        });
      }
    });
  }

  updateProducteur(matricule, surnom_producteur, code_op, age){
    if(!this.surnon_defini || !this.age_defini){
      let now: Date = new Date();
      let annee = now.getFullYear() - age;
      let date_naissance = this.createDate(1,0, annee);
      //alert(age+ ' '+annee + '  '+date_naissance+ '  '+'fuma:op:membre:'+code_op+':'+matricule)
      this.servicePouchdb.getDocById('fuma:op:membre:'+code_op+':'+matricule).then((producteur) => {
        if(producteur){
          //alert('membre trouvé')
          if(date_naissance !== ''){
            producteur.data.date_naissance = date_naissance;
            producteur.data.age = age;
          }
          
          if(surnom_producteur !== ''){
             producteur.data.surnom_Membre = surnom_producteur;
          }

          this.servicePouchdb.updateDoc(producteur);
          //alert('producteur mis a jour')
        }
      });
    }
    
  }

  annuler(){
     // this.ajoutForm = false;

    if(!this.producteur_connu){
      let T: any = this.typologies;
      T = T.concat(this.typologies1);
      this.typologies = T;
      this.allTypologies = this.typologies;
      this.typologies1 = [];
      this.ajoutForm = false;
    }else{
      this.ajoutForm = false;
    }

    if(this.modifierFrom){
      this.modifierFrom = false;
      this.ajoutForm = false;
      this.detailTypologie = true;
      this.reinitFormModifier();
    } 
  }

  fermerDetail(){
      this.detailTypologie = false;
      //this.essai = {};
    
  }

  supprimer(typologie){
    let e: any = {};
    let alert = this.alertCtl.create({
      title: 'Suppression typologie',
      message: 'Etes vous sûr de vouloir supprimer cette typologie ?',
      inputs: [
        {
          type: 'checkbox',
          label: 'Supprimer définitivement!',
          value: 'oui',
          checked: false
          }
      ],
      buttons:[
        {
          text: 'Non',
          handler: () => console.log('suppression annulée')
 
        },
        {
          text: 'Oui',
          handler: (data) => {
            if(data.toString() === 'oui'){
              this.servicePouchdb.deleteReturn(typologie).then((res) => {
                //let e: any = {};
                //e.doc = essai;
                this.typologies.forEach((tp, i) => {
                  if(tp.doc._id === typologie._id){
                    this.typologies.splice(i, 1);
                  }
                  
                });
  
                this.detailTypologie = false;
                //this.navCtrl.pop();
              }, err => {
                console.log(err)
              }) ;
            }else{
              this.servicePouchdb.deleteDocReturn(typologie).then((res) => {
                //let e: any = {};
                //e.doc = essai;
                this.typologies.forEach((tp, i) => {
                  if(tp.doc._id === typologie._id){
                    this.typologies.splice(i, 1);
                  }
                  
                });
  
                this.detailTypologie = false;
                //this.navCtrl.pop();
              }, err => {
                console.log(err)
              }) ;
            }
            
          }
        }
      ]
    });

    alert.present();
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
    this.servicePouchdb.syncAvecToast();
    //this.pourCreerForm();
  }

  exportExcel(){

    let date = new Date();
    //let dateHeure = date.toLocaleDateString()+ date.toLocaleTimeString();// + date.getTime().toLocaleString();
    let nom = date.getDate().toString() +'_'+ (date.getMonth() + 1).toString() +'_'+ date.getFullYear().toString() +'_'+ date.getHours().toString() +'_'+ date.getMinutes().toString() +'_'+ date.getSeconds().toString();

    let blob = new Blob([document.getElementById('tableau').innerHTML], {
      //type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
      type: "text/plain;charset=utf-8"
      //type: 'application/vnd.ms-excel;charset=utf-8'
      //type: "application/vnd.ms-excel;charset=utf-8"
    });

    if(!this.platform.is('android')){
      FileSaver.saveAs(blob, 'typologie_'+nom+'.xls');
    }else{

      let fileDestiny: string = cordova.file.externalRootDirectory;
      this.file.writeFile(fileDestiny, 'typologie'+nom+'.xls', blob).then(()=> {
          alert("Fichier créé dans: " + fileDestiny);
      }).catch(()=>{
          alert("Erreur de création du fichier dans: " + fileDestiny);
      })
    }
  }

  onPrint(){
    let options: PrintOptions = {
        //name: 'Rapport',
        //printerId: 'printer007',
        duplex: true,
        landscape: true,
        grayscale: true
    };
    let content = document.getElementById('tableau').innerHTML;
    this.printer.print(content, options);
  }


   ionViewDidEnter(){
        //this.getEssais()
    this.servicePouchdb.remoteSaved.getSession((err, response) => {
        if (err) {
          // network error
          //this.events.publish('user:login');
          //alert('network')
          this.aProfile = false;
        } else if (!response.userCtx.name) {
          // nobody's logged in
          //this.events.publish('user:login');
          //alert('nobady')
          this.aProfile = false;
        } else {
          // response.userCtx.name is the current user
          //this.events.publish('user:login', response.userCtx);
          //alert(response.userCtx.name)
          this.aProfile = true;
        }
      });
    

    //setInterval(this.servicePouchdb.testConnexion(), 2000)
    if(!this.estInstancier){
      this.initForm();
      this.getTypologies();
      this.estInstancier = true;
    }
    
    //this.pourCreerForm();
    this.getInfoSimEmei();
    this.estInstancier = true;

    ///this.corrigerErreur();
    //this.servicePouchdb.findByTypeData()
  }

 /* ionViewDidLoad() { 

    this.initForm();

  }
*/

  choixLimit(){
    this.rechercher = true;
    if(this.selectedLimit !== 'Tous'){
      this.typologies = this.allTypologies.slice(0, this.selectedLimit);
      this.rechercher = false;
    }else{
      this.typologies = this.allTypologies;
      this.rechercher = false;
    }
    
  }

  choixLimit1(){
    this.rechercher = true;

    if(this.selectedLimit === 'Tous'){
      this.servicePouchdb.getPlageDocsRapide('fuma:typologie', 'fuma:typologie:\uffff').then((t) => {
        if(t){
            this.typologies = t;
            this.allTypologies = t;
            this.rechercher = false;
        }else{
          this.rechercher = false;
        }
      });

      }else{
        this.servicePouchdb.getPlageDocsRapideAvecLimit('fuma:typologie', 'fuma:typologie:\uffff', this.selectedLimit).then((t) => {
          if(t){
            this.typologies = t;
            this.allTypologies = t;
            this.rechercher = false;
          }else{
            this.rechercher = false;
          }

        });

    }
  }

   getTypologies(refresher: any = ''){
    if(refresher === ''){
      this.rechercher = true;
    }



    if(this.selectedLimit === 'Tous'){
      // this.servicePouchdb.getPlageDocs('fuma:essai', 'fuma:essai:\uffff').then((e) => {
        //   if(e){
            //cas ou le producteur est connu
            if(this.producteur_connu){
                this.servicePouchdb.getPlageDocsRapide('fuma:typologie:'+this.matricule_producteur, 'fuma:typologie:'+this.matricule_producteur+' \uffff').then((t) => {
                  if(t){
                    this.typologies = t;
                    this.allTypologies = t;
                    this.rechercher = false;
                    if(refresher !== ''){
                      refresher.complete();
                    }
                  }else{
                    this.rechercher = false;
                    if(refresher !== ''){
                      refresher.complete();
                    }
                  }

                });

              }else{

              this.servicePouchdb.getPlageDocsRapide('fuma:typologie', 'fuma:typologies:\uffff').then((t) => {
                if(t){
                    this.typologies = t;
                    this.allTypologies = t;
                    this.rechercher = false;
                    if(refresher !== ''){
                    refresher.complete();
                  }
                }else{
                  this.rechercher = false;
                  if(refresher !== ''){
                    refresher.complete();
                  }
                }
              });

        
         }
      }else{
        //cas ou le producteur est connu
        
        if(this.producteur_connu){
          this.servicePouchdb.getPlageDocsRapideAvecLimit('fuma:typologie:'+this.matricule_producteur, 'fuma:typologie:'+this.matricule_producteur+' \uffff', this.selectedLimit).then((t) => {
            if(t){
              this.typologies = t;
              //this.allEssais = e;
              this.rechercher = false;
              if(refresher !== ''){
                refresher.complete();
              }
            }else{
              this.rechercher = false;
              if(refresher !== ''){
                refresher.complete();
              }
            }
          });


          this.servicePouchdb.getPlageDocsRapide('fuma:typologie:'+this.matricule_producteur, 'fuma:typologie:'+this.matricule_producteur+' \uffff').then((t) => {
            if(t){
              this.allTypologies = t;
              //this.rechercher = false;
            }
          });
        }else{
  
         /* this.servicePouchdb.getPlageDocsRapideAvecLimit('fuma:typologie', 'fuma:typologie:\uffff', parseInt(this.selectedLimit)).then((ts) => {
            if(ts){
              alert(this.selectedLimit+'  '+ ts.length+' '+ts) 
              this.typologies = ts;
              this.rechercher = false;
              if(refresher !== ''){
                refresher.complete();
              }
            }else{
              this.rechercher = false;
              if(refresher !== ''){
                refresher.complete();
              }
            }

          });*/

          this.servicePouchdb.getPlageDocsRapide('fuma:typologie', 'fuma:typologie:\uffff').then((t) => {
            if(t){
              
              this.allTypologies = t;
              this.rechercher = false;
              this.choixLimit()
              if(refresher !== ''){
                refresher.complete();
              }
              //this.rechercher = false;
            }else{
              this.rechercher = false;
              if(refresher !== ''){
                refresher.complete();
              }
            }
          });
        }
      }

      this.chargerMembres();
  }


  editer(typologie, dbclick: boolean = false){
    if(!dbclick || (dbclick && this.user && this.user.roles && global.estAnimataire(this.user.roles))){
      this.grandTypologie = typologie;
      this.typologie1 = this.grandTypologie.data;
      //this.nom_producteur = this.typologie1.nom_producteur;
      this.today = this.typologie1.today;
      this.age = this.typologie1.age;
      this.matricule_producteur = this.typologie1.matricule_producteur;
      //this.
      this.nom_producteur = this.typologie1.nom_producteur;
      this.surnom_producteur = this.typologie1.surnom_producteur;
      this.departement_producteur = this.typologie1.departement_producteur;
      this.code_union = this.typologie1.code_union;
      this.classes = this.typologie1.classes;
      this.annee = this.typologie1.annee;
      this.ancienne_annee = this.typologie1.annee;
      //this.code = this.typologie1.code;
      
      this.question1 = this.typologie1.question1;
      this.classe1 = this.typologie1.classe1;
      this.reponse1 = this.typologie1.reponse1;
      this.age_typologie = this.typologie1.age_typologie;
      this.question2 = this.typologie1.question2;
      this.classe2 = this.typologie1.classe2;
      this.reponse2 = this.typologie1.reponse2;
      this.question3 = this.typologie1.question3;
      this.classe3 = this.typologie1.classe3;
      this.reponse3 = this.typologie1.reponse3;
      this.question4 = this.typologie1.question4;
      this.classe4 = this.typologie1.classe4;
      this.reponse4 = this.typologie1.reponse4;
      this.question5 = this.typologie1.question5;
      this.classe5 = this.typologie1.classe5;
      this.reponse5 = this.typologie1.reponse5;
      this.question6 = this.typologie1.question6;
      this.classe6 = this.typologie1.classe6;
      this.reponse6 = this.typologie1.reponse6;
      this.question7 = this.typologie1.question7;
      this.classe7 = this.typologie1.classe7;
      this.reponse7 = this.typologie1.reponse7;
      this.question8 = this.typologie1.question8;
      this.classe8 = this.typologie1.classe8;
      this.reponse8 = this.typologie1.reponse8;
      this.question8_1 = this.typologie1.question8_1;
      this.classe8_1 = this.typologie1.classe8_1;
      this.reponse8_1 = this.typologie1.reponse8_1;
      this.question8_2 = this.typologie1.question8_2;
      this.classe8_2 = this.typologie1.classe8_2;
      this.reponse8_2 = this.typologie1.reponse8_2;
      
      this.question9 = this.typologie1.question9;
      this.classe9 = this.typologie1.classe9;
      this.reponse9 = this.typologie1.reponse9;
      this.question9_1 = this.typologie1.question9_1;
      this.classe9_1 = this.typologie1.classe9_1;
      this.reponse9_1 = this.typologie1.reponse9_1;
      this.question9_2 = this.typologie1.question9_2;
      this.classe9_2 = this.typologie1.classe9_2;
      this.reponse9_2 = this.typologie1.reponse9_2;
      this.question10 = this.typologie1.question10;
      this.classe10 = this.typologie1.classe10;
      this.reponse10 = this.typologie1.reponse10;
      this.question10_1 = this.typologie1.question10_1;
      this.classe10_1 = this.typologie1.classe10_1;
      this.reponse10_1 = this.typologie1.reponse10_1;
      this.question10_2 = this.typologie1.question10_2;
      this.classe10_2 = this.typologie1.classe10_2;
      this.reponse10_2 = this.typologie1.reponse10_2;
      this.question11 = this.typologie1.question11;
      this.classe11 = this.typologie1.classe11;
      this.reponse11 = this.typologie1.reponse11;
      this.question12 = this.typologie1.question12;
      this.classe12 = this.typologie1.classe12;
      this.reponse12 = this.typologie1.reponse12;

      
     
      this.detailTypologie = false;

      this.ajoutForm = true;

      this.modifierFrom = true;
      this.producteur_connu = true;
      this.typologieAModifier = typologie;
   }
  }

  reinitFormModifier(){
    this.grandTypologie = '';
    this.typologie1 = [];
    //this.type_culture = '';
    this.classes = [];
    this.classe1 = '';
    this.reponse1 = '';
    this.age_typologie = '';
    this.classe2 = '';
    this.reponse2 ='';
    this.classe3 ='';
    this.reponse3 = '';
    this.classe4 = '';
    this.reponse4 ='';
    this.classe5 = "";
    this.reponse5 = '';
    this.classe6 = '';
    this.reponse6 = '';
    this.classe7 = '';
    this.reponse7 = '';
    this.classe8 = [];
    this.classe8_1 = '';
    this.classe8_2 = '';
    this.reponse8 = '';
    this.reponse8_1 = '';
    this.reponse8_2 = '';
    this.classe9 =  [];
    this.reponse9 = '';
    this.classe9_1 = '';
    this.reponse9_1 = '';
    this.classe9_2 = '';
    this.reponse9_2 = '';
    this.classe10 = '';
    this.reponse10 = '';
    this.classe10_1 = '';
    this.reponse10_1 = '';
    this.classe10_2 = '';
    this.reponse10_2 = '';
    this.classe11 = '';
    this.reponse11 = '';
    this.classe12 = '';
    this.reponse12 = '';
  }


   ajouter(){

      let maDate = new Date();
      this.today = this.createDate(maDate.getDate(), maDate.getMonth(), maDate.getFullYear());
      //this.type_culture = 'Mil';
      if(this.date_naissance){
        this.annee = maDate.getFullYear() -1;
        //let now =new Date();
        let date_naiss =  new Date(this.date_naissance);
        let d = this.createDate(1,0, this.annee);
        let date_de_reference = new Date(d);
        this.age = date_de_reference.getFullYear() - date_naiss.getFullYear();
      }
      
      this.id = this.generateId();
      this.ajoutForm = true;
      
  }


 detail(typologie){
    this.typologie = typologie;

    this.detailTypologie = true;

  }
  


  getItems(ev: any) {
    // Reset items back to all of the items
    //this.essais = this.allEssais;

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '' && val.trim() != 'FM-' && val.trim() != 'fm-') {
      this.typologies = this.allTypologies.filter((item, index) => {
        if(this.typeRecherche === 'matricule'){
          return (item.doc.data.matricule_producteur.toLowerCase().indexOf(val.toLowerCase()) > -1);
        }else if(this.typeRecherche === 'nom_membre'){
          return (item.doc.data.nom_producteur.toLowerCase().indexOf(val.toLowerCase()) > -1);
        }else if(this.typeRecherche === 'surnom_membre'){
          if(item.doc.data.surnom_producteur){
            return (item.doc.data.surnom_producteur.toLowerCase().indexOf(val.toLowerCase()) > -1);
          }
        }/*else if(this.typeRecherche === 'classe'){
          return (item.doc.data.nom_entree.toLowerCase().indexOf(val.toLowerCase()) > -1);
        }*/
      });
    }else{
      this.choixLimit();
    }
  } 
 


  itemSelected(ev: any){
    //alert(ev.code_produit);
    if(ev.matricule_Membre && ev.matricule_Membre != ''){
      this.matricule_producteur = ev.matricule_Membre;
      this.chargerTypologieMembre(this.matricule_producteur);
      this.nom_producteur = ev.nom_Membre;
      if(ev.surnom_Membre){
        this.surnom_producteur = ev.surnom_Membre;
        this.surnon_defini = true;
      }else{
        this.surnom_producteur = '';
        this.surnon_defini = false;
      }

      /*if(ev.date_naissance){
        this.date_naissance = ev.date_naissance;
        this.age_defini = true;
      }else{
        this.date_naissance = '';
        this.age_defini = false;
      }*/
      
      this.departement_producteur = ev.departement_nom;
      this.code_union = ev.code_union;
      this.code_op = ev.op_code;
      this.sex = ev.genre;
      if(ev.date_naissance && ev.date_naissance !== ''){
        
        this.date_naissance = ev.date_naissance;
        this.age_defini = true;
        //let now =new Date();
        let date_naiss = new Date(this.date_naissance);
        //let d = this.createDate(1,0, this.annee);
        //let date_de_reference = new Date(d);
        let date_de_reference = new Date();
        this.age = date_de_reference.getFullYear() - date_naiss.getFullYear();
        this.reponse1 = this.age;
        //alert(ev.date_naissance+' '+this.reponse1)
        this.getClasseReponse1(this.age)
      }else{
        this.date_naissance = '';
        this.age = '';
        this.reponse1 = '';
        this.classe1 = '';
        this.age_defini = false;
      }

      //alert(this.matricule_producteur + '  '+this.code_op)
      
    }

  }

}
