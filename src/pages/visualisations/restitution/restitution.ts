import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController, LoadingController } from 'ionic-angular';
import { PouchdbProvider } from '../../../providers/pouchdb-provider';
import { RestitutionProvider } from '../../../providers/restitution/restitution';
//import * as vegaTooltip  from 'vega-tooltip';
//import {vegaLite} from 'vega-tooltip';
import embed from 'vega-embed';
//import 'vega-lite';
//import 'vega';
//import 'vega-embed';
 
/**
 * Generated class for the RestitutionPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

 
@IonicPage()
@Component({
  selector: 'page-restitution',
  templateUrl: 'restitution.html',
})
export class RestitutionPage {

  producteurs: any = [];
  //testData: any = [];
  //data:any;
  //recherche: any = 'FM-';
  selectedMembre1: any = '';
  selectedMembre2: any = '';
  selectedNomMembre1: any = '';
  selectedNomMembre2: any = '';
  selectedEntreeMed: any = '';
  selectedDiff: any = 'PDE';
  selectedVar: any = 'PDE';
  selectedMed: any = 'PDE';
  selectedEntree: any;
  selectedEntreeMembre: any;
  vegaData: any = [];
  medianeData: any = [];
  nbTotalEssa: any = 0;
  nbDuexEssaiTotal: any = 0;
  uniqueMembres: any = [];
  statistiqueTraitement: any = [];
  //statistique: boolean = false;
  allEssais: any = [];
  traitements: any = [];
  allOP: any = [];
  opEssai: any = [];
  entrees: any = [];
  membresData: any = [];
  membre1Data: any = [];
  membre2Data: any = [];
  code_union: any;
  code_op: any;
  type: any
  fin:any = [];

  selectedAnne:any = '2017';

  constructor(public navCtrl: NavController, public ServiceAutoCompletion: RestitutionProvider, public modelCtl: ModalController, public navParams: NavParams, public loadtingCtl: LoadingController, public viewCtl: ViewController, public servicePouchdb: PouchdbProvider) {
    this.type = this.navParams.data.type;
    if(this.type === 'essai'){
      this.allEssais = this.navParams.data.essais;
      this.traitements = this.navParams.data.traitements;
      this.producteurs = this.navParams.data.producteurs;
    }/*else if(this.navParams.data.type === 'union'){
      this.code_union = this.navParams.data.code_union;
      this.getEssais(this.code_union, this.type, this.selectedAnne);
      this.getMembres(this.code_union, this.type);
      this.getTraitements(this.selectedAnne);
    }else if(this.navParams.data.type === 'op'){
      this.code_op = this.navParams.data.code_op;
      this.getEssais(this.code_op, this.type, this.selectedAnne);
      this.getMembres(this.code_op, this.type);
      this.getTraitements(this.selectedAnne)
    }*/

    //alert(this.allEssais.length)
  }

  getInfo(code, type, annee){
    //membres
    let mbr: any = [];
    this.producteurs = [];
      this.servicePouchdb.getPlageDocsRapide('fuma:op:membre','fuma:op:membre:\uffff').then((mbrA) => {
        
        this.servicePouchdb.getPlageDocsRapide('koboSubmission_fuma-op-membre','koboSubmission_fuma-op-membre\uffff').then((mbrK) => {
          mbr = mbrA.concat(mbrK);
          mbr.map((m) => {
            if(m.doc.data.code_union === code && type === 'union'){
              this.producteurs.push(m);
            }else if(m.doc.data.op_code === code && type === 'op'){
              this.producteurs.push(m);
            }
          });

          //essais
          this.allEssais = [];
          if(type === 'union'){
            this.servicePouchdb.getPlageDocsRapide('fuma:essai', 'fuma:essai:\uffff').then((e) => {
            if(e){
              e.map((es) => {
                
                if(code === es.doc.data.code_union && annee.toString() === es.doc.data.annee_essai.toString() ){
                  this.allEssais.push(es)
                }
              });

              //traitements
              let trm: any = [];
              this.traitements = [];
              this.servicePouchdb.getPlageDocsRapide('fuma:traitement', 'fuma:traitement:\uffff').then((t) => {
                  if(t){
                    t.map((row) => {
                        if(row.doc.data.annee.toString() === annee.toString() ){
                            trm.push(row);
                          }
                    });
                    this.traitements = trm;
                    let p: any = [];
                    this.producteurs.forEach((prod, index) => {
                      p.push(prod.doc.data); 
                    });

                    
                    this.ServiceAutoCompletion.data = p;
                    if(this.traitements.length){
                      this.selectedEntree = this.traitements[0].doc.data.nom_entree;
                      this.selectedEntreeMembre = this.traitements[0].doc.data.nom_entree;
                      this.selectedEntreeMed = this.traitements[0].doc.data.nom_entree;
                    }

                    this.traitements.forEach((t) => {
                      this.entrees.push(t.doc.data.nom_entree);
                    })
                    this.calculStatisitque(this.allEssais, this.traitements, this.producteurs);
                  }   
                });  
              }
            });
          }else if(type === 'op'){
            this.servicePouchdb.getPlageDocsRapide('fuma:essai:FM-'+code, 'fuma:essai:FM-'+code+' \uffff').then((e) => {
                e.map((es) => {
                if(es.doc.data.annee_essai.toString() === annee.toString()){
                  this.allEssais.push(es)
                }
              });

              //traitements
              let trm: any = [];
              this.traitements = [];
              this.servicePouchdb.getPlageDocsRapide('fuma:traitement', 'fuma:traitement:\uffff').then((t) => {
                  if(t){
                    t.map((row) => {
                        if(row.doc.data.annee.toString() === annee.toString()){
                            trm.push(row);
                          }
                    });
                    this.traitements = trm;
                    let p: any = [];
                    this.producteurs.forEach((prod, index) => {
                      p.push(prod.doc.data); 
                    });

                    
                    this.ServiceAutoCompletion.data = p;
                    if(this.traitements.length){
                      this.selectedEntree = this.traitements[0].doc.data.nom_entree;
                      this.selectedEntreeMembre = this.traitements[0].doc.data.nom_entree;
                      this.selectedEntreeMed = this.traitements[0].doc.data.nom_entree;
                    }

                    this.traitements.forEach((t) => {
                      this.entrees.push(t.doc.data.nom_entree);
                    })
                    this.calculStatisitque(this.allEssais, this.traitements, this.producteurs);
                  }   
                });  

              });
          }
        

        }, err => console.log(err));

      }, err => console.log(err));
  }

  getMembres(code, type){
    let mbr: any = [];
    this.producteurs = [];
      this.servicePouchdb.getPlageDocsRapide('fuma:op:membre','fuma:op:membre:\uffff').then((mbrA) => {
        
        this.servicePouchdb.getPlageDocsRapide('koboSubmission_fuma-op-membre','koboSubmission_fuma-op-membre\uffff').then((mbrK) => {
          mbr = mbrA.concat(mbrK);
          mbr.map((m) => {
            if(m.doc.data.code_union === code && type === 'union'){
              this.producteurs.push(m);
            }else if(m.doc.data.op_code === code && type === 'op'){
              this.producteurs.push(m);
            }
          });

           let p: any = [];
          this.producteurs.forEach((prod, index) => {
            p.push(prod.doc.data); 
          });

          
          this.ServiceAutoCompletion.data = p;
        }, err => console.log(err));

      }, err => console.log(err)); 
  }


  getEssais(code, type, annee){
    this.allEssais = [];
    if(type === 'union'){
      this.servicePouchdb.getPlageDocsRapide('fuma:essai', 'fuma:essai:\uffff').then((e) => {
      if(e){
        e.map((es) => {
          if(code === es.doc.data.code_union && annee.toString() === es.doc.data.annee_essai.toString()){
            this.allEssais.push(es)
          }
        })
      }
    });
    }else if(type === 'op'){
       this.servicePouchdb.getPlageDocsRapide('fuma:essai:FM-'+code, 'fuma:essai:FM-'+code+' \uffff').then((e) => {
          e.map((es) => {
          if(es.doc.data.annee_essai.toString() === annee.toString()){
            this.allEssais.push(es)
          }
        })
        });
    }
   
  }


    getTraitements(annee){
        let trm: any = [];
        this.traitements = [];
        this.servicePouchdb.getPlageDocsRapide('fuma:traitement', 'fuma:traitement:\uffff').then((t) => {
            if(t){
              t.map((row) => {
                  if(row.doc.data.annee.toString() === annee.toString()){
                      trm.push(row);
                    }
              });
              this.traitements = trm;
              if(this.traitements.length){
                this.selectedEntree = this.traitements[0].doc.data.nom_entree;
                this.selectedEntreeMembre = this.traitements[0].doc.data.nom_entree;
                this.selectedEntreeMed = this.traitements[0].doc.data.nom_entree;
              }

              this.traitements.forEach((t) => {
                this.entrees.push(t.doc.data.nom_entree);
              });
            }   
          });  
    }


  ionViewDidEnter() {
    //console.log('ionViewDidLoad RestitutionPage');
    /*if(this.type === 'union'){
      this.code_union = this.navParams.data.code_union;
      this.getInfo(this.code_union, this.type, this.selectedAnne);
      
    }else if(this.type === 'op'){
      this.code_op = this.navParams.data.code_op;
      this.getInfo(this.code_op, this.type, this.selectedAnne);
    }
    else if(this.type === 'essai'){
      let p: any = [];
      this.producteurs.forEach((prod, index) => {
        p.push(prod.doc.data); 
      });

      
      this.ServiceAutoCompletion.data = p;
      if(this.traitements.length){
        this.selectedEntree = this.traitements[0].doc.data.nom_entree;
        this.selectedEntreeMembre = this.traitements[0].doc.data.nom_entree;
        this.selectedEntreeMed = this.traitements[0].doc.data.nom_entree;
      }

      this.traitements.forEach((t) => {
        this.entrees.push(t.doc.data.nom_entree);
      })
      this.calculStatisitque(this.allEssais, this.traitements, this.producteurs);
    }
    */
  }



  existeProducteur(matricule){
    for(let i = 0; i < this.producteurs.length; i++){
      if(matricule === this.producteurs[i].doc.data.matricule_Membre){
        return 1;
      }
    }

    return 0;
  }

  preparerDannePourAnnalyse(essai){
    let essai_data: any = [];
    essai.forEach((ess) => {
      essai_data.push(ess.doc.data);
    });

    return essai_data;
  }

  visualisation(essais){
    //let data: any = this.preparerDannePourAnnalyse(essai);
    //let essai: any = [];
    let data: any = [];
    let ess: any = {};
     var max_PDE = 0;
     var max_NPR = 0;
     var max_NPL = 0;
    /*essais.forEach((item) => {
      essai.push(item);
    });*/

    essais.forEach((e) =>{
       ess = e.doc.data;
       if(e.doc.data.PDE)
        {ess.PDE = parseFloat(e.doc.data.PDE);}
       if(e.doc.data.PDE_controle)
       {ess.PDE_controle = parseFloat(e.doc.data.PDE_controle);}
       if(e.doc.data.NPL)
       {ess.NPL = parseInt(e.doc.data.NPL);}
       if(e.doc.data.NPL_controle)
       {ess.NPL_controle = parseInt(e.doc.data.NPL_controle);}
       if(e.doc.data.NPR)
       {ess.NPR = parseInt(e.doc.data.NPR);}
       if(e.doc.data.NPR_controle)
       {ess.NPR_controle = parseInt(e.doc.data.NPR_controle);}


       if(e.doc.data.PDE && e.doc.data.PDE_controle)
       {
         ess.diff_PDE = parseFloat(e.doc.data.PDE) - parseFloat(e.doc.data.PDE_controle);
         ess.diff_PDE = ess.diff_PDE.toFixed(2)
         if(e.doc.data.PDE >= e.doc.data.PDE_controle){
          max_PDE = parseInt(e.doc.data.PDE)
         }else{
          max_PDE = parseInt(e.doc.data.PDE_controle);
         }
      }else if(e.doc.data.PDE && !e.doc.data.PDE_controle){
        ess.diff_PDE = parseFloat(e.doc.data.PDE).toFixed(2);
        max_PDE = parseInt(e.doc.data.PDE);
      }else if(!e.doc.data.PDE && e.doc.data.PDE_controle){
        ess.diff_PDE = - parseFloat(e.doc.data.PDE_controle).toFixed(2);
        max_PDE = parseInt(e.doc.data.PDE_controle);
      }else{
        ess.diff_PDE = '';
        max_PDE = 0;
      }

      if(e.doc.data.NPL && e.doc.data.NPL_controle)
       {ess.diff_NPL = parseInt(e.doc.data.NPL) - parseInt(e.doc.data.NPL_controle);
        if(e.doc.data.NPL >= e.doc.data.NPL_controle){
          max_NPL =  parseInt(e.doc.data.NPL)
        }else{
          max_NPL = parseInt(e.doc.data.NPL_controle);
        }
      }else if(e.doc.data.NPL && !e.doc.data.NPL_controle || e.doc.data.NPL_controle === ''){
        ess.diff_NPL = parseInt(e.doc.data.NPL);
        max_NPL = parseInt(e.doc.data.NPL);
      }else if(!e.doc.data.NPL || e.doc.data.NPL === '' && e.doc.data.NPL_controle){
        ess.diff_NPL= - parseInt(e.doc.data.NPL_controle);
        max_NPL = parseInt(e.doc.data.NPL_controle);
      }else{
        ess.diff_NPL = '';
        max_NPL = 0;
      }

       if(e.doc.data.NPR && e.doc.data.NPR_controle)
       {ess.diff_NPR = parseInt(e.doc.data.NPR) - parseInt(e.doc.data.NPR_controle);
        if(e.doc.data.NPR >= e.doc.data.NPR_controle){
          max_NPR = parseInt(e.doc.data.NPR)
        }else{
          max_NPR = parseInt(e.doc.data.NPR_controle);
        }
      }else if(e.doc.data.NPR && !e.doc.data.NPR_controle){
        ess.diff_NPR = parseInt(e.doc.data.NPR);
        max_NPR = parseInt(e.doc.data.NPR);
      }else if(!e.doc.data.NPR && e.doc.data.NPR_controle){
        ess.diff_NPR= - parseInt(e.doc.data.NPR_controle);
        max_NPR = parseInt(e.doc.data.NPR_controle);
      }else{
        ess.diff_NPR = '';
        max_NPR = 0;
      }

  
    
      //ess.PDE >= ess.PDE_controle ? max_PDE = ess.PDE: max_PDE = ess.PDE_controle;
      if(max_PDE % 5 === 0){
        ess.mediane_PDE = max_PDE
      }else if((max_PDE +1) % 5 === 0){
        ess.mediane_PDE = max_PDE +1;
      }else if((max_PDE +2) % 5 === 0){
        ess.mediane_PDE = max_PDE +2;
      }else if((max_PDE +3) % 5 === 0){
        ess.mediane_PDE = max_PDE +3;
      }else if((max_PDE +4) % 5 === 0){
        ess.mediane_PDE = max_PDE +4;
      }else{
        ess.mediane_PDE = 0;
      }
      

      
      //ess.NPR >= ess.NPR_controle ? max_NPR = ess.NPR: max_NPR = ess.NPR_controle;
      if(max_NPR % 5 === 0){
        ess.mediane_NPR = max_NPR
      }else  if((max_NPR +1) % 5 === 0){
        ess.mediane_NPR = max_NPR +1;
      }else  if((max_NPR +2) % 5 === 0){
        ess.mediane_NPR = max_NPR +2;
      }else  if((max_NPR +3) % 5 === 0){
        ess.mediane_NPR = max_NPR +3;
      }else  if((max_NPR +4) % 5 === 0){
        ess.mediane_NPR = max_NPR +4;
      }else{
        ess.mediane_NPR = 0;
      }
      
      
      //ess.NPL >= ess.NPL_controle ? max_NPL = ess.NPL: max_NPL = ess.NPL_controle;
      if(max_NPL % 5 === 0){
        ess.mediane_NPL = max_NPL
      }else if((max_NPL +1 ) % 5 === 0){
        ess.mediane_NPL = max_NPL +1;
      }else if((max_NPL +2 ) % 5 === 0){
        ess.mediane_NPL = max_NPL +2;
      }else if((max_NPL +3 ) % 5 === 0){
        ess.mediane_NPL = max_NPL +3;
      }else if((max_NPL +4 ) % 5 === 0){
        ess.mediane_NPL = max_NPL +4;
      }else{
        ess.mediane_NPL = 0;
      }

      

      /*if(ess.PDE === ess.PDE_controle){
        ess.mediane_PDE = ess.PDE;
      }
      if(ess.NPL === ess.NPL_controle){
        ess.mediane_NPL = ess.NPL;
      }
      if(ess.NPR === ess.NPR_controle){
        ess.mediane_NPR = ess.NPR;
      }*/

       //ess.diff_NPL = parseInt(e.doc.data.NPL) - parseInt(e.doc.data.NPL_controle);
       //ess.diff_NPR = parseInt(e.doc.data.NPR) - parseInt(e.doc.data.NPR_controle);

      data.push(ess);
      ess = {};
    });

    this.vegaData = data;

    //this.visualiserTouts(data, this.selectedVar);
    this.visualiserDifferenceEssaiControle(data, this.selectedDiff, this.selectedEntree, this.selectedMembre1, this.selectedNomMembre2);
    this.visualiserMediane(data, this.selectedMed, this.selectedEntreeMed, this.selectedMembre1, this.selectedMembre2);
   

  }

  visualiserTouts(data, selectedVar){

    let variable:any;

   if(selectedVar === 'NPL controle'){
      variable = 'NPL_controle'
    }else if(selectedVar === 'NPR controle'){
      variable = 'NPL_controle'
    }else if(selectedVar === 'PDE controle'){
      variable = 'PDE_controle'
    }else {
      variable = selectedVar
    }

     var vlSpec = {
    "data": {
      "values": data
    }
    ,
    "mark": "point",
    "encoding": {
     "x": { "field": "matricule_producteur", "type": "nominal" },
     "y": { "field": variable, "type": "quantitative" },
     "color": { "field": "nom_entree", "type": "nominal" },
     //"shape": { "field": "type_sole", "type": "nominal" }
    }
  };

/*var embedSpec = {
  mode: "vega-lite",
  spec: vlSpec
}

var opt = {
  'mode': 'vega'

}*/



   /* embed('#visMembre1', vlSpec, { mode: "vega-lite"}).then(function(result){
      // access view as result.view
    }).catch(console.error);

     embed('#visMembre2', vlSpec, { mode: "vega-lite"}).then(function(result){
      // access view as result.view
    }).catch(console.error);*/
  }



  visualiserMembresEssais(viewData, selectedVar, selectedEntreeMembre){

    /*let variable:any;

   if(selectedVar === 'NPL controle'){
      variable = 'NPL_controle'
    }else if(selectedVar === 'NPR controle'){
      variable = 'NPL_controle'
    }else if(selectedVar === 'PDE controle'){
      variable = 'PDE_controle'
    }else {
      variable = selectedVar
    }*/

    let data: any = [];
      viewData.forEach((d) => {
    if(d.nom_entree === selectedEntreeMembre){
      data.push(d);
    }
  });

  var vlSpec = {
    "data": {
      "values": data
    }
    ,
    "mark": "bar",
    "encoding": {
    //"column": {"field": "nom_producteur", "type": "nominal"},
     "x": { "field": "matricule_producteur", "type": "nominal" },
     "y": { "field": selectedVar, "type": "quantitative",
        "axis": {                // Axis
          "tickCount":  5
        }
      },
     "color": { "field": "nom_producteur", "type": "nominal" },
     //"shape": { "field": "type_sole", "type": "nominal" }
    }
  };

  //var node = 'vega-lite';
 /* var opt = {
    mode: node,
    actions: false
  }*/

/*
    embed('#visEssai', vlSpec, { mode: "vega-lite"}).then(function (result){
      // access view as result.view
       vegaLite(result.view, result.spec)
    }).catch(console.error);
*/
    
  }


  visualiserMembresControle(viewData, selectedVar, selectedEntreeMembre){

    let variable:any;

   if(selectedVar === 'NPL'){
      variable = 'NPL_controle'
    }else if(selectedVar === 'NPR'){
      variable = 'NPL_controle'
    }else if(selectedVar === 'PDE'){
      variable = 'PDE_controle'
    }

    let data: any = [];
      viewData.forEach((d) => {
    if(d.nom_entree === selectedEntreeMembre){
      data.push(d);
    }
  });

     var vlSpec = {
    //"title": "Comparaison "+selectedVar+ " controle",
    "data": {
      "values": data
    }
    ,
    "mark": "bar",
    "encoding": {
     "x": { "field": "matricule_producteur", "type": "nominal" },
     "y": { "field": variable, "type": "quantitative",
      "axis": {                // Axis
        "tickCount":  5
      }
    },
     "color": { "field": "nom_producteur", "type": "nominal" },
     //"shape": { "field": "type_sole", "type": "nominal" }
    }
  };

/*
    embed('#visControle', vlSpec, { mode: "vega-lite"}).then(function(result){
      // access view as result.view
    }).catch(console.error);*/
  }


   visualiserDifferenceEssaiControle(viewData, selectedDiff, selectedEntree, membre1, membre2){
     //this.loading = true;
     let diff: string;
     let data: any = [];

     viewData.forEach((d) => {
       if(d.nom_entree === selectedEntree){
         data.push(d);
       }
     });

     if(selectedDiff === 'NPL'){
        diff = "diff_NPL";
        /*let v: any;
        for(let i = 0; i < data.length -1; i++){
          v = data[i];
          for(let j = i; j < data.length; j++){
            if(v.diff_NPL > data[j].diff_NPL){
              data[i] = data[j];
              data[j] = v;
              v = data[i];
            }
          }
        }*/
      /* data.sort((a, b) => {
            if ( a.diff_NPL < b.diff_NPL ){
              return -1;
            }
            if ( a.diff_NPL > b.diff_NPL ){
              return 1;
            }else{
              return 0;
            }
        });*/

     }else if(selectedDiff === 'NPR'){
        diff = "diff_NPR"; 
       /* data.sort((a, b) => {
            if ( a.diff_NPR < b.diff_NPR )
                {return -1;}
            if ( a.diff_NPR > b.diff_NPR )
                {return 1;}
            else
            {return 0;}
        });*/
     }else{
       diff = "diff_PDE";
       /*data.sort((a, b) =>{
            if ( a.diff_PDE < b.diff_PDE )
                {return -1;}
            if ( a.diff_PDE > b.diff_PDE )
                {return 1;}
            else
            {return 0;}
        });*/
     }



     

     var vlSpec = {
      "data": {
        "values": data
      },
      "layer":[
        {    
          "mark": "bar",
          "encoding": {
            "y": { "field": diff, "type": "quantitative"},
            "x": { "field": diff, "type": "nominal"},
            //"tooltip": {"field": "matricule_producteur", "type": "nominal"} // pour aficher le hover, option avancee avec l'utilisation du plugin npm install vega-tooltip
            //"color": { "field": "sex_producteur", "type": "nominal",
           // "scale": {"range": ["purple", "#ff0000"]}
            //},
          //"shape": { "field": "type_sole", "type": "nominal" }
          }
        },
       {
           "transform": [
            {"filter": {"field": "matricule_producteur", "oneOf":[membre1, membre2]}}
           ],    
          "mark": "bar",
          "encoding": {
            "y": { "field": diff, "type": "quantitative"},
            "x": { "field": diff, "type": "nominal"},
            "color": { "field": "matricule_producteur",
            "scale": {"range": ["purple", "#ff0000"]},
            "axis": {"title":"Matricule producteurs à comparer"}
          },
          //"shape": { "field": "type_sole", "type": "nominal" }
          }

        }
      ] 
    };

    /*var embedSpec = {
      mode: "vega-lite",
      spec: vlSpec
    }

    var opt = {
    }*/
    /*
    embed('#visDiff', vlSpec, { mode: "vega-lite"}).then(function(result) {
      // access view as result.view
      //vegaLite.vega(result.view);
      // vegaLite(result.view, vlSpec)
    }).catch(console.error);*/
    //this.loading = false
    //vegaLite('#visDiff', vlSpec)
  }

  ordonner(data){
    let v: any;
      for(let i = 0; i < data.length -1; i++){
        v = data[i];
        for(let j = i; j < data.length; j++){
          if(v.diff_NPL > data[j].diff_NPL){
            data[i] = data[j];
            data[j] = v;
            v = data[i];
          }
        }
      }

      return data;
  }


   visualiserMediane(viewData, selectedMed, selectedEntreeMed, membre1, membre2){

    let variable:any;
    let med: any;
    let data: any = [];

     viewData.forEach((d) => {
       if(d.nom_entree === selectedEntreeMed){
         data.push(d);
       }
     });

    if(selectedMed === 'NPL'){
        variable = 'NPL_controle';
        med = 'mediane_NPL';
      }else if(selectedMed === 'NPR'){
        variable = 'NPR_controle';
        med = 'mediane_NPR';
      }else if(selectedMed === 'PDE'){
        variable = 'PDE_controle';
        med = 'mediane_PDE';
      }

     var vlSpec = {
    "data": {
      "values": data
    },
    "layer": [
      {
        "mark": "point",
        "encoding": {
          "x": {
            "field": variable,
            "type": "quantitative"
          },
          "y": {
            "field": selectedMed,
            "type": "quantitative"
          },
         "color": { "field": "sex_producteur", 'type': "nominal" },
          //"shape": { "field": "type_sole", "type": "nominal" }
        }
      },
        /*{
           "transform": [
            {"filter": {"field": "matricule_producteur", "oneOf":[membre1, membre1]}}
           ],    
          "mark": "point",
          "encoding": {
            "y": { "field": variable, "type": "quantitative"},
            "x": { "field": selectedMed, "type": "quantitative"},
            "color": { "field": "matricule_producteur",
            "scale": {"range": ["purple", "#ff0000"]}
          },
          //"shape": { "field": "type_sole", "type": "nominal" }
          }

        },*/
      {
      "mark": "line",
      "encoding": {
        "x": {
          "field": med,
          "type": "quantitative",
          "color": {"value": "firebrick"},
          //"axis": {"title":""}

        },
        "y": {
          "field": med,
          "type": "quantitative",
          "axis": {
            //"title":"",
            "grid": false
          },
          //"scale": {"zero": false}
        },
        "color": {"value": "firebrick"}
      }
    }
    ],
  "resolve": {"scale": {"y": "independent"}} 
  };

    /*var embedSpec = {
      mode: "vega-lite",
      spec: vlSpec
    }

    var opt = {
    }*/
/*
    embed('#visMediane', vlSpec, { mode: "vega-lite"}).then(function(result) {
      // access view as result.view
    }).catch(console.error);*/
  }

  calculStatisitque(essais, traitements, producteurs){
    this.calculerMembreAyantFaitUnEssai(essais, producteurs);
    this.calculerNombreEssaiParTraitement(essais, traitements);
    this.visualisation(essais);
  }


    calculerMembreAyantFaitUnEssai(ess, prod){
    let temp: any = 0
    let membreNbEssais: any = {}
    this.uniqueMembres = [];
    let d: any = [];
    let md:any = [];
    

    ess.forEach((item) => {
      d.push(item);
    });
//let d: any = [];
    //d = this.allEssais;
    //var uniqueField='';
    //md = d;
    for(let i = 0; i < prod.length ; i++){
      temp = 0;
      for(let j=0; j < d.length; j++){
        if(prod[i].doc.data.matricule_Membre === d[j].doc.data.matricule_producteur){/// nombre de producteur s ayant conduit deux essai
          temp++;
          md.push(d[j])
          //md.splice(j, 1);
        }
        //temp.push(data[i]);
      }

      /*******************************************************************
       * 
       * A faire: Nombre toutalde producteur ayant conduit des essai, commparer les essai au producteur
       * 
       */
      if(temp > 0){
        membreNbEssais.matricule_Membre = prod[i].doc.data.matricule_Membre;
        membreNbEssais.nom_Membre = prod[i].doc.data.matricule_Membre;
        membreNbEssais.code_op = prod[i].doc.data.matricule_Membre.toString().substr(prod[i].doc.data.matricule_Membre.toString().indexOf('-') +1, prod[i].doc.data.matricule_Membre.toString().indexOf(' ') -3)
        membreNbEssais.nb_Essai = temp;
        //alert(temp)
        this.uniqueMembres.push(membreNbEssais);
        membreNbEssais = {};
        temp = 0;
      }

      md.forEach((m) => {
        d.splice(d.indexOf(m), 1);
      })

      md = [];
      this.fin = d;
    }

    //alert(fin.length)
    let nbEssaiTotal = 0;
    let nbDuexEssaiTotal = 0;
    this.uniqueMembres.forEach((item) => {
      if(item.nb_Essai === 2){
        nbDuexEssaiTotal++;
      }
      nbEssaiTotal += item.nb_Essai;
      
    });

    this.nbTotalEssa = nbEssaiTotal;
    this.nbDuexEssaiTotal = nbDuexEssaiTotal;
    //this.statistique = true;
    


    if(this.allOP.length > 0){
      this.calculerOPAyantParticipeAuxEssai(this.uniqueMembres, this.allOP)
    }else{
      this.servicePouchdb.getPlageDocsRapide('fuma:op:','fuma:op:\uffff').then((ops) => {
        if(ops){
          //opss = ops;
          this.allOP = [];
          ops.forEach((o, index) => {
            if(!o.doc.data.op/* || o.data.op !== ''*/){
              if(this.type === 'union' && o.doc.data.code_union === this.code_union){
                this.allOP.push(o)
              }else if(this.type === 'op' && o.doc.data.code_OP === this.code_op){
                this.allOP.push(o)
              }else if(this.type === 'essai'){
                this.allOP.push(o)
              }
              
            }
          });

          this.calculerOPAyantParticipeAuxEssai(this.uniqueMembres, this.allOP)
        }
      });
    }

    //this.uniqueMembres;
  }

  calculerOPAyantParticipeAuxEssai(mbr, op){
    let temp: any = 0
    let opEssai: any = {}
    this.opEssai = [];
    let membres: any = [];

    if(mbr.length > 0){
      mbr.forEach((item) => {
        membres.push(item);
      });
      
      //let uniqueOp
      

      for(let i = 0; i < op.length; i++){
        temp = 0;
        for(let j=0; j< membres.length; j++){
          if(op[i].doc.data.code_OP === membres[j].code_op){
            temp++;
            membres.splice(j, 1);
          }
          //temp.push(data[i]);
        }

        if(temp > 0){
          opEssai.nom_op = op[i].doc.data.nom_OP
          opEssai.code_op = op[i].doc.data.code_OP
          opEssai.nb_Membre = temp;
          this.opEssai.push(opEssai);
          opEssai = {};
        }
        
      }
    }
    
    //return membreNbEssais;
  }


  calculerNombreEssaiParTraitement(essai, traitement){
    let tr: any = [];
    let t: any = {};
    traitement.forEach((item) => {
      t.nom_entree = item.doc.data.nom_entree;
      t.value = 0;
      tr.push(t);
      t = {};
    });

    essai.map((es) => {
      for(let i =0; i <tr.length; i++){
        if(es.doc.data.nom_entree === tr[i].nom_entree){
          tr[i].value++;
          break;
        }
      }
    });

    this.statistiqueTraitement = tr;
  }


  dismiss(){
    this.viewCtl.dismiss();
  }


  selectMembre1(ev: any){
    //alert(ev.code_produit);
    if(ev.matricule_Membre && ev.matricule_Membre != ''){
      this.membre1Data = [];
      //this.
      this.selectedMembre1 = ev.matricule_Membre;
      this.vegaData.map((ess) => {
        if(ess.matricule_producteur === this.selectedMembre1){
          this.membre1Data.push(ess);
        }
      });

      if(!this.membre1Data.length){
        alert('Le membre n\'a pas éffectuer des essais');
      }else{
        let E: any = this.membre1Data;
        E = E.concat(this.membre2Data);
        this.membresData = E;
        this.visualiserMembresEssais(this.membresData, this.selectedVar, this.selectedEntreeMembre)
        this.visualiserMembresControle(this.membresData, this.selectedVar, this.selectedEntreeMembre);
        this.visualiserDifferenceEssaiControle(this.vegaData, this.selectedDiff, this.selectedEntree, this.selectedMembre1, this.selectedMembre2)
        this.visualiserMediane(this.vegaData, this.selectedMed, this.selectedEntreeMed, this.selectedMembre1, this.selectedMembre2);
   
      }
    } 
  }

  selectMembre2(ev: any){
    //alert(ev.code_produit);
    if(ev.matricule_Membre && ev.matricule_Membre != ''){
      this.membre2Data = [];
      this.selectedMembre2 = ev.matricule_Membre;

      this.vegaData.map((ess) => {
        if(ess.matricule_producteur === this.selectedMembre2){
          this.membre2Data.push(ess);
        }
      });

      if(!this.membre2Data.length){
        alert('Le membre n\'a pas éffectuer des essais');
      }else{
        let E: any = this.membre1Data;
        E = E.concat(this.membre2Data);
        this.membresData = E;
        this.visualiserMembresEssais(this.membresData, this.selectedVar, this.selectedEntreeMembre);
        this.visualiserMembresControle(this.membresData, this.selectedVar, this.selectedEntreeMembre);
        this.visualiserDifferenceEssaiControle(this.vegaData, this.selectedDiff, this.selectedEntree, this.selectedMembre1, this.selectedMembre2)
        this.visualiserMediane(this.vegaData, this.selectedMed, this.selectedEntreeMed, this.selectedMembre1, this.selectedMembre2);
   
      }
    } 
  }

  changerVar(membresData, selectedVar, selectedEntreeMembre){
    this.visualiserMembresEssais(membresData, selectedVar, selectedEntreeMembre);
    this.visualiserMembresControle(membresData, selectedVar, selectedEntreeMembre);
  }

  changerEntree(membresData, selectedVar, selectedEntreeMembre){
    this.visualiserMembresEssais(membresData, selectedVar, selectedEntreeMembre);
    this.visualiserMembresControle(membresData, selectedVar, selectedEntreeMembre);
  }

}
