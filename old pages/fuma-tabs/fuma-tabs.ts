import { Component, NgZone } from '@angular/core';
import { NavController } from 'ionic-angular';

import { FumaHomePage } from './fuma-home/fuma-home';
import { FumaResearchPage } from './fuma-research/fuma-research';
import { FumaAdminPage } from './fuma-admin/fuma-admin';
import {PouchdbProvider} from '../../providers/pouchdb-provider'

@Component({
  selector: 'page-fuma-tabs',
  templateUrl: 'fuma-tabs.html'
})
export class FumaTabsPage {

  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = FumaHomePage;
  tab2Root: any = FumaResearchPage;
  tab3Root: any = FumaAdminPage;  
  

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
