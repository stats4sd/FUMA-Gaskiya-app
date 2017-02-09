import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NavController, NavParams, ModalController, App } from 'ionic-angular';
import { PouchdbProvider } from '../../../providers/pouchdb-provider';
import { FormViewPage } from '../../form-view/form-view'


@Component({
  selector: 'page-collect',
  templateUrl: 'collect.html'
})
export class CollectPage {
  public forms: any;
  public empty = true;
  public devMode = true;
  private app: App;
  public show;

  @Input() name: string;
  @Output() onShowForm = new EventEmitter<boolean>();
  //voted = false;

  vote(show: boolean) {
    this.onShowForm.emit(show);
    this.show = true;
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, private database: PouchdbProvider, public modalCtrl:ModalController) {

  }

  ionViewDidEnter() {
    //query all koboForms, load
    console.log('ionViewDidLoad CollectPage');
    this.database.getAll(
      {
        startkey: 'koboForms',
        endkey: 'koboForms\uffff',
        include_docs:true
      },
      
    ).then(
      res => {
        console.log('res', res)
        this.forms = res.rows
        if (res.rows.length > 0) {
          this.empty = false
        }
          
        //   this.forms = baseForms
        //   this.database.bulkDocs(baseForms)
        //     .then(res => console.log('res', res))
        //     .catch(err => console.log('error', err))
        }) 
      }


  loadForm(form) {
    //this.navCtrl.push(FormViewPage,form)
    let formModal = this.modalCtrl.create(FormViewPage, form, {
      showBackdrop: false,
      enableBackdropDismiss: false
    });
    formModal.onDidDismiss(data => {
      console.log('dismissed data',data)
    });
    formModal.present();
    console.log('form', form)
  }
  devScripts() {
    console.log('running dev script')
    for (let form of baseForms) {
      var id = "koboForms_" + form.id_string+"_"+form.formid
      this.database.put(form,id)      
    }
    
  }

}  

