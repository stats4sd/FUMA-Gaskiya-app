import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, MenuController, Events } from 'ionic-angular';
import { PouchdbProvider } from '../../providers/pouchdb-provider';
import { AjouterMembrePage } from './ajouter-membre/ajouter-membre';
import { DetailMembrePage } from './detail-membre/detail-membre';
import { Storage } from '@ionic/storage';
import { ConfLocaliteEnquetePage } from '../configuration/conf-localite-enquete/conf-localite-enquete';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { global } from '../../global-variables/variable';
import blobUtil from 'blob-util';

/*
  Generated class for the Membres page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/ 
@Component({
  selector: 'page-membres',
  templateUrl: 'membres.html'
})
export class MembresPage {

  selectedSource: any = 'application';
  membres: any = [];
  membresApplication: any = [];
  membresKobo: any = [];
  allMembres: any = [];
  confLocaliteEnquete: any;
  num_aggrement_op: any;
  nom_op: any;
  aProfile: boolean = true;

  constructor(public navCtrl: NavController, public menuCtl: MenuController, public events: Events, public navParams: NavParams, public storage: Storage, public alertCtl: AlertController, public servicePouchdb: PouchdbProvider, private sanitizer: DomSanitizer) {
    
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
    
    if(this.navParams.data.num_aggrement_op){
      this.num_aggrement_op = this.navParams.data.num_aggrement_op;
      this.nom_op = this.navParams.data.nom_op;
    }
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

    if(this.selectedSource === 'application'){
      this.getMembres('fuma:op:membre', 'fuma:op:membre:\uffff');
      /*this.servicePouchdb.getPlageDocs('fuma:op:membre','fuma:op:membre:\uffff').then((mbrs) => {
        if(mbrs){
          this.membres = mbrs;
          this.allMembres = mbrs;
        }
      });*/
    }else if(this.selectedSource === 'kobo'){
      
      this.getMembres('koboSubmission_fuma-op-membre', 'koboSubmission_fuma-op-membre\uffff');

      /*this.servicePouchdb.getPlageDocs('koboSubmission_fuma-op-membre','koboSubmission_fuma-op-membre\uffff').then((mbrs) => {
        if(mbrs){
          this.membres = mbrs;
          this.allMembres = mbrs;
        }
      });*/
    }else{
      
      this.servicePouchdb.getPlageDocs('fuma:op:membre','fuma:op:membre:\uffff').then((mbrA) => {
      
         this.servicePouchdb.getPlageDocs('koboSubmission_fuma-op-membre','koboSubmission_fuma-op-membre\uffff').then((mbrK) => {
          this.membres = mbrA.concat(mbrK);
          this.allMembres = this.membres

       
      }, err => console.log(err));

      }, err => console.log(err));      
    }
    

    this.storage.get('confLocaliteEnquete').then((confLocaliteEnquete) => {
      if(confLocaliteEnquete){
        this.confLocaliteEnquete = confLocaliteEnquete;
      }
      //this.chargerVillages(this.confLocaliteEnquete.commune.id);
    });
  }

  choixSource(){

     if(this.selectedSource === 'application'){
       this.getMembres('fuma:op:membre', 'fuma:op:membre\uffff');
     /* this.servicePouchdb.getPlageDocs('fuma:op:membre','fuma:op:membre:\uffff').then((mbrs) => {
        if(mbrs){
          this.membres = mbrs;
          this.allMembres = mbrs;
        }
      });*/
    }else if(this.selectedSource === 'kobo'){
       this.getMembres('koboSubmission_fuma-op-membre', 'koboSubmission_fuma-op-membre\uffff');
     /* this.servicePouchdb.getPlageDocs('koboSubmission_fuma-op-membre','koboSubmission_fuma-op-membre\uffff').then((mbrs) => {
        if(mbrs){
          this.membres = mbrs;
          this.allMembres = mbrs;
        }
      });*/
    }else{
      
      this.servicePouchdb.getPlageDocs('fuma:op:membre','fuma:op:membre:\uffff').then((mbrA) => {
       
         this.servicePouchdb.getPlageDocs('koboSubmission_fuma-op-membre','koboSubmission_fuma-op-membre\uffff').then((mbrK) => {
          this.membres = mbrA.concat(mbrK);
          this.alertCtl = this.membres

      }, err => console.log(err));

      }, err => console.log(err));
     
      
    }

  }

  ajouter(confLocaliteEnquete){
    if(this.confLocaliteEnquete){
      if(this.num_aggrement_op){
        this.navCtrl.push(AjouterMembrePage, {'confLocaliteEnquete': confLocaliteEnquete, 'num_aggrement_op': this.num_aggrement_op, 'nom_op': this.nom_op});
      }else{
        this.navCtrl.push(AjouterMembrePage, {'confLocaliteEnquete': confLocaliteEnquete});
      }
      
    }else{
      let alert = this.alertCtl.create({
        title: 'Erreur',
        message: 'Vous devez d\'abord définir la configuration de la localité à enquêtée!',
        buttons: [
          {
            text: 'Définir localité',
            handler:  () => {
              this.navCtrl.push(ConfLocaliteEnquetePage);
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

  detail(membre, selectedSource){
    this.navCtrl.push(DetailMembrePage, {'membre': membre, 'selectedSource': selectedSource});
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.membres = this.allMembres;

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.membres = this.membres.filter((item) => {
        return (item.doc.data.nom_Membre.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    } 
  }

  getMembres(strk, endk) {
    this.servicePouchdb.getAll(
      {
        startkey: strk,
        endkey: endk,
        include_docs: true
      },
    ).then(
      res => {
        var membres = res.rows
        var promises = membres.map(function (membre) {
          return this.getPhoto(membre)
        }.bind(this))
        return Promise.all(promises).then(
          res => {
            let m: any = res
            if(this.num_aggrement_op){
              let mbrs: any = [];
              m.forEach((mbr, i) => {
                if(mbr.doc.data.op === this.num_aggrement_op){
                  mbrs.push(mbr);
                }
              });

            this.membres = mbrs
            this.allMembres=mbrs
            }else{
              this.membres = res
              this.allMembres=res
            }
           
          }
        )
      }
      )
  }

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
          resolve(membre)
          }else{
            //var blobURL = blobUtil.createObjectURL(url);
            //URL.createObjectURL()
            membre.photo = this.sanitizer.bypassSecurityTrustUrl(url);
            if (url != "assets/images/no-photo.png") {
              membre.photoDocId = photoDocId;
            } 
          resolve(membre)
          }
        
         }
      }).catch(err => {
        console.log('err', err)
        // profile.photo = 
        // resolve(profile)
      })
    })
  }

}
