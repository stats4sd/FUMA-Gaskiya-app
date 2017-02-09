import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { StartPage } from '../pages/start/start';
import { TabsPage } from '../pages/tabs/tabs';
import { AdminPage } from '../pages/tabs/admin/admin';
import { CollectPage } from '../pages/tabs/collect/collect';
import { HomePage } from '../pages/tabs/home/home';
import { ProfilePage } from '../pages/tabs/profile/profile';
import { ResearchPage } from '../pages/tabs/research/research';


import { ResearchViewPage } from '../pages/research-view/research-view';
import { FormViewPage } from '../pages/form-view/form-view';
import { VegaLitePage } from '../pages/visualisations/vega-lite/vega-lite';
import { LeafletPage } from '../pages/visualisations/leaflet/leaflet';
import { PhotosPage } from '../pages/photos/photos';
import { PouchdbProvider } from '../providers/pouchdb-provider';
import { KoboProvider } from '../providers/kobo-provider';

@NgModule({
  declarations: [
    MyApp,

    StartPage,
    TabsPage,
    AdminPage,
    CollectPage,
    HomePage,   
    ProfilePage,
    ResearchPage,

    ResearchViewPage,
    FormViewPage,
    VegaLitePage,
    LeafletPage,
    PhotosPage
  ],
  imports: [
    IonicModule.forRoot(MyApp) 
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,

    StartPage,
    TabsPage,
    AdminPage,
    CollectPage,
    HomePage, 
    ProfilePage,
    ResearchPage,

    ResearchViewPage,
    FormViewPage,
    VegaLitePage,
    LeafletPage,
    PhotosPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, PouchdbProvider, KoboProvider]
})
export class AppModule {}
