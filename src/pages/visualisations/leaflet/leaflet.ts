import { Component } from '@angular/core';
import { NavParams, ViewController, IonicPage } from 'ionic-angular';
import 'leaflet';
import { TranslateService  } from '@ngx-translate/core';
import { global } from '../../../global-variables/variable';
import { SiteProvider } from '../../../providers/site/site';
import { VillageProvider } from '../../../providers/village/village';
import { PouchdbProvider } from '../../../providers/pouchdb-provider';
declare var L;

@IonicPage()
@Component({
  selector: 'page-leaflet',
  templateUrl: 'leaflet.html'
})
export class LeafletPage {
  private online = false
  //private vis: any;
  essais: any = [];
  map: any;
  selectedLocalite: any = 'site';
  villages: any = [];
  selected_site_id: any = '';
  code_union: any;
  code_op: any;
  selectedAnnee = '2017';

  constructor(public translate: TranslateService, public SiteServiceAutoCompletion: SiteProvider, public VillageServiceAutoCompletion: VillageProvider, public servicePouchdb: PouchdbProvider, public params: NavParams, private viewCtrl: ViewController) {
    //console.log('params',params.data)
    //this.vis=params.data;
    //this.code_union = this.params.data.code_union;
    if(params.data.type === 'essai'){
      this.essais = params.data.essais;
    }
    this.translate.setDefaultLang(global.langue)
  }
  //after view loaded add the map


  getEssais(code, type, annee){
    this.essais = [];
    if(type === 'union'){
      this.servicePouchdb.getPlageDocsRapide('fuma:essai', 'fuma:essai:\uffff').then((e) => {
      if(e){
        e.map((es) => {
          if(code === es.doc.data.code_union && annee.toString() === es.doc.data.annee_essai.toString()){
            this.essais.push(es)
          }
        })

        this.loadMarkers(this.map, this.essais)
      }
    });
    }else if(type === 'op'){
       this.servicePouchdb.getPlageDocsRapide('fuma:essai:FM-'+code, 'fuma:essai:FM-'+code+' \uffff').then((e) => {
          e.map((es) => {
          if(es.doc.data.annee_essai.toString() === annee.toString()){
            this.essais.push(es)
          }
        })

        this.loadMarkers(this.map, this.essais)
        });
    }
   
  }


  ionViewDidEnter(){
    this.translate.use(global.langue)

    var mapid = document.getElementById('mapid')
    //var map = L.map(mapid, {
    this.map = L.map(mapid, {
      zoomControl: false,
      center: [18, 8],
      zoom: 4,
      minZoom: 1,
      maxZoom: 15,
      //layers: [basemaps.Offline],
      touchZoom: true
    })

    this.addMapFeatures(this.map)
    if(this.params.data.type === 'essai'){
      this.loadMarkers(this.map, this.essais)
    }else if(this.params.data.code_union) {
      this.getEssais(this.params.data.code_union, this.params.data.type, this.selectedAnnee)
    }else if(this.params.data.code_op) {
      this.getEssais(this.params.data.code_op, this.params.data.type, this.selectedAnnee)
    }
  
    this.servicePouchdb.getDocById('commune').then((communes) => {
      if(communes){
        this.SiteServiceAutoCompletion.data = communes.data;
      }
    });

    this.servicePouchdb.getDocById('village').then((villages) => {
      if(villages){
        this.VillageServiceAutoCompletion.data = villages.data;
      }
    });
  }

  chargerVillagesDuSite(site_id){
    this.servicePouchdb.getDocById('village').then((villages) => {
      if(villages){
        let data: any = [];
        villages.data.forEach((village) => {
          if(village.id_commune === site_id){
            data.push(village);
          }
        })
        this.VillageServiceAutoCompletion.data = data;
      }
    });
  }

  ionViewDidLoad() {
    /*var mapid = document.getElementById('mapid')
    //var map = L.map(mapid, {
    this.map = L.map(mapid, {
      zoomControl: false,
      center: [18, 8],
      zoom: 4,
      minZoom: 1,
      maxZoom: 15,
      //layers: [basemaps.Offline],
      touchZoom: true
    })

    this.addMapFeatures(this.map)
    this.loadMarkers(this.map, this.essais)
  */
  }
  close() {
    this.viewCtrl.dismiss()
  }

