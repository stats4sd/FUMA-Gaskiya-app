import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Platform } from 'ionic-angular';
import { PouchdbProvider } from '../../providers/pouchdb-provider';
import { AjouterEssaiPage } from './ajouter-essai/ajouter-essai';
import { DetailEssaiPage } from './detail-essai/detail-essai';
import { Storage } from '@ionic/storage';
import { File } from '@ionic-native/file';
import * as FileSaver from 'file-saver';
import { Printer, PrintOptions } from '@ionic-native/printer'
declare var cordova: any;
//import { FileService } from '../../providers/file.service'
//declare var cordova: any;

/*
  Generated class for the Essai page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-essai',
  templateUrl: 'essai.html'
})
export class EssaiPage {

  essais: any = [];
  allEssais: any = [];
  annee: any = '';
  selectedAnnee: any;
  matricule_producteur: any;
  nom_producteur: any;
  storageDirectory: string = '';

  annees: any = [];
  selectedStyle: any = 'liste';

  constructor(public navCtrl: NavController, public navParams: NavParams, public printer: Printer, public file: File, public platform: Platform, public storage: Storage, public servicePouchdb: PouchdbProvider, public alertCtl: AlertController) {
    //générer des années de 2000 à 2050
    //this.storageDirectory = cordova.file.externalDataDirectory;
    
    if(this.navParams.data.matricule_producteur){
      this.matricule_producteur = this.navParams.data.matricule_producteur;
      this.nom_producteur = this.navParams.data.nom_producteur;
    }
    for(let i=0; i<=50; i++){
      this.annees.push(2000 + i)
    } 
    this.annees.push('Tous');
 
    let date = new Date();
    this.selectedAnnee = date.getFullYear();
  }

 /* exportExcel() {
    //let blob = new Blob([],
    let table = document.getElementById('tableau').innerHTML;
    this.fileService.save(this.storageDirectory, "exportEssais.xls", "application/vnd.ms-excel", table);
  }*/


  exportExcel(){

    let date = new Date();
    //let dateHeure = date.toLocaleDateString()+ date.toLocaleTimeString();// + date.getTime().toLocaleString();
    let nom = date.getDate().toString() + (date.getMonth() + 1).toString() + date.getFullYear().toString() + date.getHours().toString() + date.getMinutes().toString() + date.getSeconds().toString();

    let blob = new Blob([document.getElementById('tableau').innerHTML], {
      //type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
      type: "text/plain;charset=utf-8"
      //type: 'application/vnd.ms-excel;charset=utf-8'
      //type: "application/vnd.ms-excel;charset=utf-8"
    });

    if(!this.platform.is('android')){
      FileSaver.saveAs(blob, 'Combinee'+nom+'.xls');
    }else{

      let fileDestiny: string = cordova.file.externalRootDirectory;
      this.file.writeFile(fileDestiny, 'Combinee'+nom+'.xls', blob, true).then(()=> {
          alert("Fichier créé dans: " + fileDestiny);
      }).catch(()=>{
          alert("Erreur de création du fichier dans: " + fileDestiny);
      })
    }
  }

  onPrint(){
    let options: PrintOptions = {
        //name: 'Rapport',
        //printerId: 'printer007',
        duplex: true,
        landscape: true,
        grayscale: true
    };
    let content = document.getElementById('tableau').innerHTML;
    this.printer.print(content, options);
  }

  ionViewDidEnter() {

    if(this.selectedAnnee === 'Tous'){
      this.servicePouchdb.getPlageDocs('fuma:essai', 'fuma:essai:\uffff').then((e) => {
          if(e){
            //cas ou le producteur est connu
            if(this.matricule_producteur){
              let ep: any = [];
              e.forEach((ess, i) => {
                if(ess.data.matricule_producteur === this.matricule_producteur){
                  ep.push(ess);
                }
              });
              this.essais = ep;
              this.allEssais = ep;
            }else{
              //sinon
              this.essais = e;
              this.allEssais = e;
            }
        
          }
        });
    }else{
      let ess: any = [];
      this.servicePouchdb.getPlageDocs('fuma:essai', 'fuma:essai:\uffff').then((e) => {
          if(e){
            e.forEach((es, i) => {
              if(es.data.annee_essai === this.selectedAnnee){
                ess.push(es);
              }
            });

            if(this.matricule_producteur){
              let ep: any = [];
              ess.forEach((essai, i) => {
                if(essai.data.matricule_producteur === this.matricule_producteur){
                  ep.push(essai);
                }
              });
              this.essais = ep;
              this.allEssais = ep;
            }else{
              //sinon
              this.essais = ess;
              this.allEssais = ess;
            }
          }
        });
    }
  }

  choixAnneeEssai(){
    if(this.selectedAnnee === 'Tous'){
      this.servicePouchdb.getPlageDocs('fuma:essai', 'fuma:essai:\uffff').then((e) => {
          if(e){
            //cas ou le producteur est connu
            if(this.matricule_producteur){
              let ep: any = [];
              e.forEach((ess, i) => {
                if(ess.data.matricule_producteur === this.matricule_producteur){
                  ep.push(ess);
                }  
              });
              this.essais = ep;
              this.allEssais = ep;
            }else{
              //sinon
              this.essais = e;
              this.allEssais = e;
            }
            //this.essais = e;
            //this.allEssais = e;
          }
        });
    }else{
      let ess: any = [];
      this.servicePouchdb.getPlageDocs('fuma:essai', 'fuma:essai:\uffff').then((e) => {
          if(e){
            e.forEach((es, i) => {
              if(es.data.annee_essai === this.selectedAnnee){
                ess.push(es);
              }
            });

            if(this.matricule_producteur){
              let ep: any = [];
              ess.forEach((essai, i) => {
                if(essai.data.matricule_producteur === this.matricule_producteur){
                  ep.push(essai);
                }
              });
              this.essais = ep;
              this.allEssais = ep;
            }else{
              //sinon
              this.essais = ess;
              this.allEssais = ess;
            }
            //this.essais = ess;
            //this.allEssais = ess;
          }
        });
    }
  }

   ajouter(){
     if(this.matricule_producteur){
      this.navCtrl.push(AjouterEssaiPage, {'matricule_producteur': this.matricule_producteur}); 
     }else{
       this.navCtrl.push(AjouterEssaiPage); 
     }
       
  }

  detail(essai){
    this.navCtrl.push(DetailEssaiPage, {'essai': essai});
  }

  sync(){
    this.servicePouchdb.syncAvecToast(this.ionViewDidEnter());
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.essais = this.allEssais;

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.essais = this.essais.filter((item) => {
        return (item.data.matricule_producteur.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
  }
 

}
