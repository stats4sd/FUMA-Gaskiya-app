import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController, IonicPage } from 'ionic-angular';
import { Validators, FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { PouchdbProvider } from '../../../../providers/pouchdb-provider';

/*
  Generated class for the ModifierTraitement page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/ 
@IonicPage()
@Component({
  selector: 'page-modifier-traitement',
  templateUrl: 'modifier-traitement.html'
})
export class ModifierTraitementPage {

  traitementForm: any;
  traitement: any;
  //ancien_traitement: any;
  grandTraitement: any;
  selectedAnnee: any;
  ancienneAnnee: any;
  allTraitement: any;
  annees: any = [];
  max_NPR: any;
  max_NPL: any;
  ancien_code_t: any;
  ancien_nom_entree: any;
  ancien_nom_controle: any;
  protocole: any;
  protocoles: any = [];
  code_protocole: any;
  selectedProtocole: any;
  type_essais: any = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtl: LoadingController, public toastCtl: ToastController, public servicePouchdb: PouchdbProvider, public formBuilder: FormBuilder, public storage: Storage) {
    
    this.grandTraitement = this.navParams.data.traitement;
    this.traitement = this.grandTraitement.data;
    //this.ancien_traitement = this.grandTraitement;

    let maDate = new Date();
    for(let i=0; i<=50; i++){
      this.annees.push(2000 + i)
    }

    if(navParams.data.protocole){
      this.protocole = navParams.data.protocole;
      this.selectedAnnee = this.protocole.data.annee;
      this.selectedProtocole = this.protocole.data;
      //this.type_essais = this.selectedProtocole.type_essais;
      
    }

    this.selectedAnnee = this.traitement.annee;
    this.ancienneAnnee = this.traitement.annee;
    this.ancien_code_t = this.traitement.code_traitement;
    this.ancien_nom_entree = this.traitement.nom_entree;
    this.ancien_nom_entree = this.traitement.nom_controle;
    this.code_protocole = this.traitement.code_protocole;
    this.type_essais = this.traitement.type_essais;

    this.traitementForm = this.formBuilder.group({
     // _id:[''],
      code_traitement: [this.traitement.code_traitement, Validators.required],
      annee: [this.traitement.annee, Validators.required],
      superficie: [this.traitement.superficie, Validators.required],
      nom_entree: [this.traitement.nom_entree, Validators.required],
      nom_controle: [this.traitement.nom_controle],
      code_protocole: [this.traitement.code_protocole, Validators.required],
      nom_protocole: [this.traitement.nom_protocole],
      type_essais: [this.traitement.type_essais, Validators.required],
      //max_NPL: [this.traitement.max_NPL, Validators.required],
      //max_NPR: [this.traitement.max_NPR, Validators.required],
      description_entree: [this.traitement.description_entree],
      objectif_traitement: [this.traitement.objectif_traitement],
      today: [this.traitement.today],
    });
    
  }

  ionViewDidEnter() {

    this.chargerProtocole(this.selectedAnnee, true);

    this.servicePouchdb.getPlageDocs('fuma:traitement','fuma:traitement:\uffff').then((t) => {
        this.allTraitement = t;

      }, err => console.log(err));      
   
  }

  setAnnee(annee){
    this.selectedProtocole = null;
    this.type_essais = '';
    this.code_protocole = ''
    this.chargerProtocole(annee);
  }

  chargerProtocole(annee, chargerSelectedProtocole: any = false){
    this.servicePouchdb.getPlageDocsRapide('fuma:protocole', 'fuma:protocole:\uffff').then((p) => {
      if(p){
        let ps: any = [];
        p.forEach((protocole) => {
          if(protocole.doc.data.annee == annee){
            ps.push(protocole);
          }
        });
        this.protocoles = ps;

        if(chargerSelectedProtocole){
          this.chargerSelectedProtocole(this.code_protocole);
        }else{
          this.selectedProtocole = null;
          this.type_essais = '';
          this.code_protocole = ''
        }
      }
    });


  }


  chargerSelectedProtocole(code_protocole){
    for(let i = 0; i < this.protocoles.length; i++){
      if(this.protocoles[i].doc.data.code == code_protocole){
        this.selectedProtocole = this.protocoles[i].doc.data;
        this.type_essais = this.selectedProtocole.type_essais;
        break;
      }
    }
  }

  verifierUniqueNon(traitement){
    let res = 1;
    this.allTraitement.forEach((t, index) => {
      if((traitement.annee !== this.ancienneAnnee ) && (traitement.code_protocole === t.data.code_protocole ) && (traitement.annee === t.data.annee ) && ((traitement.nom_entree === t.data.nom_entree) || (traitement.code_traitement === t.data.code_traitement))){
        res = 0;
      }
    });
    return res;
  }

    modifier(){
      //  let date = new Date();
    let traitement = this.traitementForm.value;
    traitement.code_protocole = this.selectedProtocole.code;
    traitement.nom_protocole = this.selectedProtocole.nom;
    traitement.type_essais = this.selectedProtocole.type_essais;
    if(this.verifierUniqueNon(traitement) === 0){
      alert('Le nom et code du traitement doivent être uniques par protocole et par an!');
    }else{
      if((traitement.type_essais == 'sans controle') || (traitement.type_essais == 'avec controle' && traitement.nom_controle && traitement.nom_controle !== '')){
        
        if(traitement.type_essais == 'sans controle'){
          this.traitement.nom_controle = '';
        }else{
          this.traitement.nom_controle = traitement.nom_controle;
        }
        this.traitement.nom_entree = traitement.nom_entree;
        this.traitement.code_traitement = traitement.code_traitement;
        this.traitement.annee = traitement.annee;
        this.traitement.superficie = traitement.superficie;
        this.traitement.max_NPL = traitement.max_NPL;
        this.traitement.max_NPR = traitement.max_NPR;
        this.traitement.description_entree = traitement.description_entree;
        this.traitement.objectif_traitement = traitement.objectif_traitement;
        this.traitement.code_protocole = traitement.code_protocole;
        this.traitement.nom_protocole = traitement.nom_protocole;
        this.traitement.type_essais = traitement.type_essais;

        /*if(this.verifierUniqueNon(typeSole, this.grandTypeSole._id) === 0){
          alert('Le nom du type de sole doit être uniques!');
        }else{*/
          this.grandTraitement.data = this.traitement;
          this.servicePouchdb.updateDoc(this.grandTraitement);

          if(this.ancien_code_t !== this.traitement.code_traitement || this.ancien_nom_entree !== this.traitement.nom_entree || this.ancien_nom_controle !== this.traitement.nom_controle){
            //alert('dif')
            this.appliquerChangement(this.grandTraitement, this.traitement.code_traitement);
          }else{
            //alert('dif non'+ this.ancien_code_t +'==='+ this.traitement.code_traitement+ ' '+this.ancien_nom_entree +'==='+ this.traitement.nom_entree+ this.ancien_nom_controle +'==='+ this.traitement.nom_controle) 
            this.navCtrl.pop();
          }

        
          /*let toast = this.toastCtl.create({
            message: 'Traitement bien sauvegardée!',
            position: 'top',
            duration: 2000
          });*/

          //this.navCtrl.pop();
          //toast.present();
          
      }else{
        alert('Le nom du controle est obligatoire')
      }

    }
   // }
  }

  appliquerChangement(nouveau_traitement, code_traitement){
    let loading = this.loadingCtl.create({
      content: 'Modification en cours...'
    });

    loading.present();

    this.servicePouchdb.getPlageDocsRapide('fuma:essai', 'fuma:essai:\uffff').then((essai) => {
      if(essai){
        essai.map((ess) => {
          if(ess.doc.data.id_traitement && ess.doc.data.id_traitement === nouveau_traitement._id && ess.doc.data.annee_essai === nouveau_traitement.data.annee){
            ess.doc.data.code_traitement = nouveau_traitement.data.code_traitement;
            ess.doc.data.nom_entree = nouveau_traitement.data.nom_entree;
            ess.doc.data.nom_controle = nouveau_traitement.data.nom_controle;
            ess.doc.data.id_traitement = nouveau_traitement._id;

            this.servicePouchdb.updateDoc(ess.doc);
          }
          else if(ess.doc.data.annee_essai === nouveau_traitement.data.annee && ess.doc.data.code_traitement === code_traitement){
            ess.doc.data.code_traitement = nouveau_traitement.data.code_traitement;
            ess.doc.data.nom_entree = nouveau_traitement.data.nom_entree;
            ess.doc.data.nom_controle = nouveau_traitement.data.nom_controle;
            ess.doc.data.id_traitement = nouveau_traitement._id;

            this.servicePouchdb.updateDoc(ess.doc);
          }
        });

        loading.dismissAll();

      let toast = this.toastCtl.create({
        message: 'Traitement bien sauvegardée!',
        position: 'top',
        duration: 2000
      });

      toast.present();
      this.navCtrl.pop();
      
      }else{
        loading.dismissAll();
      let toast = this.toastCtl.create({
        message: 'Traitement bien sauvegardée!',
        position: 'top',
        duration: 2000
      });

      toast.present();
      this.navCtrl.pop();
      }
    }, err => {
      loading.dismissAll();
      alert('Erreur lors de la tentative de modification du traitement!');
      this.navCtrl.pop();
    })
  }

  annuler(){
    this.navCtrl.pop();
  }


  
}
