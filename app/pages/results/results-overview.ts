import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {ModalController} from "ionic-angular"
import {ResultsMapPage} from "./results-map/results-map";
import {ResultsRPage} from "./results-r/results-r";
import {ResultsVegaPage} from "./results-vega/results-vega";

/*
  Generated class for the ResultsOverviewPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/results/results-overview.html',
})
export class ResultsOverviewPage {

  constructor(private navCtrl: NavController, public modal:ModalController) {

  }
  showResult(page){
    let pages={map:ResultsMapPage,r:ResultsRPage,vega:ResultsVegaPage};
    let modal = this.modal.create(pages[page], {
      showBackdrop: false,
      enableBackdropDismiss: false
    });
    modal.onDidDismiss(data=> {
      console.log(data)
    });
    modal.present();

  }

}
