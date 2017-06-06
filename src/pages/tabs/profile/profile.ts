import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ToastController } from 'ionic-angular';
import { PouchdbProvider } from '../../../providers/pouchdb-provider';
import { ProfileViewPage } from '../../profile-view/profile-view';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TranslateService  } from '@ngx-translate/core';
import { global } from '../../../global-variables/variable'

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

  constructor(public trnaslate: TranslateService, public navCtrl: NavController, public navParams: NavParams, public toastCtrl:ToastController, public modalCtrl: ModalController, private database: PouchdbProvider, private sanitizer: DomSanitizer) { 
    this.trnaslate.setDefaultLang(global.langue)
  }

  ionViewDidEnter() {
    this.trnaslate.use(global.langue)
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
        if (profile.photoDocId && profile.photoDocId!="") {
          this.database.remove(profile.photoDocId)
        }
        this.showToast('user deleted')

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
        if (url != "assets/images/no-photo.png") {
          profile.photoDocId = photoDocId;
        }  
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
  showFilters() {
    this.showToast('filters not yet implemented')
  }
  showToast(message, position='top') {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: position
    });
    toast.present();
  }
}

