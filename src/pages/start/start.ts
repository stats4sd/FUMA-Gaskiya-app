import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {FarmersTabsPage} from '../farmers-tabs/farmers-tabs';
import {OrganisationsPage} from '../organisations/organisations';
import {UnionsPage} from '../unions/unions';
import {FumaTabsPage} from '../fuma-tabs/fuma-tabs';


@Component({
  selector: 'page-start',
  templateUrl: 'start.html'
})
export class StartPage {
  viewSets:any

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.viewSets=[
      {name:'farmers-tabs',page:FarmersTabsPage,displayName:'Farmers',icon:false,img:false},
      {name:'organisations',page:OrganisationsPage,displayName:'Organisations',icon:false,img:false},
      {name:'unions',page:UnionsPage,displayName:'Unions',icon:false,img:false},
      {name:'fuma-gaskiya',page:FumaTabsPage,displayName:'FUMA Gaskiya',icon:false,img:false},
    ]
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StartPage');
  }

}
