import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PouchdbProvider } from '../../../providers/pouchdb-provider';
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
  empty: boolean;
  photos: any;
  photoArray: any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private database: PouchdbProvider, private sanitizer: DomSanitizer) { }

  ionViewDidEnter() {
    this.getProfiles();
    //this.getPhotos();
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
        this.profiles = res.rows
        this.profiles=this.profiles.map(profile=>this.getPhoto(profile))
        
        console.log('profiles', this.profiles)
        if (res.rows.length > 0) {
          this.empty = false
        }
      })
  }
  getPhotos() {
    // this.database.getAll(
    //   {
    //     startkey: 'photos_fuma-op-membre',
    //     endkey: 'photos_fuma-op-membre\uffff',
    //     include_docs: true,
    //     attachments: true
    //   },
    // ).then(
    //   res => {
    //     let photos = res.rows
    //     this.photos = {}
        // console.log('photos', photos)
        // if (res.rows.length > 0) {
        //   this.empty = false
        // }
    
    // for (let profile of this.profiles) {
    //   console.log('index',index)
    // var profilePhotoId = profile.doc.data["meta/deprecatedID"]
    // console.log('profile photo id',profilePhotoId)
    // var photoDocId = 'photos_fuma-op-membre_' + profilePhotoId
    // console.log('photo doc id',photoDocId)
    // var filename= profilePhotoId+'.jpeg'
    // console.log('filename', filename)
    // //return 'assets/images/no photo.jpg'
    // this.database.getAttachment(photoDocId, filename).then(url => {
    //   return this.sanitizer.bypassSecurityTrustUrl(url)
    // }).catch(err => {
    //   console.log('err', err)
    //   return 'assets/image/no photo.jpeg'
    // })
          

          // var filename = id + '.jpeg'
          // this.database.getAttachment(photo.id, filename).then(url => {
          //   this.profiles[id] = url
          // })
        // }
    
  }
  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url)
  }
  getPhoto(profile) {
    console.log('getting profile',profile)
    var profilePhotoId = profile.doc.data["meta/deprecatedID"]
    console.log('profile photo id',profilePhotoId)
    var photoDocId = 'photos_fuma-op-membre/' + profilePhotoId
    console.log('photo doc id',photoDocId)
    var filename= profilePhotoId+'.jpeg'
    console.log('filename', filename)
    // return 'assets/images/no photo.jpg'
    this.database.getAttachment('photos_fuma-op-membre/-KfQPQrljR0C-xkp6DKE', '-KfQPQrljR0C-xkp6DKE.jpeg').then(url => {
    // this.database.getAttachment(photoDocId, filename).then(url => {
      profile.photo = this.sanitizer.bypassSecurityTrustUrl(url)
      return profile
    }).catch(err => {
      console.log('err', err)
      profile.photo = 'assets/image/no photo.jpeg'
      return profile
    })
  }
}

