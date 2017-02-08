import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { StartPage } from '../pages/start/start';
import {FarmersTabsPage} from '../pages/farmers-tabs/farmers-tabs';
import {FarmersHomePage} from '../pages/farmers-tabs/farmers-home/farmers-home';
import {FarmersResearchPage} from '../pages/farmers-tabs/farmers-research/farmers-research';
import { FarmersProfilePage } from '../pages/farmers-tabs/farmers-profile/farmers-profile';
import { FumaTabsPage } from '../pages/fuma-tabs/fuma-tabs';
import { FumaResearchPage } from '../pages/fuma-tabs/fuma-research/fuma-research';
import { FumaHomePage } from '../pages/fuma-tabs/fuma-home/fuma-home';
import { FumaAdminPage } from '../pages/fuma-tabs/fuma-admin/fuma-admin';
import {OrganisationsPage} from '../pages/organisations/organisations';
import {UnionsPage} from '../pages/unions/unions';
import { ResearchViewPage } from '../pages/research-view/research-view';
import { VegaLitePage } from '../pages/visualisations/vega-lite/vega-lite';
import { LeafletPage } from '../pages/visualisations/leaflet/leaflet';
import { PouchdbProvider } from '../providers/pouchdb-provider';
import { KoboProvider } from '../providers/kobo-provider';

@NgModule({
  declarations: [
    MyApp,
    StartPage,
    FarmersTabsPage,
    FarmersHomePage,
    FarmersResearchPage,
    FarmersProfilePage,
    FumaTabsPage,
    FumaHomePage,
    FumaResearchPage,
    FumaAdminPage,
    OrganisationsPage,
    UnionsPage,
    ResearchViewPage,
    VegaLitePage,
    LeafletPage,
  ],
  imports: [
    IonicModule.forRoot(MyApp) 
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    StartPage,
    FarmersTabsPage,
    FarmersHomePage,
    FarmersResearchPage,
    FarmersProfilePage,
    FumaTabsPage,
    FumaHomePage,
    FumaResearchPage,
    FumaAdminPage,
    OrganisationsPage,
    UnionsPage,
    ResearchViewPage,
    VegaLitePage,
    LeafletPage,
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, PouchdbProvider, KoboProvider]
})
export class AppModule {}
