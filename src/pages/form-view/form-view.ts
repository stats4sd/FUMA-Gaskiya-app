import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Camera } from 'ionic-native';
import { PouchdbProvider } from '../../providers/pouchdb-provider';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-form-view',
  templateUrl: 'form-view.html'
})

export class FormViewPage {
  form: any;
  enketoLink: SafeResourceUrl;
  public base64Image: string;
  public showCamera = true;
  local: Storage;

  constructor(private params: NavParams, public viewCtrl: ViewController, private sanitizer: DomSanitizer, private database: PouchdbProvider) {
    console.log('params', params.data)
    this.form = params.data.doc;
    this.enketoLink = this.sanitizer.bypassSecurityTrustResourceUrl(this.form.enketoLink);
    
  }
  ionViewDidEnter(){
    
  }
  close() {

    this.viewCtrl.dismiss()
  }
  takePhoto() {
    // console.log('hacking into enketo storage');
    // this.local = new Storage(['indexeddb', 'websql', 'localstorage'], { name: 'enketo', storeName: 'keyvaluepairs' });
    // this.local.get('properties').then(res => console.log('get request', res))
    // this.local.set('test','hii')
    Camera.getPicture({
      destinationType: Camera.DestinationType.DATA_URL,
      quality:50,
      targetWidth: 1000,
      targetHeight: 1000,
      saveToPhotoAlbum:true
    }).then((imageData) => {
      // imageData is a base64 encoded string
      
      this.base64Image = "data:image/jpeg;base64," + imageData;
      this.database.put(this.base64Image,'photos_test')
    }, (err) => {
      console.log(err);
    });
  }
  }

