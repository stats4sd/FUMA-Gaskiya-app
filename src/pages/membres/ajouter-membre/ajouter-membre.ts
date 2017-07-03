import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, ViewController, MenuController, Events } from 'ionic-angular';
import { Validators, FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { PouchdbProvider } from '../../../providers/pouchdb-provider';
import { Device } from '@ionic-native/device';
import { Sim } from '@ionic-native/sim';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Camera } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';
import { global } from '../../../global-variables/variable'
//import { blob } from 'blob-util'
//import blobUtil from 'blob-util';
//import { File } from '@ionic-native/file'
//import * as fs from 'fs'


/*
  Generated class for the AjouterMembre page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-ajouter-membre',
  templateUrl: 'ajouter-membre.html'
})
export class AjouterMembrePage {

  membreForm: any;
  confLocaliteEnquete: any = {};
  villages: any = [];
  ops: any = [];
  classes: any = [];
  selectedVillage: any;
  selectedOP: any;
  selectedClasse: any;
  membreApplication: any = [];
  membreKobo: any = [];
  allMembres: any;
  allUnion
  imei: any = '';
  phonenumber: any = '';
  autreVillage: any = {'id':'AUTRE', 'nom':'Autre'};
  autreOP: any = {"data": {'num_aggrement':'AUTRE', 'nom_OP':'Autre', 'code_OP':'AUTRE'}};
  autreClasse: any = {"data": {'id':'AUTRE', 'nom':'Autre'}};
  nom_autre_village: any = '';
  nom_autre_op: any = '';
  nom_autre_classe: any = '';
  matricule: any = '';
  nom:any = '';
  num_aggrement_op: any;
  nom_op: any;
  public base64Image: string;
  public showCamera = true;
  //instanceID: string;
  imageData: any = '';
  attachments:any;
  photo: any;
  aProfile: boolean = true;
  fileName: any;
  imageBlob:any;

  constructor(public navCtrl: NavController, private sanitizer: DomSanitizer, public file: File, public menuCtl: MenuController, public events: Events, public imagePicker: ImagePicker, public viewCtrl: ViewController, private camera: Camera, public translate: TranslateService, public navParams: NavParams, public sim: Sim, public device: Device, public toastCtl: ToastController, public servicePouchdb: PouchdbProvider, public formBuilder: FormBuilder, public storage: Storage) {
    
    //this.base64Image(this.photo);
    this.menuCtl.enable(false, 'options');
    this.menuCtl.enable(false, 'connexion');
    this.menuCtl.enable(false, 'profile');
    
    events.subscribe('user:login', () => {
      this.servicePouchdb.remoteSaved.getSession((err, response) => {
        if (response.userCtx.name) {
          this.aProfile = true;
        }else{
          this.aProfile = false;
        }
      }, err => console.log(err));
    });

    this.translate.setDefaultLang(global.langue)
    //this.instanceID = this.setInstanceID();

    if(this.navParams.data.num_aggrement_op){
      this.num_aggrement_op = this.navParams.data.num_aggrement_op;
      this.nom_op = this.navParams.data.nom_op;
      this.nom_autre_op= 'NA';
    }
    this.confLocaliteEnquete = this.navParams.data.confLocaliteEnquete;

    this.servicePouchdb.getPlageDocs('fuma:op','fuma:op:\uffff').then((oA) => {
         this.servicePouchdb.getPlageDocs('koboSubmission_fuma-op','koboSubmission_fuma-op\uffff').then((oK) => {
          this.ops = oA.concat(oK);
          this.ops.push(this.autreOP);
      }, err => console.log(err));

    }, err => console.log(err)); 
    
    this.servicePouchdb.getPlageDocs('fuma:classe','fuma:classe:\uffff').then((cA) => {
         this.servicePouchdb.getPlageDocs('koboSubmission_fuma-classe','koboSubmission_fuma-classe\uffff').then((cK) => {
          this.classes = cA.concat(cK);
          this.classes.push(this.autreClasse);
      }, err => console.log(err)); 

      }, err => console.log(err));

    let maDate = new Date();
    let today = this.createDate(maDate.getDate(), maDate.getMonth(), maDate.getFullYear());
    //this.storage.get('confLocaliteEnquete').then((confLocaliteEnquete) => {
    this.chargerVillages(this.confLocaliteEnquete.commune.id);
    //});

    this.membreForm = this.formBuilder.group({
      //_id:[''],
      type:['membre_op'],
      nom_Membre: ['', Validators.required],
      matricule_Membre: ['', Validators.required],
      genre: ['', Validators.required],
      classe: [''],
      classe_nom: [''],
      classe_autre: [''],
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
      op: ['', Validators.required],
      op_nom: [''],
      op_autre: ['NA', Validators.required],
      today: [today, Validators.required],
      deviceid: [''],
      imei: [''],
      phonenumber: [''],
      start: [maDate.toJSON()],
      end: ['']
    });
    
  }

getBase64Image(img) {
  var canvas = document.createElement("canvas");
  //canvas.width = img.width;
  //canvas.height = img.height;
  var ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);
  var dataURL = canvas.toDataURL("image/png");
  return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}

 con(img, callback){
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    context.drawImage(img, 0, 0)
    canvas.toBlob(callback, "image/png")
  }
  
    close() {
    //ideally want to minimise/make transparent so forms keep attempting upload
    //will need to move code onto new form tab or combine into collect tab

    // var iframe = window.frames['form-iframe']
    // console.log('iframe doc', iframe.document)
    // console.log('content window', iframe.contentWindow)
    this.viewCtrl.dismiss()
    //this.iframeHeight="100px"
  }

 
  takePhoto() {
    
    let option = {
      sourceType: this.camera.PictureSourceType.CAMERA,
      //destinationType: this.camera.DestinationType.NATIVE_URI,
      destinationType: this.camera.DestinationType.DATA_URL,
      quality: 50,
      targetWidth: 500,
      targetHeight: 500,
      correctOrientation: true,
      saveToPhotoAlbum: true
    };

    this.camera.getPicture(option).then((imageData) => {
      // imageData is a base64 encoded string
      //this.photo = this.sanitizer.bypassSecurityTrustUrl(imageData);
      this.imageData = imageData;
      this.base64Image = "data:image/jpeg;base64," + imageData;
      this.photo = this.base64Image ;
    }, (err) => {
      console.log(err);
    });
  }

  chooseImage(){


    let option = {
      maximumImagesCount: 1,
      quality: 50,
      width: 500,
      height: 500,
      outputType: 1
    };

    this.imagePicker.getPictures(option).then((imageData) => {
      //this.photo = this.sanitizer.bypassSecurityTrustUrl(imageData[0]);
      this.imageData = imageData[0];
      this.base64Image = "data:image/jpeg;base64," + imageData[0];
      this.photo = this.base64Image ;
    }, (err) => console.log(err) );
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
    this.servicePouchdb.syncAvecToast(this.ionViewDidEnter());
  }



  chargerOp(){
    this.nom_op
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

  getMatricule(){
    let membre = this.membreForm.value;
   
    if(this.nom.length === 2){
      //this.matricule = this.generateId(this.nom.toUpperCase().substr(0, 2),/* membre.pays.toUpperCase().substr(0, 2), membre.region.toUpperCase().substr(0, 2), membre.departement.toUpperCase().substr(0, 2), membre.commune.toUpperCase().substr(0, 2), this.selectedVillage.nom.toUpperCase().substr(0, 2)*/);
    } 
 }
 
  generateId(code_op/*operation, /*pays, region, departement, commune, village*/){
    /*var pays = pays||'XX'
    var region = region||'XX'
    var department = departement || 'XX'
    var commune = commune || 'XX'*/
    //var village = village || 'XX'
    //select 3 random numbers and random letter for up to 25,000 unique per department
    var chars='ABCDEFGHIJKLMNPQRSTUVWYZ'
    var numbers='0123456789'
    var randomArray=[]
    for(let i=0;i<3;i++){
      var rand = Math.floor(Math.random()*10)
      randomArray.push(numbers[rand])
    }
    randomArray.push('-')
    var rand = Math.floor(Math.random()*24)
    randomArray.push(chars[rand])
    var randomString=randomArray.join("");
    var Id= 'FM-'+ code_op + ' ' + randomString// operation+' '/*+pays+'-'+region+'-'+department+'-'+commune +'-' +village+ */+randomString 
    return Id
  }

 

  ionViewDidEnter() {
    //this.con(document.getElementById("imageid") , (blo) => {
     // this.imageBlob = blo;
    //})
    //this.imageBlob = this.getBase64Image(document.getElementById("imageid"));
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

    this.translate.use(global.langue)

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

    this.servicePouchdb.getPlageDocs('fuma:op:membre','fuma:op:membre:\uffff').then((mbrsA) => {
         this.servicePouchdb.getPlageDocs('koboSubmission_fuma-op-membre','koboSubmission_fuma-op-membre\uffff').then((mbrsK) => {
          this.allMembres = mbrsA.concat(mbrsK);
      }, err => console.log(err));

      }, err => console.log(err));      
   

      this.servicePouchdb.getPlageDocs('fuma:union','fuma:union:\uffff').then((uA) => {
         this.servicePouchdb.getPlageDocs('koboSubmission_fuma-union','koboSubmission_fuma-union\uffff').then((uK) => {
          this.allUnion = uA.concat(uK);
      }, err => console.log(err));

      }, err => console.log(err)); 

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
      this.nom_autre_village = '';
    }
  }

  chargerAutreNomOP(op, code_op){
    if(op !== 'AUTRE'){
      this.nom_autre_op = 'NA';
      this.matricule = this.generateId(code_op);
      /*this.servicePouchdb.compterNbEnregistrement('op_code', 'AM').then((res) => {
        let dernier = this.generateId(code_op);
        alert(res.total_rows)
        if(dernier < 10){
          this.matricule = 'FM '+code_op+'-00'+ dernier.toString();
        }else if(dernier < 100){
          this.matricule = 'FM '+code_op+'-0'+ dernier.toString();
        }else{
          this.matricule = 'FM '+code_op+'-'+ dernier.toString();
        }
      });*/
    }else{
      this.nom_autre_op = '';
      this.matricule = this.generateId(code_op);
    }
  }

   chargerAutreNomClasse(c){
    if(c !== 'AUTRE'){
      this.nom_autre_classe = 'NA';
    }else{
      this.nom_autre_classe = '';
    }
  }


  verifierUniqueMatricule(membre){
    let res = 1;
    this.allMembres.forEach((m, index) => {
      if(membre.matricule_Membre === m.data.matricule_Membre){
        res = 0;
      }
    });
    return res;
  }

   ajouter(){
    let date = new Date();
    let membre = this.membreForm.value;

    if(this.verifierUniqueMatricule(membre) === 0){
      alert('Le matricule du membre doit être unique!');
    }else{
      membre.village = this.selectedVillage.id;
      membre.village_nom = this.selectedVillage.nom;
      if(!this.num_aggrement_op){
         membre.op = this.selectedOP.data.num_aggrement;
         membre.op_nom = this.selectedOP.data.nom_OP;
         membre.op_code = this.selectedOP.data.code_OP;
      }

      if(this.selectedClasse){
         membre.classe = this.selectedClasse.data.id;
         membre.classe_nom = this.selectedClasse.data.nom;
      }
      membre.deviceid = this.device.uuid;
      membre.phonenumber = this.phonenumber;
      membre.imei = this.imei;
      membre.file_name = this.fileName;
      
      let id = this.servicePouchdb.generateId('op:membre', membre.pays, membre.region, membre.departement,membre.commune, membre.village);
      //union._id = 'fuma'+ id;
      membre.end = date.toJSON();
 
      let membreFinal: any = {};
      membreFinal._id = 'fuma'+ id;
    
      let ida = 'fuma:photo:membre:'+ this.matricule;
      if(this.photo){
        membre.photoID = ida; 
      }
      
      //membre.blob = this.imageBlob;
      membreFinal.data = membre;
      this.servicePouchdb.createDoc(membreFinal);
      
      if(this.photo){
        var doc = {
        // _id: ida,
          _attachments: {},
          photoID: ida,
          timestamp: new Date().toString()
        }

        //this.imageBlob = this.getBase64Image(document.getElementById("imageid"));

        this.fileName = ida + '.jpeg';
        doc._attachments[this.fileName] = {
          content_type: 'image/jpeg', 
          data: this.imageData
        }

        //this.servicePouchdb.createDoc(doc)
        this.servicePouchdb.put(doc, ida)
  
      }
     
      
    
        
      /*if(this.selectedOP.data.num_aggrement !== 'AUTRE'){
        this.selectedOP.data.num_membre++;
        if(membre.genre === 'male'){
          this.selectedOP.data.num_hommes++;
        }else{
          this.selectedOP.data.num_femmes++;
        }
        this.servicePouchdb.updateDoc(this.selectedOP);
      }

      this.allUnion.forEach((u, i) => {
        if(u.data.num_aggrement === this.selectedOP.data.union){
          u.data.num_membre++; 
          if(membre.genre === 'male'){
            u.data.num_hommes++;
          }else{
            u.data.num_femmes++;
          }
        this.servicePouchdb.updateDoc(u);
        }
      });*/

      let toast = this.toastCtl.create({
        message: 'Membre OP bien enregistré!',
        position: 'top',
        duration: 3000
      });

      toast.present();
      this.navCtrl.pop();

    }

  }

  annuler(){
    this.navCtrl.pop();
  }

}
