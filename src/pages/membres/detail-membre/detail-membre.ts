import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams,  AlertController, IonicPage, ToastController } from 'ionic-angular';
import { PouchdbProvider } from '../../../providers/pouchdb-provider';
//import { ModifierMembrePage } from '../modifier-membre/modifier-membre';
import JsBarcode from 'jsbarcode';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
//import { ChampsPage } from  '../../champs/champs';
//import { EssaiPage } from  '../../essai/essai';

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

  @ViewChild('barcode') barcode: ElementRef;

  constructor(public servicePouchdb: PouchdbProvider, private sanitizer: DomSanitizer, public toastCtl: ToastController, public alertCtl: AlertController, public navCtrl: NavController, public navParams: NavParams) {
    this.membre = this.navParams.data.membre;
    this.selectedSource = this.navParams.data.selectedSource;
    this.membreID = this.membre.doc._id;
    this.prepareMeta();
  }


  ionViewDidEnter() {
    //console.log('ionViewDidLoad DetailUnionPage');
    this.servicePouchdb.getDocById(this.membreID).then((mbr) => {
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
    }, err => console.log(err))

    
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
    this.navCtrl.push('ModifierMembrePage', {'membre': membre, 'photo': photo, 'photoID': photoID, 'photoRev': photoRev});
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
