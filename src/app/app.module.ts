import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicStorageModule } from '@ionic/storage';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Device } from '@ionic-native/device';
import { Sim } from '@ionic-native/sim';
import { Geolocation} from '@ionic-native/geolocation'
import { AutoCompleteModule } from 'ionic2-auto-complete';
import { DatePickerModule } from 'datepicker-ionic2';
import { File } from '@ionic-native/file';
import { Printer } from '@ionic-native/printer';
import { DatePicker } from '@ionic-native/date-picker';
//import { FileService } from '../providers/file.service';

//native components
import { Camera } from '@ionic-native/camera';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { ImagePicker } from '@ionic-native/image-picker';
// translation module
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Http } from '@angular/http';
import { HttpModule } from '@angular/http';

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
// app tabs
//import { StartPage } from '../pages/start/start';
//import { TabsPage } from '../pages/tabs/tabs';
//import { AdminPage } from '../pages/tabs/admin/admin';
//import { CollectPage } from '../pages/tabs/collect/collect';
//import { HomePage } from '../pages/tabs/home/home';
//import { ProfilePage } from '../pages/tabs/profile/profile';
//import { ResearchPage } from '../pages/tabs/research/research';
// app pages
//import { ResearchViewPage } from '../pages/research-view/research-view';
//import { FormViewPage } from '../pages/form-view/form-view';
//import { ProfileViewPage } from '../pages/profile-view/profile-view';
//import { VegaLitePage } from '../pages/visualisations/vega-lite/vega-lite';
//import { LeafletPage } from '../pages/visualisations/leaflet/leaflet';
//import { PhotosPage } from '../pages/photos/photos';
//components

import { FormViewComponent } from '../components/form-view/form-view';

//providers
import { PouchdbProvider } from '../providers/pouchdb-provider';
import { KoboProvider } from '../providers/kobo-provider';
import { AutoCompletion } from '../providers/auto-completion';
import { RestitutionProvider } from '../providers/restitution/restitution';
import { SiteProvider } from '../providers/site/site';
import { VillageProvider } from '../providers/village/village';

/*
//configuration locale
import { ConfigurationPage } from '../pages/configuration/configuration';
import { ConfLocaliteEnquetePage } from '../pages/configuration/conf-localite-enquete/conf-localite-enquete';
import { ModifierConfLocaliteEnquetePage } from '../pages/configuration/conf-localite-enquete/modifier-conf-localite-enquete/modifier-conf-localite-enquete';
import { AjouterConfLocaliteEnquetePage } from '../pages/configuration/conf-localite-enquete/ajouter-conf-localite-enquete/ajouter-conf-localite-enquete';

//unions
import { UnionsPage } from '../pages/unions/unions';
import { AjouterUnionPage } from '../pages/unions/ajouter-union/ajouter-union';
import { DetailUnionPage } from '../pages/unions/detail-union/detail-union';
import { ModifierUnionPage } from '../pages/unions/modifier-union/modifier-union';
import { ChoixSourceAjoutUnionPage } from '../pages/unions/choix-source-ajout-union/choix-source-ajout-union';


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

//type de sole
import { TypeSolePage } from '../pages/type-sole/type-sole';
import { AjouterTypeSolePage } from '../pages/type-sole/ajouter-type-sole/ajouter-type-sole';
import { ModifierTypeSolePage } from '../pages/type-sole/modifier-type-sole/modifier-type-sole';
import { DetailTypeSolePage } from '../pages/type-sole/detail-type-sole/detail-type-sole';

//champs
import { ChampsPage } from '../pages/champs/champs';
import { AjouterChampsPage } from '../pages/champs/ajouter-champs/ajouter-champs';
import { ModifierChampsPage } from '../pages/champs/modifier-champs/modifier-champs';
import { DetailChampsPage } from '../pages/champs/detail-champs/detail-champs';

//essai
import { EssaiPage } from '../pages/essai/essai';
import { AjouterEssaiPage } from '../pages/essai/ajouter-essai/ajouter-essai';
import { ModifierEssaiPage } from '../pages/essai/modifier-essai/modifier-essai';
import { DetailEssaiPage } from '../pages/essai/detail-essai/detail-essai';

//traitement
import { TraitementPage } from '../pages/essai/traitement/traitement';
import { AjouterTraitementPage } from '../pages/essai/traitement/ajouter-traitement/ajouter-traitement';
import { ModifierTraitementPage } from '../pages/essai/traitement/modifier-traitement/modifier-traitement';
import { DetailTraitementPage } from '../pages/essai/traitement/detail-traitement/detail-traitement';


//Sécurity
import { LoginPage } from '../pages/security/login/login';
import { RegisterPage } from '../pages/security/register/register';
import { ProfileUserPage } from '../pages/security/profile/profile-user';
import { ModifierProfilePage } from '../pages/security/profile/modifier-profile/modifier-profile';

//Protocole
import { ProtocolePage } from '../pages/protocole/protocole';
import { AjouterProtocolePage } from '../pages/protocole/ajouter-protocole/ajouter-protocole';
import { ModifierProtocolePage } from '../pages/protocole/modifier-protocole/modifier-protocole';
import { DetailProtocolePage } from '../pages/protocole/detail-protocole/detail-protocole';

//Variete
import { VarietePage } from '../pages/variete/variete';
import { AjouterVarietePage } from '../pages/variete/ajouter-variete/ajouter-variete';
import { ModifierVarietePage } from '../pages/variete/modifier-variete/modifier-variete';
import { DetailVarietePage } from '../pages/variete/detail-variete/detail-variete';

//Culture
import { CulturePage } from '../pages/culture/culture';
import { AjouterCulturePage } from '../pages/culture/ajouter-culture/ajouter-culture';
import { ModifierCulturePage } from '../pages/culture/modifier-culture/modifier-culture';
import { DetailCulturePage } from '../pages/culture/detail-culture/detail-culture';
*/

