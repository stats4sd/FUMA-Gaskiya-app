import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, MenuController, ModalController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';
import { HomePage  } from '../pages/tabs/home/home'
import { Storage } from '@ionic/storage'
import { AdminPage } from '../pages/tabs/admin/admin'
import { ConfLocaliteEnquetePage } from '../pages/configuration/conf-localite-enquete/conf-localite-enquete';
import { LanguePage } from '../pages/langue/langue'
import { CollectPage } from '../pages/tabs/collect/collect'
import { TypeSolePage } from '../pages/type-sole/type-sole'
import { ChampsPage } from '../pages/champs/champs'
import { TraitementPage } from '../pages/essai/traitement/traitement'


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = '';
  pages: Array<{title: string, component: any}>;
  @ViewChild(Nav) nav: Nav;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public modalCtl: ModalController, public storage: Storage, public menuCtrl: MenuController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    this.setPage();

    this.storage.get('langue').then((langue) => {
      if(langue){
        this.rootPage = TabsPage
      }else{
        this.rootPage = HomePage;
      }
    }, err => this.rootPage = HomePage)
  }


  setPage(){

    this.pages = [
            { title: 'Changer la langue', component: LanguePage },
            { title: 'Changer la langue', component: LanguePage },
            { title: 'Formulaires ODK', component: CollectPage },
            { title: 'Config Localité Enquete', component: ConfLocaliteEnquetePage },
            { title: 'Gestion types soles', component: TypeSolePage },
            { title: 'Gestion champs', component: ChampsPage },
            { title: 'Gestion traitements', component: TraitementPage },
            { title: 'Admin', component: AdminPage },
           
     ]
  } 

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
   //this.nav.push(page.component);
   let modal = this.modalCtl.create(page.component);
   modal.present();
   this.menuCtrl.close();
    
  }

}
