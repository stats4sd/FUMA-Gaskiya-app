import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { PouchdbProvider } from '../../providers/pouchdb-provider';
import { AjouterOpPage } from './ajouter-op/ajouter-op';
import { DetailOpPage } from './detail-op/detail-op';
import { Storage } from '@ionic/storage';
import { ConfLocaliteEnquetePage } from '../configuration/conf-localite-enquete/conf-localite-enquete'


/*
  Generated class for the Op page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-op',
  templateUrl: 'op.html'
})
export class OpPage {

  selectedSource: any = 'application';
  ops: any = [];
  opsApplication: any = [];
  opsKobo: any = [];
  allOPs: any = [];
  confLocaliteEnquete: any;
  num_aggrement_union: any;
  nom_union: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public alertCtl: AlertController, public servicePouchdb: PouchdbProvider) {
    if(this.navParams.data.num_aggrement_union){
      this.num_aggrement_union = this.navParams.data.num_aggrement_union;
      this.nom_union = this.navParams.data.nom_union;
    }
  }

  ionViewDidEnter() {
    if(this.selectedSource === 'application'){
      let opss: any = [];
      this.servicePouchdb.getPlageDocs('fuma:op:','fuma:op:\uffff').then((ops) => {
        if(ops){
          //opss = ops;
          ops.forEach((o, index) => {
            if(!o.data.op/* || o.data.op !== ''*/){
              opss.push(o)
            }
          });

          if(this.num_aggrement_union){
            let opu: any = [];
            opss.forEach((o, i) => {
              if(o.data.union === this.num_aggrement_union){
                opu.push(o)
              }
           });
           this.ops = opu;
           this.allOPs = opu;

          }else{
            this.ops = opss;
            this.allOPs = opss;
          }
          //this.ops = opss;
          //this.allOPs = opss;
        }
      });
    }else if(this.selectedSource === 'kobo'){
      let opss: any = [];
      this.servicePouchdb.getPlageDocs('koboSubmission_fuma-op','koboSubmission_fuma-op\uffff').then((ops) => {
        if(ops){
          ops.forEach((o, i) => {
            if(!o.data.op){
             opss.push(o) ;
             //this.allOPs.push(o);
            }
          });

          if(this.num_aggrement_union){
            let opu: any = [];
            opss.forEach((o, i) => {
              if(o.data.union === this.num_aggrement_union){
                opu.push(o)
              }
           });
           this.ops = opu;
           this.allOPs = opu;

          }else{
            this.ops = opss;
            this.allOPs = opss;
          }
          //this.ops = opss ;
          //this.allOPs = opss;
          //this.ops = ops;
          //this.allOPs = ops;
        }
      });
    }else{
      let A = [];
      let opss: any = [];
      this.servicePouchdb.getPlageDocs('fuma:op','fuma:op:\uffff').then((opsA) => {
        if(opsA){
          //opss = ops;
          opsA.forEach((o, index) => {
            if(!o.data.op/* || o.data.op !== ''*/){
              A.push(o)
            }
          })
        }
        let k = [];
         this.servicePouchdb.getPlageDocs('koboSubmission_fuma-op','koboSubmission_fuma-op\uffff').then((opsK) => {
           
          opsK.forEach((o, i) => {
            if(!o.data.op){
             k.push(o) ;
             //this.allOPs.push(o);
            }
          })

          opss = A.concat(k);
          if(this.num_aggrement_union){
            let opu: any = [];
            opss.forEach((o, i) => {
              if(o.data.union === this.num_aggrement_union){
                opu.push(o)
              }
           });
           this.ops = opu;
           this.allOPs = opu;

          }else{
            this.ops = opss;
            this.allOPs = opss;
          }

          //this.ops = A.concat(k);
          //this.allOPs = this.ops

       
      }, err => console.log(err));

      }, err => console.log(err));      
    }
    

    this.storage.get('confLocaliteEnquete').then((confLocaliteEnquete) => {
      if(confLocaliteEnquete){
        this.confLocaliteEnquete = confLocaliteEnquete;
      }
      //this.chargerVillages(this.confLocaliteEnquete.commune.id);
    });
  }

  choixSource(){

     if(this.selectedSource === 'application'){
    
      let opss: any = [];
      this.servicePouchdb.getPlageDocs('fuma:op:','fuma:op:\uffff').then((ops) => {
        if(ops){
          //opss = ops;
          ops.forEach((o, index) => {
            if(!o.data.op/* || o.data.op !== ''*/){
              opss.push(o)
            }
          })

          if(this.num_aggrement_union){
            let opu: any = [];
            opss.forEach((o, i) => {
              if(o.data.union === this.num_aggrement_union){
                opu.push(o)
              }
           });
           this.ops = opu;
           this.allOPs = opu;

          }else{
            this.ops = opss;
            this.allOPs = opss;
          }
          //this.ops = opss;
          //this.allOPs = opss;
        }
      });
    }else if(this.selectedSource === 'kobo'){
      //this.ops = [];
      //this.allOPs = [];
      let opss: any = [];
      this.servicePouchdb.getPlageDocs('koboSubmission_fuma-op','koboSubmission_fuma-op\uffff').then((ops) => {
        if(ops){
          ops.forEach((o, i) => {
            if(!o.data.op){
              opss.push(o)
             //this.ops.push(o) ;
             //this.allOPs.push(o);
            }
          });

          if(this.num_aggrement_union){
            let opu: any = [];
            opss.forEach((o, i) => {
              if(o.data.union === this.num_aggrement_union){
                opu.push(o)
              }
           });
           this.ops = opu;
           this.allOPs = opu;

          }else{
            this.ops = opss;
            this.allOPs = opss;
          }
        }
      });
    }else{
      let A = [];
      let opss: any = [];
      this.servicePouchdb.getPlageDocs('fuma:op','fuma:op:\uffff').then((opsA) => {
        if(opsA){
          //opss = ops;
          opsA.forEach((o, index) => {
            if(!o.data.op/* || o.data.op !== ''*/){
              A.push(o)
            }
          })
        }
        let k = [];
         this.servicePouchdb.getPlageDocs('koboSubmission_fuma-op','koboSubmission_fuma-op\uffff').then((opsK) => {
           opsK.forEach((o, i) => {
            if(!o.data.op){
             k.push(o) ;
             //this.allOPs.push(o);
            }
          });

          opss = A.concat(k);
          if(this.num_aggrement_union){
            let opu: any = [];
            opss.forEach((o, i) => {
              if(o.data.union === this.num_aggrement_union){
                opu.push(o)
              }
           });
           this.ops = opu;
           this.allOPs = opu;

          }else{
            this.ops = opss;
            this.allOPs = opss;
          }
          //this.ops = A.concat(k);
          //this.allOPs = this.ops

      }, err => console.log(err));

      }, err => console.log(err));
     
      
    }

  }

  ajouter(confLocaliteEnquete){
    if(this.confLocaliteEnquete){
      if(this.num_aggrement_union){
        this.navCtrl.push(AjouterOpPage, {'confLocaliteEnquete': confLocaliteEnquete, 'num_aggrement_union': this.num_aggrement_union, 'nom_union': this.nom_union});
      }else{
        this.navCtrl.push(AjouterOpPage, {'confLocaliteEnquete': confLocaliteEnquete});
      }
      
    }else{
      let alert = this.alertCtl.create({
        title: 'Erreur',
        message: 'Vous devez d\'abord définir la configuration de la localité à enquêtée!',
        buttons: [
          {
            text: 'Définir localité',
            handler: () => {
              this.navCtrl.push(ConfLocaliteEnquetePage);
            }        
          },
          {
            text: 'Annuler',
            handler: () => console.log('annuler')
          }
        ]
      });

      alert.present();
    }
    
  }

  detail(op, selectedSource){
    this.navCtrl.push(DetailOpPage, {'op': op, 'selectedSource': selectedSource});
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.ops = this.allOPs;

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.ops = this.ops.filter((item) => {
        return (item.data.nom_OP.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
  }


}
