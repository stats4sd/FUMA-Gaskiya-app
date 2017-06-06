import { Injectable, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
//pouchDB made available to compiler through  @types/pouchdb (npm install @types/pouchdb --save --save-exact)
import PouchDB from 'pouchdb'


@Injectable()
export class PouchdbProvider {

    //declare private variables not available to template
    private isInstantiated: boolean;
    private database: any;
    private listener: EventEmitter<any> = new EventEmitter();
    // private remoteDetails: any;

    //my array
    data: any;

    constructor(public http: Http) {
        //this.remoteDetails = this.http.get('assets/app-config.json').subscribe(res => this.remoteDetails = (res.json()))
        //setup db to connect to single database
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

    
    var remoteSaved = "http://fumagaskiya-db.stats4sd.org/test"
    //var remoteSaved = "http://127.0.0.1:5984/app_fuma"
    var optionsSaved = {
        "auth.username": "fumagaskiya-app",
       "auth.password": "AA61E1481D12534A9CABE87465474"
    }
    let remoteDatabase = new PouchDB(remoteSaved, optionsSaved);
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
    doc.created_at = dat.toJSON();
    doc.updatet_at = dat.toJSON();
    doc.created_by = '';
    doc.updated_by = '';
    doc.deleted = false;
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
    doc.deleted_at = dat.toJSON();
    doc.deleted_by = '';
    doc.deleted = true;
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
    doc.updatet_at = dat.toJSON();
    doc.updated_by = '';
    doc.deleted = false;
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
}
