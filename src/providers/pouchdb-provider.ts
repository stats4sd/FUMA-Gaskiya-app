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
    private remoteDetails: any;

    constructor(public http: Http) {
        this.remoteDetails = this.http.get('assets/app-config.json').subscribe(res => this.remoteDetails = (res.json()))
        console.log('Hello Pouchdb Provider');
        //setup db to connect to single database
        if (!this.isInstantiated) {
            this.database = new PouchDB("app-database");
            this.database.changes({
                live: true,
                include_docs: false
            }).on('change', change => {
                this.listener.emit(change);
            });
            this.isInstantiated = true;
        }
    }
    public get(id: string) {
        return this.database.get(id);
    }

    public getAll(options?: any) {
        console.log('options', options)
        console.log('getting all docs')
        return this.database.allDocs(options);
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

    public sync(remote?: string, options: any = {}) {
        //default connection
        if (!remote) {
            remote = this.remoteDetails['remote-couch-url']
            options = {
                "auth.username": this.remoteDetails.username,
                "auth.password": this.remoteDetails.password
            }
        }
        console.log('remote', remote)
        console.log('options', options)
        let remoteDatabase = new PouchDB(remote, options);
        this.database.sync(remoteDatabase, {
            live: true,
            retry: true
        });
    }

    public getChangeListener() {
        return this.listener;
    }

}
