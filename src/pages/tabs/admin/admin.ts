import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PouchdbProvider } from '../../../providers/pouchdb-provider';

/*
  Generated class for the Admin page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-admin',
  templateUrl: 'admin.html'
})
export class AdminPage {
  profiles:any=[];
  pendingProfiles:any=[];

  constructor(public navCtrl: NavController, public navParams: NavParams,  private database: PouchdbProvider) {}

  ionViewDidEnter() {
    this.getProfiles();
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
        this.pendingProfiles = this.profiles.filter(function (profile) {
          return !profile.doc.fumaID
        })
      }
      )
  }
  //assign semi-random id, check unique, add photo(?)
  approveProfiles(){
    var docs=this.pendingProfiles.map(function(profile){
      //console.log(profile)
      profile.doc.fumaID=this.generateId(profile.doc.data)
      return profile.doc
    }.bind(this))
    console.log('approved profiles',docs)
    this.database.bulkDocs(docs).then(function(){
      this.getProfiles();
    }.bind(this))
  }
  generateId(data){
    var country = data.pays||'XX'
    var region=data.region||'XX'
    var department = data.departement || 'XX'
    //var commune = data.commune || 'XX'
    //select 3 random numbers and random letter for up to 25,000 unique per department
    var chars='ABCDEFGHIJKLMNPQRSTUVWYZ'
    var numbers='0123456789'
    var randomArray=[]
    for(let i=0;i<3;i++){
      var rand = Math.floor(Math.random()*10)
      randomArray.push(numbers[rand])
    }
    randomArray.push('-')
    var rand = Math.floor(Math.random()*24)
    randomArray.push(chars[rand])
    var randomString=randomArray.join("");
    var fumaId=country+'-'+region+' '+department+'-'+randomString 
    return fumaId
  }


}
