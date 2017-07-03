import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, ViewController, MenuController, Events } from 'ionic-angular';
import { Validators, FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { PouchdbProvider } from '../../../providers/pouchdb-provider';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Camera } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';
import { global } from '../../../global-variables/variable'

/*
  Generated class for the ModifierMembre page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-modifier-membre',
  templateUrl: 'modifier-membre.html'
})
export class ModifierMembrePage {

  membreForm: any;
  grandMembre: any;
  membre: any;
  confLocaliteEnquete: any = {};
  villages: any = [];
  ops: any = [];
  classes: any = [];
  selectedVillageID: any;
  selectedOPID: any;
  ancienSelectedOPID: any;
  selectedClasseID: any;
  membreApplication: any = [];
  membreKobo: any = [];
  allMembres: any;
  allUnion
  autreVillage: any = {'id':'AUTRE', 'nom':'Autre'};
  autreOP: any = {"data": {'num_aggrement':'AUTRE', 'nom_OP':'Autre', 'code_OP':'AUTRE'}};
  autreClasse: any = {"data": {'id':'AUTRE', 'nom':'Autre'}};
  nom_autre_village: any = '';
  nom_autre_op: any = '';
  nom_autre_classe: any = '';
  matricule: any = '';
  nom:any = '';
  generate: boolean = false;
  public base64Image: string;
  public showCamera = true;
  //instanceID: string;
  imageData: any = '';
  attachments:any;
  photo: any;
  aProfile: boolean = true;
  fileName: any;
  imageBlob:any;
  photoID: any;

  constructor(public navCtrl: NavController, private sanitizer: DomSanitizer, public menuCtl: MenuController, public events: Events, public imagePicker: ImagePicker, public viewCtrl: ViewController, private camera: Camera, public translate: TranslateService, public navParams: NavParams,  public toastCtl: ToastController, public servicePouchdb: PouchdbProvider, public formBuilder: FormBuilder, public storage: Storage) {
    
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
    this.grandMembre = this.navParams.data.membre;
    this.photoID = this.navParams.data.photoID;
    this.photo = this.navParams.data.photo;

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
    

    this.membre = this.grandMembre.data;
    this.selectedClasseID = this.membre.classe;
    this.selectedOPID = this.membre.op;
    this.ancienSelectedOPID = this.membre.op;
    this.selectedVillageID = this.membre.village;
    this.matricule = this.membre.matricule_Membre;
    this.nom = this.membre.nom_Membre;
    if(!this.matricule){
      this.getMatricule();
      this.generate = true;
    }

    if(this.membre.village_autre){
        this.nom_autre_village = this.membre.village_autre;
      }else{
        this.nom_autre_village = 'NA';
    }

    if(this.membre.op_autre) {
        this.nom_autre_op = this.membre.op_autre;
    }else{
      this.nom_autre_op = 'NA';
    }

     if(this.membre.classe_autre) {
        this.nom_autre_classe = this.membre.classe_autre;
    }else{
      this.nom_autre_classe = 'NA';
    }

    this.chargerVillages(this.membre.commune);


    this.membreForm = this.formBuilder.group({
      //_id:[''],
      nom_Membre: [this.membre.nom_Membre, Validators.required],
      matricule_Membre: [this.membre.matricule_Membre, Validators.required],
      genre: [this.membre.genre, Validators.required],
      classe: [this.membre.classe],
      classe_nom: [this.membre.classe_nom],
      classe_autre: [this.membre.classe_autre],
      pays: [this.membre.pays, Validators.required],
      pays_nom: [this.membre.pays_nom],
      pays_autre: [this.membre.pays_autre],
      region: [this.membre.region, Validators.required],
      region_nom: [this.membre.region_nom],
      region_autre: [this.membre.region_autre],
      departement: [this.membre.departement, Validators.required],
      departement_nom: [this.membre.departement_nom],
      departement_autre: [this.membre.departement_autre],
      commune: [this.membre.commune, Validators.required],
      commune_nom: [this.membre.commune_nom],
      commune_autre: [this.membre.commune_autre],
      village: [this.membre.village, Validators.required],
      village_nom: [this.membre.village_nom],
      village_autre: [this.membre.village_autre, Validators.required],
      op: [this.membre.op, Validators.required],
      op_nom: [this.membre.op_nom],
      op_code: [this.membre.op_code],
      op_autre: [this.membre.op_autre, Validators.required],
      today: [this.membre.today, Validators.required],
      /*deviceid: [this.membre.deviceid],
      imei: [this.membre.imei],
      phonenumber: [this.membre.phonenumber],
      start: [this.membre.start],
      end: [this.membre.end],
      created_at: [this.membre.created_at],
      created_by: [this.membre.created_by],*/
    });

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




   getMatricule(){
    //let membre = this.membreForm.value;
    let nv:string = this.membre.village;
    let np:string  = this.membre.pays;
    let nr:string = this.membre.region;
    let nd:string =this.membre.departement;
    let nc:string =this.membre.commune;

    /*if(this.membre.pays){
      np = this.membre.pays_nom;
    }else{
      np = this.membre.pays;
    }

    if(this.membre.region){
      nr = this.membre.region_nom
    }else{
      nr = this.membre.region
    }

    if(this.membre.departement){
      nd = this.membre.departement_nom
    }else{
      nd = this.membre.departement
    }

    if(this.membre.communne){
      nc = this.membre.commune_nom
    }else{
      nc = this.membre.commune
    }

    if(this.membre.village){
      nv = this.membre.village_nom
    }else{
      nv = this.membre.village
    }*/

    if(this.nom.length >= 2 && !this.membreForm){
      this.matricule = this.generateId(this.nom.toUpperCase().substr(0, 2)/*, np.toUpperCase().substr(0, 2), nr.toUpperCase().substr(0, 2), nd.toUpperCase().substr(0, 2), nc.toUpperCase().substr(0, 2), nv.toUpperCase().substr(0, 2)*/);
    }else{
       let membre = this.membreForm.value;   
        if(this.nom.length >= 2){
          this.matricule = this.generateId(this.nom.toUpperCase().substr(0, 2)/*, membre.pays.toUpperCase().substr(0, 2), membre.region.toUpperCase().substr(0, 2), membre.departement.toUpperCase().substr(0, 2), membre.commune.toUpperCase().substr(0, 2), this.selectedVillageID.toUpperCase().substr(0, 2)*/);
        } 
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

  chargerAutreNomOP(op){
    if(op !== 'AUTRE'){
      this.nom_autre_op = 'NA';
      /*if(this.selectedOPID !== 'AUTRE'){
      this.ops.forEach((o, i) => {
        if(o.data.num_aggrement === this.selectedOPID){
          //this.membre.op_code = o.data.code_OP;
          this.matricule = this.generateId(o.data.code_OP)
        }
      });
      }*/
    }else{
      this.nom_autre_op = '';
    }
  }

   chargerAutreNomClasse(c){
    if(c !== 'AUTRE'){
      this.nom_autre_classe = 'NA';
    }else{
      this.nom_autre_classe = '';
    }
  }


   modifier(){
      //  let date = new Date();
    let membre = this.membreForm.value;


      this.membre.nom_Membre = membre.nom_Membre;
      this.membre.matricule_Membre = membre.matricule_Membre;
      this.membre.genre = membre.genre;
      this.membre.classe = membre.classe;
      this.membre.classe_nom = membre.classe_nom;
      this.membre.classe_autre = membre.classe_autre;
      this.membre.village = membre.village;
      this.membre.village_nom = membre.village_nom;
      this.membre.village_autre = membre.village_autre;
      this.membre.op = membre.op;
      this.membre.op_nom = membre.op_nom; 
      this.membre.op_autre = membre.op_autre;
      let ida: any;
      if(!this.photoID && this.imageData){
        ida = 'fuma:photo:membre:'+ membre.matricule_Membre;
        this.membre.photoID = ida;
      }
     /* this.membre.pays = membre.pays;
      this.membre.pays_nom = membre.pays_nom;
      this.membre.pays_autre = membre.pays_autre;
      this.membre.region = membre.region;
      this.membre.region_nom = membre.region_nom;
      this.membre.region_autre = membre.region_autre;
      this.membre.departement = membre.departement;
      this.membre.departement_nom = membre.departement_nom;
      this.membre.departement_autre = membre.departement_autre;
      this.membre.commune = membre.commune;
      this.membre.commune_nom = membre.commune_nom;
      this.membre.commune_autre = membre.commune_autre;*/
      //this.membre.today = membre.today;
      /*deviceid: [this.membre.deviceid],
      imei: [this.membre.imei],
      phonenumber: [this.membre.phonenumber],
      start: [this.membre.start],
      end: [this.membre.end],
      created_at: [this.membre.created_at],
      created_by: [this.membre.created_by],*/

    this.villages.forEach((v, i) => {
      if(v.id === this.selectedVillageID){
        this.membre.village = v.id;
        this.membre.village_nom = v.nom;
      }
    })

    if(this.selectedOPID !== 'AUTRE'){
      this.ops.forEach((o, i) => {
        if(o.data.num_aggrement === this.selectedOPID){
          this.membre.op = o.data.num_aggrement;
          this.membre.op_nom = o.data.nom_OP;
          this.membre.op_code = o.data.code_OP;
        }
      });
    }else{
      this.membre.op = this.autreOP.data.num_aggrement;
      this.membre.op_nom = this.autreOP.data.nom_OP;
      this.membre.op_code = this.autreOP.data.code_OP;
    }

    if(this.selectedClasseID !== 'AUTRE'){
      this.classes.forEach((c, i) => {
        if(c.data.id === this.selectedClasseID){
          this.membre.classe = c.data.id;
          this.membre.classe_nom = c.data.nom;
        }
      });
    }else{
      this.membre.classe = this.autreClasse.data.id;
      this.membre.classe_nom = this.autreClasse.data.nom;
    }
    
    //union.village = this.selectedVillage.id;
    //union.village_nom = this.selectedVillage.nom;
    //let id = this.servicePouchdb.generateId('union', union.pays, union.region, union.departement,union.commune, union.village);
    //union._id = 'fuma'+ id;
    //union.end = date.toJSON();

    this.grandMembre.data = this.membre
    this.servicePouchdb.updateDoc(this.grandMembre);
    
    if(this.photoID && this.imageData){
      this.servicePouchdb.getDocById(membre.data.photoID).then((doc) => {
        this.fileName = membre.data.photoID + '.jpeg';
        doc._attachments[this.fileName] = {
          content_type: 'image/jpeg', 
          data: this.imageData
        }

        this.servicePouchdb.put(doc, membre.data.photoID);
      });
       /* var doc = {
        // _id: ida,
          _attachments: {},
          photoID: ida,
          timestamp: new Date().toString()
        }*/

        //this.imageBlob = this.getBase64Image(document.getElementById("imageid"));

      /*  this.fileName = ida + '.jpeg';
        doc._attachments[this.fileName] = {
          content_type: 'image/jpeg', 
          data: this.imageData
        }
*/
        //this.servicePouchdb.createDoc(doc)
       // this.servicePouchdb.put(doc, ida)
  
      }else if(!this.photoID && this.imageData){
        //let ida = 'fuma:photo:membre:'+ membre.matricule_Membre;
        this.membre.photoID = ida;
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
     
    let toast = this.toastCtl.create({
      message: 'Membre bien sauvegardé!',
      position: 'top',
      duration: 3000
    });

    toast.present();
    this.navCtrl.pop();

  }

  annuler(){
    this.navCtrl.pop();
  }


} 
