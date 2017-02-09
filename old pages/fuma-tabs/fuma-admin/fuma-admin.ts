import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { KoboProvider } from '../../../providers/kobo-provider'
import { PouchdbProvider } from '../../../providers/pouchdb-provider'


@Component({
  selector: 'page-fuma-admin',
  templateUrl: 'fuma-admin.html',
  
})
export class FumaAdminPage {
  public results = [];
  public anyErrors: boolean;
  public finished: boolean = true;
  public forms: any;
  public generating: boolean;
  public enketoLink: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private koboApi: KoboProvider, private database: PouchdbProvider) {
    //check db for forms, if not there pull from server or use prepopulate 
    this.initialiseForms()

  }
  initialiseForms() {
  //temp to populate database
    for (let form of initialForms) {
      console.log('form',form)
      //define what would be form id
      let id = 'koboForms_' + form.formid + '_' + form.date_modified
    //check exists, if does do nothing, if doesn't add to database
    //will later need version numbers from db docs? no as won't overwrite without  
      this.database.checkExists(id).then(res => {
        console.log(res)
        if (res == false) {
          console.log('db write form',form,id)
          this.database.put(form, id)
        }
      })
  }  
}  

  ionViewDidLoad() {
    //get not working
    //this.getResults()
    this.koboApi.koboTest1
    this.koboApi.koboTest2
  }

  getResults() {
    console.log('getting results')
    this.anyErrors = false;
    this.koboApi.koboRequest('https://kc.kobotoolbox.org/api/v1/forms').subscribe(
      result => this.forms = result,
      error => {
        console.log('kobo request error',error);
        this.anyErrors = true;
        this.finished = true;
      },
      () => {
        this.finished = true;
        let i = 0;
        console.log('forms received',this.forms)
        //this.storage.set('forms', JSON.stringify(this.forms));
        for (let form of this.forms) {
          this.getLinks(form, i);
          i++
        }
      }
    );
  }

  getLinks(form, index) {
    this.koboApi.koboRequest(form.url + '/enketo').subscribe(
      //**need to also save link to cache
      result => {
        this.forms[index].enketoLink = result['enketo_url'].replace('https://', 'http://')
      },
      error => { console.log(error) },
      () => {
        this.database.put(this.forms,'allKoboForms')
        //this.storage.set('forms', JSON.stringify(this.forms));
      })
  }

  // openForm(form) {
  //   let modal = this.modal.create(FormsPage, { form: form }, {
  //     showBackdrop: false,
  //     enableBackdropDismiss: false
  //   });
  //   modal.onDidDismiss(data => {
  //     console.log(data)
  //   });
  //   modal.present();
  // }


  refresh() {
    console.log('refreshing');
    this.finished = false;
    this.getResults();
  }

}

