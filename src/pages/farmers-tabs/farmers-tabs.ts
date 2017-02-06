import { Component, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { FarmersHomePage } from './farmers-home/farmers-home';
import { FarmersResearchPage } from './farmers-research/farmers-research';
import { FarmersProfilePage } from './farmers-profile/farmers-profile';
import {PouchdbProvider} from '../../providers/pouchdb-provider'

@Component({
  selector: 'page-farmers-tabs',
  templateUrl: 'farmers-tabs.html'
})
export class FarmersTabsPage {

  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = FarmersHomePage;
  tab2Root: any = FarmersResearchPage;
  tab3Root: any = FarmersProfilePage;

  constructor(private database:PouchdbProvider, private zone:NgZone) {

  }

  public ionViewDidEnter() {
    this.database.sync();
    this.database.getChangeListener().subscribe(data => {
        this.zone.run(() => {
            //this.items.push(data.doc);
        });
    });
}
}
