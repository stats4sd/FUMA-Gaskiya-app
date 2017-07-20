import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, App, AlertController, Platform, ModalController, IonicPage, MenuController, Events  } from 'ionic-angular';
import { PouchdbProvider } from '../../providers/pouchdb-provider';
//import { AjouterEssaiPage } from './ajouter-essai/ajouter-essai';
//import { DetailEssaiPage } from './detail-essai/detail-essai';
import { Storage } from '@ionic/storage';
import { File } from '@ionic-native/file';
import { global } from '../../global-variables/variable';
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

@IonicPage()
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
  aProfile: boolean = false;
  membre: any; 
  selectedLimit: any = 10;
  limits: any = [10, 25, 50, 100, 500, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 'Tous'];
  //champs: any = [];
  //traitements: any = [];

  constructor(public navCtrl: NavController, public modelCtl: ModalController, public a: App, public events: Events, public zone: NgZone, public navParams: NavParams, public menuCtl: MenuController, public printer: Printer, public file: File, public platform: Platform, public storage: Storage, public servicePouchdb: PouchdbProvider, public alertCtl: AlertController) {
    this.menuCtl.enable(false, 'options');
    this.menuCtl.enable(false, 'connexion');
    this.menuCtl.enable(false, 'profile');
    //this.servicePouchdb.reset()
    //this.zone = new NgZone({enableLongStackTrace: true})
    events.subscribe('user:login', () => {
      this.servicePouchdb.remoteSaved.getSession((err, response) => {
        if (response.userCtx.name) {
          this.aProfile = true;
        }else{
          this.aProfile = false;
        }
      }, err => console.log(err));
    });

    /*events.subscribe('ajout-essai', (essai) => {
      this.zone.run(() => {
        this.essais.push(essai)
      })
    });*/
    
    if(this.navParams.data.matricule_producteur){
      this.matricule_producteur = this.navParams.data.matricule_producteur;
      this.nom_producteur = this.navParams.data.nom_producteur;
      this.membre = this.navParams.data.membre;
    }

     //générer des années de 2000 à 2050
    //this.storageDirectory = cordova.file.externalDataDirectory;
    for(let i=0; i<=50; i++){
      this.annees.push(2000 + i)
    } 
    this.annees.push('Tous');
 
    let date = new Date();
    this.selectedAnnee = date.getFullYear();
   // this.getEssais()
  }

 /* exportExcel() {
    //let blob = new Blob([],
    let table = document.getElementById('tableau').innerHTML;
    this.fileService.save(this.storageDirectory, "exportEssais.xls", "application/vnd.ms-excel", table);
  }*/

  
  option(){
    this.menuCtl.enable(true, 'options');
    this.menuCtl.enable(false, 'connexion');
    this.menuCtl.enable(false, 'profile');
    this.menuCtl.toggle()
  }

  profile(){
    this.menuCtl.enable(false, 'options');
    this.menuCtl.enable(false, 'connexion');
    this.menuCtl.enable(true, 'profile');
    this.menuCtl.toggle()
  }

  connexion(){
    this.menuCtl.enable(false, 'options');
    this.menuCtl.enable(true, 'connexion');
    this.menuCtl.enable(false, 'profile');
    this.menuCtl.toggle() 
  }

  sync(){
    this.servicePouchdb.syncAvecToast(this.ionViewDidEnter());
  }

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

  /*ionViewWillEnter(){
    if (global.estConnecte) {
      this.aProfile = true;
    }else{
      this.aProfile = false;
    }
  }*/

  ionViewDidEnter(){
    this.getEssais()
  }

  /*ionViewDidLoad() {
    this.getEssais()
  }*/

  choixLimit(){
    if(this.selectedAnnee === 'Tous'){
      if(this.selectedLimit === 'Tous'){
       // this.servicePouchdb.getPlageDocs('fuma:essai', 'fuma:essai:\uffff').then((e) => {
         //   if(e){
              //cas ou le producteur est connu
              if(this.matricule_producteur){
                this.servicePouchdb.getPlageDocs('fuma:essai:'+this.matricule_producteur, 'fuma:essai:'+this.matricule_producteur+' \uffff').then((e) => {
                  if(e){
                    this.essais = e;
                    this.allEssais = e;
                  }
                 // this.champs = c;
                  //this.allChamps = c;
                })
                /*let ep: any = [];
                e.forEach((ess, i) => {
                  if(ess.data.matricule_producteur === this.matricule_producteur){
                    ep.push(ess);
                  }
                });
                this.essais = ep;
                this.allEssais = ep;*/
              }else{
                //sinon
                this.servicePouchdb.getPlageDocs('fuma:essai', 'fuma:essai:\uffff').then((e) => {
                  if(e){
                     this.essais = e;
                     this.allEssais = e;
                  }
                });
               
              }
          
          //  }
         // });
        }else{
         // this.servicePouchdb.getPlageDocsAvecLimit('fuma:essai', 'fuma:essai:\uffff', this.selectedLimit).then((e) => {
           // if(e){
              //cas ou le producteur est connu
              if(this.matricule_producteur){
                this.servicePouchdb.getPlageDocsAvecLimit('fuma:essai:'+this.matricule_producteur, 'fuma:essai:'+this.matricule_producteur+' \uffff', this.selectedLimit).then((e) => {
                  if(e){
                    this.essais = e;
                    this.allEssais = e;
                  }
                });
                /*let ep: any = [];
                e.forEach((ess, i) => {
                  if(ess.data.matricule_producteur === this.matricule_producteur){
                    ep.push(ess);
                  }
                });
                this.essais = ep;
                this.allEssais = ep;*/
              }else{
                //sinon
                this.servicePouchdb.getPlageDocsAvecLimit('fuma:essai', 'fuma:essai:\uffff', this.selectedLimit).then((e) => {
                  if(e){
                    this.essais = e;
                    this.allEssais = e;
                  }

                });
                
              }
          
          //  }
        //  });
        }
    }else{
      if(this.selectedLimit === 'Tous'){
        //let ess: any = [];
        //this.servicePouchdb.getPlageDocs('fuma:essai', 'fuma:essai:\uffff').then((e) => {
          //  if(e){
             /* e.forEach((es, i) => {
                if(es.data.annee_essai === this.selectedAnnee){
                  ess.push(es);
                }
              });*/

              if(this.matricule_producteur){
                 this.servicePouchdb.getPlageDocs('fuma:essai:'+this.matricule_producteur, 'fuma:essai:'+this.matricule_producteur+' \uffff').then((e) => {
                  if(e){
                     let ess: any = [];
                     e.forEach((es, i) => {
                        if(es.data.annee_essai === this.selectedAnnee){
                          ess.push(es);
                        }
                      });
                    this.essais = ess;
                    this.allEssais = ess;
                  }
                });
               
                /*let ep: any = [];
                ess.forEach((essai, i) => {
                  if(essai.data.matricule_producteur === this.matricule_producteur){
                    ep.push(essai);
                  }
                });
                this.essais = ep;
                this.allEssais = ep;*/
              }else{
                //sinon
                this.servicePouchdb.getPlageDocs('fuma:essai', 'fuma:essai:\uffff').then((e) => {
                  if(e){
                    let ess: any = [];
                     e.forEach((es, i) => {
                        if(es.data.annee_essai === this.selectedAnnee){
                          ess.push(es);
                        }
                      });
                    this.essais = ess;
                    this.allEssais = ess;
                  }
                });
                
              }
          //  }
        //  });
        }else{
          //let ess: any = [];
          //this.servicePouchdb.getPlageDocsAvecLimit('fuma:essai', 'fuma:essai:\uffff', this.selectedLimit).then((e) => {
              /*if(e){
                e.forEach((es, i) => {
                  if(es.data.annee_essai === this.selectedAnnee){
                    ess.push(es);
                  }
                });*/

                if(this.matricule_producteur){
                  this.servicePouchdb.getPlageDocsAvecLimit('fuma:essai:'+this.matricule_producteur, 'fuma:essai:'+this.matricule_producteur+' \uffff', this.selectedLimit).then((e) => {
                  if(e){
                     let ess: any = [];
                     e.forEach((es, i) => {
                        if(es.data.annee_essai === this.selectedAnnee){
                          ess.push(es);
                        }
                      });
                    this.essais = ess;
                    this.allEssais = ess;
                  }
                });
               
                  /*let ep: any = [];
                  ess.forEach((essai, i) => {
                    if(essai.data.matricule_producteur === this.matricule_producteur){
                      ep.push(essai);
                    }
                  });
                  this.essais = ep;
                  this.allEssais = ep;*/
                }else{
                  //sinon
                   this.servicePouchdb.getPlageDocsAvecLimit('fuma:essai', 'fuma:essai:\uffff', this.selectedLimit).then((e) => {
                     if(e){
                       let ess: any = [];
                        e.forEach((es, i) => {
                            if(es.data.annee_essai === this.selectedAnnee){
                              ess.push(es);
                            }
                          });
                      this.essais = ess;
                      this.allEssais = ess;
                     }
                   })
                  
                }
             // }
           // });
          }
      }

  }

