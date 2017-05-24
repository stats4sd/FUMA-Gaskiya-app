import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';

/*
  Generated class for the Photos page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-photos',
  templateUrl: 'photos.html'
})
export class PhotosPage {
  cameraOptions: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private camera:Camera) {
    this.cameraOptions = {
      
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PhotosPage');
    this.camera.getPicture(this.cameraOptions).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      let base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });
  }

}
