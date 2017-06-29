import { Injectable, EventEmitter } from '@angular/core';
import { ToastController, LoadingController, Events } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { global } from '../global-variables/variable'
//pouchDB made available to compiler through  @types/pouchdb (npm install @types/pouchdb --save --save-exact)
//import PouchDB from 'pouchdb'
import PouchDB from 'pouchdb';
import * as pouchdbAuthentication from 'pouchdb-authentication';
import * as pouchdbQuickSearch from 'pouchdb-quick-search';
//var PouchDB = require("pouchdb");
PouchDB.plugin(pouchdbAuthentication);
PouchDB.plugin(pouchdbQuickSearch);


@Injectable()
export class PouchdbProvider {

    //declare private variables not available to template
    private isInstantiated: boolean;
    private database: any;
    private listener: EventEmitter<any> = new EventEmitter();
    // private remoteDetails: any;
    
    //pour la sécurité
    remoteSaved: any;
    loading: any;
    pouchOpts = {
        skip_setup: true
    };

    //my array
    data: any;

    constructor(public http: Http, public toastCtl: ToastController, public events: Events, public loadingCtrl: LoadingController, public storage: Storage) {
        //this.remoteDetails = this.http.get('assets/app-config.json').subscribe(res => this.remoteDetails = (res.json()))
        //setup db to connect to single database
        this.remoteSaved = new PouchDB("http://fumagaskiya-db.stats4sd.org/test");//, this.pouchOpts);
        //this.remoteSaved = new PouchDB("http://127.0.0.1:5984/app_fuma");//, this.pouchOpts);
        if (!this.isInstantiated) {
            this.database = new PouchDB("app-database");
            this.database.changes({
                live: true,
                include_docs: true
            }).on('change', change => {
                console.log('db changed')
                this.listener.emit(change);
            });
            this.isInstantiated = true;
            this.sync();
            //this.database.sync()
        }else{
            this.sync();
        }
    }
    public get(id: string, options?:any) {
        return this.database.get(id);
    }

    public getAll(options?: any) {
        return this.database.allDocs(options);
    }

    public bulkDocs(docs) {
        return this.database.bulkDocs(docs);
    }
    public remove(id) {
        console.log('removing',id)
        this.database.get(id).then(function (doc) {
            return this.database.remove(doc);
        }.bind(this));
    }

    public put(document: any, id: string) {
        document._id = id;
        return this.get(id).then(result => {
            document._rev = result._rev;
            return this.database.put(document);
        }, error => {
            if (error.status == "404") {
                return this.database.put(document);
            } else {
                return new Promise((resolve, reject) => {
                    reject(error);
                });
            }
        });
    }

    public getAttachment(id,filename) {
        return this.database.getAttachment(id, filename)
    .then(function (blob) {
        var url = URL.createObjectURL(blob);
        return url
    }).catch(function (err) {
        console.log('err',err);
        return ('assets/images/no-photo.png')
        
    });
}

    public checkExists(id: string) {
    return this.get(id).then(result => {
        return true
    }, error => {
        //not found error message
        if (error.status == "404") {
            return false
        } else {
            //other errors
            return false
        }
    });
}

    public sync(remote ?: string, options: any = {}) {
    console.log('setting up db sync')
    //default connection
    // if (!remote) {
    //     remote = this.remoteDetails['remote-couch-url']
    //     options = {
    //         "auth.username": this.remoteDetails.username,
    //         "auth.password": this.remoteDetails.password
    //     }
    // }

    
    //var remoteSaved = "http://fumagaskiya-db.stats4sd.org/test"
    //var remoteSaved = "http://127.0.0.1:5984/app_fuma"
    var optionsSaved = {
      //  "auth.username": "fumagaskiya-app",
      // "auth.password": "AA61E1481D12534A9CABE87465474"
    }
    //let remoteDatabase = new PouchDB(remoteSaved, optionsSaved);
     let remoteDatabase = new PouchDB(this.remoteSaved, optionsSaved);
    console.log('remoteDB', remoteDatabase)
    this.database.sync(remoteDatabase, {
        live: true,
        retry: true,
        continuous: true
    }).on('change', function (info) {
        //alert(info)
        console.log('change', info)
    }).on('paused', function (err) {
        console.log('paused', err)
    }).on('active', function () {
        // replicate resumed (e.g. new changes replicating, user went back online)
    }).on('denied', function (err) {
        console.log('denied', err)
    }).on('complete', function (info) {
        console.log('complete', info)
    }).on('error', function (err) {
        console.log('error', err)
    });

}

