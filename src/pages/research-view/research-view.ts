import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { VegaLitePage } from '../visualisations/vega-lite/vega-lite';
import { LeafletPage } from '../visualisations/leaflet/leaflet';
//simple statistics imported in index.html
declare var ss;

@Component({
  selector: 'page-research-view',
  templateUrl: 'research-view.html'
})
export class ResearchViewPage {
  public res: any;
  summaries:any=[]

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
    this.res = this.navParams.data.doc;
    this.calculateSummaries(this.res.summaries, this.res.data)
    console.log(this.summaries)
  }

  ionViewDidLoad() {
    console.log('res',this.res)
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
  calculateSummaries(summaries,data) {
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
