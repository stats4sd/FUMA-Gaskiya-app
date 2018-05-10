import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AutoCompleteService } from 'ionic2-auto-complete';
//import { PouchdbProvider } from '../pouchdb-provider';

/*
  Generated class for the SiteProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class SiteProvider {

  labelAttribute = "nom";
  data: any = [];

  constructor(public http: Http) {
    console.log('Hello SiteProvider Provider');
  }

   getResults(keyword:string) {


    if(this.data.length){
      return this.data.filter(item => item.nom.toLowerCase().startsWith(keyword.toLowerCase()));
    }else{ 
      return
    }
   }
} 
