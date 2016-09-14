import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {KoboApi} from "../../../providers/kobo-api/kobo-api";
import {Observable} from 'rxjs/Observable'
import {Modal} from "ionic-angular/index";
import {ModalController} from "ionic-angular"
import {FormsPage} from "../forms";



@Component({
  templateUrl: 'build/pages/forms/overview/overview.html',
})
export class OverviewPage {
  results: any = [];
  anyErrors: boolean;
  finished: boolean;
  generating:boolean;
  enketoLink:any;
  private data: Observable<any>;

  constructor(private koboApi:KoboApi, public nav:NavController, public modal:ModalController) {
    this.getResults();

  }

  getResults(){
    this.koboApi.koboRequest('https://kc.kobotoolbox.org/api/v1/forms').subscribe(
        result =>this.results = result,
        error =>this.anyErrors=true,
        () => this.finished = true
    );
  }

  openForm(form) {
    console.log(form);
    if (!form.enketoLink) {
      this.generating=true;
      this.koboApi.koboRequest(form.url + '/enketo').subscribe(
          result =>this.enketoLink = result,
          error =>this.anyErrors = true,
          () => {
            console.log('finished');
            this.showModal(form)
          }
      );

    }
  }

  showModal(form){
    console.log(form)
      let modal = this.modal.create(FormsPage, {form: form}, {
        showBackdrop: false,
        enableBackdropDismiss: false
      });
      modal.onDidDismiss(data=> {
        console.log(data)
      });
      modal.present();
    }


  refresh(){
    console.log('refreshing');
    this.finished=false;
    this.getResults();
  }



}
