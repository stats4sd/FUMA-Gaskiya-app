import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController, ViewController, ModalController, IonicPage } from 'ionic-angular';
import { PouchdbProvider } from '../../providers/pouchdb-provider';
//import { AjouterChampsPage } from './ajouter-champs/ajouter-champs';
//import { DetailChampsPage } from './detail-champs/detail-champs';
//import { TypeSolePage } from '../type-sole/type-sole';
import { Storage } from '@ionic/storage';
import { Validators, FormBuilder } from '@angular/forms';
import { AutoCompletion } from '../../providers/auto-completion';
import { Device } from '@ionic-native/device';
import { Sim } from '@ionic-native/sim';
import { Geolocation } from '@ionic-native/geolocation'

/*
  Generated class for the Champs page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

@IonicPage()
@Component({
  selector: 'page-champs',
  templateUrl: 'champs.html'
})
export class ChampsPage {

  selectedTypeSole: any = 'Tous';
  champs: any = [];
  champs1: any = [];
  allChamps: any = [];
  typeSoles: any = [];
  typeSoles1: any = [];
  typeSoleTous: any = {'doc':{'data': {'nom': 'Tous'}}};
  matricule_producteur: any;
  matricule_producteur1: any;
  nom_producteur: any;
  membre: any;
  typeSolesSelected: any = [];
  typeRecherche: any = 'matricule';

  champsForm: any;
  producteurs: any = [];
  selectedProducteur: any = {};
  imei: any = '';
  phonenumber: any = '';
  longitude: any ='';
  latitude: any = '';
  nom: any = '';
  type_sole: any;
  superficie: any = '';
  code_champs: any = '';
  ajoutForm: boolean = false;
  a_matricule: boolean = false;


  constructor(public navCtrl: NavController, public viewCtl: ViewController, public toastCtl: ToastController, public formBuilder: FormBuilder, public modelCtl: ModalController, public ServiceAutoCompletion: AutoCompletion, public sim: Sim, public geolocation: Geolocation, public device: Device,  public navParams: NavParams, public storage: Storage, public servicePouchdb: PouchdbProvider, public alertCtl: AlertController) {
    if(this.navParams.data.matricule_producteur){
      this.matricule_producteur = this.navParams.data.matricule_producteur;
      this.matricule_producteur1 = this.navParams.data.matricule_producteur;
      this.nom_producteur = this.navParams.data.nom_producteur;
      this.membre = this.navParams.data.membre;
      //this.viewCtl.showBackButton(false)
      
      this.selectedProducteur = this.navParams.data.membre
      this.generecodeChamps(this.selectedProducteur.data.matricule_Membre);
      this.a_matricule = true;
      
    }
  }

  typeRechercheChange(){
    this.champs = this.allChamps;
  }

  dismiss(){
    this.viewCtl.dismiss(this.champs);
    this.a_matricule = false;
  }

initForm(){
  if(!this.matricule_producteur1){
      let p: any = [];
    this.servicePouchdb.getPlageDocsRapide('fuma:op:membre','fuma:op:membre:\uffff').then((mbrA) => {
      
        this.servicePouchdb.getPlageDocsRapide('koboSubmission_fuma-op-membre','koboSubmission_fuma-op-membre\uffff').then((mbrK) => {
        this.producteurs = mbrA.concat(mbrK);

       
        this.producteurs.forEach((prod, index) => {
          p.push(prod.doc.data); 
        });

        this.ServiceAutoCompletion.data = p;
        //this.ServiceAutoCompletion.data = this.producteurs;
        //this.allMembres = this.membres
    }, err => console.log(err));

    }, err => console.log(err)); 
  }
    //this.chergerTypeSole()
    let maDate = new Date();
    let today = this.createDate(maDate.getDate(), maDate.getMonth(), maDate.getFullYear());

    this.champsForm = this.formBuilder.group({
     // _id:[''],
      type:['champs'],
      nom: ['', Validators.required],
      longitude: [''],
      latitude: [''],
      superficie: ['', Validators.required],
      type_sole: ['', Validators.required],
      matricule_producteur: [''],
      nom_producteur: ['', Validators.required],
      today: [today, Validators.required],
      deviceid: [''],
      imei: [''],
      phonenumber: [''],
      start: [maDate.toJSON()],
      end: ['']
    });
    
  }

 /* chergerTypeSole(){
    
    this.servicePouchdb.getPlageDocs('fuma:type-sole','fuma:type-sole:\uffff').then((ts) => {
              this.typeSoles = ts;
    }, err => console.log(err)); 

    
  }*/

  msg(msg: string = ''){
    let toast = this.toastCtl.create({
      message: msg,
      position: 'top',
      duration: 3000,
      showCloseButton: true,
      closeButtonText: 'ok',
      dismissOnPageChange: true
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

  getInfoSimEmei(){
 // this.chergerTypeSole();
  
    this.sim.getSimInfo().then(
      (info) => {
        if(info.cards.length > 0){
          info.cards.forEach((infoCard, i) => {
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

    /*this.servicePouchdb.getPlageDocs('fuma:champs','fuma:champs:\uffff').then((ch) => {
        this.allChamps = ch;

      }, err => console.log(err));   */   
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
    var Id= matricule+' '+'CH-'+/*+pays+'-'+region+'-'+department+'-'+commune +'-' +village+ */+randomString 
    return Id;
  }

  itemSelected(ev: any){
    //alert(ev.code_produit);
    this.producteurs.forEach((prod, index) => {
      prod = prod.doc;
      if(prod.doc.data.matricule_Membre === ev.matricule_Membre){
        this.selectedProducteur = prod.doc;
        this.nom_producteur = prod.doc.data.nom_Membre;
        this.generecodeChamps(this.selectedProducteur.data.matricule_Membre)
      }
    });
  }

  /*producteurSelected(matricule){
    this.nom_producteur = prod.data.nom_Membre;
    //alert(ev.code_produit);
   /* this.producteurs.forEach((prod, index) => {
      if(prod.data.matricule_Membre === matricule){
        this.selectedProducteur = prod;
        this.nom_producteur = prod.data.nom_Membre;
      }
    });/*
  }*/

  dechanfChamps(){
    this.longitude ='';
    this.latitude = '';
    this.nom = '';
    this.type_sole = '';
    this.superficie = '';
    this.generecodeChamps(this.selectedProducteur.data.matricule_Membre)
  }
 
  generecodeChamps(matricule){
    this.code_champs = this.generateId(matricule);
  }

  ajouterChamps(){
    let date = new Date();
    let champs = this.champsForm.value;
    champs.matricule_producteur = this.selectedProducteur.data.matricule_Membre;
    //champs.nom_producteur = this.selectedProducteur.data.nom_Membre;
    champs.deviceid = this.device.uuid;
    champs.phonenumber = this.phonenumber;
    champs.imei = this.imei;
    
    //union._id = 'fuma'+ id;
    champs.end = date.toJSON();
    champs.id_champs = this.code_champs;

    let champsFinal: any = {};
    champsFinal._id = 'fuma'+':champs:'+ this.code_champs;
    champsFinal.data = champs
    this.servicePouchdb.createDocReturn(champsFinal).then((res) => {

      /*let toast = this.toastCtl.create({
        message: 'Champs bien enregistré!',
        position: 'top',
        duration: 1000
      });*/

       champsFinal._rev = res.rev;
       let c: any = {};
       c.doc = champsFinal;

       if(this.matricule_producteur1){
          this.champs1.push(c);
           this.dechanfChamps()
         }else{
           this.champs.push(c);
           this.ajoutForm = false;
         }

       //this.champs.push(champsFinal)
        //});

        
    });
    
    

    //this.navCtrl.pop();
    //toast.present();
    

  }

  /*annuler(){
    this.navCtrl.pop();
  }*/

  annuler(){
    //this.navCtrl.pop();
     if(this.matricule_producteur1){
      let C: any = this.champs;
      C = C.concat(this.champs1);
      this.champs = C;
      this.allChamps = this.champs;
    this.ajoutForm = false;
    this.champs1 = [];
    }else{
      this.ajoutForm = false;
    }
    
  }



  ionViewDidEnter() {

    this.servicePouchdb.getPlageDocsRapide('fuma:type-sole','fuma:type-sole:\uffff').then((ts) => {
        if(ts){
          this.typeSoles = ts;
          this.typeSoles1 = ts;
          this.typeSoles.push(this.typeSoleTous);
        }
      });

    if(this.selectedTypeSole === 'Tous'){
     // this.unions = [];
     // this.servicePouchdb.getPlageDocs('fuma:champs','fuma:champs:\uffff').then((c) => {
       // if(c){
          if(this.matricule_producteur1){
            this.servicePouchdb.getPlageDocsRapide('fuma:champs:'+this.matricule_producteur1, 'fuma:champs:'+this.matricule_producteur1+' \uffff').then((c) => {
              this.champs = c;
              this.allChamps = c;
            })
            /*let chmps: any = [];
            c.forEach((ch, i) => {
              if(ch.data.matricule_producteur === this.matricule_producteur){
                chmps.push(ch);
              }
            });

            this.champs = chmps;
            this.allChamps = chmps;*/
          }else {
            this.servicePouchdb.getPlageDocsRapide('fuma:champs','fuma:champs:\uffff').then((c) => {
              if(c){
                this.champs = c;
                this.allChamps = c;
              }
            });
            
          }
     //   }
     // });
    }else{
     // this.unions = [];
      this.servicePouchdb.getPlageDocsRapide('fuma:champs','fuma:champs:\uffff').then((c) => {
        if(c){
          let ch: any = [];
          c.forEach((cp, index) => {
            if(cp.doc.data.type_sole === this.selectedTypeSole){
              ch.push(cp);
            }
          });

          if(this.matricule_producteur1){
            let chmps: any = [];
            ch.forEach((chm, i) => {
              if(chm.doc.data.matricule_producteur === this.matricule_producteur1){
                chmps.push(chm);
              }
            });

            this.champs = chmps;
            this.allChamps = chmps;
          }else {
            this.champs = ch;
            this.allChamps = ch;
          }

          //this.champs = ch;
          //this.allChamps = ch;
        }
      });
    }
    //this.chergerTypeSole();
    this.initForm();
    this.getInfoSimEmei();
  }

  chergerTypeSole(){
    this.servicePouchdb.getPlageDocsRapide('fuma:type-sole','fuma:type-sole:\uffff').then((ts) => {
          this.typeSolesSelected = ts;
    }, err => console.log(err)); 
  }

  choixTypeSole(){
    if(this.selectedTypeSole === 'Tous'){
     // this.unions = [];
      this.servicePouchdb.getPlageDocsRapide('fuma:champs','fuma:champs:\uffff').then((c) => {
        if(c){ 
          if(this.matricule_producteur1){
            let chmps: any = [];
            c.forEach((ch, i) => {
              if(ch.doc.data.matricule_producteur1 === this.matricule_producteur1){
                chmps.push(ch);
              }
            });

            this.champs = chmps;
            this.allChamps = chmps;
          }else {
            this.champs = c;
            this.allChamps = c;
          }
          //this.champs = c;
          //this.allChamps = c;
        }
      });
    }else{
     // this.unions = [];
      this.servicePouchdb.getPlageDocsRapide('fuma:champs','fuma:champs:\uffff').then((c) => {
        if(c){
          let ch: any = [];
          c.forEach((cp, index) => {
            if(cp.doc.data.type_sole === this.selectedTypeSole){
              ch.push(cp);
            }
          });

          if(this.matricule_producteur1){
            let chmps: any = [];
            ch.forEach((chm, i) => {
              if(chm.doc.data.matricule_producteur1 === this.matricule_producteur1){
                chmps.push(chm);
              }
            });

            this.champs = chmps;
            this.allChamps = chmps;
          }else {
            this.champs = ch;
            this.allChamps = ch;
          }
          //this.champs = ch;
          //this.allChamps = ch;
        }
      });
    }   

  }

   ajouter(){
    if(this.typeSoles1.length > 0){
      this.ajoutForm = true;
     /* if(this.matricule_producteur){
        let model = this.modelCtl.create('AjouterChampsPage', {'matricule_producteur': this.matricule_producteur, 'nom':this.nom_producteur, 'membre': this.membre});
        model.onDidDismiss(champs => {
        if (champs) {
          let C: any = this.champs;
          C = C.concat(champs);
         // this.allEssais.push(essai);
         // this.zone.run(() => {
            this.champs = C;
            this.allChamps = this.champs;
            //this.events.publish('ajout-essai', {'essai': essai});
          //});
          
          
        }
      });
      model.present();

     }else{
         let model = this.modelCtl.create('AjouterChampsPage');
         model.onDidDismiss(champs => {
        if (champs) {
          let C: any = this.champs;
          C = C.concat(champs);
         // this.allEssais.push(essai);
         // this.zone.run(() => {
            this.champs = C;
            this.allChamps = this.champs;
            //this.events.publish('ajout-essai', {'essai': essai});
          //});
          
          
        }
      });
      model.present();

     }*/
      
    }else{
      let alert = this.alertCtl.create({
        title: 'Erreur',
        message: 'Vous devez d\'abord définir les types de soles!',
        buttons: [
          {
            text: 'Définir types soles',
            handler:  () => {
              this.navCtrl.push('TypeSolePage');
            }        
          },
          {
            text: 'Annuler',
            handler: () => console.log('annuler')
          }
        ]
      });

      alert.present();
    }
    
  }

  detail(champ){
    this.navCtrl.push('DetailChampsPage', {'champ': champ});
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.champs = this.allChamps;

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.champs = this.champs.filter((item) => {
        if(this.typeRecherche === 'matricule'){
          return (item.doc.data.matricule_producteur.toLowerCase().indexOf(val.toLowerCase()) > -1);
        }else if(this.typeRecherche === 'nom'){
          return (item.doc.data.nom.toLowerCase().indexOf(val.toLowerCase()) > -1);
        }else if(this.typeRecherche === 'nom_producteur'){
          return (item.doc.data.nom_producteur.toLowerCase().indexOf(val.toLowerCase()) > -1);
        }
        
      });
    }
  }
 
}