/*
    chargerChamps(matricule){
      let chmp: any = [];

      this.servicePouchdb.getPlageDocs('fuma:champs:'+matricule, 'fuma:champs:'+matricule+' \uffff').then((c) => {
          if(c){
            this.champs = c;
          }
        });
      }

      chargerTraitements(annee){
      let trm: any = [];
      this.servicePouchdb.getPlageDocs('fuma:traitement', 'fuma:traitement:\uffff').then((t) => {
          if(t){

             t.map((row) => {
          
                if(row.data.annee === annee){
                    trm.push(row);
                  }
            });
            /*t.forEach((tr, i) => {
              if(tr.data.annee === annee){
                trm.push(tr);
              }
            })*
            this.traitements = trm;
            
            }
        });
    }

*/

  getEssais(){
    this.servicePouchdb.remoteSaved.getSession((err, response) => {
        if (response.userCtx.name) {
          this.aProfile = true;
        }else{
          this.aProfile = false;
        }
    }, err => {
      if(global.info_user != null){
        this.aProfile = true;
      }else{
        this.aProfile = false;
      }
      //console.log(err)
    }); 

    if(this.selectedAnnee === 'Tous'){
      if(this.selectedLimit === 'Tous'){
       // this.servicePouchdb.getPlageDocs('fuma:essai', 'fuma:essai:\uffff').then((e) => {
         //   if(e){
              //cas ou le producteur est connu
              if(this.matricule_producteur){
                this.servicePouchdb.getPlageDocs('fuma:essai:'+this.matricule_producteur, 'fuma:essai:'+this.matricule_producteur+' \uffff').then((e) => {
                  if(e){
                    this.essais = e;
                    this.allEssais = e;
                  }
                 // this.champs = c;
                  //this.allChamps = c;
                });
                //this.chargerChamps(this.matricule_producteur);
                //let maDate = new Date();
                //this.chargerTraitements(this.selectedAnnee);
                /*let ep: any = [];
                e.forEach((ess, i) => {
                  if(ess.data.matricule_producteur === this.matricule_producteur){
                    ep.push(ess);
                  }
                });
                this.essais = ep;
                this.allEssais = ep;*/
              }else{
                //sinon
                this.servicePouchdb.getPlageDocs('fuma:essai', 'fuma:essai:\uffff').then((e) => {
                  if(e){
                     this.essais = e;
                     this.allEssais = e;
                  }
                });
               
              }
          
          //  }
         // });
        }else{
         // this.servicePouchdb.getPlageDocsAvecLimit('fuma:essai', 'fuma:essai:\uffff', this.selectedLimit).then((e) => {
           // if(e){
              //cas ou le producteur est connu
              if(this.matricule_producteur){
                this.servicePouchdb.getPlageDocsAvecLimit('fuma:essai:'+this.matricule_producteur, 'fuma:essai:'+this.matricule_producteur+' \uffff', this.selectedLimit).then((e) => {
                  if(e){
                    this.essais = e;
                    this.allEssais = e;
                  }
                });
                //this.chargerChamps(this.matricule_producteur);
                //let maDate = new Date();
                //this.chargerTraitements(this.selectedAnnee);
                /*let ep: any = [];
                e.forEach((ess, i) => {
                  if(ess.data.matricule_producteur === this.matricule_producteur){
                    ep.push(ess);
                  }
                });
                this.essais = ep;
                this.allEssais = ep;*/
              }else{
                //sinon
                this.servicePouchdb.getPlageDocsAvecLimit('fuma:essai', 'fuma:essai:\uffff', this.selectedLimit).then((e) => {
                  if(e){
                    this.essais = e;
                    this.allEssais = e;
                  }

                });
                
              }
          
          //  }
        //  });
        }
    }else{
      if(this.selectedLimit === 'Tous'){
        //let ess: any = [];
        //this.servicePouchdb.getPlageDocs('fuma:essai', 'fuma:essai:\uffff').then((e) => {
          //  if(e){
             /* e.forEach((es, i) => {
                if(es.data.annee_essai === this.selectedAnnee){
                  ess.push(es);
                }
              });*/

              if(this.matricule_producteur){
                 this.servicePouchdb.getPlageDocs('fuma:essai:'+this.matricule_producteur, 'fuma:essai:'+this.matricule_producteur+' \uffff').then((e) => {
                  if(e){
                     let ess: any = [];
                     e.forEach((es, i) => {
                        if(es.data.annee_essai === this.selectedAnnee){
                          ess.push(es);
                        }
                      });
                    this.essais = ess;
                    this.allEssais = ess;
                  }
                });

                //this.chargerChamps(this.matricule_producteur);
                //let maDate = new Date();
                //this.chargerTraitements(this.selectedAnnee);
               
                /*let ep: any = [];
                ess.forEach((essai, i) => {
                  if(essai.data.matricule_producteur === this.matricule_producteur){
                    ep.push(essai);
                  }
                });
                this.essais = ep;
                this.allEssais = ep;*/
              }else{
                //sinon
                this.servicePouchdb.getPlageDocs('fuma:essai', 'fuma:essai:\uffff').then((e) => {
                  if(e){
                    let ess: any = [];
                     e.forEach((es, i) => {
                        if(es.data.annee_essai === this.selectedAnnee){
                          ess.push(es);
                        }
                      });
                    this.essais = ess;
                    this.allEssais = ess;
                  }
                });
                
              }
          //  }
        //  });
        }else{
          //let ess: any = [];
          //this.servicePouchdb.getPlageDocsAvecLimit('fuma:essai', 'fuma:essai:\uffff', this.selectedLimit).then((e) => {
              /*if(e){
                e.forEach((es, i) => {
                  if(es.data.annee_essai === this.selectedAnnee){
                    ess.push(es);
                  }
                });*/

                if(this.matricule_producteur){
                  this.servicePouchdb.getPlageDocsAvecLimit('fuma:essai:'+this.matricule_producteur, 'fuma:essai:'+this.matricule_producteur+' \uffff', this.selectedLimit).then((e) => {
                  if(e){
                     let ess: any = [];
                     e.forEach((es, i) => {
                        if(es.data.annee_essai === this.selectedAnnee){
                          ess.push(es);
                        }
                      });
                    this.essais = ess;
                    this.allEssais = ess;
                  }
                });
               
               //this.chargerChamps(this.matricule_producteur);
                //let maDate = new Date();
                //this.chargerTraitements(this.selectedAnnee);
                  /*let ep: any = [];
                  ess.forEach((essai, i) => {
                    if(essai.data.matricule_producteur === this.matricule_producteur){
                      ep.push(essai);
                    }
                  });
                  this.essais = ep;
                  this.allEssais = ep;*/
                }else{
                  //sinon
                   this.servicePouchdb.getPlageDocsAvecLimit('fuma:essai', 'fuma:essai:\uffff', this.selectedLimit).then((e) => {
                     if(e){
                       let ess: any = [];
                        e.forEach((es, i) => {
                            if(es.data.annee_essai === this.selectedAnnee){
                              ess.push(es);
                            }
                          });
                      this.essais = ess;
                      this.allEssais = ess;
                     }
                   })
                  
                }
             // }
           // });
          }
      }


    /*if(this.selectedAnnee === 'Tous'){
      if(this.selectedLimit === 'Tous'){
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
          this.servicePouchdb.getPlageDocsAvecLimit('fuma:essai', 'fuma:essai:\uffff', this.selectedLimit).then((e) => {
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
        }
    }else{
      if(this.selectedLimit === 'Tous'){
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
        }else{
          let ess: any = [];
          this.servicePouchdb.getPlageDocsAvecLimit('fuma:essai', 'fuma:essai:\uffff', this.selectedLimit).then((e) => {
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
    }*/

  }