    affichierMsg(msg = 'Enregistrement mis à jour'){
    let toast = this.toastCtl.create({
      message: msg,
      position: 'top',
      duration: 3000
        });

        toast.present();
    }

    public syncAvecToast(metode: any) {
    console.log('setting up db sync')
    this.affichierMsg('Synchronisation en cours...');
    //default connection
    // if (!remote) {
    //     remote = this.remoteDetails['remote-couch-url']
    //     options = {
    //         "auth.username": this.remoteDetails.username,
    //         "auth.password": this.remoteDetails.password
    //     }
    // }

    
    //var remoteSaved = "http://fumagaskiya-db.stats4sd.org/test"
    //var remoteSaved = "http://127.0.0.1:5984/app_fuma"
    var optionsSaved = {
       // "auth.username": "fumagaskiya-app",
       //"auth.password": "AA61E1481D12534A9CABE87465474"
    }
    //let remoteDatabase = new PouchDB(remoteSaved, optionsSaved);
    let remoteDatabase = new PouchDB(this.remoteSaved, optionsSaved);
    console.log('remoteDB', remoteDatabase)
    this.database.sync(remoteDatabase, {
        //live: true,
        //retry: true,
        //continuous: true
        timeout: 60000
    }).on('change',  (info) => {
        //alert(info)
        console.log('change', info)
    }).on('paused',  (err) => {
        console.log('paused', err)
    }).on('active',  ()  => {
        // replicate resumed (e.g. new changes replicating, user went back online)
    }).on('denied',  (err) => {
        console.log('denied', err)
        this.affichierMsg('Erreur synchronisation, accès réfusé par le serveur!')
    }).on('complete',  (info) => {
        console.log('complete', info)
        this.affichierMsg('Synchronisation terminée avec succes')
        metode;
    }).on('error',  (err) => {
        console.log('error', err)
        this.affichierMsg('Erreur synchronisation, problème réseau!')
        metode;
    });
}


    public getChangeListener() {
    return this.listener;
}



/**************************************************************************************/
/**************************************************************************************/
/*********************************** my changes ***************************************/
/**************************************************************************************/
/**************************************************************************************/

  getDocById(id){
    return this.database.get(id);
  }

  delete(doc){
      this.database.remove(doc).catch((err) => console.log(err));
  }

  createDoc(doc){
    let dat = new Date();
    doc.data.created_at = dat.toJSON();
    doc.data.updatet_at = dat.toJSON();
    doc.data.created_by = '';
    doc.data.updated_by = '';
    doc.data.deleted = false;
    /*doc.deleted_at = '';
    doc.deleted_by = '';
    doc.supprime = false;
    doc.annuler_at = '';
    doc.annuler_by = '';
    doc.annuler = false;
    this.storage.get('gerant').then((gerant) => {
      if(gerant){
        doc.created_by = gerant.name;
        doc.updated_by = gerant.name;
        this.db.post(doc); 
      }else{
        doc.created_by = '';
        doc.updated_by = '';
        this.db.put(doc); 
      }
       
    });*/
    
    this.database.put(doc);
  }

  getPlageDocs(startkey, endkey){

    //si non vide
    let data: any;
    if(data){
      return data
    }

    
    return new Promise ( resolve => {
      this.database.allDocs({
        include_docs: true,
        startkey: startkey,
        endkey: endkey
      }).then((result) => {
        data = [];
        let doc = result.rows.map((row) => {
          
            data.push(row.doc);
        });

        resolve(data);

        this.database.changes({live: true, since: 'now', include_docs: true}).on('change', (change) => this.handleChange(change));
      }).catch((err) => console.log(err));
    } );
  }


