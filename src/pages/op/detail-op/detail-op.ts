import { Component } from '@angular/core';
import { NavController, NavParams,  AlertController, ToastController, MenuController, Events } from 'ionic-angular';
import { PouchdbProvider } from '../../../providers/pouchdb-provider';
import { ModifierOpPage } from '../modifier-op/modifier-op';
import { MembresPage } from '../../membres/membres'
import { global } from '../../../global-variables/variable'
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
   aProfile: boolean = true;

  constructor(public servicePouchdb: PouchdbProvider, public toastCtl: ToastController, public menuCtl: MenuController, public events: Events, public alertCtl: AlertController, public navCtrl: NavController, public navParams: NavParams) {
    
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
    
    this.op = this.navParams.data.op;
    this.selectedSource = this.navParams.data.selectedSource;
    this.opID = this.op._id;
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

    //console.log('ionViewDidLoad DetailUnionPage');
    this.servicePouchdb.getDocById(this.opID).then((o) => {
      this.op = o;
    }, err => console.log(err))
  }

  editer(op){
    this.navCtrl.push(ModifierOpPage, {'op': op});
  }

  membresOP(num_aggrement, nom_OP){
    this.navCtrl.push(MembresPage, {'num_aggrement_op': num_aggrement, 'nom_op': nom_OP});
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
      