  selectSite(ev){
    //alert(ev.code_produit);
    let essais: any = [];
    if(ev.nom && ev.nom != ''){
      this.selected_site_id = ev.id;
      //this.
      //this.selectedMembre1 = ev.matricule_Membre;
      //alert(ev.nom + ' '+ev.id)
      this.essais.forEach((essai) => {
        if(ev.nom === essai.doc.data.site_producteur){
          essais.push(essai);
        }
      });

      this.map.remove();

      var mapid = document.getElementById('mapid')
      //var map = L.map(mapid, {
      this.map = L.map(mapid, {
        zoomControl: false,
        center: [18, 8],
        zoom: 4,
        minZoom: 1,
        maxZoom: 15,
        //layers: [basemaps.Offline],
        touchZoom: true
      })
      this.addMapFeatures(this.map)
      this.loadMarkers(this.map, essais)

      this.chargerVillagesDuSite(this.selected_site_id)

    } 
  }

   selectVillage(ev){
    //alert(ev.code_produit);
    let essais: any = [];
    if(ev.nom && ev.nom != ''){
      //this.
      //this.selectedMembre1 = ev.matricule_Membre;
      //alert(ev.nom + ' '+ev.id)
      this.essais.forEach((essai) => {
        if(ev.nom === essai.doc.data.village_producteur){
          essais.push(essai);
        }
      });

      this.map.remove();

      var mapid = document.getElementById('mapid')
      //var map = L.map(mapid, {
      this.map = L.map(mapid, {
        zoomControl: false,
        center: [18, 8],
        zoom: 4,
        minZoom: 1,
        maxZoom: 15,
        //layers: [basemaps.Offline],
        touchZoom: true
      })
      this.addMapFeatures(this.map)
      this.loadMarkers(this.map, essais)

    } 
  }
 


  addMapFeatures(map) {
    //selecting element as current typings not accepting string
    var offline = L.tileLayer('assets/mapTiles/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxNativeZoom: 8
    });
    var online = L.tileLayer('assets/mapTiles/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    L.layerGroup([online, offline]).addTo(map)

    L.control.zoom({ position: 'topright' }).addTo(map);
    L.control.scale().addTo(map);

    map.on('zoomend', function () {
      var z = map.getZoom();
      if (z < 12) {
        if (this.online = true) {
          this.online = false
          return offline.addTo(map)
        }
        this.zoomWarning = false
      }
      if (z >= 12) { this.zoomWarning = true; this.online = true }
      if (z > 12) { return online.addTo(map) }
      //bind this allows to update scope through external callback function
    }.bind(this));

    // //add markers
    //****note - awesome markers currently commented out of index script due to conflict */
    // // var redMarker = L.AwesomeMarkers.icon({
    // //   icon: 'shopping-cart',
    // //   markerColor: 'red',
    // //   prefix: 'fa'
    // // });

  }


  loadMarkers(map, essais) {
    // var mapIcon = L.AwesomeMarkers.icon({
    //   icon: 'shopping-cart',
    //   markerColor: 'red',
    //   prefix: 'fa'
    // });
    //var latField=this.vis.Lat
    //var lonField = this.vis.Lon
    if (essais.length) {
      let i=0
      for (let ess of essais) {
        //parse int fields in case accidental text
        var lat = parseFloat(ess.doc.data.latitude)
        
        var lon = parseFloat(ess.doc.data.longitude)
        if (!isNaN(lat) && !isNaN(lon)) {
          L.circleMarker([lat, lon]).addTo(map);
          i++
        }
      }
      console.log('points added',i)
    }
  }


 /* loadMarkers(map) {
    // var mapIcon = L.AwesomeMarkers.icon({
    //   icon: 'shopping-cart',
    //   markerColor: 'red',
    //   prefix: 'fa'
    // });
    var latField=this.vis.Lat
    var lonField = this.vis.Lon
    if (latField && lonField) {
      let i=0
      for (let item of this.vis.data) {
        //parse int fields in case accidental text
        var lat = parseFloat(item[latField])
        var lon = parseFloat(item[lonField])
        if (!isNaN(lat) && !isNaN(lon)) {
          L.circleMarker([lat, lon]).addTo(map);
          i++
        }
      }
      console.log('points added',i)
    }
  }
*/
}