  deleteDoc(doc){
    let dat = new Date();
    doc.data.deleted_at = dat.toJSON();
    doc.data.deleted_by = '';
    doc.data.deleted = true;
   // this.database.put(doc).catch((err) => console.log(err));
    /*let dat = new Date();
    doc.deleted_at = dat.toJSON();
    //doc.deleted_by = '';
    //doc._deleted = true;
    doc.supprime = true;
    doc.annuler_at = '';
    doc.annuler_by = '';
    doc.annuler = false;
    this.storage.get('gerant').then((gerant) => {
      if(gerant){
        //doc.created_by = gerant.name;
        doc.deleted_by = gerant.name;
        this.db.put(doc).catch((err) => console.log(err)); 
      }else{
       // doc.created_by = '';
        doc.deleted_by = '';
        this.db.put(doc).catch((err) => console.log(err)); 
      }
       
    });*/
    this.database.remove(doc).catch((err) => console.log(err));
    //this.db.put(doc).catch((err) => console.log(err));
  }

  updateDoc(doc){
    let dat = new Date();
    doc.data.updatet_at = dat.toJSON();
    doc.data.updated_by = '';
    doc.data.deleted = false;
    /*doc.deleted_at = '';
    doc.deleted_by = '';
    doc.supprime = false;
    doc.annuler_at = '';
    doc.annuler_by = '';
    doc.annuler = false;
    this.storage.get('gerant').then((gerant) => {
      if(gerant){
        //doc.created_by = gerant.name;
        doc.updated_by = gerant.name;
        this.db.put(doc).catch((err) => console.log(err)); 
      }else{
       // doc.created_by = '';
        doc.updated_by = '';
        this.db.put(doc).catch((err) => console.log(err)); 
      }
       
    });*/
    
    this.database.put(doc).catch((err) => console.log(err));
  }



  handleChange(change){
    let changeDoc = null;
    let changeIndex = null;

    this.data.forEach((doc, index) => {
      if(doc._id === change.id){
        changeDoc = doc;
        changeIndex = index;
      }
    });

    //le document a ete supprime

    if(change.delete){
      this.data.splice(changeIndex, 1);
    }else{
      //mise a jour
      if(changeDoc){
        this.data[changeIndex] = change.doc;
      }
      //ajout
      else{
        this.data.push(change.doc);
      }
    }
  }

  generateId(operation, pays, region, departement, commune, village){
    var pays = pays||'XX'
    var region = region||'XX'
    var department = departement || 'XX'
    var commune = commune || 'XX'
    var village = village || 'XX'
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
    var Id= ':'+operation+':'+pays+'-'+region+'-'+department+'-'+commune +'-'+ village+ '-'+randomString 
    return Id
  }

  reset(){
 
      //this.data = null;
  
      this.database.destroy().then(() => {
        console.log("database removed");
      });
    }

    generateOderId(operation){
    var chars='ABCDEFGHIJKLMNPQRSTUVWYZ'
    var numbers='0123456789'
    var randomArray=[]
    for(let i=0;i<15;i++){
      var rand = Math.floor(Math.random()*10)
      var rand = Math.floor(Math.random()*24)
      randomArray.push(numbers[rand])
      randomArray.push(chars[rand])
    }
    //randomArray.push('-')
    //var rand = Math.floor(Math.random()*24)
    //randomArray.push(chars[rand])
    var randomString=randomArray.join("");
    var Id= ':'+operation+':'+randomString;
    return Id
  }


  /**************************************************
  ***************************************************
  ************ Sécurity section *********************
  ***************************************************
  **************************************************/
  
  showLoader(msg: any){
    this.loading = this.loadingCtrl.create({
      content: msg
    });
    this.loading.present();
  }

