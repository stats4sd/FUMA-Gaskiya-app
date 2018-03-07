import { Component, NgZone } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
/*
import { HomePage } from './home/home';
import { CollectPage } from './collect/collect';
import { ResearchPage } from './research/research';
import { ProfilePage } from './profile/profile';
import { AdminPage } from './admin/admin';
*/
//import { FormViewPage } from '../form-view/form-view'
import { PouchdbProvider } from '../../providers/pouchdb-provider'
import { TranslateService  } from '@ngx-translate/core';
import { global } from '../../global-variables/variable'
/*
import { UnionsPage } from '../unions/unions'
import { OpPage } from '../op/op'
import { MembresPage } from '../membres/membres'
import { EssaiPage } from '../essai/essai';
*/
@IonicPage()
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
  tab1Root: any = 'HomePage';
  tab2Root: any = 'Essai1Page';
  tab3Root: any = 'ResearchPage';
  //tab4Root: any = ProfilePage;
  tab4Root: any = 'MembresPage';
  tab5Root: any = 'AdminPage';
  tab6Root: any = 'FormViewPage';
  tab10Root: any = 'UnionsPage';
  tab11Root: any = 'OpPage';



  constructor(public translate: TranslateService, private database: PouchdbProvider, private zone: NgZone) {
    this.translate.setDefaultLang(global.langue)
  }

  public ionViewDidEnter() {
    this.translate.use(global.langue)
    console.log('syncing database')
    this.database.sync();
    this.database.getChangeListener().subscribe(data => {
      this.zone.run(() => {
        //this.items.push(data.doc);
      });
    });
  }
}
