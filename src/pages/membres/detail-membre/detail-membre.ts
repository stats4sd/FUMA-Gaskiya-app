import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams,  AlertController, ModalController, IonicPage, ToastController } from 'ionic-angular';
import { PouchdbProvider } from '../../../providers/pouchdb-provider';
//import { ModifierMembrePage } from '../modifier-membre/modifier-membre';
import JsBarcode from 'jsbarcode';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
//import { ChampsPage } from  '../../champs/champs';
//import { EssaiPage } from  '../../essai/essai';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Camera } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';
import { Storage } from '@ionic/storage';

/*
  Generated class for the DetailMembre page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()
@Component({
  selector: 'page-detail-membre',
  templateUrl: 'detail-membre.html'
})
export class DetailMembrePage {

  membre: any = {};
  selectedSource: any;
  membreID: any;
  // profile: any;
  public picture; 
  membreData: any=[];
  photo: any;

  membreForm: any;
  grandMembre: any;
  membre1: any;
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
  ancien_matricule: any = '';
  nom:any = '';
  ancien_nom:any = '';

  ancien_OP: any;
  ancien_nom_op: any;
  ancien_code_op: any;
  generate: boolean = false;
  public base64Image: string;
  public showCamera = true;
  //instanceID: string;
  imageData: any;
  attachments:any;
  //photo: any;
  aProfile: boolean = true;
  fileName: any;
  imageBlob:any;
  photoID: any;
  photoRev: any;
  modifierForm: boolean = false;

  mes_champs: any = [];
  mes_essais: any = [];


  @ViewChild('barcode') barcode: ElementRef;

  constructor(public servicePouchdb: PouchdbProvider, public storage: Storage, public formBuilder: FormBuilder, public modelCtl: ModalController, public imagePicker: ImagePicker, private camera: Camera, private sanitizer: DomSanitizer, public toastCtl: ToastController, public alertCtl: AlertController, public navCtrl: NavController, public navParams: NavParams) {
    this.membre = this.navParams.data.membre;
    this.selectedSource = this.navParams.data.selectedSource;
    this.membreID = this.membre.doc._id;
    //this.prepareMeta();
  }

  chargerMesChamps(matricule){
    this.servicePouchdb.getPlageDocs('fuma:champs:'+matricule, 'fuma:champs:'+matricule+' \uffff').then((c) => {
      if(c){
        this.mes_champs = c;
      }
      
    })
  }

  chargerMesEssai(matricule){
    this.servicePouchdb.getPlageDocs('fuma:essai:'+matricule, 'fuma:essai:'+matricule+' \uffff').then((e) => {
      if(e){
        this.mes_essais = e;
      }
    });
  }

  changerOP(ancienMatricule, nouveauMatricule, nomProducteur){
    let nouveauChamps: any = [];
    let nouveauEssai: any = [];
    let id_champs: any = '';
    let nChamps: any = {};
    this.mes_champs.map((champs) => {
      
      let code_champs = this.generateIdChamps(nouveauMatricule);
      let nouveauChamp: any = {};
      let data = champs.data;
      let id = 'fuma'+':champs:'+ code_champs;
      //nouveauChamp.data = 
      data.ancien_id_champs = champs.data.id_champs;
      data.id_champs = code_champs;
      data.matricule_producteur = nouveauMatricule;
      data.ancien_matricule_producteur = ancienMatricule;
      data.nom_producteur = nomProducteur;
      nouveauChamp._id = id;
      nouveauChamp.data = data;
      
      nouveauChamps.push(nouveauChamp);
      this.servicePouchdb.remove(champs._id);
      this.servicePouchdb.createDoc(nouveauChamp);
      nouveauChamp = {};
    });

    if(nouveauChamps.length > 0){
      this.mes_essais.map((essai) => {
      let code_essai = this.generateIdEssai(nouveauMatricule);
      let id = 'fuma'+':essai:'+ code_essai;
      let nouveauEssai: any = {};
      let data = essai.data;
      //let id_champs = data.id_champs;
      data.ancien_code_essai = essai.data.code_essai;
      data.code_essai = code_essai
      
      if(id_champs !== essai.data.id_champs){
        nouveauChamps.map((champs) => {
          if(champs.data.ancien_id_champs === data.id_champs){
            id_champs = champs.data.ancien_id_champs;
            nChamps = champs;
            data.ancien_id_champs = essai.data.id_champs;
            data.id_champs = champs.data.id_champs;
            data.matricule_producteur = nouveauMatricule;
            data.ancien_matricule_producteur = ancienMatricule;
            data.nom_producteur = nomProducteur;
            }
          });
      }else{
        data.ancien_id_champs = essai.data.id_champs;
        data.id_champs = nChamps.data.id_champs;
        data.matricule_producteur = nouveauMatricule;
        data.ancien_matricule_producteur = ancienMatricule;
        data.nom_producteur = nomProducteur;
      }
      nouveauEssai._id = id;
      nouveauEssai.data = data;
      
      this.servicePouchdb.remove(essai._id);
      this.servicePouchdb.createDoc(nouveauEssai);
      nouveauEssai = {};
      });
    }/*else{
      alert('Erreur mise à jour des essais, la liste des champs est vide!')
    }*/
    
  }


  changerNom(ancienNom, nouveauNom){
    this.mes_champs.map((champs) => {
      
      champs.data.nom_producteur = nouveauNom;
      this.servicePouchdb.updateDoc(champs)
    });   

    this.mes_essais.map((essai) => {
      essai.data.nom_producteur = nouveauNom;
      this.servicePouchdb.updateDoc(essai);
    });    
  }

  generateIdEssai(matricule){
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

    generateIdChamps(matricule){
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


  initForm(){
    this.grandMembre = this.navParams.data.membre;
    this.photoID = this.grandMembre.photoDocId;
    this.photoRev = this.grandMembre.photoDocRev;
    this.photo = this.grandMembre.photo;
    
    /*this.servicePouchdb.getPlageDocs('fuma:classe','fuma:classe:\uffff').then((cA) => {
         this.servicePouchdb.getPlageDocs('koboSubmission_fuma-classe','koboSubmission_fuma-classe\uffff').then((cK) => {
          this.classes = cA.concat(cK);
          this.classes.push(this.autreClasse);
      }, err => console.log(err));

    }, err => console.log(err));*/
    
    this.classes.push(this.autreClasse);

    this.membre1 = this.grandMembre.doc.data;
    this.selectedClasseID = this.membre1.classe;
    this.selectedOPID = this.membre1.op;
    this.ancienSelectedOPID = this.membre1.op;
    this.selectedVillageID = this.membre1.village;
    this.matricule = this.membre1.matricule_Membre;
    this.ancien_matricule = this.membre1.matricule_Membre;
    this.ancien_OP = this.membre1.op;
    this.ancien_nom_op = this.membre1.op_nom;
    this.ancien_code_op = this.membre1.op_code;
    this.nom = this.membre1.nom_Membre;
    this.ancien_nom = this.membre1.nom_Membre;
    if(!this.matricule){
      this.getMatricule();
      this.generate = true;
    }

    if(this.membre1.village_autre){
        this.nom_autre_village = this.membre1.village_autre;
      }else{
        this.nom_autre_village = 'NA';
    }

    if(this.membre1.op_autre) {
        this.nom_autre_op = this.membre1.op_autre;
    }else{
      this.nom_autre_op = 'NA';
    }

     if(this.membre1.classe_autre) {
        this.nom_autre_classe = this.membre1.classe_autre;
    }else{
      this.nom_autre_classe = 'NA';
    }

    this.chargerVillages(this.membre1.commune);


    this.membreForm = this.formBuilder.group({
      //_id:[''],
      nom_Membre: [this.membre1.nom_Membre, Validators.required],
      matricule_Membre: [this.membre1.matricule_Membre, Validators.required],
      genre: [this.membre1.genre, Validators.required],
      classe: [this.membre1.classe],
      classe_nom: [this.membre1.classe_nom],
      classe_autre: [this.membre1.classe_autre],
      pays: [this.membre1.pays, Validators.required],
      pays_nom: [this.membre1.pays_nom],
      pays_autre: [this.membre1.pays_autre],
      region: [this.membre1.region, Validators.required],
      region_nom: [this.membre1.region_nom],
      region_autre: [this.membre1.region_autre],
      departement: [this.membre1.departement, Validators.required],
      departement_nom: [this.membre1.departement_nom],
      departement_autre: [this.membre1.departement_autre],
      commune: [this.membre1.commune, Validators.required],
      commune_nom: [this.membre1.commune_nom],
      commune_autre: [this.membre1.commune_autre],
      village: [this.membre1.village, Validators.required],
      village_nom: [this.membre1.village_nom],
      village_autre: [this.membre1.village_autre, Validators.required],
      op: [this.membre1.op, Validators.required],
      op_nom: [this.membre1.op_nom],
      op_code: [this.membre1.op_code],
      op_autre: [this.membre1.op_autre, Validators.required],
      today: [this.membre1.today, Validators.required],
      /*deviceid: [this.membre.deviceid],
      imei: [this.membre.imei],
      phonenumber: [this.membre.phonenumber],
      start: [this.membre.start],
      end: [this.membre.end],
      created_at: [this.membre.created_at],
      created_by: [this.membre.created_by],*/
    });

  }

  getAllOP(){
    this.servicePouchdb.getPlageDocs('fuma:op','fuma:op:\uffff').then((oA) => {
         this.servicePouchdb.getPlageDocs('koboSubmission_fuma-op','koboSubmission_fuma-op\uffff').then((oK) => {
          this.ops = oA.concat(oK);
          //this.ops.push(this.autreOP);
      }, err => console.log(err));

    }, err => console.log(err)); 
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

  getMatricule(){
    //let membre = this.membreForm.value;
    let nv:string = this.membre1.village;
    let np:string  = this.membre1.pays;
    let nr:string = this.membre1.region;
    let nd:string =this.membre1.departement;
    let nc:string =this.membre1.commune;

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
    //var Id= 'FM-'+ code_op + ' ' + randomString// operation+' '/*+pays+'-'+region+'-'+department+'-'+commune +'-' +village+ */+randomString 
    var Id= 'FM-'+ code_op + ' ' + randomString// operation+' '/*+pays+'-'+region+'-'+department+'-'+commune +'-' +village+ */+randomString 
    //var Id= 'MR-'+ code_op + ' ' + randomString// operation+' '/*+pays+'-'+region+'-'+department+'-'+commune +'-' +village+ */+randomString 
    
    return Id
  }

  getAllMembres(){
    this.storage.get('confLocaliteEnquete').then((confLocaliteEnquete) => {
      if(confLocaliteEnquete){
        this.confLocaliteEnquete = confLocaliteEnquete;
      }
      //this.chargerVillages(this.confLocaliteEnquete.commune.id);
    });

    this.servicePouchdb.getPlageDocs('fuma:op:membre','fuma:op:membre:\uffff').then((mbrsA) => {
         this.servicePouchdb.getPlageDocs('koboSubmission_fuma-op-membre','koboSubmission_fuma-op-membre\uffff').then((mbrsK) => {
          this.allMembres = mbrsA.concat(mbrsK);
      }, err => console.log(err));

      }, err => console.log(err));      
  }

  getAllUnion(){
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
      let model = this.modelCtl.create('AjouterVillagePage', {'id_commune':this.membre1.commune, 'nom_commune': this.membre1.commune_nom});
      model.present();
      model.onDidDismiss(() => {
        this.chargerVillages(this.membre1.commune);
        this.selectedVillageID = '';
      })
      this.nom_autre_village = '';
    }
  }

   chargerOp(){
    //this.nom_op
     this.servicePouchdb.getPlageDocs('fuma:op','fuma:op:\uffff').then((oA) => {
         this.servicePouchdb.getPlageDocs('koboSubmission_fuma-op','koboSubmission_fuma-op\uffff').then((oK) => {
          this.ops = oA.concat(oK);
          //this.ops.push(this.autreOP);
      }, err => console.log(err));

    }, err => console.log(err)); 
    
  }

  generateMatriculeNouveau(code_op/*operation, /*pays, region, departement, commune, village*/){

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
    //var Id= 'FM-'+ code_op + ' ' + randomString// operation+' '/*+pays+'-'+region+'-'+department+'-'+commune +'-' +village+ */+randomString 
    var Id= 'FM-'+ code_op + ' ' + randomString// operation+' '/*+pays+'-'+region+'-'+department+'-'+commune +'-' +village+ */+randomString 
    //var Id= 'MR-'+ code_op + ' ' + randomString// operation+' '/*+pays+'-'+region+'-'+department+'-'+commune +'-' +village+ */+randomString 
    
    return Id
  }


  chargerAutreNomOP(op){
    if(op !== this.ancien_OP){
      this.ops.forEach((o, i) => {
        if(o.data.num_aggrement === op){
          this.membre1.op = o.data.num_aggrement;
          this.membre1.op_nom = o.data.nom_OP;
          this.membre1.op_code = o.data.code_OP;
          this.matricule = this.generateMatriculeNouveau(o.data.code_OP);
        }
      });
    }else{
      this.membre1.op = this.ancien_OP;
      this.membre1.op_nom = this.ancien_nom_op;
      this.membre1.op_code = this.ancien_code_op;
      this.matricule = this.ancien_matricule;
    }
    if(op !== 'AUTRE'){
      this.nom_autre_op = 'NA';
    }else{
      let model = this.modelCtl.create('AjouterOpPage', {'confLocaliteEnquete': this.confLocaliteEnquete});
        model.present();
        model.onDidDismiss(() => {
          this.chargerOp();
          this.selectedOPID = '';
      })
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


   modifierMembre(){
      //  let date = new Date();
    let membre = this.membreForm.value;


      this.membre1.nom_Membre = membre.nom_Membre;
      if(this.ancien_matricule !== membre.matricule_Membre){
        this.membre1.ancien_matricule_Membre = this.membre1.matricule_Membre;
        this.membre1.matricule_Membre = membre.matricule_Membre;
      }else{
        this.membre1.matricule_Membre = membre.matricule_Membre;
      }
      this.membre1.genre = membre.genre;
      this.membre1.classe = membre.classe;
      this.membre1.classe_nom = membre.classe_nom;
      this.membre1.classe_autre = membre.classe_autre;
      this.membre1.village = membre.village;
      this.membre1.village_nom = membre.village_nom;
      this.membre1.village_autre = membre.village_autre;
      this.membre1.op = membre.op;
      this.membre1.op_nom = membre.op_nom; 
      this.membre1.op_autre = membre.op_autre;
      let ida: any;
      if(!this.photoID && this.imageData){
        ida = 'fuma:photo:membre:'+ membre.matricule_Membre;
        this.membre1.photoID = ida;
      }

    this.villages.forEach((v, i) => {
      if(v.id === this.selectedVillageID){
        this.membre1.village = v.id;
        this.membre1.village_nom = v.nom;
      }
    })

    /*if(this.selectedOPID !== 'AUTRE'){
      this.ops.forEach((o, i) => {
        if(o.data.num_aggrement === this.selectedOPID){
          this.membre1.op = o.data.num_aggrement;
          this.membre1.op_nom = o.data.nom_OP;
          this.membre1.op_code = o.data.code_OP;
        }
      });
    }else{
      this.membre1.op = this.autreOP.data.num_aggrement;
      this.membre1.op_nom = this.autreOP.data.nom_OP;
      this.membre1.op_code = this.autreOP.data.code_OP;
    }*/

    /*if(this.selectedClasseID !== 'AUTRE'){
      this.classes.forEach((c, i) => {
        if(c.data.id === this.selectedClasseID){
          this.membre1.classe = c.data.id;
          this.membre1.classe_nom = c.data.nom;
        }
      });
    }else{
      this.membre1.classe = this.autreClasse.data.id;
      this.membre1.classe_nom = this.autreClasse.data.nom;
    }*/
     
    
    this.grandMembre.doc.data = this.membre1
    this.servicePouchdb.updateDocReturn(this.grandMembre.doc).then((res) => {
      //en cas de changement d'op
      if(this.membre1.op !== this.ancien_OP){
        this.changerOP(this.ancien_matricule, membre.matricule_Membre, membre.nom_Membre)
      }else if(this.membre1.nom_Membre !== this.ancien_nom){
        this.changerNom(this.ancien_nom, this.membre1.nom_Membre);
      }      

      //mise à jour de la photo
      this.grandMembre.doc._rev = res.rev;

      if(this.photoID && this.imageData){
      //mise a jour

        this.servicePouchdb.updateAtachementReturn(this.photoID, this.photoID + '.jpeg', this.photoRev, this.imageData , 'image/jpeg').then((res) => {
          this.grandMembre.photo = this.photo;
          this.grandMembre.photoDocId = this.photoID;
          this.grandMembre.photoDocRev = res.rev
          this.membre = this.grandMembre;

          var membreID=this.membre.doc.data.matricule_Membre || 'pending';
          JsBarcode(this.barcode.nativeElement, membreID,{
            width: 1,
            height:50
          });
          let toast = this.toastCtl.create({
          message: 'Membre bien sauvegardé!',
          position: 'top',
          duration: 1000
        });

        //this.navCtrl.pop();
        this.modifierForm = false;
        toast.present();
        })
        
        
      }else if(!this.photoID && this.imageData){
        //creation
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
       this.servicePouchdb.put(doc, ida).then((res) => {
         this.grandMembre.photo = this.photo;
         this.grandMembre.photoDocId = ida;
         this.grandMembre.photoDocRev = res.rev;
         this.membre = this.grandMembre;
         
          var membreID=this.membre.doc.data.matricule_Membre || 'pending';
          JsBarcode(this.barcode.nativeElement, membreID,{
            width: 1,
            height:50
          });
         let toast = this.toastCtl.create({
          message: 'Membre bien sauvegardé!',
          position: 'top',
          duration: 1000
        });

        //this.navCtrl.pop();
        this.modifierForm = false;
        toast.present();
       });

      }else{
         this.membre = this.grandMembre;
         var membreID=this.membre.doc.data.matricule_Membre || 'pending';
          JsBarcode(this.barcode.nativeElement, membreID,{
            width: 1,
            height:50
          });

        let toast = this.toastCtl.create({
          message: 'Membre bien sauvegardé!',
          position: 'top',
          duration: 1000
        });

        //this.navCtrl.pop();
        this.modifierForm = false;
        
        toast.present();
      }
    
    });

  }

  annuler(){
    //this.navCtrl.pop();
    this.modifierForm = false;
  }

  ionViewDidEnter() {
    //console.log('ionViewDidLoad DetailUnionPage');
    /*this.servicePouchdb.getDocById(this.membreID).then((mbr) => {
      //this.membre = mbr;
      var membreID=this.membre.doc.data.matricule_Membre || 'pending'
      JsBarcode(this.barcode.nativeElement, membreID,{
        width: 1,
        height:50
      });
      this.membre.doc.data = mbr.data;
      this.membre.doc._id = mbr._id;
      this.membre.doc._rev = mbr._rev;
      this.getPhoto(this.membre)
    }, err => console.log(err))*/
    var membreID=this.membre.doc.data.matricule_Membre || 'pending'
      JsBarcode(this.barcode.nativeElement, membreID,{
        width: 1,
        height:50
      });

    this.initForm();
    this.getAllMembres();
    this.getAllOP();
    this.chargerMesChamps(this.ancien_matricule);
    this.chargerMesEssai(this.ancien_matricule);
    //this.getAllUnion();

    
  }

  /*ionViewDidLoad() {
    // var fumaID=this.profile.doc.fumaID.split(' ')[1] || 'pending'
    var membreID=this.membre.data.matricule_Membre || 'pending'
    JsBarcode(this.barcode.nativeElement, membreID,{
      width: 1,
      height:50
    }
    );
  }*/

 getPhoto(membre) {
    return new Promise((resolve, reject) => {
      //var v = true;
      var photoDocId = '';
      var filename = '';
      if(!membre.doc.data.photoID){
        var profilePhotoId = membre.doc.data["meta/deprecatedID"];
        photoDocId = 'photos_fuma-op-membre/' + profilePhotoId;
        filename = profilePhotoId + '.jpeg';
        //v = false;
      }else{
        photoDocId = membre.doc.data.photoID;
        filename = photoDocId + '.jpeg';
        //v = true;
        //alert(v)
      }

      //var profilePhotoId = membre.doc.data["meta/deprecatedID"]
      // return 'assets/images/no photo.jpg'
      //this.servicePouchdb.getAttachment('photos_fuma-op-membre/' + profilePhotoId, filename).then(url => {
      this.servicePouchdb.getAttachment(photoDocId, filename).then(url => {
         //membre.photo = this.sanitizer.bypassSecurityTrustUrl(url)
         if(url){
           if(!membre.doc.data.photoID){
            membre.photo = this.sanitizer.bypassSecurityTrustUrl(url)
            if (url != "assets/images/no-photo.png") {
              membre.photoDocId = photoDocId;
            } 

            this.servicePouchdb.getDocById(photoDocId).then((doc) => {
              if(doc){
                membre.photoDocRev = doc._rev;
              }
              resolve(membre)
            }, err => resolve(membre)).catch(() => resolve(membre))
            
          }else{
            //var blobURL = blobUtil.createObjectURL(url);
            //URL.createObjectURL()
            membre.photo = this.sanitizer.bypassSecurityTrustUrl(url);
            if (url != "assets/images/no-photo.png") {
              membre.photoDocId = photoDocId;

            } 

            this.servicePouchdb.getDocById(photoDocId).then((doc) => {
              if(doc){
                membre.photoDocRev = doc._rev;
              }
              resolve(membre)
            }, err => resolve(membre)).catch(() => resolve(membre))
            //resolve(membre)
          }
        
         }
      }).catch(err => {
        console.log('err', err)
        // profile.photo = 
        // resolve(profile)
      })
    })
  }


  prepareMeta() {
    // save all profile data fields in array for repeat. omit doc meta '_' and specific keys
    var omittedFields = {
      "meta/instanceName": true,
      "meta/deprecatedID": true,
      "phonenumber": true,
      "meta/instanceID": true,
      "formhub/uuid": true,
      "end": true,
      "start": true,
      "deviceid": true,
      "created_at": true,
      "created_by": true
    }
    let json = this.membre.data;
    for (let key in json) {
      if (key[0] != "_" && !omittedFields[key]) {
        this.membreData.push({ $key: key, $val:json[key]})
      }
    }
  }


  editer(membre, photo, photoID, photoRev){
    //this.navCtrl.push('ModifierMembrePage', {'membre': membre, 'photo': photo, 'photoID': photoID, 'photoRev': photoRev});
    this.modifierForm = true;
  }

  mesChamps(matricule, nom, membre){
    this.navCtrl.push('ChampsPage', {'matricule_producteur': matricule, 'nom_producteur': nom, 'membre': membre})
  }

  mesEssai(matricule, nom, membre){
    this.navCtrl.push('EssaiPage', {'matricule_producteur': matricule, 'nom_producteur': nom, 'membre': membre})
  }

  supprimer(membre){
    let alert = this.alertCtl.create({
      title: 'Suppression membre OP',
      message: 'Etes vous sûr de vouloir supprimer ce membre ?',
      buttons:[
        {
          text: 'Annuler',
          handler: () => console.log('suppression annulée')
 
        },
        {
          text: 'Confirmer',
          handler: () => {
            this.servicePouchdb.deleteDoc(membre);
            if(membre.data.photoID){
              this.servicePouchdb.getDocById(membre.data.photoID).then((doc) => {
                if(doc){
                  this.servicePouchdb.delete(doc)
                }
              }, err => console.log(err))
              
            }
            let toast = this.toastCtl.create({
              message:'Membre OP bien suppriée',
              position: 'top',
              duration: 3000
            });

            toast.present();
            this.navCtrl.pop();
          }
        }
      ]
    });

    alert.present();
  }



}
