import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AutoCompleteService } from 'ionic2-auto-complete';
import { PouchdbProvider } from './pouchdb-provider';
 
/*
  Generated class for the AutoCompletion provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AutoCompletion implements AutoCompleteService {

  labelAttribute = "matricule_Membre";
  data: any = [];
  constructor(public http: Http, public servicePouchdb: PouchdbProvider) {
    //console.log('Hello AutoCompletion Provider');
  }

  getResults(keyword:string) {

    /*this.servicePouchdb.getPlageDocs('fuma:op:membre','fuma:op:membre:\uffff').then((mbrA) => {
      
          this.servicePouchdb.getPlageDocs('koboSubmission_fuma-op-membre','koboSubmission_fuma-op-membre\uffff').then((mbrK) => {
          this.data = mbrA.concat(mbrK);
          //this.allMembres = this.membres
      }, err => console.log(err));

    }, err => console.log(err)); 
   */
    if(this.data.length){
      return this.data.filter(item => item.matricule_Membre.toLowerCase().startsWith(keyword.toLowerCase()));
    }else{ 
      return
    }
        
  }


}
