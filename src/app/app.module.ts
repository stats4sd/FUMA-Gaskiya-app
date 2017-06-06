import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicStorageModule } from '@ionic/storage';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Device } from '@ionic-native/device';
import { Sim } from '@ionic-native/sim';
//native components
import { Camera } from '@ionic-native/camera';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
// translation module
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Http } from '@angular/http';
import { HttpModule } from '@angular/http';

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
// app tabs
import { StartPage } from '../pages/start/start';
import { TabsPage } from '../pages/tabs/tabs';
import { AdminPage } from '../pages/tabs/admin/admin';
import { CollectPage } from '../pages/tabs/collect/collect';
import { HomePage } from '../pages/tabs/home/home';
import { ProfilePage } from '../pages/tabs/profile/profile';
import { ResearchPage } from '../pages/tabs/research/research';
// app pages
import { ResearchViewPage } from '../pages/research-view/research-view';
import { FormViewPage } from '../pages/form-view/form-view';
import { ProfileViewPage } from '../pages/profile-view/profile-view';
import { VegaLitePage } from '../pages/visualisations/vega-lite/vega-lite';
import { LeafletPage } from '../pages/visualisations/leaflet/leaflet';
import { PhotosPage } from '../pages/photos/photos';
//components
import { FormViewComponent } from '../components/form-view/form-view';
//providers
import { PouchdbProvider } from '../providers/pouchdb-provider';
import { KoboProvider } from '../providers/kobo-provider';

//configuration locale
import { ConfigurationPage } from '../pages/configuration/configuration';
import { ConfLocaliteEnquetePage } from '../pages/configuration/conf-localite-enquete/conf-localite-enquete';
import { ModifierConfLocaliteEnquetePage } from '../pages/configuration/conf-localite-enquete/modifier-conf-localite-enquete/modifier-conf-localite-enquete';
import { AjouterConfLocaliteEnquetePage } from '../pages/configuration/conf-localite-enquete/ajouter-conf-localite-enquete/ajouter-conf-localite-enquete';

//uions
import { UnionsPage } from '../pages/unions/unions';
import { AjouterUnionPage } from '../pages/unions/ajouter-union/ajouter-union';
import { DetailUnionPage } from '../pages/unions/detail-union/detail-union';
import { ModifierUnionPage } from '../pages/unions/modifier-union/modifier-union';


//OP
import { OpPage } from '../pages/op/op';
import { AjouterOpPage } from '../pages/op/ajouter-op/ajouter-op';
import { DetailOpPage } from '../pages/op/detail-op/detail-op';
import { ModifierOpPage } from '../pages/op/modifier-op/modifier-op';

//membres
import { MembresPage } from '../pages/membres/membres';
import { AjouterMembrePage } from '../pages/membres/ajouter-membre/ajouter-membre';
import { DetailMembrePage } from '../pages/membres/detail-membre/detail-membre';
import { ModifierMembrePage } from '../pages/membres/modifier-membre/modifier-membre';

//langue
import { LanguePage } from '../pages/langue/langue'


// needed to load translation from assets folder
export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


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
    ProfileViewPage,
    VegaLitePage,
    LeafletPage,
    PhotosPage,
    FormViewComponent,

    //configuration localité
    ConfigurationPage,
    ConfLocaliteEnquetePage,
    ModifierConfLocaliteEnquetePage,
    AjouterConfLocaliteEnquetePage,

    //unions
    UnionsPage,
    AjouterUnionPage,
    DetailUnionPage,
    ModifierUnionPage,

    //op
    OpPage,
    AjouterOpPage,
    DetailOpPage,
    ModifierOpPage,

    //membres
    MembresPage,
    AjouterMembrePage,
    DetailMembrePage,
    ModifierMembrePage,

    //langue
    LanguePage,
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    IonicStorageModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
      }
    })
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
    ProfileViewPage,
    FormViewPage,
    VegaLitePage,
    LeafletPage,
    PhotosPage,

    //configuration localité
    ConfigurationPage,
    ConfLocaliteEnquetePage,
    ModifierConfLocaliteEnquetePage,
    AjouterConfLocaliteEnquetePage,

    //unions
    UnionsPage,
    AjouterUnionPage,
    DetailUnionPage,
    ModifierUnionPage,

    //op
    OpPage,
    AjouterOpPage,
    DetailOpPage,
    ModifierOpPage,

    //membres
    MembresPage,
    AjouterMembrePage,
    DetailMembrePage,
    ModifierMembrePage,

    //langue
    LanguePage,
  ],
  providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler }, PouchdbProvider, Device, Sim, KoboProvider, Camera, StatusBar, SplashScreen]
})
export class AppModule { }