//a selection of forms to be available at start
var baseForms = [
  {
    url: "https://kc.kobotoolbox.org/api/v1/forms/84309",
    formid: 84309,
    summaries: [
      { field: '_id', metric: 'count', display: "Total datapoints:" },
    ],
    metadata: [{
      url: "https://kc.kobotoolbox.org/api/v1/metadata/274728",
      id: 274728, xform: 84309, data_value: "", data_type: "data_license", data_file: null, data_file_type: null, file_hash: null
    }, { url: "https://kc.kobotoolbox.org/api/v1/metadata/274727", id: 274727, xform: 84309, data_value: "", data_type: "form_license", data_file: null, data_file_type: null, file_hash: null }, { url: "https://kc.kobotoolbox.org/api/v1/metadata/274726", id: 274726, xform: 84309, data_value: "", data_type: "source", data_file: null, data_file_type: null, file_hash: null }, { url: "https://kc.kobotoolbox.org/api/v1/metadata/274725", id: 274725, xform: 84309, data_value: "", data_type: "public_link", data_file: null, data_file_type: null, file_hash: null }],
    owner: "https://kc.kobotoolbox.org/api/v1/users/fumagaskiya1",public: false, public_data: false, require_auth: false, submission_count_for_today: 0, tags: [],
    title: "Formulaire Organisation des producteur",
    enketoLink: "https://ee.kobotoolbox.org/x/#YPfp", users: [{ role: "owner", user: "fumagaskiya1", permissions: ["add_datadictionary", "add_xform", "change_datadictionary", "change_xform", "delete_datadictionary", "delete_xform", "move_xform", "report_xform", "transfer_xform", "view_xform"] }], hash: "md5:884d03db13a1839728fb6af891538dd3",
    description: "Formulaire Organisation des producteur", downloadable: true, allows_sms: false, encrypted: false, sms_id_string: "fuma-op", id_string: "fuma-op", date_created: "2017-02-08T07:47:56.036026Z", date_modified: "2017-02-08T14:00:35.953585Z", last_submission_time: "2017-02-08T14:00:35.935111Z", uuid: "b213206ea6674e3982fce1e331e9454f", bamboo_dataset: "", instances_with_geopoints: false, num_of_submissions: 5
  },
  {
    url: "https://kc.kobotoolbox.org/api/v1/forms/84311",
    formid: 84311,
    summaries: [
      { field: '_id', metric: 'count', display: "Total datapoints:" },
    ],
    visualisations: [
      {
        type: "vega-lite",
        public: true,
        description: "Number of male and female members",
        spec: {
          description: "Number of male and female members",
          mark: "bar",
          data: {
            values: []
          },
          "encoding": {
            "x": { "field": "genre", "type": "nominal" },
            "y": { "aggregate":"count","field": "genre", "type": "nominal" },
            "color": { "field": "genre", "type": "nominal" },
          }
        }
      },
    ],
    metadata: [{ url: "https://kc.kobotoolbox.org/api/v1/metadata/274748", id: 274748, xform: 84311, data_value: "", data_type: "data_license", data_file: null, data_file_type: null, file_hash: null }, { url: "https://kc.kobotoolbox.org/api/v1/metadata/274747", id: 274747, xform: 84311, data_value: "", data_type: "form_license", data_file: null, data_file_type: null, file_hash: null }, { url: "https://kc.kobotoolbox.org/api/v1/metadata/274746", id: 274746, xform: 84311, data_value: "", data_type: "source", data_file: null, data_file_type: null, file_hash: null }, { url: "https://kc.kobotoolbox.org/api/v1/metadata/274745", id: 274745, xform: 84311, data_value: "", data_type: "public_link", data_file: null, data_file_type: null, file_hash: null }], owner: "https://kc.kobotoolbox.org/api/v1/users/fumagaskiya1", public: false, public_data: false, require_auth: false, submission_count_for_today: 0, tags: [], title: "Formulaire Membre d'une Organisation des producteur",
    enketoLink: "https://ee.kobotoolbox.org/x/#YPfh", users: [{ role: "owner", user: "fumagaskiya1", permissions: ["add_datadictionary", "add_xform", "change_datadictionary", "change_xform", "delete_datadictionary", "delete_xform", "move_xform", "report_xform", "transfer_xform", "view_xform"] }], hash: "md5:ccda42e34a46c10e4a3efba265db98a8",
    description: "Formulaire Membre d'une Organisation des producteur", downloadable: true, allows_sms: false, encrypted: false, sms_id_string: "fuma-op-membre", id_string: "fuma-op-membre", date_created: "2017-02-08T08:05:39.037365Z", date_modified: "2017-02-08T08:23:49.489807Z", last_submission_time: null, uuid: "ba721255f44047c998c8d813e825c955", bamboo_dataset: "", instances_with_geopoints: false, num_of_submissions: 0
  },
  {
    url: "https://kc.kobotoolbox.org/api/v1/forms/84312",
    formid: 84312,
    summaries: [
      { field: '_id', metric: 'count', display: "Total datapoints:" },
    ],
    metadata: [{ url: "https://kc.kobotoolbox.org/api/v1/metadata/274752", id: 274752, xform: 84312, data_value: "", data_type: "data_license", data_file: null, data_file_type: null, file_hash: null }, { url: "https://kc.kobotoolbox.org/api/v1/metadata/274751", id: 274751, xform: 84312, data_value: "", data_type: "form_license", data_file: null, data_file_type: null, file_hash: null }, { url: "https://kc.kobotoolbox.org/api/v1/metadata/274750", id: 274750, xform: 84312, data_value: "", data_type: "source", data_file: null, data_file_type: null, file_hash: null }, { url: "https://kc.kobotoolbox.org/api/v1/metadata/274749", id: 274749, xform: 84312, data_value: "", data_type: "public_link", data_file: null, data_file_type: null, file_hash: null }], owner: "https://kc.kobotoolbox.org/api/v1/users/fumagaskiya1", public: false, public_data: false, require_auth: false, submission_count_for_today: 0, tags: [], title: "Formulaire Organisation des producteur", enketoLink: "https://ee.kobotoolbox.org/x/#YPfi", users: [{ role: "owner", user: "fumagaskiya1", permissions: ["add_datadictionary", "add_xform", "change_datadictionary", "change_xform", "delete_datadictionary", "delete_xform", "move_xform", "report_xform", "transfer_xform", "view_xform"] }], hash: "md5:fd35075585d3e0d8b7de928407874215", description:
      "Formulaire Union des producteur", downloadable: true, allows_sms: false, encrypted: false, sms_id_string: "fuma-union", id_string: "fuma-union", date_created: "2017-02-08T08:15:10.112067Z", date_modified: "2017-02-08T08:31:42.111921Z", last_submission_time: null, uuid: "fcdde482c94741368e19a7ef415d1bb4", bamboo_dataset: "", instances_with_geopoints: false, num_of_submissions: 0
  }
]
