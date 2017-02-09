import { Component, NgZone } from '@angular/core';
import { NavController } from 'ionic-angular';

import { HomePage } from './home/home';
import { CollectPage } from './collect/collect';
import { ResearchPage } from './research/research';
import { ProfilePage } from './profile/profile';
import { AdminPage } from './admin/admin';

import { FormViewPage } from '../form-view/form-view'
import { PouchdbProvider } from '../../providers/pouchdb-provider'

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})  
export class TabsPage {
  
  // public showFormTab = false;

  // onShowForm(agreed: boolean) {
  //   this.showFormTab=true
  // }

  // include formview as unselectable tab to keep window open after form filled
  tab1Root: any = HomePage;
  tab2Root: any = CollectPage;
  tab3Root: any = ResearchPage;
  tab4Root: any = ProfilePage;
  tab5Root: any = AdminPage;
  tab6Root: any = FormViewPage;



  constructor(private database: PouchdbProvider, private zone: NgZone) {

  }

  public ionViewDidEnter() {
    console.log('syncing database')
    this.database.sync();
    this.database.getChangeListener().subscribe(data => {
      this.zone.run(() => {
        //this.items.push(data.doc);
      });
    });
  }
}
