import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { PouchdbProvider } from '../../../../providers/pouchdb-provider';

/*
  Generated class for the AjouterConfLocaliteEnquete page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-ajouter-conf-localite-enquete',
  templateUrl: 'ajouter-conf-localite-enquete.html'
})
export class AjouterConfLocaliteEnquetePage {

  confLocaliteEnquete: any;
  pays: any = [];
  selectedPays: any ;
  regions: any = [];
  selectedRegion: any;
  departements: any = [];
  selectedDepartement: any;
  communes: any = [];
  selectedCommune: any;

  constructor(public pouchdbService: PouchdbProvider,  public navCtrl: NavController, public navParams: NavParams , public formBuilder: FormBuilder, public storage: Storage, public translate: TranslateService) {
 
    this.chargerPays(); 
    
    this.confLocaliteEnquete = this.formBuilder.group({
      pays: ['', Validators.required],
      region: ['', Validators.required],
      departement: ['', Validators.required],
      commune: ['', Validators.required]
    });
  }

  ionViewDidEnter() {

  }

  chargerPays(){
    this.pays = [];
    this.pouchdbService.getDocById('pays').then((pays) => {
      if(pays){
        this.pays = pays.data;
      }
    },err => console.log(err));
  }

  chargerRegions(p){
    this.regions = [];
    this.pouchdbService.getDocById('region').then((regions) => {
      regions.data.forEach((region, index) => {
        if(region.id_pays === p){
          this.regions.push(region);
        }
      });
    });
  }

  chargerDepartements(r){
    this.departements= [];
    this.pouchdbService.getDocById('departement').then((departements) => {
      departements.data.forEach((departement, index) => {
        if(departement.id_region === r){
          this.departements.push(departement);
        }
      });
    });
  }

  chargerCommunes(d){
    this.communes = [];
    this.pouchdbService.getDocById('commune').then((communes) => {
      communes.data.forEach((commune, index) => {
        if(commune.id_departement === d){
          this.communes.push(commune);
        }
      });
    });
  } 

  configurer(){
    /*let pays :any = {};
    let region :any = {};
    let departement :any = {};
    let commune :any = {};
     this.pays.forEach((p, i) => {
       if(p.id === this.selectedPays){
         pays = p;
       }
     });

     this.regions.forEach((r, i) => {
       if(r.id === this.selectedRegion){
         region = r;
       }
     });

     this.departements.forEach((d, i) => {
       if(d.id === this.selectedDepartement){
         departement = d;
       }
     });

     this.communes.forEach((c, i) => {
       if(c.id === this.selectedCommune){
         commune = c;
       }
     });
     
     let res = {
      pays: pays,
      region: region,
      departement: departement,
      commune: commune
     }*/
    //this.pouchdbService.createDoc(this.confLocaliteEnquete.value);
    this.storage.set('confLocaliteEnquete', this.confLocaliteEnquete.value);
    this.navCtrl.pop();
  }

  annuler(){
    this.navCtrl.pop();
  }

}
