import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import 'leaflet';
declare var L;

@Component({
  selector: 'page-leaflet',
  templateUrl: 'leaflet.html'
})
export class LeafletPage {
  private online = false
  private vis: any;

  constructor(params: NavParams, private viewCtrl: ViewController) {
    console.log('params',params.data)
    this.vis=params.data
  }
  //after view loaded add the map
  ionViewDidLoad() {
    var mapid = document.getElementById('mapid')
    var map = L.map(mapid, {
      zoomControl: false,
      center: [18, 8],
      zoom: 4,
      minZoom: 1,
      maxZoom: 15,
      //layers: [basemaps.Offline],
      touchZoom: true
    })

    this.addMapFeatures(map)
    this.loadMarkers(map)
  
  }
  close() {
    this.viewCtrl.dismiss()
  }
  addMapFeatures(map) {
    //selecting element as current typings not accepting string
    var offline = L.tileLayer('assets/mapTiles/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxNativeZoom: 8
    })
    var online = L.tileLayer('assets/mapTiles/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    })
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
  loadMarkers(map) {
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

}
