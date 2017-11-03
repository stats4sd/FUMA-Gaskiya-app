import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, Platform, AlertController, MenuController, ModalController, ToastController, IonicPage, Events } from 'ionic-angular';
import { PouchdbProvider } from '../../providers/pouchdb-provider';
//import { AjouterOpPage } from './ajouter-op/ajouter-op';
//import { DetailOpPage } from './detail-op/detail-op';
import { Storage } from '@ionic/storage';
//import { ConfLocaliteEnquetePage } from '../configuration/conf-localite-enquete/conf-localite-enquete'
import { global } from '../../global-variables/variable'
import { Validators, FormBuilder } from '@angular/forms';
import { Device } from '@ionic-native/device';
import { Sim } from '@ionic-native/sim';
import { File } from '@ionic-native/file';
import * as FileSaver from 'file-saver';
import { Printer, PrintOptions } from '@ionic-native/printer';
declare var cordova: any;

/*
  Generated class for the Op page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()
@Component({
  selector: 'page-op',
  templateUrl: 'op.html'
})
export class OpPage {

  selectedSource: any = 'application';
  ops: any = [];
  opsApplication: any = [];
  opsKobo: any = [];
  allOPs: any = [];
  allOPs1: any = [];
  confLocaliteEnquete: any;
   selectedStyle: any = 'liste';

  num_aggrement_union: any;
  num_aggrement_union1: any;
  num_aggrement: any;
  nom_union: any;
  aProfile: boolean = true;
  rechercher: any = false;

  opForm: any;
  villages: any = [];
  unions: any = [];
  selectedVillage: any;
  selectedUnion: any;
  opApplication: any = [];
  opKobo: any = [];
  allOP: any;
  imei: any = '';
  phonenumber: any = '';
  autreVillage: any = {'id':'AUTRE', 'nom':'Autre'};
  autreUnion: any = {"data": {'num_aggrement':'AUTRE', 'nom_union':'Autre'}};
  nom_autre_village: any = '';
  nom_autre_union: any = '';
  nom_op: string = '';
  code_op: any = '';
  ajoutForm: boolean = false;
  typeRecherche: any = 'code';


  constructor(public navCtrl: NavController, public platform: Platform, public viewCtl:ViewController, public printer: Printer, public file: File, public sim: Sim, public modelCtl: ModalController, public device: Device, public toastCtl: ToastController, public formBuilder: FormBuilder, public menuCtl: MenuController, public events: Events, public navParams: NavParams, public storage: Storage, public alertCtl: AlertController, public servicePouchdb: PouchdbProvider) {
    
    this.menuCtl.enable(false, 'options');
    this.menuCtl.enable(false, 'connexion');
    this.menuCtl.enable(false, 'profile');
    
    events.subscribe('user:login', () => {
      this.servicePouchdb.remoteSaved.getSession((err, response) => {
        if (response.userCtx.
          name) {
          this.aProfile = true;
        }else{
          this.aProfile = false;
        }
      }, err => console.log(err));
    });
    
    if(this.navParams.data.num_aggrement_union){
      this.num_aggrement_union = this.navParams.data.num_aggrement_union;
      this.num_aggrement_union1 = this.navParams.data.num_aggrement_union;
      this.nom_union = this.navParams.data.nom_union;
      this.nom_autre_union= 'NA';
      //this.viewCtl.showBackButton(false)
    }
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
      FileSaver.saveAs(blob, 'OPs_'+nom+'.xls');
    }else{

      let fileDestiny: string = cordova.file.externalRootDirectory;
      this.file.writeFile(fileDestiny, 'OPs_'+nom+'.xls', blob).then(()=> {
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


  initForm(){
    //this.confLocaliteEnquete = this.navParams.data.confLocaliteEnquete;
    /*if(this.navParams.data.num_aggrement_union){
      this.num_aggrement_union = this.navParams.data.num_aggrement_union;
      this.nom_union = this.navParams.data.nom_union;
      this.nom_autre_union= 'NA';
    }*/

    let maDate = new Date();
    let today = this.createDate(maDate.getDate(), maDate.getMonth(), maDate.getFullYear());
    //this.storage.get('confLocaliteEnquete').then((confLocaliteEnquete) => {
    this.chargerVillages(this.confLocaliteEnquete.commune.id);
    //});

    this.opForm = this.formBuilder.group({
     // _id:[''],
      type:['op'],
      nom_OP: ['', Validators.required],
      code_OP: ['', Validators.required],
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
      union: ['', Validators.required],
      union_nom: [''],
      union_autre: ['NA', Validators.required],
      today: [today, Validators.required],
      deviceid: [''],
      imei: [''],
      phonenumber: [''],
      //num_OP: [0],
      num_membre: [0],
      num_hommes: [0],
      num_femmes: [0],
      start: [maDate.toJSON()],
      end: ['']
    });
    
  }

   //fait la conbinaison de caractere de gauche vers la droite en variant la taille a la recherche d'un code disponible
  genererCodeOP(){
    
    let nom = this.nom_op;
    let nom1: any = '';
    for(let i = 0; i < nom.length; i++){
      if(nom.charAt(i) !== ' '){
        nom1 += nom.charAt(i).toString();
      }
    }
     //let nom1 = nom.replace(/ /g,"");
     nom = nom1;
     let taille_nom = nom.length;
     let an = nom;
    //taille initiale: deux aractères
    let taille_code = 2;
    let code: string = '';
    this.code_op = code.toUpperCase()
    let p = 0;
    let last_position = 0;
    let trouve: boolean;

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
            for(let pos=0; pos < this.allOPs1.length; pos++){
              let op = this.allOPs1[pos];
              if(op.doc.data.code_OP === code.toUpperCase()){
                trouve = true;
                break ;
              }else{
                trouve = false;
              }
            }
            
            last_position++;

          }while(trouve && last_position < taille_nom);
          //
          if(last_position === taille_nom && trouve){
            //non disponible, augmenter la taille du code
            taille_code++;
        
            //au cas ou on teste toutes les combinaisons, sant trouver de combinaison disponible, on ajoute des chiffre
            if(taille_code > taille_nom){
              //non disponible, augmenter la taille et utiliser des chiffres
              taille_code = 3;
              nom = an + '123456789'.toString();
              taille_nom = nom.length;
            }
          }else{
              this.code_op = code.toUpperCase();
              break;
            
          }
      }
      
    }else{
      this.code_op = '';
    }
    
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

    chargerVillages(c){
    this.villages = [];
    if(c !== 'AUTRE')
      {this.servicePouchdb.getDocById('village').then((villages) => {
        villages.data.forEach((village, index) => {
          if(village.id_commune === c){
            this.villages.push(village);
            
          }
        });
        this.villages.push(this.autreVillage);
        //this.nom_autre_departement = 'NA';
      });
    }else{
      this.villages.push(this.autreVillage);
      //this.nom_autre_departement = '';
    }

    //this.selectedVillage = '';
  } 

  chargerAutreNomVillage(v){
    if(v !== 'AUTRE'){
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

  chargerUnion(){
    this.servicePouchdb.getPlageDocsRapide('fuma:union','fuma:union:\uffff').then((uA) => {
         this.servicePouchdb.getPlageDocsRapide('koboSubmission_fuma-union','koboSubmission_fuma-union\uffff').then((uK) => {
          this.unions = uA.concat(uK);
          //this.unions.push(this.autreUnion);
      }, err => console.log(err));

      }, err => console.log(err)); 
  }

  chargerAutreNomUnion(u){
    if(u !== 'AUTRE'){
      this.nom_autre_union = 'NA';
    }else{
      let model = this.modelCtl.create('AjouterUnionPage', {'confLocaliteEnquete': this.confLocaliteEnquete});
        model.present();
        model.onDidDismiss(() => {
          this.chargerUnion();
          this.selectedUnion = '';
      })
      this.nom_autre_union = '';
    }
  }


  verifierUniqueNon(op){
    let res = 1;
    this.allOPs1.forEach((o, index) => {
      if(/*(op.nom_OP === o.data.nom_OP) ||*/ (op.num_aggrement === o.doc.data.num_aggrement)){
        res = 0;
      }
    });
    return res;
  }

   ajouterOP(){
    let date = new Date();
    let op = this.opForm.value;

    if(this.verifierUniqueNon(op) === 0){
      alert('Le numéro de la reférence doivent être uniques!');
    }else{
      op.village = this.selectedVillage.id;
      op.village_nom = this.selectedVillage.nom;
      if(!this.num_aggrement_union){
        op.union = this.selectedUnion.doc.data.num_aggrement;
        op.union_code = this.selectedUnion.doc.data.code_union;
        op.union_nom = this.selectedUnion.doc.data.nom_union;
      }

      op.deviceid = this.device.uuid;
      op.phonenumber = this.phonenumber;
      op.imei = this.imei;
      let id = this.servicePouchdb.generateId('op', op.pays, op.region, op.departement,op.commune, op.village);
      //union._id = 'fuma'+ id;
      op.end = date.toJSON();

      let opFinal: any = {};
      opFinal._id = 'fuma'+ id;
      opFinal.data = op
      this.servicePouchdb.createDocReturn(opFinal).then((res) => {
        opFinal._rev = res.rev;
        let O: any = {};
        O.doc = opFinal;
        this.ops.push(O);
        this.allOPs = this.ops;
        this.allOPs1.push(O);
        this.ajoutForm = false;
        this.ressetChampsForm();
      }) ;
      /*if(this.selectedUnion.data.num_aggrement !== 'AUTRE'){
        this.selectedUnion.data.num_OP++;
        this.servicePouchdb.updateDoc(this.selectedUnion);
      }*/
      let toast = this.toastCtl.create({
        message: 'OP bien enregistré!',
        position: 'top',
        duration: 1000
      });
      //this.navCtrl.pop();
      toast.present();
      

    }

  } 

  annuler(){
    this.ajoutForm = false;
    //this.navCtrl.pop();
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
      let opss: any = [];
      this.servicePouchdb.getPlageDocsRapide('fuma:op:','fuma:op:\uffff').then((ops) => {
        if(ops){
          //opss = ops;
          ops.forEach((o, index) => {
            if(!o.doc.data.op/* || o.data.op !== ''*/){
              opss.push(o)
            }
          });

          if(this.num_aggrement_union){
            let opu: any = [];
            opss.forEach((o, i) => {
              if(o.doc.data.union === this.num_aggrement_union){
                opu.push(o)
              }
           });
           this.ops = opu;
           this.allOPs = opu;
           this.rechercher = false;

          }else{
            this.ops = opss;
            this.allOPs = opss;
            this.rechercher = false;
          }
          //this.ops = opss;
          //this.allOPs = opss;
        }
      });
    }else if(this.selectedSource === 'kobo'){
      let opss: any = [];
      this.servicePouchdb.getPlageDocsRapide('koboSubmission_fuma-op','koboSubmission_fuma-op\uffff').then((ops) => {
        if(ops){
          ops.forEach((o, i) => {
            if(!o.doc.data.op){
             opss.push(o) ;
             //this.allOPs.push(o);
            }
          });

          if(this.num_aggrement_union){
            let opu: any = [];
            opss.forEach((o, i) => {
              if(o.doc.data.union === this.num_aggrement_union){
                opu.push(o)
              }
           });
           this.ops = opu;
           this.allOPs = opu;
           this.rechercher = false;

          }else{
            this.ops = opss;
            this.allOPs = opss;
            this.rechercher = false;
          }
          //this.ops = opss ;
          //this.allOPs = opss;
          //this.ops = ops;
          //this.allOPs = ops;
        }
      });
    }else{
      let A = [];
      let opss: any = [];
      this.servicePouchdb.getPlageDocsRapide('fuma:op','fuma:op:\uffff').then((opsA) => {
        if(opsA){
          //opss = ops;
          opsA.forEach((o, index) => {
            if(!o.doc.data.op/* || o.data.op !== ''*/){
              A.push(o)
            }
          })
        }
        let k = [];
         this.servicePouchdb.getPlageDocsRapide('koboSubmission_fuma-op','koboSubmission_fuma-op\uffff').then((opsK) => {
           
          opsK.forEach((o, i) => {
            if(!o.doc.data.op){
             k.push(o) ;
             //this.allOPs.push(o);
            }
          })

          opss = A.concat(k);
          if(this.num_aggrement_union){
            let opu: any = [];
            opss.forEach((o, i) => {
              if(o.doc.data.union === this.num_aggrement_union){
                opu.push(o)
              }
           });
           this.ops = opu;
           this.allOPs = opu;
           this.rechercher = false;

          }else{
            this.ops = opss;
            this.allOPs = opss;
            this.rechercher = false;
          }

          //this.ops = A.concat(k);
          //this.allOPs = this.ops

       
      }, err => console.log(err));

      }, err => console.log(err));      
    }
  }

  getAllOPs(){
    let A = [];
      let opss: any = [];
      this.servicePouchdb.getPlageDocsRapide('fuma:op','fuma:op:\uffff').then((opsA) => {
        if(opsA){
          //opss = ops;
          opsA.forEach((o, index) => {
            if(!o.doc.data.op/* || o.data.op !== ''*/){
              A.push(o)
            }
          })
        }
        let k = [];
         this.servicePouchdb.getPlageDocsRapide('koboSubmission_fuma-op','koboSubmission_fuma-op\uffff').then((opsK) => {
           
          opsK.forEach((o, i) => {
            if(!o.doc.data.op){
             k.push(o) ;
             //this.allOPs.push(o);
            }
          })

          opss = A.concat(k);
         
            //this.ops = opss;
            this.allOPs1 = opss;
          //this.ops = A.concat(k);
          //this.allOPs = this.ops

       
      }, err => console.log(err));

      }, err => console.log(err));
  }

  ressetChampsForm(){
    this.selectedVillage = '';
    if(!this.num_aggrement_union1){
      //this.selectedUnion = null;
      //this.num_aggrement_union = '';
      //this.nom_union = '';
    }
    this.num_aggrement = '';
    this.nom_op = '';
    this.code_op = '';
  }


  ionViewDidEnter() {

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

    this.chargerUnion();

    this.getInfoSimEmei();
    

    this.storage.get('confLocaliteEnquete').then((confLocaliteEnquete) => {
      if(confLocaliteEnquete){
        this.confLocaliteEnquete = confLocaliteEnquete;
        this.initForm();
        this.getInfoSimEmei();
        this.getAllOPs();
      /*}else {
        this.initForm();*/
      }
      //this.chargerVillages(this.confLocaliteEnquete.commune.id);
    }, err => alert('Une erreur c\'est produite lors du chergement de la localité de l\'enquette '));
  }

  choixSource(){
      this.rechercher = true;
     if(this.selectedSource === 'application'){
    
      let opss: any = [];
      this.servicePouchdb.getPlageDocsRapide('fuma:op:','fuma:op:\uffff').then((ops) => {
        if(ops){
          //opss = ops;
          ops.forEach((o, index) => {
            if(!o.doc.data.op/* || o.data.op !== ''*/){
              opss.push(o)
            }
          })

          if(this.num_aggrement_union){
            let opu: any = [];
            opss.forEach((o, i) => {
              if(o.doc.data.union === this.num_aggrement_union){
                opu.push(o)
              }
           });
           this.ops = opu;
           this.allOPs = opu;
           this.rechercher = false;

          }else{
            this.ops = opss;
            this.allOPs = opss;
            this.rechercher = false;
          }
          //this.ops = opss;
          //this.allOPs = opss;
        }
      });
    }else if(this.selectedSource === 'kobo'){
      //this.ops = [];
      //this.allOPs = [];
      let opss: any = [];
      this.servicePouchdb.getPlageDocsRapide('koboSubmission_fuma-op','koboSubmission_fuma-op\uffff').then((ops) => {
        if(ops){
          ops.forEach((o, i) => {
            if(!o.doc.data.op){
              opss.push(o)
             //this.ops.push(o) ;
             //this.allOPs.push(o);
            }
          });

          if(this.num_aggrement_union){
            let opu: any = [];
            opss.forEach((o, i) => {
              if(o.doc.data.union === this.num_aggrement_union){
                opu.push(o)
              }
           });
           this.ops = opu;
           this.allOPs = opu;
           this.rechercher = false;

          }else{
            this.ops = opss;
            this.allOPs = opss;
            this.rechercher = false;
          }
        }
      });
    }else{
      let A = [];
      let opss: any = [];
      this.servicePouchdb.getPlageDocsRapide('fuma:op','fuma:op:\uffff').then((opsA) => {
        if(opsA){
          //opss = ops;
          opsA.forEach((o, index) => {
            if(!o.doc.data.op/* || o.data.op !== ''*/){
              A.push(o)
            }
          })
        }
        let k = [];
         this.servicePouchdb.getPlageDocsRapide('koboSubmission_fuma-op','koboSubmission_fuma-op\uffff').then((opsK) => {
           opsK.forEach((o, i) => {
            if(!o.doc.data.op){
             k.push(o) ;
             //this.allOPs.push(o);
            }
          });

          opss = A.concat(k);
          if(this.num_aggrement_union){
            let opu: any = [];
            opss.forEach((o, i) => {
              if(o.doc.data.union === this.num_aggrement_union){
                opu.push(o)
              }
           });
           this.ops = opu;
           this.allOPs = opu;
           this.rechercher = false;

          }else{
            this.ops = opss;
            this.allOPs = opss;
            this.rechercher = false;
          }
          //this.ops = A.concat(k);
          //this.allOPs = this.ops

      }, err => console.log(err));

      }, err => console.log(err));
     
      
    }

  }

  ajouter(confLocaliteEnquete){
    if(this.confLocaliteEnquete){
      this.ajoutForm = true;
      /*if(this.num_aggrement_union){
        this.navCtrl.push('AjouterOpPage', {'confLocaliteEnquete': confLocaliteEnquete, 'num_aggrement_union': this.num_aggrement_union, 'nom_union': this.nom_union});
      }else{
        this.navCtrl.push('AjouterOpPage', {'confLocaliteEnquete': confLocaliteEnquete});
      }*/
      
    }else{
      let alert = this.alertCtl.create({
        title: 'Erreur',
        message: 'Vous devez d\'abord définir la configuration de la localité à enquêtée!',
        buttons: [
          {
            text: 'Définir localité',
            handler: () => {
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

  detail(op, selectedSource){
    this.navCtrl.push('DetailOpPage', {'op': op, 'selectedSource': selectedSource});
  }
  sync(){
    this.servicePouchdb.syncAvecToast(this.ionViewDidLoad());
  }

  typeRechercheChange(){
    this.ops = this.allOPs;
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.ops = this.allOPs;

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.ops = this.ops.filter((item) => {
        if(this.typeRecherche === 'nom'){
          return (item.doc.data.nom_OP.toLowerCase().indexOf(val.toLowerCase()) > -1);
        }else if(this.typeRecherche === 'code'){
          return (item.doc.data.code_OP.toLowerCase().indexOf(val.toLowerCase()) > -1);
        }else if(this.typeRecherche === 'aggrement'){
          return (item.doc.data.num_aggrement.toLowerCase().indexOf(val.toLowerCase()) > -1);
        }else if(this.typeRecherche === 'union'){
          return (item.doc.data.union_nom.toLowerCase().indexOf(val.toLowerCase()) > -1);
        }else if(this.typeRecherche === 'site'){
          if(item.doc.data.commune_nom){
            return (item.doc.data.commune_nom.toLowerCase().indexOf(val.toLowerCase()) > -1);
          }
        }else if(this.typeRecherche === 'village'){
          if(item.doc.data.village_nom){
            return (item.doc.data.village_nom.toLowerCase().indexOf(val.toLowerCase()) > -1);
          }
        }

        
      });
    }
  }


}