  register(username: any, mdpass: any, meta = {}){
    this.showLoader('Création du compte...');
    //let db = new PouchDB('http://localhost:5984/stock-fuma');
    this.remoteSaved.signup(username, mdpass,{metadata : meta}, (err, response) => {
      if(err){
        this.loading.dismiss();
        if (err.name === 'conflict') {
            return 'username exist';
          }else  if (err.name === 'forbidden') {
            return 'username invalide';
          } else{
            return 'erreur';
          }
      }else if(response){
        this.loading.dismiss();
        return 'success';
      }else{
        this.loading.dismiss();
        return 'echec';
      }
        
    });
  }

  login(username: any, mdpass: any){
    let ajaxOpts = {
      ajax: {
        headers: {
          Authorization: 'Basic ' + window.btoa(username + ':' + mdpass),
        }
      }
    };
    this.showLoader('Authentification...');
    //this.remote.login(username, mdpass, ajaxOpts).then((err, response) =
    this.remoteSaved.login(username, mdpass, ajaxOpts, (err, response) => {
      if (err) {
        this.loading.dismiss();
        if (err.name === 'unauthorized') {
          alert('nom ou mdpass incorrecte');
          //return 'nom ou mdpass incorrecte';
        } else {
          alert('erreur');
          //return 'erreur';
        }
      }else if(response){
        this.loading.dismiss();
        alert('success');
        //return 'success';
      }else{
        this.loading.dismiss();
        alert('echec');
        //return 'echec';
      }
    });
  }

  logout(){
    this.showLoader('Déconnexion...');
    this.remoteSaved.logout((err, response) => {
      if (err) {
        this.loading.dismissAll();
        this.events.publish('user:login');
        return 'echec déconnexion';
      }else if(response){
        //this.data = null;
        //this.db.destroy().then(() => {
        //  console.log("base de données supprimée");
        //});
        this.storage.remove('info_user').catch((err) => console.log(err));
        this.storage.remove('info_connexion').catch((err) => console.log(err));
        global.info_connexion = null;
        global.info_user = null;
        this.loading.dismissAll();
        this.affichierMsg('Déconnexion terminée avec succès. \nVous êtes désormais hors ligne!')
        this.events.publish('user:login');
        return 'success';
      }else{
        this.loading.dismiss();
        this.affichierMsg('Une erreur s\'est produite lors de la déconnexion. \n Veuillez réessayer plus tard!')
        this.events.publish('user:login');
        return 'echec';
      }
    });
  }

  getUser(username: any){
    this.remoteSaved.getUser(username, (err, response) => {
      if (err) {
        if (err.name === 'not_found') {
          return 'acces non autorise'
        } else {
          return 'erreur'
        }
      } else {
        return response;
      }
    });
  }

  getSession(){
    this.remoteSaved.getSession((err, response) => {
      if (err) {
        return 'erreur du réseau';
      } else if (!response.userCtx.name) {
        return 'Personne n\est connecté';
      } else {
        return response.userCtx.name;
      }
    });
  }

  updateUser(unsername: string){
    this.remoteSaved.putUser(unsername, {
      metadata : {
        email : 'robin@boywonder.com',
        birthday : '1932-03-27T00:00:00.000Z',
        likes : ['acrobatics', 'short pants', 'sidekickin\''],
      }
    }, (err, response) => {
      // etc.
    });
  }

  changerMdpass(){
    this.remoteSaved.changePassword('spiderman', 'will-remember', (err, response) => {
      if (err) {
        if (err.name === 'not_found') {
          // typo, or you don't have the privileges to see this user
        } else {
          // some other error
        }
      } else {
        // response is the user update response
        // {
        //   "ok": true,
        //   "id": "org.couchdb.user:spiderman",
        //   "rev": "2-09310a62dcc7eea42bf3d4f67e8ff8c4"
        // }
      }
    });
  }

  chagerUsername(){
    this.remoteSaved.changeUsername('spiderman', 'batman', (err) => {
      if (err) {
        if (err.name === 'not_found') {
          // typo, or you don't have the privileges to see this user
        } else if (err.taken) {
          // auth error, make sure that 'batman' isn't already in DB
        } else {
          // some other error
        }
      } else {
        // succeeded
      }
    });
  }

  verifieCodeUnion(code){
   return this.database.search({
      query: code,
      fields: ['data.code_union']
    });
  }

}
