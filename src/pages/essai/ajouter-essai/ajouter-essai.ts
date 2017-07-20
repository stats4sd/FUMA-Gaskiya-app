import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, ToastController, IonicPage, ViewController, AlertController, MenuController, Events } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
//import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { PouchdbProvider } from '../../../providers/pouchdb-provider';
import { AutoCompletion } from '../../../providers/auto-completion';
import { Device } from '@ionic-native/device';
import { Sim } from '@ionic-native/sim';
//import { AjouterTraitementPage } from '../traitement/ajouter-traitement/ajouter-traitement';
//import { AjouterChampsPage } from '../../champs/ajouter-champs/ajouter-champs'
import { global } from '../../../global-variables/variable'

/* 
  Generated class for the AjouterEssai page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

@IonicPage()
@Component({
  selector: 'page-ajouter-essai',
  templateUrl: 'ajouter-essai.html'
})
export class AjouterEssaiPage {

  essaiForm: any;
  producteurs: any = [];
  selectedProducteur: any;
  nom_producteur: any;
  champs: any = [];
  selectedChamps: any;
  traitements: any = [];
  selectedTraitement: any;
  sites: any = [];
  selectedSite: any;
  site_producteur: any;
  sex_producteur: any;
  classe_producteur: any;
  villages: any = [];
  selectedVillage: any;
  village_producteur: any;
  selectedAnnee: any;
  allEssais: any;
  imei: any = '';
  phonenumber: any = '';
  superficie: any;
  type_sole: any;
  longitude: any;
  latitude: any;
  code_essai: any;
  matricule_producteur: any;
  //nom_producteur: any;
  superficie_tr: any;

  annees: any = [];
  aProfile: boolean = true;
  membre: any;
  annee: any;
  essais: any = [];

  
  constructor(public navCtrl: NavController, public zone: NgZone, public navParams: NavParams, public viewCtl: ViewController, public menuCtl: MenuController, public events: Events, public alertCtl: AlertController, public ServiceAutoCompletion: AutoCompletion, public sim: Sim, public device: Device, public toastCtl: ToastController, public servicePouchdb: PouchdbProvider, public formBuilder: FormBuilder) {

      //this.pourCreerForm();

     let maDate = new Date();
     let today = this.createDate(maDate.getDate(), maDate.getMonth(), maDate.getFullYear());
     this.essaiForm = this.formBuilder.group({
     // _id:[''],
      type:['essai'],
      code_essai:['', Validators.required],
      annee_essai: [maDate.getFullYear(), Validators.required],
      //today: [today],
      //id_site:['', , Validators.required],
      site_producteur:['', Validators.required],
      //id_village:['', , Validators.required],
      village_producteur:['', Validators.required], 
      matricule_producteur: [''],
      nom_producteur: ['', Validators.required],
      sex_producteur: ['', Validators.required],
      //id_classe_producteur: [''],
      classe_producteur: [''],
      //id_traitement: [''],
      code_traitement: [''],
      nom_entree: ['', Validators.required],
      id_champs: ['', Validators.required],
      superficie: ['', Validators.required],
      superficie_essai: ['', Validators.required],
      type_sole: ['', Validators.required],
      longitude:[''],
      latitude: [''],
      date_semis: [''],
      NPL: [''],
      gestion: [''],
      date_recolte: [''],
      NPR: [''],
      PDE: [''],
      observation: [''],
      objectif_essai: [''],
      effort_personnel: [false],
      estValide: [true],
      today: [today, Validators.required],
      deviceid: [''],
      imei: [''],
      phonenumber: [''],
      start: [maDate.toJSON()],
      end: ['']
    });
    
  }

  pourCreerForm(){
     this.menuCtl.enable(false, 'options');
      this.menuCtl.enable(false, 'connexion');
      this.menuCtl.enable(false, 'profile');
      
     /* this.events.subscribe('user:login', () => {
        this.servicePouchdb.remoteSaved.getSession((err, response) => {
          if (response.userCtx.name) {
            this.aProfile = true;
          }else{
            this.aProfile = false;
          }
        }, err => console.log(err));
      });*/
      
      if(this.navParams.data.matricule_producteur){
        this.matricule_producteur = this.navParams.data.matricule_producteur;
        this.nom_producteur = this. navParams.data.nom_producteur;
        this.membre = this.navParams.data.membre;
        //this.champs = this.navParams.data.champs;
        //this.traitements = this.navParams.data.traitements;
        this.annee = this.navParams.data.annee;
        this.producteurSelected(this.matricule_producteur)
        //this.chargerChampsProdConnu();
        //this.chargerTraitements();
        //this.producteurSelected(this.matricule_producteur)
      }else{
      //charger les producteurs
      let p: any = [];
      this.servicePouchdb.getPlageDocs('fuma:op:membre','fuma:op:membre:\uffff').then((mbrA) => {
        
          this.servicePouchdb.getPlageDocs('koboSubmission_fuma-op-membre','koboSubmission_fuma-op-membre\uffff').then((mbrK) => {
          this.producteurs = mbrA.concat(mbrK);

          this.producteurs.forEach((prod, index) => {
            p.push(prod.data); 
          });

          this.ServiceAutoCompletion.data = p;


          //this.ServiceAutoCompletion.data = this.producteurs;
          //this.allMembres = this.membres
      }, err => console.log(err));

      }, err => console.log(err)); 
    }
    
      let maDate = new Date();
      let today = this.createDate(maDate.getDate(), maDate.getMonth(), maDate.getFullYear());

      for(let i=0; i<=50; i++){
        this.annees.push(2000 + i)
      }
      this.annees.push('Tous');

      this.selectedAnnee = maDate.getFullYear();
      this.chargerTraitements(this.selectedAnnee)

  }

  chargerT(t){
    if(t.data){
      this.superficie_tr = t.data.superficie;
    }
    
  }

  dechargerT(){
     this.code_essai = this.generateId(this.matricule_producteur);
    this.selectedTraitement = '';
    this.superficie_tr = '';

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
    this.servicePouchdb.syncAvecToast(this.ionViewDidLoad());
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


  /*ionViewWillEnter() {
   // alert(this.navCtrl.getActive().component.name)
   this. chargerTraitements(this.selectedAnnee)
   if(this.matricule_producteur){
    this.chargerChamps(this.matricule_producteur);
   }
  }*/

  ionViewDidLoad() {
    this.pourCreerForm();

       // alert(this.navCtrl.getActive().component.name)
    //this.pourCreerForm();
    //  this. chargerTraitements(this.selectedAnnee)
    //if(this.matricule_producteur){
      //this.chargerChamps(this.matricule_producteur);
      //this.producteurSelectedProdConnu(this.matricule_producteur)
      //this.chargerChampsProdConnu();
      //this.chargerTraitementsProdConnu();
    //}else{
    //  this. chargerTraitements(this.selectedAnnee)
    //}
    
    
      /*this.servicePouchdb.remoteSaved.getSession((err, response) => {
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
      }); */

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

      this.servicePouchdb.getPlageDocs('fuma:essai','fuma:essai:\uffff').then((e) => {
        if(e){
            this.allEssais = e;
        }
        }, err => console.log(err)); 
  }


  /*ionViewDidEnter() {
   // alert(this.navCtrl.getActive().component.name)
   //this. chargerTraitements(this.selectedAnnee)
   if(this.matricule_producteur){
    this.chargerChamps(this.matricule_producteur);
   }
  }
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

    this.servicePouchdb.getPlageDocs('fuma:essai','fuma:essai:\uffff').then((e) => {
       if(e){
          this.allEssais = e;
       }
      }, err => console.log(err)); 

      *if(this.matricule_producteur){
        this.producteurSelected(this.matricule_producteur)
      }  * 
  } */

 /* ionViewWillEnter(){
    if(this.matricule_producteur){
        this.producteurSelected(this.matricule_producteur)
      }
  }*/

    itemSelected(ev: any){
    //alert(ev.code_produit);
    this.matricule_producteur = ev.matricule_Membre
    this.chargerChamps(ev.matricule_Membre);
    this.code_essai = this.generateId(ev.matricule_Membre);

    this.producteurs.forEach((prod, index) => {
      if(prod.data.matricule_Membre === ev.matricule_Membre){
        this.selectedProducteur = prod;
        //nom producteur
        this.nom_producteur = prod.data.nom_Membre;

        //sex producteur
        this.sex_producteur = prod.data.genre;
        
        //site
        if((prod.data.commune != 'AUTRE') && (!prod.data.commune_nom)){
          this.site_producteur = prod.data.commune
        }else if(prod.data.commune != 'AUTRE' && prod.data.commune_nom){
          this.site_producteur = prod.data.commune_nom;
        }else{
          this.site_producteur = prod.data.commune_autre;
        }

        //village
        if((prod.data.village != 'AUTRE') && (!prod.data.village_nom)){
          this.village_producteur = prod.data.village
        }else if(prod.data.village != 'AUTRE' && prod.data.village_nom){
          this.village_producteur = prod.data.village_nom;
        }else{
          this.village_producteur = prod.data.village_autre;
        }

        //classe
        if((prod.data.classe != 'AUTRE') && (!prod.data.classe_nom)){
          this.classe_producteur = prod.data.classe
        }else if(prod.data.classe != 'AUTRE' && prod.data.classe_nom){
          this.classe_producteur = prod.data.classe_nom;
        }else{
          this.classe_producteur = prod.data.classe_autre
        }
      }
    });
  }

   producteurSelectedProdConnu(matricule){
    //alert(ev.code_produit);

    
    this.code_essai = this.generateId(matricule);

    
        this.selectedProducteur = this.membre;
        //nom producteur
        this.nom_producteur = this.membre.data.nom_Membre;

        //sex producteur
        this.sex_producteur = this.membre.data.genre;
        
        //site
        if((this.membre.data.commune != 'AUTRE') && (!this.membre.data.commune_nom)){
          this.site_producteur = this.membre.data.commune
        }else if(this.membre.data.commune != 'AUTRE' && this.membre.data.commune_nom){
          this.site_producteur = this.membre.data.commune_nom;
        }else{
          this.site_producteur = this.membre.data.commune_autre;
        }

        //village
        if((this.membre.data.village != 'AUTRE') && (!this.membre.data.village_nom)){
          this.village_producteur = this.membre.data.village
        }else if(this.membre.data.village != 'AUTRE' && this.membre.data.village_nom){
          this.village_producteur = this.membre.data.village_nom;
        }else{
          this.village_producteur = this.membre.data.village_autre;
        }

        //classe
        if((this.membre.data.classe != 'AUTRE') && (!this.membre.data.classe_nom)){
          this.classe_producteur = this.membre.data.classe
        }else if(this.membre.data.classe != 'AUTRE' && this.membre.data.classe_nom){
          this.classe_producteur = this.membre.data.classe_nom;
        }else{
          this.classe_producteur = this.membre.data.classe_autre
        }
  }

    producteurSelected(matricule){
    //alert(ev.code_produit);

    this.chargerChamps(matricule);
    this.code_essai = this.generateId(matricule);

    
        this.selectedProducteur = this.membre;
        //nom producteur
        this.nom_producteur = this.membre.data.nom_Membre;

        //sex producteur
        this.sex_producteur = this.membre.data.genre;
        
        //site
        if((this.membre.data.commune != 'AUTRE') && (!this.membre.data.commune_nom)){
          this.site_producteur = this.membre.data.commune
        }else if(this.membre.data.commune != 'AUTRE' && this.membre.data.commune_nom){
          this.site_producteur = this.membre.data.commune_nom;
        }else{
          this.site_producteur = this.membre.data.commune_autre;
        }

        //village
        if((this.membre.data.village != 'AUTRE') && (!this.membre.data.village_nom)){
          this.village_producteur = this.membre.data.village
        }else if(this.membre.data.village != 'AUTRE' && this.membre.data.village_nom){
          this.village_producteur = this.membre.data.village_nom;
        }else{
          this.village_producteur = this.membre.data.village_autre;
        }

        //classe
        if((this.membre.data.classe != 'AUTRE') && (!this.membre.data.classe_nom)){
          this.classe_producteur = this.membre.data.classe
        }else if(this.membre.data.classe != 'AUTRE' && this.membre.data.classe_nom){
          this.classe_producteur = this.membre.data.classe_nom;
        }else{
          this.classe_producteur = this.membre.data.classe_autre
        }
   

   /* this.producteurs.forEach((prod, index) => {
      if(prod.data.matricule_Membre === matricule){
        this.selectedProducteur = prod;
        //nom producteur
        this.nom_producteur = prod.data.nom_Membre;

        //sex producteur
        this.sex_producteur = prod.data.genre;
        
        //site
        if((prod.data.commune != 'AUTRE') && (!prod.data.commune_nom)){
          this.site_producteur = prod.data.commune
        }else if(prod.data.commune != 'AUTRE' && prod.data.commune_nom){
          this.site_producteur = prod.data.commune_nom;
        }else{
          this.site_producteur = prod.data.commune_autre;
        }

        //village
        if((prod.data.village != 'AUTRE') && (!prod.data.village_nom)){
          this.village_producteur = prod.data.village
        }else if(prod.data.village != 'AUTRE' && prod.data.village_nom){
          this.village_producteur = prod.data.village_nom;
        }else{
          this.village_producteur = prod.data.village_autre;
        }

        //classe
        if((prod.data.classe != 'AUTRE') && (!prod.data.classe_nom)){
          this.classe_producteur = prod.data.classe
        }else if(prod.data.classe != 'AUTRE' && prod.data.classe_nom){
          this.classe_producteur = prod.data.classe_nom;
        }else{
          this.classe_producteur = prod.data.classe_autre
        }
      }
    });*/
  }

  producteurSelected1(matricule){
    //alert(ev.code_produit);

    //this.chargerChamps(matricule);
    this.code_essai = this.generateId(matricule);

    
        this.selectedProducteur = this.membre;
        //nom producteur
        this.nom_producteur = this.membre.data.nom_Membre;

        //sex producteur
        this.sex_producteur = this.membre.data.genre;
        
        //site
        if((this.membre.data.commune != 'AUTRE') && (!this.membre.data.commune_nom)){
          this.site_producteur = this.membre.data.commune
        }else if(this.membre.data.commune != 'AUTRE' && this.membre.data.commune_nom){
          this.site_producteur = this.membre.data.commune_nom;
        }else{
          this.site_producteur = this.membre.data.commune_autre;
        }

        //village
        if((this.membre.data.village != 'AUTRE') && (!this.membre.data.village_nom)){
          this.village_producteur = this.membre.data.village
        }else if(this.membre.data.village != 'AUTRE' && this.membre.data.village_nom){
          this.village_producteur = this.membre.data.village_nom;
        }else{
          this.village_producteur = this.membre.data.village_autre;
        }

        //classe
        if((this.membre.data.classe != 'AUTRE') && (!this.membre.data.classe_nom)){
          this.classe_producteur = this.membre.data.classe
        }else if(this.membre.data.classe != 'AUTRE' && this.membre.data.classe_nom){
          this.classe_producteur = this.membre.data.classe_nom;
        }else{
          this.classe_producteur = this.membre.data.classe_autre
        }
  }


    chargerChamps(matricule){
      let chmp: any = [];

      this.servicePouchdb.getPlageDocs('fuma:champs:'+matricule, 'fuma:champs:'+matricule+' \uffff').then((c) => {
          if(c){
            /*c.forEach((ch, i) => {
              if(ch.data.matricule_producteur === matricule){
                chmp.push(ch);
              }
            });*/
            this.champs = c;
            if(this.champs.length <= 0){
              //alert('Avertissement: Ce producteur n\'a aucun champs!') 
              let alert = this.alertCtl.create({
                title: 'Avertissement!',
                message: 'Ce producteur n\'a aucun champs.',
                buttons: [
                  {
                    text: 'Définir champs',
                    handler:  () => {
                      this.navCtrl.push('ChampsPage', {'matricule_producteur': this.matricule_producteur, 'nom_producteur': this.nom_producteur, 'membre': this.membre});
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
        });

      /*this.servicePouchdb.getPlageDocs('fuma:champs', 'fuma:champs:\uffff').then((c) => {
          if(c){
            c.forEach((ch, i) => {
              if(ch.data.matricule_producteur === matricule){
                chmp.push(ch);
              }
            });
            this.champs = chmp;
            if(this.champs.length <= 0){
              //alert('Avertissement: Ce producteur n\'a aucun champs!') 
              let alert = this.alertCtl.create({
                title: 'Avertissement!',
                message: 'Ce producteur n\'a aucun champs.',
                buttons: [
                  {
                    text: 'Définir champs',
                    handler:  () => {
                      this.navCtrl.push('AjouterChampsPage', {'matricule_producteur': this.matricule_producteur});
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
        });*/
    }

    chargerChampsProdConnu(){
        
      if(this.champs.length <= 0){
        //alert('Avertissement: Ce producteur n\'a aucun champs!') 
        let alert = this.alertCtl.create({
          title: 'Avertissement!',
          message: 'Ce producteur n\'a aucun champs.',
          buttons: [
            {
              text: 'Définir champs',
              handler:  () => {
                this.navCtrl.push('AjouterChampsPage', {'matricule_producteur': this.matricule_producteur});
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


    chargerTraitements(annee){
      let trm: any = [];
      this.servicePouchdb.getPlageDocs('fuma:traitement', 'fuma:traitement:\uffff').then((t) => {
          if(t){

             t.map((row) => {
          
                if(row.data.annee === annee){
                    trm.push(row);
                  }
            });
            /*t.forEach((tr, i) => {
              if(tr.data.annee === annee){
                trm.push(tr);
              }
            })*/
            this.traitements = trm;

            if(this.traitements.length <= 0){
              let alert = this.alertCtl.create({
                title: 'Avertissement',
                message: 'Le traitement pour l\'années '+annee+' n\'est pas défini!',
                buttons: [
                  {
                    text: 'Définir traitement',
                    handler:  () => {
                      this.navCtrl.push('AjouterTraitementPage', {'annee': annee});
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
        });
    }

    chargerTraitementsProdConnu(){
     
            if(this.traitements.length <= 0){
              let alert = this.alertCtl.create({
                title: 'Avertissement',
                message: 'Le traitement pour l\'années '+this.annee+' n\'est pas défini!',
                buttons: [
                  {
                    text: 'Définir traitement',
                    handler:  () => {
                      this.navCtrl.push('AjouterTraitementPage', {'annee': this.annee});
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

    chargerInfoChamps(champs){
      if(champs){
        this.type_sole = champs.type_sole;
        this.superficie = champs.superficie;
        this.longitude = champs.longitude;
        this.latitude = champs.latitude;
        //this.nom_champs = champs.nom_champs;
      }
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
    var Id= matricule+' '+'ES-'+/*+pays+'-'+region+'-'+department+'-'+commune +'-' +village+ */+randomString 
    return Id;
  }

    ajouter(){
    let date = new Date();
    let essai = this.essaiForm.value;
    //traitement.matricule_producteur = this.selectedProducteur.data.matricule_Membre;
    //champs.nom_producteur = this.selectedProducteur.data.nom_Membre;
    /*if(this.verifierUniqueNon(traitement) === 0){
      alert('Le nom et code du traitement doivent être uniques par an!');
    }else{*/
      essai.code_traitement = this.selectedTraitement.data.code_traitement;
      essai.nom_entree = this.selectedTraitement.data.nom_entree;
      essai.id_champs = this.selectedChamps.data.id_champs;
      essai.nom_champs = this.selectedChamps.data.nom;
      essai.matricule_producteur = this.selectedProducteur.data.matricule_Membre;
      essai.deviceid = this.device.uuid;
      essai.phonenumber = this.phonenumber;
      essai.imei = this.imei; 
      
      //union._id = 'fuma'+ id;
      essai.end = date.toJSON();
      //essai.code_essai = id;
      //champs.id_champs = id;
     
      let essaiFinal: any = {};
      essaiFinal._id = 'fuma'+':essai:'+ this.code_essai;
      essaiFinal.data = essai
      let EF: any;
      this.servicePouchdb.createDocReturn(essaiFinal).then((res) => {
       /* let toast = this.toastCtl.create({
          message: 'Essai bien enregistré!',
          position: 'top',
          duration: 1000
        });*/
         
        
        //alert(res.rev)
        essaiFinal._rev = res.rev;
        
        //this.viewCtl.dismiss(essaiFinal);
       // this.zone.run(() => {
          this.essais.push(essaiFinal)
        //});

        this.dechargerT()
        
        //toast.present();
      });
      

      //this.navCtrl.pop();
      //toast.present();
      

   // }
    
  }

  annuler(){
    //this.navCtrl.pop();
    if(this.essais.length <= 0){
      this.viewCtl.dismiss();
    }else{
      //this.essais.push(this.essais)
      this.viewCtl.dismiss(this.essais);
    }
    
  }

  back(){
    //this.viewCtl.dismiss();
     if(this.essais.length <= 0){
      this.viewCtl.dismiss();
    }else{
      //this.essais.push(this.essais)
      this.viewCtl.dismiss(this.essais);
    }
  }

}
