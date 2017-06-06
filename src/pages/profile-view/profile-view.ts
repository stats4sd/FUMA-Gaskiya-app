import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import JsBarcode from 'jsbarcode';
import { TranslateService  } from '@ngx-translate/core';
import { global } from '../../global-variables/variable'

@Component({
  selector: 'page-profile-view',
  templateUrl: 'profile-view.html'
})
export class ProfileViewPage {
  profile: any;
  public picture;
  profileData: any=[];
  @ViewChild('barcode') barcode: ElementRef;

  constructor(public translate: TranslateService, public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.profile = navParams.data;
    this.prepareMeta()
    this.translate.setDefaultLang(global.langue)
  }

  ionViewDidEnter(){
    this.translate.use(global.langue)
  }

  ionViewDidLoad() {
    // var fumaID=this.profile.doc.fumaID.split(' ')[1] || 'pending'
    var fumaID=this.profile.doc.fumaID || 'pending'
    JsBarcode(this.barcode.nativeElement, fumaID,{
      width:1,
      height:40
    }
    );
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
