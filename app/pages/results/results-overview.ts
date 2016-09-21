import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {ModalController} from "ionic-angular"
import {ResultsMapPage} from "./results-map/results-map";
import {ResultsRPage} from "./results-r/results-r";
import {ResultsVegaPage} from "./results-vega/results-vega";
import {Storage, SqlStorage} from 'ionic-angular';
import {KoboApi} from "../../providers/kobo-api/kobo-api";

/*
 Generated class for the ResultsOverviewPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  templateUrl: 'build/pages/results/results-overview.html',
})
export class ResultsOverviewPage {
  storage:Storage;
  results:{}={};
  finished:boolean=true;
  anyErrors:boolean=false;
  cachedResults:boolean[];
  forms:any;

  constructor(private koboApi:KoboApi, private navCtrl: NavController, public modal:ModalController) {
    this.storage = new Storage(SqlStorage);
    this.storage.get('results').then((results)=> {
          if (results) {
            this.results = (JSON.parse(results))
          }
          else {
            this.finished = false;
          }
          this.getResults()
        })
  }

  getResults(){
    console.log('getting results');
    this.storage.get('forms').then((forms)=>{
      this.forms=JSON.parse(forms);
      for (let form of this.forms){
        if(!this.results[form.formid]){
          this.results[form.formid]=[];
          this.koboApi.koboRequest('https://kc.kobotoolbox.org/api/v1/data/'+form.formid).subscribe(
              result =>{
                this.results[form.formid] = result
              },
              error =>{console.log(error)},
              () => {
                this.storage.set('results',JSON.stringify(this.results));
              })
        }
      }
    })
  }

  /*cacheFormResults(form,index){
    this.koboApi.koboRequest('https://kc.kobotoolbox.org/api/v1/data/'+form.formid).subscribe(
        //!**need to also save link to cache
        result =>{
          this.results[form.url] = result
        },
        error =>{console.log(error)},
        () => {
          this.cachedResults[index]=true;
          console.log(this.results);
          //this.storage.set('forms',JSON.stringify(this.results));
        })
  }*/

  showResult(pageName){
    let pages={map:ResultsMapPage,r:ResultsRPage,vega:ResultsVegaPage};
    let modal = this.modal.create(pages[pageName], {
      showBackdrop: false,
      enableBackdropDismiss: false
    });
    modal.onDidDismiss(data=> {
      console.log(data)
    });
    modal.present();

  }

}
