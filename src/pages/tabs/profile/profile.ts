import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { PouchdbProvider } from '../../../providers/pouchdb-provider';
import { ProfileViewPage } from '../../profile-view/profile-view';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

/*
  Generated class for the Profile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {
  profiles: any;
  allProfiles: any;
  empty: boolean;
  photos: any;
  photoArray: any[] = [];
  deletedMessage: boolean = false

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, private database: PouchdbProvider, private sanitizer: DomSanitizer) { }

  ionViewDidEnter() {
    this.getProfiles();
    this.deletedMessage = false;
    //this.getPhotos();
  }
  viewProfile(profile) {
    console.log('viewing profile', profile)
    let formModal = this.modalCtrl.create(ProfileViewPage, profile, {
      showBackdrop: false,
      enableBackdropDismiss: false
    });
    // add functions to delete doc and linked photos if prompted from modal
    formModal.onDidDismiss(data => {
      console.log('dismissed data', data)
      if (data && data.deleteDoc) {
        this.database.remove(profile.id)
        this.deletedMessage = true;
        if (profile.photoDocId) {
          this.database.remove(profile.photoDocId)
        }
      }
    });
    formModal.present();
  }
  getProfiles() {
    this.database.getAll(
      {
        startkey: 'koboSubmission_fuma-op-membre',
        endkey: 'koboSubmission_fuma-op-membre\uffff',
        include_docs: true
      },
    ).then(
      res => {
        var profiles = res.rows
        var promises = profiles.map(function (profile) {
          return this.getPhoto(profile)
        }.bind(this))
        return Promise.all(promises).then(
          res => {
            this.profiles = res
            this.allProfiles=res
          }
        )
      }
      )
  }

  getPhoto(profile) {
    return new Promise((resolve, reject) => {
      var profilePhotoId = profile.doc.data["meta/deprecatedID"]
      var photoDocId = 'photos_fuma-op-membre/' + profilePhotoId
      var filename = profilePhotoId + '.jpeg'
      // return 'assets/images/no photo.jpg'
      this.database.getAttachment('photos_fuma-op-membre/' + profilePhotoId, filename).then(url => {
        profile.photo = this.sanitizer.bypassSecurityTrustUrl(url)
        profile.photoDocId = photoDocId;
        resolve(profile)
      }).catch(err => {
        console.log('err', err)
        // profile.photo = 
        // resolve(profile)
      })
    })
  }
  initializeItems() {
    this.profiles = this.allProfiles;
  }
  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.profiles = this.profiles.filter((item) => {
        return (item.doc.data.nom_Membre.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
}

