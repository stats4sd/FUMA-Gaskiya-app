import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {TabsPage} from '../tabs/tabs';


@Component({
  selector: 'page-start',
  templateUrl: 'start.html'
})
export class StartPage {
  viewSets:any

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.viewSets=[
      {name:'farmer',displayName:'Farmers',icon:false,img:false},
      {name:'organisation',displayName:'Organisations',icon:false,img:false},
      {name:'union',displayName:'Unions',icon:false,img:false},
      {name:'fuma-gaskiya',displayName:'FUMA Gaskiya',icon:false,img:false},
    ]
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StartPage');
  }
  viewSelect() {
    //set to database type of view selected
    this.navCtrl.push(TabsPage)
  }

}
