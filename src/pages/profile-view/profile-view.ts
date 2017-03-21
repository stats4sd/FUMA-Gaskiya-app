import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import JsBarcode from 'jsbarcode';

@Component({
  selector: 'page-profile-view',
  templateUrl: 'profile-view.html'
})
export class ProfileViewPage {
  profile: any;
  public picture;
  profileData: any=[];
  @ViewChild('barcode') barcode: ElementRef;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.profile = navParams.data;
    this.prepareMeta()
  }

  ionViewDidLoad() {
    JsBarcode(this.barcode.nativeElement, '12345');
  }
  prepareMeta() {
    // save all profile data fields in array for repeat. omit doc meta '_' and specific keys
    var omittedFields = {
      "meta/instanceName": true,
      "meta/deprecatedID": true,
      "phonenumber": true,
      "meta/instanceID": true,
      "formhub/uuid": true,
      "end": true,
      "start": true,
      "deviceid": true
    }
    let json = this.profile.doc.data;
    for (let key in json) {
      if (key[0] != "_" && !omittedFields[key]) {
        this.profileData.push({ $key: key, $val:json[key]})
      }
    }
  }
  close() {
    this.viewCtrl.dismiss()
  }
  delete() {
    this.viewCtrl.dismiss({deleteDoc:true})
  }

}
