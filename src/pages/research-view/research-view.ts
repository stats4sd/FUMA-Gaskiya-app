import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { VegaLitePage } from '../visualisations/vega-lite/vega-lite';
import { LeafletPage } from '../visualisations/leaflet/leaflet';
import { PouchdbProvider } from '../../providers/pouchdb-provider'
//simple statistics imported in index.html
declare var ss;

@Component({
  selector: 'page-research-view',
  templateUrl: 'research-view.html'
})
export class ResearchViewPage {
  public res: any;
  private submissions: any;
  private id: any;
  private count: any;
  summaries:any=[]

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, private database:PouchdbProvider) {
    this.res = this.navParams.data.doc;
    this.id = this.navParams.data.id
    this.refresh()
    this.count=1
  }
  refresh() {
    if (this.id.split('_')[0] == "koboForms") {
      this.prepareKoboFormSummaries(this.res)
    }
    else { this.calculateSummaries(this.res.summaries, this.res.data) }
  }

  ionViewDidEnter() {
    if(this.count>0){this.refresh()}
  }
  prepareKoboFormSummaries(doc) {
    if (!doc.summaries) { doc.summaries = [] }
    if (!doc.visualisations) { doc.visualisations = [] }
    this.res = doc
    //get data points
    var key = 'koboSubmission_' + doc.id_string
    this.database.getAll(
      {
        startkey: key,
        endkey: key + '\uffff',
        include_docs: true
      },
    ).then(
      res => {
        var data = []
        for (let row of res.rows) {
          data.push(row.doc.data)
        }
        this.res.data = data
        console.log('current res', this.res)
        let i = 0
        for (let vis of doc.visualisations) {
          this.res.visualisations[i].spec.data = this.res.data
        }
        this.calculateSummaries(this.res.summaries, this.res.data)
      })  
  }

  openVis(vis) {
    console.log(vis)

    //set additional parameters and load relevant vis page, sending spec parameter as 'visSpec'
    if (vis.type == "vega-lite") {
      let spec = vis.spec
      //copy description and data to spec 
      spec.data = {
        values: this.res.data
      }    
      spec.description = vis.description
      let modal = this.modalCtrl.create(VegaLitePage, { visSpec: spec });
      modal.present();
    }
    if (vis.type == "leaflet") {
      vis.data=this.res.data
      let modal = this.modalCtrl.create(LeafletPage, vis);
      modal.present();}  
  }
  calculateSummaries(summaries, data) {
    console.log('summaries', summaries);
    console.log('data', data);
    for (let summary of summaries) {
      summary.dataArray=this._getDataArray(summary,data)
      console.log(summary)
      if (summary.metric == "count") { this._summaryCount(summary, data) }
      if (summary.metric == "unique") { this._summaryUnique(summary, data) }
      if (summary.metric == "mean") { this._summaryMean(summary, data) }
    }
  }
  _summaryCount(summary, data) {
    let count=0
    for (let item of data) { count++ }
    summary.value = count
    this.summaries.push(summary)
  }
  _summaryUnique(summary, data) {
    let temp = {}
    var uniqueField=summary.field
    for (let item of data) {
      if (!temp[item[uniqueField]]) { temp[item[uniqueField]] = 0 }
      temp[item[uniqueField]]++
    }
    console.log('unique keys',temp)
    summary.value = Object.keys(temp).length
    this.summaries.push(summary)
  }
  _summaryMean(summary, data) {
    summary.value = ss.mean(summary.dataArray)
    this.summaries.push(summary)
  }
  _getDataArray(summary, data) {
    var temp = []
    for (let item of data) {
      if ([item[summary.field]]){
        temp.push(item[summary.field])
      }
    }
    return temp
  }


}
