import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PouchdbProvider } from '../../providers/pouchdb-provider';
import { AjouterTypeSolePage } from './ajouter-type-sole/ajouter-type-sole';
import { DetailTypeSolePage } from './detail-type-sole/detail-type-sole';
import { Storage } from '@ionic/storage';

/*
  Generated class for the TypeSole page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-type-sole',
  templateUrl: 'type-sole.html'
})
export class TypeSolePage {

  typeSoles: any = [];
  allTypeSoles: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public servicePouchdb: PouchdbProvider) {}

  ionViewDidEnter() {
    this.servicePouchdb.getPlageDocs('fuma:type-sole','fuma:type-sole:\uffff').then((typeSoles) => {
        if(typeSoles){
          this.typeSoles = typeSoles;
          this.allTypeSoles = typeSoles;
        }
      }, err => console.log(err));
  } 

  ajouter(){
    this.navCtrl.push(AjouterTypeSolePage);
  }

  detail(typeSole){
    this.navCtrl.push(DetailTypeSolePage, {'typeSole': typeSole});
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.typeSoles = this.allTypeSoles;

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.typeSoles = this.typeSoles.filter((item) => {
        return (item.data.nom.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
  }

} 
