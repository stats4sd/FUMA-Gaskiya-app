import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController, Platform, IonicPage, ModalController, MenuController, Events } from 'ionic-angular';
import { PouchdbProvider } from '../../providers/pouchdb-provider';
//import { AjouterUnionPage } from './ajouter-union/ajouter-union';
//import { DetailUnionPage } from './detail-union/detail-union';
import { Storage } from '@ionic/storage';
//import { ConfLocaliteEnquetePage } from '../configuration/conf-localite-enquete/conf-localite-enquete';
//import { ChoixSourceAjoutUnionPage } from './choix-source-ajout-union/choix-source-ajout-union';
//import { CollectPage } from '../tabs/collect/collect';
import { global } from '../../global-variables/variable';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Device } from '@ionic-native/device';
import { Sim } from '@ionic-native/sim';
import { File } from '@ionic-native/file';
import * as FileSaver from 'file-saver';
import { Printer, PrintOptions } from '@ionic-native/printer';
declare var cordova: any;

/*
  Generated class for the Unions page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()
@Component({
  selector: 'page-unions',
  templateUrl: 'unions.html'
})
export class UnionsPage {

  selectedSource: any = 'application';
  unions: any = [];
  unionsApplication: any = [];
  unionsKobo: any = [];
  allUnions: any = [];
  allUnions1: any = [];
  confLocaliteEnquete: any;
  aProfile: boolean = false;
  ajoutForm: boolean = false;
  selectedStyle: any = 'liste';
  typeRecherche: any = 'nom';
  rechercher: any = false;

  unionForm: any;
  villages: any = [];
  selectedVillage: any;
  unionKobo: any = [];
  imei: any = '';
  phonenumber: any = '';
  autreVillage: any = {'id':'AUTRE', 'nom':'Autre'};
  nom_autre_village: any = '';
  nom_union: string = '';
  code_union: any = '';
  num_aggrement: any = '';
  user: any = global.info_user;
  global:any = global;
  estManger: boolean = false;
  estAdmin: boolean = false;

  constructor(public storage: Storage, public platform: Platform, public toastCtl: ToastController, public printer: Printer, public file: File, public modelCtl: ModalController, public formBuilder: FormBuilder, public sim: Sim, public device: Device, public navCtrl: NavController, public events: Events, public menuCtl: MenuController, public alertCtl: AlertController, public navParams: NavParams, public servicePouchdb: PouchdbProvider) {

    this.menuCtl.enable(false, 'options');
    this.menuCtl.enable(false, 'connexion');
    this.menuCtl.enable(false, 'profile');
    
    events.subscribe('user:login', (user) => {
      if(user){
        this.aProfile = true;
        //this.user = global.info_user;
        this.estMangerConnecter(user)
      }else{
        this.aProfile = false;
        this.estManger = false;
        this.user = global.info_user;
      }
     /* this.servicePouchdb.remoteSaved.getSession((err, response) => {
        if (response.userCtx.name) {
          this.aProfile = true;
          this.user = global.info_user;
          this.estMangerConnecter(this.user)
          alert('ok')
        }else{
          this.aProfile = false;
          this.user = {};
          this.estManger = false;
          alert('non')
        }
      }, err => {
        console.log(err)
        this.estManger = false;
      });*/
    });
  }

  doRefresh(refresher) {
    if(this.selectedSource === 'application'){
     // this.unions = [];
      this.servicePouchdb.getPlageDocsRapide('fuma:union','fuma:union:\uffff').then((unions) => {
        if(unions){
          this.unions = unions;
          this.allUnions = unions;
          refresher.complete();
        }
      });
    }else if(this.selectedSource === 'kobo'){
     // this.unions = [];
      this.servicePouchdb.getPlageDocsRapide('koboSubmission_fuma-union','koboSubmission_fuma-union\uffff').then((unions) => {
        if(unions){
          this.unions = unions;
          this.allUnions = unions;
          refresher.complete();
        }
      });
    }else{
      
      this.servicePouchdb.getPlageDocsRapide('fuma:union','fuma:union:\uffff').then((unionsA) => {
        /*if(unionsA){
          this.unionsApplication = unionsA;
          //this.allUnions = unions;
        }*/
         this.servicePouchdb.getPlageDocsRapide('koboSubmission_fuma-union','koboSubmission_fuma-union\uffff').then((unionsK) => {
          this.unions = unionsA.concat(unionsK);
          this.allUnions = this.unions
          refresher.complete();

       /* if(unionsK){
          this.unionsKobo = unionsK;
          
        }*/
      }, err => console.log(err));

      }, err => console.log(err));      
    }
  
    console.log('Begin async operation', refresher);

    /*setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);*/
  }

  estMangerConnecter(user){
    //alert('entree')
    if(user && user.roles){
      //alert('ok')
      this.estManger = global.estManager(user.roles);
    }
  }

  estAdminConnecter(user){
    if(user && user.roles){
      this.estManger = global.estAdmin(user.roles);
    }
  }

    typeRechercheChange(){
    this.unions = this.allUnions;
  }


  exportExcel(){

    let date = new Date();
    //let dateHeure = date.toLocaleDateString()+ date.toLocaleTimeString();// + date.getTime().toLocaleString();
    let nom = date.getDate().toString() +'_'+ (date.getMonth() + 1).toString() +'_'+ date.getFullYear().toString() +'_'+ date.getHours().toString() +'_'+ date.getMinutes().toString() +'_'+ date.getSeconds().toString();

    let blob = new Blob([document.getElementById('union_tableau').innerHTML], {
      //type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
      type: "text/plain;charset=utf-8"
      //type: 'application/vnd.ms-excel;charset=utf-8'
      //type: "application/vnd.ms-excel;charset=utf-8"
    });

    if(!this.platform.is('android')){
      FileSaver.saveAs(blob, 'Unions_'+nom+'.xls');
    }else{

      let fileDestiny: string = cordova.file.externalRootDirectory;
      this.file.writeFile(fileDestiny, 'Unions_'+nom+'.xls', blob).then(()=> {
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
    let content = document.getElementById('union_tableau').innerHTML;
    this.printer.print(content, options);
  }


  initForm(){
    let maDate = new Date();
    let today = this.createDate(maDate.getDate(), maDate.getMonth(), maDate.getFullYear());
    //this.storage.get('confLocaliteEnquete').then((confLocaliteEnquete) => {
    this.chargerVillages(this.confLocaliteEnquete.commune.id);
    //});

    this.unionForm = this.formBuilder.group({
      //_id:[''],
      type:['union'],
      nom_union: ['', Validators.required], 
      code_union: ['', Validators.required], 
      num_aggrement: ['', Validators.required],
      pays: [this.confLocaliteEnquete.pays.id, Validators.required],
      pays_nom: [this.confLocaliteEnquete.pays.nom],
      pays_autre: [this.confLocaliteEnquete.pays_autre],
      region: [this.confLocaliteEnquete.region.id, Validators.required],
      region_nom: [this.confLocaliteEnquete.region.nom],
      region_autre: [this.confLocaliteEnquete.region_autre],
      departement: [this.confLocaliteEnquete.departement.id, Validators.required],
      departement_nom: [this.confLocaliteEnquete.departement.nom],
      departement_autre: [this.confLocaliteEnquete.departement_autre],
      commune: [this.confLocaliteEnquete.commune.id, Validators.required],
      commune_nom: [this.confLocaliteEnquete.commune.nom],
      commune_autre: [this.confLocaliteEnquete.commune_autre],
      village: ['', Validators.required],
      village_nom: [''],
      village_autre: ['', Validators.required],
      today: [today, Validators.required],
      deviceid: [''],
      imei: [''],
      phonenumber: [''],
      num_OP: [0],
      num_membre: [0],
      num_hommes: [0],
      num_femmes: [0],
      start: [maDate.toJSON()],
      end: ['']
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

  ressetChampsForm(){
    this.selectedVillage = '';
    this.num_aggrement = '';
    this.nom_union = '';
    this.code_union = '';
  }

  getInfoSimEmei(){

    this.sim.getSimInfo().then(
      (info) => {
        if(info && info.cards && info.cards.length > 0){
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

  //fait la conbinaison de caractere de gauche vers la droite en variant la taille a la recherche d'un code disponible
  genererCodeUnion(){
    //let taille_nom = this.nom_union.length;
    let exclut: any = [' ', ',', '!', ';','/', '-', '_', '.', '"', 'é', 'ê', 'û', 'ë', 'ü', 'î', 'ï', 'ô', 'ö'];
    let nom = this.nom_union;
    //nom = nom.replace(' ' || '  ' || '    ' || '     ' || '      ' , '')
    //let nom = this.nom_op;
    let nom1: any = '';
    for(let i = 0; i < nom.length; i++){
      //if(nom.charAt(i) !== ' '){
      if(exclut.indexOf(nom.charAt(i)) === -1 ){
        nom1 += nom.charAt(i).toString();
      }
    }
    //let nom1 = nom.replace(/ /g,"");
     nom = nom1;
    let an = nom;
    //nom = nom.replace('  ' || '', '')
    //nom = nom.replace('  ', '')
    let taille_nom = nom.length;
    //taille initiale: deux aractères
    let taille_code = 2;
    let code: string = '';
    let p = 0;
    let last_position = 0;
    let trouve: boolean;
    this.code_union = code.toUpperCase();

    if(taille_nom >= 2){
      while(taille_code <= taille_nom){
        last_position = taille_code - 1;
        trouve  = false;
        code = '';
        
        for(let i = 0; i < taille_code; i++){
            code += nom.charAt(i).toString() ;
        }

        do{
            code = code.substr(0, code.length - 1);
            code += nom.charAt(last_position).toString() ;
            p = 0;
            for(let pos=0; pos < this.allUnions1.length; pos++){
              let u = this.allUnions1[pos];
              if(u.doc.data.code_union === code.toUpperCase()){
                //alert('trouve '+code.toUpperCase())
                trouve = true;
                //alert('trouver '+trouve)
                break ;
              }else{
                //alert('non trouve '+code.toUpperCase())
                trouve = false;
              }
            }
              last_position++;
            //}
            

          }while(trouve && last_position < taille_nom);
          //
          if(last_position === taille_nom && trouve){
            //non disponible, augmenter la taille du code
            taille_code++;
            //alert('ici')
            //au cas ou on teste toutes les combinaisons, sant trouver de combinaison disponible, on ajoute des chiffre
            if(taille_code > taille_nom){
              //non disponible, augmenter la taille et utiliser des chiffres
              taille_code = 3;
              nom = an + '123456789'.toString();
              taille_nom = nom.length;
            }
          }else{
              //trouvé
              this.code_union = code.toUpperCase();
              break;
            
          }
      }
      
    }else{
      this.code_union = '';
    }
    
  }

  chargerVillages(c){
    this.villages = [];
    if(c !== 'AUTRE')
      {this.servicePouchdb.getDocById('village').then((villages) => {
        villages.data.forEach((village, index) => {
          if(village.id_commune === c){
            this.villages.push(village);
          }
        });
        if(this.user && this.user.roles && global.estManager(this.user.roles)){
          this.villages.push(this.autreVillage);
        }
      });
    }else{
      if(this.user && this.user.roles && global.estManager(this.user.roles)){
          this.villages.push(this.autreVillage);
        }
    }

  } 

  chargerAutreNomVillage(c){
    if(c !== 'AUTRE'){
      this.nom_autre_village = 'NA';
    }else{

      let model = this.modelCtl.create('AjouterVillagePage', {'id_commune':this.confLocaliteEnquete.commune.id, 'nom_commune': this.confLocaliteEnquete.commune.nom});
      model.present();
      model.onDidDismiss(() => {
        this.chargerVillages(this.confLocaliteEnquete.commune.id);
        this.selectedVillage = '';
      })
      this.nom_autre_village = '';
    }
  }


  verifierUniqueNon(union){

    let res = 1;
    this.allUnions1.forEach((u, index) => {
      if(/*(union.nom_union === u.data.nom_union) || */(union.num_aggrement === u.doc.data.num_aggrement)){
        res = 0;
      }
    });
    return res;
  }

  ajouterUnion(){
    let date = new Date();
    let union = this.unionForm.value;

    if(this.verifierUniqueNon(union) === 0){
      alert('Le nom de l\'union et le numéro de la reférence doivent être uniques!');
    }else{
      union.village = this.selectedVillage.id;
      union.village_nom = this.selectedVillage.nom;
      union.deviceid = this.device.uuid;
      union.phonenumber = this.phonenumber;
      union.imei = this.imei;
      let id = this.servicePouchdb.generateId('union', union.pays, union.region, union.departement,union.commune, union.village);
      //union._id = 'fuma'+ id;
      union.end = date.toJSON();

      let unionFinal: any = {};
      unionFinal._id = 'fuma'+ id;
      unionFinal.data = union
      this.servicePouchdb.createDocReturn(unionFinal).then((res) => {
        unionFinal._rev = res.rev;
        let u: any = {}
        u.doc = unionFinal;
        this.unions.push(u)
        this.allUnions = this.unions;
        this.allUnions1.push(u)
        this.ajoutForm = false;
        this.ressetChampsForm();
        let toast = this.toastCtl.create({
          message: 'Union bien enregistré!',
          position: 'top',
          duration: 1000
        });

        toast.present();

        /*let E: any = this.essais;
        E = E.concat(essais);
         
        this.essais = E;
        this.allEssais = this.essais;*/
          
      }).catch((err) => alert('une erreur est survenue lors de l\'enregistrement: '+err) );
    
      
      //this.navCtrl.pop();
      //toast.present();
      

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



  sync(){
    this.servicePouchdb.syncAvecToast();
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

  ionViewDidLoad(){

    
    this.rechercher = true;

    if(this.selectedSource === 'application'){
     // this.unions = [];
      this.servicePouchdb.getPlageDocsRapide('fuma:union','fuma:union:\uffff').then((unions) => {
        if(unions){
          this.unions = unions;
          this.allUnions = unions;
          this.rechercher = false;
        }
      });
    }else if(this.selectedSource === 'kobo'){
     // this.unions = [];
      this.servicePouchdb.getPlageDocsRapide('koboSubmission_fuma-union','koboSubmission_fuma-union\uffff').then((unions) => {
        if(unions){
          this.unions = unions;
          this.allUnions = unions;
          this.rechercher = false;
        }
      });
    }else{
      
      this.servicePouchdb.getPlageDocsRapide('fuma:union','fuma:union:\uffff').then((unionsA) => {
        /*if(unionsA){
          this.unionsApplication = unionsA;
          //this.allUnions = unions;
        }*/
         this.servicePouchdb.getPlageDocsRapide('koboSubmission_fuma-union','koboSubmission_fuma-union\uffff').then((unionsK) => {
          this.unions = unionsA.concat(unionsK);
          this.allUnions = this.unions
          this.rechercher = false;

       /* if(unionsK){
          this.unionsKobo = unionsK;
          
        }*/
      }, err => console.log(err));

      }, err => console.log(err));      
    }
  
  }

  getAllUnions(){
    this.servicePouchdb.getPlageDocsRapide('fuma:union','fuma:union:\uffff').then((unionsA) => {
         this.servicePouchdb.getPlageDocsRapide('koboSubmission_fuma-union','koboSubmission_fuma-union\uffff').then((unionsK) => {
          this.allUnions1 = unionsA.concat(unionsK);
      }, err => console.log(err));

    }, err => console.log(err));      
  }

  ionViewDidEnter() {

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


    this.storage.get('confLocaliteEnquete').then((confLocaliteEnquete) => {
      if(confLocaliteEnquete){
        this.confLocaliteEnquete = confLocaliteEnquete;
        this.initForm();
        this.getInfoSimEmei();
        this.getAllUnions();
        //this.chargerVillages(this.confLocaliteEnquete.commune.id);
      }
      //this.chargerVillages(this.confLocaliteEnquete.commune.id);
    }, err => {
      alert('Une erreur c\est produite lors du chergement de la localité de l\'enquette ')
    } );

    //this.initForm();
    //this.getInfoSimEmei();
  }

  choixSource(){
   // this.unions = [];
   this.rechercher = true;
     if(this.selectedSource === 'application'){
     // this.unions = [];
      this.servicePouchdb.getPlageDocsRapide('fuma:union','fuma:union:\uffff').then((unions) => {
        if(unions){
          this.unions = unions;
          this.allUnions = unions;
          this.rechercher = false;
        }
      });
    }else if(this.selectedSource === 'kobo'){
     // this.unions = [];
      this.servicePouchdb.getPlageDocsRapide('koboSubmission_fuma-union','koboSubmission_fuma-union\uffff').then((unions) => {
        if(unions){
          this.unions = unions;
          this.allUnions = unions;
          this.rechercher = false;
        }
      });
    }else{
      
      this.servicePouchdb.getPlageDocsRapide('fuma:union','fuma:union:\uffff').then((unionsA) => {
        /*if(unionsA){
          this.unionsApplication = unionsA;
          //this.allUnions = unions;
        }*/
         this.servicePouchdb.getPlageDocsRapide('koboSubmission_fuma-union','koboSubmission_fuma-union\uffff').then((unionsK) => {
          this.unions = unionsA.concat(unionsK);
          this.allUnions = this.unions
          this.rechercher = false;

       /* if(unionsK){
          this.unionsKobo = unionsK;
          
        }*/
      }, err => console.log(err));

      }, err => console.log(err));
     
      
    }

  }

  collect(){
    this.navCtrl.push('CollectPage')
  }

  annuler(){
    this.ajoutForm = false;
  }

  ajouter(confLocaliteEnquete){
    if(this.confLocaliteEnquete){
      this.ajoutForm = true;
      //this.navCtrl.push('AjouterUnionPage', {'confLocaliteEnquete': confLocaliteEnquete});
    }else{
      let alert = this.alertCtl.create({
        title: 'Erreur',
        message: 'Vous devez d\'abord définir la configuration de la localité à enquêtée!',
        buttons: [
          {
            text: 'Définir localité',
            handler:  () => {
              this.navCtrl.push('ConfLocaliteEnquetePage');
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

  detail(union, selectedSource){
    this.navCtrl.push('DetailUnionPage', {'union': union, 'selectedSource': selectedSource});
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.unions = this.allUnions;

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.unions = this.unions.filter((item) => {
        if(this.typeRecherche === 'nom'){
          return (item.doc.data.nom_union.toLowerCase().indexOf(val.toLowerCase()) > -1);
        }else if(this.typeRecherche === 'code'){
          return (item.doc.data.code_union.toLowerCase().indexOf(val.toLowerCase()) > -1);
        }else if(this.typeRecherche === 'aggrement'){
           return (item.doc.data.num_aggrement.toLowerCase().indexOf(val.toLowerCase()) > -1);
        }if(this.typeRecherche === 'site'){
          if(item.doc.data.commune_nom){
            return (item.doc.data.commune_nom.toLowerCase().indexOf(val.toLowerCase()) > -1);
          }
        }if(this.typeRecherche === 'village'){
          if(item.doc.data.village_nom){
            return (item.doc.data.village_nom.toLowerCase().indexOf(val.toLowerCase()) > -1);
          }
        }

      });
    } 
  }
}