/*
  ionViewDidEnter() {
    //alert(this.navCtrl.getActive().component.name)
   this.servicePouchdb.remoteSaved.getSession((err, response) => {
        if (response.userCtx.name) {
          this.aProfile = true;
        }else{
          this.aProfile = false;
        }
    }, err => {
      if(global.info_user != null){
        this.aProfile = true;
      }else{
        this.aProfile = false;
      }
      //console.log(err)
    }); 

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

    //this.servicePouchdb.reset();
  }
*/
  choixAnneeEssai(){
    if(this.selectedAnnee === 'Tous'){
      if(this.selectedLimit === 'Tous'){
       // this.servicePouchdb.getPlageDocs('fuma:essai', 'fuma:essai:\uffff').then((e) => {
         //   if(e){
              //cas ou le producteur est connu
              if(this.matricule_producteur){
                this.servicePouchdb.getPlageDocs('fuma:essai:'+this.matricule_producteur, 'fuma:essai:'+this.matricule_producteur+' \uffff').then((e) => {
                  if(e){
                    this.essais = e;
                    this.allEssais = e;
                  }
                 // this.champs = c;
                  //this.allChamps = c;
                })
                //this.chargerChamps(this.matricule_producteur);
                //let maDate = new Date();
                //this.chargerTraitements(this.selectedAnnee);
                /*let ep: any = [];
                e.forEach((ess, i) => {
                  if(ess.data.matricule_producteur === this.matricule_producteur){
                    ep.push(ess);
                  }
                });
                this.essais = ep;
                this.allEssais = ep;*/
              }else{
                //sinon
                this.servicePouchdb.getPlageDocs('fuma:essai', 'fuma:essai:\uffff').then((e) => {
                  if(e){
                     this.essais = e;
                     this.allEssais = e;
                  }
                });
               
              }
          
          //  }
         // });
        }else{
         // this.servicePouchdb.getPlageDocsAvecLimit('fuma:essai', 'fuma:essai:\uffff', this.selectedLimit).then((e) => {
           // if(e){
              //cas ou le producteur est connu
              if(this.matricule_producteur){
                this.servicePouchdb.getPlageDocsAvecLimit('fuma:essai:'+this.matricule_producteur, 'fuma:essai:'+this.matricule_producteur+' \uffff', this.selectedLimit).then((e) => {
                  if(e){
                    this.essais = e;
                    this.allEssais = e;
                  }
                });
                //this.chargerChamps(this.matricule_producteur);
                //let maDate = new Date();
                ///this.chargerTraitements(this.selectedAnnee);
                /*let ep: any = [];
                e.forEach((ess, i) => {
                  if(ess.data.matricule_producteur === this.matricule_producteur){
                    ep.push(ess);
                  }
                });
                this.essais = ep;
                this.allEssais = ep;*/
              }else{
                //sinon
                this.servicePouchdb.getPlageDocsAvecLimit('fuma:essai', 'fuma:essai:\uffff', this.selectedLimit).then((e) => {
                  if(e){
                    this.essais = e;
                    this.allEssais = e;
                  }

                });
                
              }
          
          //  }
        //  });
        }
    }else{
      if(this.selectedLimit === 'Tous'){
        //let ess: any = [];
        //this.servicePouchdb.getPlageDocs('fuma:essai', 'fuma:essai:\uffff').then((e) => {
          //  if(e){
             /* e.forEach((es, i) => {
                if(es.data.annee_essai === this.selectedAnnee){
                  ess.push(es);
                }
              });*/

              if(this.matricule_producteur){
                 this.servicePouchdb.getPlageDocs('fuma:essai:'+this.matricule_producteur, 'fuma:essai:'+this.matricule_producteur+' \uffff').then((e) => {
                  if(e){
                     let ess: any = [];
                     e.forEach((es, i) => {
                        if(es.data.annee_essai === this.selectedAnnee){
                          ess.push(es);
                        }
                      });
                    this.essais = ess;
                    this.allEssais = ess;
                  }
                });
               
               //this.chargerChamps(this.matricule_producteur);
                //let maDate = new Date();
                //this.chargerTraitements(this.selectedAnnee);
                /*let ep: any = [];
                ess.forEach((essai, i) => {
                  if(essai.data.matricule_producteur === this.matricule_producteur){
                    ep.push(essai);
                  }
                });
                this.essais = ep;
                this.allEssais = ep;*/
              }else{
                //sinon
                this.servicePouchdb.getPlageDocs('fuma:essai', 'fuma:essai:\uffff').then((e) => {
                  if(e){
                    let ess: any = [];
                     e.forEach((es, i) => {
                        if(es.data.annee_essai === this.selectedAnnee){
                          ess.push(es);
                        }
                      });
                    this.essais = ess;
                    this.allEssais = ess;
                  }
                });
                
              }
          //  }
        //  });
        }else{
          //let ess: any = [];
          //this.servicePouchdb.getPlageDocsAvecLimit('fuma:essai', 'fuma:essai:\uffff', this.selectedLimit).then((e) => {
              /*if(e){
                e.forEach((es, i) => {
                  if(es.data.annee_essai === this.selectedAnnee){
                    ess.push(es);
                  }
                });*/

                if(this.matricule_producteur){
                  this.servicePouchdb.getPlageDocsAvecLimit('fuma:essai:'+this.matricule_producteur, 'fuma:essai:'+this.matricule_producteur+' \uffff', this.selectedLimit).then((e) => {
                  if(e){
                     let ess: any = [];
                     e.forEach((es, i) => {
                        if(es.data.annee_essai === this.selectedAnnee){
                          ess.push(es);
                        }
                      });
                    this.essais = ess;
                    this.allEssais = ess;
                  }
                });
                //this.chargerChamps(this.matricule_producteur);
                //let maDate = new Date();
                //this.chargerTraitements(this.selectedAnnee);
               
                  /*let ep: any = [];
                  ess.forEach((essai, i) => {
                    if(essai.data.matricule_producteur === this.matricule_producteur){
                      ep.push(essai);
                    }
                  });
                  this.essais = ep;
                  this.allEssais = ep;*/
                }else{
                  //sinon
                   this.servicePouchdb.getPlageDocsAvecLimit('fuma:essai', 'fuma:essai:\uffff', this.selectedLimit).then((e) => {
                     if(e){
                       let ess: any = [];
                        e.forEach((es, i) => {
                            if(es.data.annee_essai === this.selectedAnnee){
                              ess.push(es);
                            }
                          });
                      this.essais = ess;
                      this.allEssais = ess;
                     }
                   })
                  
                }
             // }
           // });
          }
      }

   /* if(this.selectedAnnee === 'Tous'){
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
    }*/
  }

   ajouter(){
     if(this.matricule_producteur){
      //this.navCtrl.push('AjouterEssaiPage', {'matricule_producteur': this.matricule_producteur, 'membre': this.membre}); 
      let model = this.modelCtl.create('AjouterEssaiPage', {'matricule_producteur': this.matricule_producteur, 'membre': this.membre})
      model.onDidDismiss(essais => {
        if (essais) {
          let E: any = this.essais;
          E = E.concat(essais);
         // this.allEssais.push(essai);
         // this.zone.run(() => {
            this.essais = E;
            this.allEssais = this.essais;
            //this.events.publish('ajout-essai', {'essai': essai});
          //});
          
          
        }
      });
      model.present();

     }else{
       //this.navCtrl.push('AjouterEssaiPage'); 
       let model = this.modelCtl.create('AjouterEssaiPage')
       model.onDidDismiss(essais => {
        if (essais) {
          let E: any = this.essais;
          E = E.concat(essais);
         // this.allEssais.push(essai);
         // this.zone.run(() => {
            this.essais = E;
            this.allEssais = this.essais;
            //this.allEssais.push(essai);
          //});
          
        }
      });
      model.present();
     }
       
  }

  detail(essai){
    this.navCtrl.push('DetailEssaiPage', {'essai': essai});
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
