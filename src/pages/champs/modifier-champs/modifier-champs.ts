import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, IonicPage } from 'ionic-angular';
import { Validators, FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { PouchdbProvider } from '../../../providers/pouchdb-provider';
import { Geolocation } from '@ionic-native/geolocation'

/*
  Generated class for the ModifierChamps page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

@IonicPage()
@Component({
  selector: 'page-modifier-champs',
  templateUrl: 'modifier-champs.html'
})
export class ModifierChampsPage {

  champsForm: any;
  grandChamps: any;
  champs: any;
  typeSoles: any = [];
  producteurs: any = [];
  selectedTypeSole: any;
  selectedProducteur: any = [];
  nom_producteur: any = '';
  allChamps: any;
  id_champs: any;
  ancienMatriculeProducteur: any;
  longitude: any;
  latitude: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtl: ToastController, public geolocation: Geolocation, public servicePouchdb: PouchdbProvider, public formBuilder: FormBuilder, public storage: Storage) {
    this.grandChamps = this.navParams.data.champ;
    this.champs = this.grandChamps.data;

    this.selectedProducteur = this.champs.matricule_producteur;
    this.nom_producteur = this.champs.nom_producteur;
    this.ancienMatriculeProducteur = this.champs.matricule_producteur;
    this.selectedTypeSole = this.champs.type_sole;
    this.id_champs = this.champs.id_champs;
    this.longitude = this.champs.longitude;
    this.latitude = this.champs.latitude;
    
    this.servicePouchdb.getPlageDocs('fuma:type-sole','fuma:type-sole:\uffff').then((ts) => {
          this.typeSoles = ts;
      }, err => console.log(err)); 
      let p: any = [];
      this.servicePouchdb.getPlageDocs('fuma:op:membre','fuma:op:membre:\uffff').then((mbrA) => {
        this.servicePouchdb.getPlageDocs('koboSubmission_fuma-op-membre','koboSubmission_fuma-op-membre\uffff').then((mbrK) => {
        this.producteurs = mbrA.concat(mbrK);
      }, err => console.log(err));
    }, err => console.log(err)); 

    
    this.champsForm = this.formBuilder.group({
      id_champs:[this.champs.id_champs],
      nom: [this.champs.nom, Validators.required],
      longitude: [this.champs.longitude],
      latitude: [this.champs.latitude],
      superficie: [this.champs.superficie, Validators.required],
      type_sole: [this.champs.type_sole, Validators.required],
      matricule_producteur: [this.champs.matricule_producteur],
      nom_producteur: [this.champs.nom_producteur, Validators.required],
    });
    
  }

  getNomProducteur(){
    this.producteurs.forEach((p, i) => {
      if(p.data.matricule_Membre === this.selectedProducteur){
        this.nom_producteur = p.data.nom_Membre;

         if(this.ancienMatriculeProducteur !== p.data.matricule_Membre){
            let id = this.generateId(p.data.matricule_Membre);
            this.id_champs = id;
          }else{
            this.id_champs = this.ancienMatriculeProducteur;
          }
      } 
    });

    
  }

  msg(msg: string = ''){
    let toast = this.toastCtl.create({
      message: msg,
      position: 'top',
      duration: 3000
    });

    toast.present();
  }


    getPosition(){
    this.msg('Obtention des coordonnées en cours...');
    this.geolocation.getCurrentPosition().then((resp) => {
      this.longitude = resp.coords.longitude;
      this.latitude = resp.coords.latitude;
      this.msg('Coordonnées obtenues avec succes!')
    }, err => {
      this.msg('Une erreur c\'est produite lors de l\obtention des coordonnées. \nVeuillez reéssayer plus tard!')
      console.log('')
    });
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad ModifierChampsPage');
  }

  generateId(matricule){
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
    var Id= matricule+' '+/*+pays+'-'+region+'-'+department+'-'+commune +'-' +village+ */+randomString 
    return Id;
  }

   modifier(){
      //  let date = new Date();
    let champ = this.champsForm.value;

    this.champs.id_champs = champ.id_champs;
    this.champs.nom = champ.nom;
    this.champs.longitude = champ.longitude;
    this.champs.latitude = champ.latitude;
    this.champs.superficie = champ.superficie;
    this.champs.type_sole = champ.type_sole;
    this.champs.matricule_producteur = champ.matricule_producteur;
    this.champs.nom_producteur = champ.nom_producteur;
    
    /*if(this.verifierUniqueNon(typeSole, this.grandTypeSole._id) === 0){
      alert('Le nom du type de sole doit être uniques!');
    }else{*/
      this.grandChamps.data = this.champs;
      this.servicePouchdb.updateDoc(this.grandChamps);
    
      let toast = this.toastCtl.create({
        message: 'Champs bien sauvegardée!',
        position: 'top',
        duration: 2000
      });

      this.navCtrl.pop();
      toast.present();
      

   // }
  }

  annuler(){
    this.navCtrl.pop();
  }


}
