import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { StartPage } from '../pages/start/start';
import {FarmersTabsPage} from '../pages/farmers-tabs/farmers-tabs';
import {FarmersHomePage} from '../pages/farmers-tabs/farmers-home/farmers-home';
import {FarmersResearchPage} from '../pages/farmers-tabs/farmers-research/farmers-research';
import {FarmersProfilePage} from '../pages/farmers-tabs/farmers-profile/farmers-profile';
import {OrganisationsPage} from '../pages/organisations/organisations';
import {UnionsPage} from '../pages/unions/unions';
import {FUMAGaskiyaPage} from '../pages/fuma-gaskiya/fuma-gaskiya';
import {PouchdbProvider} from '../providers/pouchdb-provider'

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    StartPage,
    FarmersTabsPage,
    FarmersHomePage,
    FarmersResearchPage,
    FarmersProfilePage,
    OrganisationsPage,
    UnionsPage,
    FUMAGaskiyaPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    StartPage,
    FarmersTabsPage,
    FarmersHomePage,
    FarmersResearchPage,
    FarmersProfilePage,
    OrganisationsPage,
    UnionsPage,
    FUMAGaskiyaPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, PouchdbProvider]
})
export class AppModule {}