var initialForms =
  [
    {
      "url": "https://kc.kobotoolbox.org/api/v1/forms/84332",
      "formid": 84332,
      "metadata": [],
      "owner": "https://kc.kobotoolbox.org/api/v1/users/fumagaskiya1",
      "public": false,
      "public_data": false,
      "require_auth": false,
      "submission_count_for_today": 0,
      "tags": [],
      "title": "Cascade Example",
      "users": [
        {
          "role": "owner",
          "user": "fumagaskiya1",
          "permissions": [
            "add_datadictionary",
            "add_xform",
            "change_datadictionary",
            "change_xform",
            "delete_datadictionary",
            "delete_xform",
            "move_xform",
            "report_xform",
            "transfer_xform",
            "view_xform"
          ]
        }
      ],
      "hash": "md5:237663f44d7ef085ec7f8d797fbe99bd",
      "description": "Cascade Example",
      "downloadable": true,
      "allows_sms": false,
      "encrypted": false,
      "sms_id_string": "ahUcm7U6K25CYtn5YDfUUP",
      "id_string": "ahUcm7U6K25CYtn5YDfUUP",
      "date_created": "2017-02-08T10:29:19.585699Z",
      "date_modified": "2017-02-08T10:29:19.685166Z",
      "last_submission_time": null,
      "uuid": "96cc5577dd624ee9bf4150cf0e32787a",
      "bamboo_dataset": "",
      "instances_with_geopoints": false,
      "num_of_submissions": 0
    },
    {
      "url": "https://kc.kobotoolbox.org/api/v1/forms/84309",
      "formid": 84309,
      "metadata": [
        {
          "url": "https://kc.kobotoolbox.org/api/v1/metadata/274728",
          "id": 274728,
          "xform": 84309,
          "data_value": "",
          "data_type": "data_license",
          "data_file": null,
          "data_file_type": null,
          "file_hash": null
        },
        {
          "url": "https://kc.kobotoolbox.org/api/v1/metadata/274727",
          "id": 274727,
          "xform": 84309,
          "data_value": "",
          "data_type": "form_license",
          "data_file": null,
          "data_file_type": null,
          "file_hash": null
        },
        {
          "url": "https://kc.kobotoolbox.org/api/v1/metadata/274726",
          "id": 274726,
          "xform": 84309,
          "data_value": "",
          "data_type": "source",
          "data_file": null,
          "data_file_type": null,
          "file_hash": null
        },
        {
          "url": "https://kc.kobotoolbox.org/api/v1/metadata/274725",
          "id": 274725,
          "xform": 84309,
          "data_value": "",
          "data_type": "public_link",
          "data_file": null,
          "data_file_type": null,
          "file_hash": null
        }
      ],
      "owner": "https://kc.kobotoolbox.org/api/v1/users/fumagaskiya1",
      "public": false,
      "public_data": false,
      "require_auth": false,
      "submission_count_for_today": 0,
      "tags": [],
      "title": "Formulaire Organisation des producteur",
      "enketoLink":"https://ee.kobotoolbox.org/x/#YPfp",
      "users": [
        {
          "role": "owner",
          "user": "fumagaskiya1",
          "permissions": [
            "add_datadictionary",
            "add_xform",
            "change_datadictionary",
            "change_xform",
            "delete_datadictionary",
            "delete_xform",
            "move_xform",
            "report_xform",
            "transfer_xform",
            "view_xform"
          ]
        }
      ],
      "hash": "md5:884d03db13a1839728fb6af891538dd3",
      "description": "Formulaire Organisation des producteur",
      "downloadable": true,
      "allows_sms": false,
      "encrypted": false,
      "sms_id_string": "fuma-op",
      "id_string": "fuma-op",
      "date_created": "2017-02-08T07:47:56.036026Z",
      "date_modified": "2017-02-08T14:00:35.953585Z",
      "last_submission_time": "2017-02-08T14:00:35.935111Z",
      "uuid": "b213206ea6674e3982fce1e331e9454f",
      "bamboo_dataset": "",
      "instances_with_geopoints": false,
      "num_of_submissions": 5
    },
    {
      "url": "https://kc.kobotoolbox.org/api/v1/forms/84311",
      "formid": 84311,
      "metadata": [
        {
          "url": "https://kc.kobotoolbox.org/api/v1/metadata/274748",
          "id": 274748,
          "xform": 84311,
          "data_value": "",
          "data_type": "data_license",
          "data_file": null,
          "data_file_type": null,
          "file_hash": null
        },
        {
          "url": "https://kc.kobotoolbox.org/api/v1/metadata/274747",
          "id": 274747,
          "xform": 84311,
          "data_value": "",
          "data_type": "form_license",
          "data_file": null,
          "data_file_type": null,
          "file_hash": null
        },
        {
          "url": "https://kc.kobotoolbox.org/api/v1/metadata/274746",
          "id": 274746,
          "xform": 84311,
          "data_value": "",
          "data_type": "source",
          "data_file": null,
          "data_file_type": null,
          "file_hash": null
        },
        {
          "url": "https://kc.kobotoolbox.org/api/v1/metadata/274745",
          "id": 274745,
          "xform": 84311,
          "data_value": "",
          "data_type": "public_link",
          "data_file": null,
          "data_file_type": null,
          "file_hash": null
        }
      ],
      "owner": "https://kc.kobotoolbox.org/api/v1/users/fumagaskiya1",
      "public": false,
      "public_data": false,
      "require_auth": false,
      "submission_count_for_today": 0,
      "tags": [],
      "title": "Formulaire Membre d'une Organisation des producteur",
      "enketoLink": "https://ee.kobotoolbox.org/x/#YPfh",
      "users": [
        {
          "role": "owner",
          "user": "fumagaskiya1",
          "permissions": [
            "add_datadictionary",
            "add_xform",
            "change_datadictionary",
            "change_xform",
            "delete_datadictionary",
            "delete_xform",
            "move_xform",
            "report_xform",
            "transfer_xform",
            "view_xform"
          ]
        }
      ],
      "hash": "md5:ccda42e34a46c10e4a3efba265db98a8",
      "description": "Formulaire Membre d'une Organisation des producteur",
      "downloadable": true,
      "allows_sms": false,
      "encrypted": false,
      "sms_id_string": "fuma-op-membre",
      "id_string": "fuma-op-membre",
      "date_created": "2017-02-08T08:05:39.037365Z",
      "date_modified": "2017-02-08T08:23:49.489807Z",
      "last_submission_time": null,
      "uuid": "ba721255f44047c998c8d813e825c955",
      "bamboo_dataset": "",
      "instances_with_geopoints": false,
      "num_of_submissions": 0
    },
    {
      "url": "https://kc.kobotoolbox.org/api/v1/forms/84312",
      "formid": 84312,
      "metadata": [
        {
          "url": "https://kc.kobotoolbox.org/api/v1/metadata/274752",
          "id": 274752,
          "xform": 84312,
          "data_value": "",
          "data_type": "data_license",
          "data_file": null,
          "data_file_type": null,
          "file_hash": null
        },
        {
          "url": "https://kc.kobotoolbox.org/api/v1/metadata/274751",
          "id": 274751,
          "xform": 84312,
          "data_value": "",
          "data_type": "form_license",
          "data_file": null,
          "data_file_type": null,
          "file_hash": null
        },
        {
          "url": "https://kc.kobotoolbox.org/api/v1/metadata/274750",
          "id": 274750,
          "xform": 84312,
          "data_value": "",
          "data_type": "source",
          "data_file": null,
          "data_file_type": null,
          "file_hash": null
        },
        {
          "url": "https://kc.kobotoolbox.org/api/v1/metadata/274749",
          "id": 274749,
          "xform": 84312,
          "data_value": "",
          "data_type": "public_link",
          "data_file": null,
          "data_file_type": null,
          "file_hash": null
        }
      ],
      "owner": "https://kc.kobotoolbox.org/api/v1/users/fumagaskiya1",
      "public": false,
      "public_data": false,
      "require_auth": false,
      "submission_count_for_today": 0,
      "tags": [],
      "title": "Formulaire Organisation des producteur",
      "enketoLink": "https://ee.kobotoolbox.org/x/#YPfi",
      "users": [
        {
          "role": "owner",
          "user": "fumagaskiya1",
          "permissions": [
            "add_datadictionary",
            "add_xform",
            "change_datadictionary",
            "change_xform",
            "delete_datadictionary",
            "delete_xform",
            "move_xform",
            "report_xform",
            "transfer_xform",
            "view_xform"
          ]
        }
      ],
      "hash": "md5:fd35075585d3e0d8b7de928407874215",
      "description": "Formulaire Organisation des producteur",
      "downloadable": true,
      "allows_sms": false,
      "encrypted": false,
      "sms_id_string": "fuma-union",
      "id_string": "fuma-union",
      "date_created": "2017-02-08T08:15:10.112067Z",
      "date_modified": "2017-02-08T08:31:42.111921Z",
      "last_submission_time": null,
      "uuid": "fcdde482c94741368e19a7ef415d1bb4",
      "bamboo_dataset": "",
      "instances_with_geopoints": false,
      "num_of_submissions": 0
    }
  ]
