import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class KoboProvider {

  data: any;
  forms: any;
  private apiToken: string = 'api token pulled from config';
  private remoteDetails: any;
  private isInstantiated: boolean;


  constructor(public http: Http) {
    this.remoteDetails = this.http.get('assets/app-config.json').subscribe(res => {
      this.remoteDetails = (res.json())
      if (!this.isInstantiated) {
        //setup local db to store forms
        console.log('remote details',this.remoteDetails)
        this.isInstantiated = true;
      }
    })
    console.log('Hello KoboProvider Provider');
  }
  koboTest1(url) {
    this.http.get(url).map(res => res.json()).subscribe(data => {
      console.log(data)
    });
  }

  koboTest2(url) {
    let koboHeaders = new Headers([
      { "Authorization": "Token 47e0d30543d119584093262840011ec93f90ba01" },
      { 'Content-type': 'application/json' }
    ])
    let options = new RequestOptions({ headers: koboHeaders })
    this.http.get(url, options).map(res => res.json()).subscribe(
      data => {
        console.log('data received',data);
      },
      err => {
        console.log("Oops!",err);
      },
      () => {
        console.log('complete')
      })
  }

  koboRequest(url): Observable<any> {
    //var koboHeaders = new Headers();
    //use username/password auth. Useful if user inputs username/password in the app
    /*let auth = ('Basic ' + btoa('username:password'));*/

    //use token authentication
    let koboHeaders = new Headers([
      { "Authorization": "Token 47e0d30543d119584093262840011ec93f90ba01" },
      { 'Content-type': 'application/json' }
    ])
    let options = new RequestOptions({headers:koboHeaders})
    //let auth = 'Token 47e0d30543d119584093262840011ec93f90ba01'
      //this.remoteDetails['kobo-api-key'];

    //send request
    //headers.append('Authorization', auth);
    
    //get request from mobile
    console.log('sending get request from mobile', url, koboHeaders)
    return this.http.get(url, options).map(function (res) {
        let result = JSON.parse(res['_body']);
        console.log(result);
        return result
      })
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'))
    
    }

    //if using browser preview request will need to be sent via proxy site
  // let options = new RequestOptions({ headers: headers });
  // let body = { url: url };
    
  //   return this.http.post('http://kobo-api.stats4sd.org', body, options)
  //     .map(function (res) {
  //       let result = JSON.parse(res['_body']);
  //       console.log(result);
  //       return result
  //     })
  //     .catch((error: any) => Observable.throw(error.json().error || 'Server error'))
  // }

}

