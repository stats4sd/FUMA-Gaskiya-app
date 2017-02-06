import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {PouchdbProvider} from '../../../providers/pouchdb-provider'

/*
  Generated class for the FarmersResearch page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-farmers-research',
  templateUrl: 'farmers-research.html'
})
export class FarmersResearchPage {
  researchData:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private database:PouchdbProvider) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad FarmersResearchPage');
    this.database.getAll({
      include_docs:true
    }).then(result=>{
      this.researchData=result.rows;
      console.log(result)
    })
  }

}
