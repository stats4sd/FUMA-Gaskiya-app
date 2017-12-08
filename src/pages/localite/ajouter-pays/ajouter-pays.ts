import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, ToastController, LoadingController, AlertController, ViewController, MenuController, Events } from 'ionic-angular';
import { Validators, FormBuilder } from '@angular/forms';
import { PouchdbProvider } from '../../../providers/pouchdb-provider';

/**
 * Generated class for the AjouterPaysPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-ajouter-pays',
  templateUrl: 'ajouter-pays.html',
})
export class AjouterPaysPage {

  paysForm: any;
  pays: any;
  allPays: any = [];
  id: any = '';
  nom: any = '';
  ancien_nom: any = '';

  liste: boolean = false;
  ajouter:boolean = false;
  modifier: boolean = false;
 
  constructor(public navCtrl: NavController, public loadingCtl: LoadingController, public alertCtl: AlertController, public menuCtl: MenuController, public viewCtrl: ViewController, public navParams: NavParams,public toastCtl: ToastController, public servicePouchdb: PouchdbProvider, public formBuilder: FormBuilder) {
    
    if(this.navParams.data.liste){
      this.liste = true;
    }

    this.paysForm = this.formBuilder.group({
      id:['', Validators.required],
      nom:['', Validators.required],
    });
  }

  ionViewDidEnter() {
     this.servicePouchdb.getDocById('pays').then((pays) => {
       this.allPays = pays.data;
       this.pays = pays;
       //alert(this.pays._id)
     })
  }

  //fait la conbinaison de caractere de gauche vers la droite en variant la taille a la recherche d'un code disponible
  genererID(){
    
    let nom = this.nom;
     nom = nom.replace(' ' || '  ' || '    ' || '     ' || '      ' , '');
     let taille_nom = nom.length;
     let an = nom;
    //taille initiale: deux aractères
    let taille_code = 2;
    let code: string = '';
    this.id = code.toUpperCase()
    let p = 0;
    let last_position = 0;
    let trouve: boolean;

    if(taille_nom >= 2){
      while(taille_code <= taille_nom){
        last_position = taille_code - 1;
        trouve  = false;
        code = '';
        for(let i = 0; i < taille_code; i++){
          code += nom.charAt(i).toString() ;
        }

        do{
            code = code.substr(0, code.length - 1);
            code += nom.charAt(last_position).toString() ;
            p = 0;
            for(let pos=0; pos < this.allPays.length; pos++){
              let op = this.allPays[pos];
              if(op.id === code.toUpperCase()){
                trouve = true;
                break ;
              }else{
                trouve = false;
              }
            }
            
            last_position++;

          }while(trouve && last_position < taille_nom);
          //
          if(last_position === taille_nom && trouve){
            //non disponible, augmenter la taille du code
            taille_code++;
        
            //au cas ou on teste toutes les combinaisons, sant trouver de combinaison disponible, on ajoute des chiffre
            if(taille_code > taille_nom){
              //non disponible, augmenter la taille et utiliser des chiffres
              taille_code = 3;
              nom = an + '123456789'.toString();
              taille_nom = nom.length;
            }
          }else{
              this.id = code.toUpperCase();
              break;
            
          }
      }
      
    }
    
  }

   verifierUniqueNon(pays){
    let res = 1;
    this.allPays.forEach((p, index) => {
      if((pays.nom.toString().toUpperCase() === p.nom.toString().toUpperCase())){
        res = 0;
      }
    });

    return res;
  }


  actionForm(){
    if(this.ajouter){
        let pays = this.paysForm.value;
      if(this.verifierUniqueNon(pays) === 0){
        alert('Les noms des pays doivent être uniques!');
      }else{
        let data = [];
        data = this.pays.data;
        data.push(pays);
        this.pays.data = data;
        this.allPays = data;
        this.servicePouchdb.updateLocalite(this.pays);
        let toast = this.toastCtl.create({
          message: 'Pays bien enregistré!',
          position: 'top',
          duration: 1000
        });

        toast.present();
        this.ajouter = false;

        if(!this.navParams.data.liste){
          this.viewCtrl.dismiss();
        }else{
          this.liste = true;
        }
      }
    }else if(this.modifier){
      let loading = this.loadingCtl.create({
        content: 'Application des changements en cours...'
      });

      loading.present();
      let pays = this.paysForm.value;
      this.allPays.forEach((p, i) => {
        if(p.id === pays.id){
          this.allPays[i] = pays;
        }
      });

      this.pays.data = this.allPays;
      //this.allPays.splice(this.pays.indesOf())
      this.servicePouchdb.updateLocalite(this.pays);
        //recuperer tous les doc pour modifier le nom du pays
        this.servicePouchdb.getPlageDocsRapide('fuma', 'fuma:\uffff').then((allDocs) => {
          allDocs.map((doc) => {
            //pour les essais
            if(doc.doc.data.type === 'essai' && doc.doc.data0village_producteur === this.ancien_nom ){
              doc.doc.data0village_producteur = pays.nom;
              this.servicePouchdb.updateDoc(doc.doc);
            }else 
            //pour les memebres
            if(doc.doc.data.type === 'membre_op' && doc.doc.data.village_nom === this.ancien_nom ){
              doc.doc.data.village_nom = pays.nom;
              this.servicePouchdb.updateDoc(doc.doc);
            }
            else 
            //pour les union
            if(doc.doc.data.type === 'union' && doc.doc.data.village_nom === this.ancien_nom ){
              doc.doc.data.village_nom = pays.nom;
              this.servicePouchdb.updateDoc(doc.doc);
            }
            else 
            //pour les op
            if(doc.doc.data.type === 'op' && doc.doc.data.village_nom === this.ancien_nom ){
              doc.doc.data.village_nom = pays.nom;
              this.servicePouchdb.updateDoc(doc.doc);
            }
            else 
            //pour les champs
            if(doc.doc.data.type === 'champs' && doc.doc.data.village === this.ancien_nom ){
              doc.doc.data.village = pays.nom;
              this.servicePouchdb.updateDoc(doc.doc);
            }
          });

           let toast = this.toastCtl.create({
              message: 'Pays bien modifier!',
              position: 'top',
              duration: 1000
            });
            toast.present();  
            loading.dismissAll();
        });
      

    }
  } 

  ajouterPays(){
    this.liste = false;
    this.ajouter = true;
  }

  modifierPays(pays){

    this.id = pays.id;
    this.nom = pays.nom;
    this.ancien_nom = this.nom;
    this.liste = false;
    this.modifier = true;
  }

  supprimerPays(pays){
    let e: any = {};
    let alert = this.alertCtl.create({
      title: 'Suppression Pays',
      message: 'Etes vous sûr de supprimer cet pays ?',
      buttons:[
        {
          text: 'Non',
          handler: () => console.log('suppression annulée')
 
        },
        {
          text: 'Oui',
          handler: () => {
            this.allPays.forEach((p, i) => {
              if(p.id === pays.id){
                this.allPays.splice(i, 1);
              }
            });

            this.pays.data = this.allPays;
            //this.allPays.splice(this.pays.indesOf())
            this.servicePouchdb.updateLocalite(this.pays);
            let toast = this.toastCtl.create({
              message: 'Pays bien suprimé!',
              position: 'top',
              duration: 1000
            });
            toast.present();           
          }
        }
      ]
    });

    alert.present();
  }

  annuler(){
    if(this.navParams.data.liste){
      this.modifier = false;
      this.ajouter = false;
      this.liste = true;

    }
     this.viewCtrl.dismiss();
  }




}
