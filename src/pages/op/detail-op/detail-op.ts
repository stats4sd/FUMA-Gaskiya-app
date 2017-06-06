import { Component } from '@angular/core';
import { NavController, NavParams,  AlertController, ToastController } from 'ionic-angular';
import { PouchdbProvider } from '../../../providers/pouchdb-provider';
import { ModifierOpPage } from '../modifier-op/modifier-op';

/* 
  Generated class for the DetailOp page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-detail-op',
  templateUrl: 'detail-op.html'
})
export class DetailOpPage {

  op: any = {};
  selectedSource: any;
  opID: any;

  constructor(public servicePouchdb: PouchdbProvider, public toastCtl: ToastController, public alertCtl: AlertController, public navCtrl: NavController, public navParams: NavParams) {
    this.op = this.navParams.data.op;
    this.selectedSource = this.navParams.data.selectedSource;
    this.opID = this.op._id;
  }

   ionViewDidEnter() {
    //console.log('ionViewDidLoad DetailUnionPage');
    this.servicePouchdb.getDocById(this.opID).then((o) => {
      this.op = o;
    }, err => console.log(err))
  }

  editer(op){
    this.navCtrl.push(ModifierOpPage, {'op': op});
  }

  supprimer(op){
    let alert = this.alertCtl.create({
      title: 'Suppression OP',
      message: 'Etes vous sûr de vouloir supprimer cette OP ?',
      buttons:[
        {
          text: 'Annuler',
          handler: () => console.log('suppression annulée')
 
        },
        {
          text: 'Confirmer',
          handler: () => {
            this.servicePouchdb.deleteDoc(op);
            let toast = this.toastCtl.create({
              message:'OP bien suppriée',
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
      