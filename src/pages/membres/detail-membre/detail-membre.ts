import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams,  AlertController, ToastController } from 'ionic-angular';
import { PouchdbProvider } from '../../../providers/pouchdb-provider';
import { ModifierMembrePage } from '../modifier-membre/modifier-membre';
import JsBarcode from 'jsbarcode';
import { ChampsPage } from  '../../champs/champs';
import { EssaiPage } from  '../../essai/essai';

/*
  Generated class for the DetailMembre page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
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

  constructor(public servicePouchdb: PouchdbProvider, public toastCtl: ToastController, public alertCtl: AlertController, public navCtrl: NavController, public navParams: NavParams) {
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
      }
      );
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


  editer(membre){
    this.navCtrl.push(ModifierMembrePage, {'membre': membre});
  }

  mesChamps(matricule, nom){
    this.navCtrl.push(ChampsPage, {'matricule_producteur': matricule, 'nom_producteur': nom})
  }

  mesEssai(matricule, nom){
    this.navCtrl.push(EssaiPage, {'matricule_producteur': matricule, 'nom_producteur': nom})
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