// needed to load translation from assets folder
export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


@NgModule({
  declarations: [
    MyApp,

    /*StartPage,
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
    PhotosPage,*/
    
   // FormViewComponent,
/*
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
    ChoixSourceAjoutUnionPage,

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

    //type de sole
    TypeSolePage,
    AjouterTypeSolePage,
    ModifierTypeSolePage,
    DetailTypeSolePage,

    //champs
    ChampsPage,
    AjouterChampsPage,
    ModifierChampsPage,
    DetailChampsPage,

    //essai
    EssaiPage,
    AjouterEssaiPage,
    ModifierEssaiPage,
    DetailEssaiPage,

    //traitement
    TraitementPage,
    AjouterTraitementPage,
    ModifierTraitementPage,
    DetailTraitementPage,

    //security
    LoginPage,
    RegisterPage,
    ProfileUserPage,
    ModifierProfilePage,

    //protocole
    ProtocolePage,
    AjouterProtocolePage,
    ModifierProtocolePage,
    DetailProtocolePage,

    //variete
    VarietePage,
    AjouterVarietePage,
    ModifierVarietePage,
    DetailVarietePage,

    //Culture
    CulturePage,
    AjouterCulturePage,
    ModifierCulturePage,
    DetailCulturePage,*/
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    BrowserModule,
    AutoCompleteModule,
    DatePickerModule,
    IonicImageViewerModule,
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

    /*StartPage,
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
    ChoixSourceAjoutUnionPage,

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

    //type de sole
    TypeSolePage,
    AjouterTypeSolePage,
    ModifierTypeSolePage,
    DetailTypeSolePage,

    //champs
    ChampsPage,
    AjouterChampsPage,
    ModifierChampsPage,
    DetailChampsPage,

    //essai
    EssaiPage,
    AjouterEssaiPage,
    ModifierEssaiPage,
    DetailEssaiPage,

    //traitement
    TraitementPage,
    AjouterTraitementPage,
    ModifierTraitementPage,
    DetailTraitementPage,
    
    //security
    LoginPage,
    RegisterPage,
    ProfileUserPage,
    ModifierProfilePage,

    //protocole
    ProtocolePage,
    AjouterProtocolePage,
    ModifierProtocolePage,
    DetailProtocolePage,

    //variete
    VarietePage,
    AjouterVarietePage,
    ModifierVarietePage,
    DetailVarietePage,

    //Culture
    CulturePage,
    AjouterCulturePage,
    ModifierCulturePage,
    DetailCulturePage,*/

  ],
  providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler }, AutoCompletion, DatePicker, PouchdbProvider, File, Printer, ImagePicker, Device, Sim, Geolocation, KoboProvider, Camera, StatusBar, SplashScreen,
    RestitutionProvider,
    SiteProvider,
    VillageProvider,]
})
export class AppModule { }
