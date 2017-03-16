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
  iframeHeight: any;
  public base64Image: string;
  public showCamera = true;
  local: Storage;

  constructor(private params: NavParams, public viewCtrl: ViewController, private sanitizer: DomSanitizer, private database: PouchdbProvider) {
    console.log('params', params.data)
    this.iframeHeight = "100%"
    this.form = params.data.doc;
    var link = this.form.enketoLink
    //create autopopulate query parameters (currently only a photo ID, later could pull multiple)
    var fillField = "Photo_ID";
    var fillValue = "testPhotoID";
    var fillQueryParam = "[/" + this.form.id_string + '/' + fillField + "]=" + fillValue;
    //add callback window parameter to receive postmessage from enketo iframe
    var origin = window.location.origin
    var originQueryParam = "parentWindowOrigin=" + encodeURI(origin)
    var photoIDQueryParam = ""
    //rewrite url to put query params before id for offline form 
    //more info see https://help.ona.io/faq/prefilling-form-fields-using-enketo and https://github.com/kobotoolbox/enketo-express/issues/386
    //warning - could easily be broken by changes to enketo
    var stringLength = link.length
    var linkPrefix = link.slice(0, stringLength - 7)
    var linkSuffix = link.slice(stringLength - 5)
    var iframeLink = linkPrefix + '_/?d' + fillQueryParam + '&' + originQueryParam + linkSuffix
    // var testLink1= 'https://ee.kobotoolbox.org/_/?d[/fuma-op-membre/nom_Membre]=chris#YPfh'
    // var testLink2= 'https://ee.kobotoolbox.org/_/?parentWindowOrigin=http%3A%2F%2Flocalhost:8100#YPfh'
    //var testLink3= 'https://ee.kobotoolbox.org/::YPfh?parentWindowOrigin=http%3A%2F%2Flocalhost:8100#YPfh'
    console.log('iframe link', iframeLink)
    this.enketoLink = this.sanitizer.bypassSecurityTrustResourceUrl(iframeLink);

  }
  ionViewDidLoad() {
    //add event listener for messages sent from enketo iframe
    //note - currently not useful as enketo only correctly firing message on edit start but not submission success
    //https://github.com/kobotoolbox/enketo-express/issues/670
    window.addEventListener("message", receiveMessage, false);
    function receiveMessage(event) {
      // TODO in real life, check origin! if (event.origin !== "http://enk.to:8080") return;
      console.log('data received from iframe', event);
    }
  }
  close() {
    //ideally want to minimise/make transparent so forms keep attempting upload
    //will need to move code onto new form tab or combine into collect tab

    // var iframe = window.frames['form-iframe']
    // console.log('iframe doc', iframe.document)
    // console.log('content window', iframe.contentWindow)
    this.viewCtrl.dismiss()
    //this.iframeHeight="100px"
  }
  takePhoto() {
    // console.log('hacking into enketo storage');
    // this.local = new Storage(['indexeddb', 'websql', 'localstorage'], { name: 'enketo', storeName: 'keyvaluepairs' });
    // this.local.get('properties').then(res => console.log('get request', res))
    // this.local.set('test','hii')
    Camera.getPicture({
      destinationType: Camera.DestinationType.DATA_URL,
      quality: 50,
      targetWidth: 1000,
      targetHeight: 1000,
      saveToPhotoAlbum: true
    }).then((imageData) => {
      // imageData is a base64 encoded string

      this.base64Image = "data:image/jpeg;base64," + imageData;
      this.database.put(this.base64Image, 'photos_test')
    }, (err) => {
      console.log(err);
    });
  }
  setIframeLink() {

  }
}

