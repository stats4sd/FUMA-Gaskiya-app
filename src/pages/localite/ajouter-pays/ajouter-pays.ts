import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, ToastController, ViewController, MenuController, Events } from 'ionic-angular';
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
 
  constructor(public navCtrl: NavController, public menuCtl: MenuController, public viewCtrl: ViewController, public navParams: NavParams,public toastCtl: ToastController, public servicePouchdb: PouchdbProvider, public formBuilder: FormBuilder) {
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


  ajouter(){
    
    let pays = this.paysForm.value;
    if(this.verifierUniqueNon(pays) === 0){
      alert('Les noms des pays doivent être uniques!');
    }else{
      let data = [];
      data = this.pays.data;
      data.push(pays);
      this.pays.data = data;
      this.servicePouchdb.updateLocalite(this.pays);
      let toast = this.toastCtl.create({
        message: 'Pays bien enregistré!',
        position: 'top',
        duration: 3000
      });

      toast.present();
      this.viewCtrl.dismiss();
    }
  } 

  annuler(){
     this.viewCtrl.dismiss();
  }




}
