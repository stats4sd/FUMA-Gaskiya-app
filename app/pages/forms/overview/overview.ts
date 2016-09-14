import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {KoboApi} from "../../../providers/kobo-api/kobo-api";
import {Observable} from 'rxjs/Observable'

@Component({
  templateUrl: 'build/pages/forms/overview/overview.html',
})
export class OverviewPage {
  results: any = [];
  anyErrors: boolean;
  finished: boolean;
  private data: Observable<any>;

  constructor(private koboApi:KoboApi) {
    this.getResults();
  }

  getResults(){
    this.koboApi.koboRequest('https://kc.kobotoolbox.org/api/v1/forms').subscribe(
        result =>this.results = result,
        error =>this.anyErrors=true,
        () => this.finished = true
    );
  }

  refresh(){
    console.log('refreshing');
    this.finished=false;
    this.getResults();
  }

}
