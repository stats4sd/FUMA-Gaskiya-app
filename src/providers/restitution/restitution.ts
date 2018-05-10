import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AutoCompleteService } from 'ionic2-auto-complete';
import { PouchdbProvider } from '../pouchdb-provider';

/*
  Generated class for the RestitutionProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class RestitutionProvider {

  labelAttribute = "matricule_Membre";
  data: any = [];

  constructor(public http: Http) {
    console.log('Hello RestitutionProvider Provider');
  }

    getResults(keyword:string) {


    if(this.data.length){
      return this.data.filter(item => item.matricule_Membre.toLowerCase().startsWith(keyword.toLowerCase()));
    }else{ 
      return
    }
        
  }


}
