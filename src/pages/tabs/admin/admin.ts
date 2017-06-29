import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { PouchdbProvider } from '../../../providers/pouchdb-provider';
import { ConfLocaliteEnquetePage } from '../../configuration/conf-localite-enquete/conf-localite-enquete';
import { UnionsPage } from '../../unions/unions';
import { OpPage } from '../../op/op';
import { MembresPage } from '../../membres/membres';
import { TranslateService } from '@ngx-translate/core';
import { global } from '../../../global-variables/variable';
import { LanguePage } from '../../langue/langue'
import { TypeSolePage } from '../../type-sole/type-sole'
import { ChampsPage } from '../../champs/champs'
import { EssaiPage } from '../../essai/essai'
import { TraitementPage } from '../../essai/traitement/traitement'
import { LoginPage } from '../../security/login/login';
import { RegisterPage } from '../../security/register/register';
import { ProfileUserPage } from '../../security/profile/profile-user'

/*
  Generated class for the Admin page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-admin',
  templateUrl: 'admin.html'
})
export class AdminPage {
  profiles:any=[];
  pendingProfiles:any=[];
  unions:any = [];
  ops:any = [];
  membres:any = [];
  //toast: any;

  constructor(public translate: TranslateService, public navCtrl: NavController, public toastCtl: ToastController, public navParams: NavParams,  private database: PouchdbProvider) {
    this.translate.setDefaultLang(global.langue);
  }

  ionViewDidEnter() {
    this.translate.use(global.langue);
    this.getProfiles();

    //union
    this.database.getPlageDocs('fuma:union','fuma:union:\uffff').then((unionsA) => {
         this.database.getPlageDocs('koboSubmission_fuma-union','koboSubmission_fuma-union\uffff').then((unionsK) => {
          this.unions = unionsA.concat(unionsK);
         }, err => console.log(err));  
    }, err => console.log(err));   

    //op
    let A = [];
    let opss: any = [];
    this.database.getPlageDocs('fuma:op','fuma:op:\uffff').then((opsA) => {
      if(opsA){
          //opss = ops;
          opsA.forEach((o, index) => {
            if(!o.data.op/* || o.data.op !== ''*/){
              A.push(o)
            }
          })
        }
      let k = [];
      this.database.getPlageDocs('koboSubmission_fuma-op','koboSubmission_fuma-op\uffff').then((opsK) => {
        opsK.forEach((o, i) => {
            if(!o.data.op){
             k.push(o) ;
             //this.allOPs.push(o);
            }
          })

        this.ops = A.concat(k);
      }, err => console.log(err));
    }, err => console.log(err));

     //membres
    this.database.getPlageDocs('fuma:op:membre','fuma:op:membre:\uffff').then((mbrA) => {

      this.database.getPlageDocs('koboSubmission_fuma-op-membre','koboSubmission_fuma-op-membre\uffff').then((mbrK) => {
        this.membres = mbrA.concat(mbrK);
      }, err => console.log(err));
    }, err => console.log(err));

  }

  affichierMsg(msg = 'Enregistrement mis à jour'){
    let toast = this.toastCtl.create({
      message: msg,
      position: 'top',
      duration: 3000
    });

    toast.present();
  }

  connexion(){
    this.navCtrl.push(LoginPage);
  }

  register(){
    this.navCtrl.push(RegisterPage);
  }

  profile(){
    this.database.remoteSaved.getSession((err, response) => {
      if (err) {
        // network error
        alert('Erreur du réseau');
        
      } else if (!response.userCtx.name) {
        // nobody's logged in
        alert('Personne n\'est connecté');
        
      } else {
        this.navCtrl.push(ProfileUserPage);
      }
    });
    
  }

  deconnexion(){
    this.database.logout()
  }

  confLocaliteEnquetee(){
    this.navCtrl.push(ConfLocaliteEnquetePage);
  }

  changeLangue(){
    this.navCtrl.push(LanguePage);
  }

  gestionTypeSole(){
    this.navCtrl.push(TypeSolePage);
  }

  gestionChamps(){
    this.navCtrl.push(ChampsPage);
  }

  gestionEssai(){
    this.navCtrl.push(EssaiPage);
  }

  gestionTraitement(){
    this.navCtrl.push(TraitementPage);
  }

  calculNbOPUnion(){

    //on recupere toutes les unions
    this.affichierMsg('Calcul du nombre d\'OPs par union encours...');
      //Pour chaque union
      this.unions.forEach((union, indexU) => {
        //reinitialiser le nombre d'OP de l'union
        union.data.num_OP = 0;
        //parcourir les op a la recherche des ops qui appartiennent a l'union
        this.ops.forEach((op, indexO) => {
          //compter les OP
          if(union.data.num_aggrement === op.data.union){
            union.data.num_OP++
          }

        });

        //mettre a jour l'union
        this.database.updateDoc(union);
      });
      this.affichierMsg('Calcul du nombre d\'OPs par union terminé avec succes!');
      
  }

  calculNbMembreOP(){
    this.affichierMsg('Calcul du nombre de membre par OPs et par union encours...');                  
    //on parcour les uion
    this.unions.forEach((union, indexU) =>{

        union.data.num_membre = 0;
        union.data.num_hommes = 0;
        union.data.num_femmes = 0;
        //parcourir toutes les OPs
        this.ops.forEach((op, indexO) => {

          //prendre uniquement les ops de l'union
          if(union.data.num_aggrement === op.data.union){
            //reinitialiser les champs a calculer
            op.data.num_membre = 0;
            op.data.num_hommes = 0;
            op.data.num_femmes = 0;

            //parcourir tous les membres a la recherche des membres qui appartennenent à l'OP
            this.membres.forEach((membre, indexM) => {
              //si le membre appartient a l'OP
              if(membre.data.op === op.data.num_aggrement){
                op.data.num_membre++;
                if(membre.data.genre === 'male'){
                  op.data.num_hommes++;
                }else{
                  op.data.num_femmes++;
                }
              }
            });
            //fin membre
            
            //calculer les champs de l'union
            union.data.num_membre += op.data.num_membre;
            union.data.num_hommes += op.data.num_hommes;
            union.data.num_femmes += op.data.num_femmes;

              //mettre a jour m'OP
            this.database.updateDoc(op);
          }

        });
        //fin op

        //mettre ajour l'union
        this.database.updateDoc(union);
      
    });
    //fin union
    this.affichierMsg('Calcul du nombre de membre apr OPs et par union terminé avec succes!');
  }

  gestionOP(){
    this.navCtrl.push(OpPage);
  }

  gestionMembre(){
    this.navCtrl.push(MembresPage);
  }

  gestionUnion(){
    this.navCtrl.push(UnionsPage);
  }

   getProfiles() {
    this.database.getAll(
      {
        startkey: 'koboSubmission_fuma-op-membre',
        endkey: 'koboSubmission_fuma-op-membre\uffff',
        include_docs: true
      },
    ).then(
      res => {
        this.profiles = res.rows
        this.pendingProfiles = this.profiles.filter(function (profile) {
          return !profile.doc.fumaID
        })
      }
      )
  }

  
  //assign semi-random id, check unique, add photo(?)
  approveProfiles(){
    var docs=this.pendingProfiles.map(function(profile){
      //console.log(profile)
      profile.doc.fumaID=this.generateId(profile.doc.data)
      return profile.doc
    }.bind(this))
    console.log('approved profiles',docs)
    this.database.bulkDocs(docs).then(function(){
      this.getProfiles();
    }.bind(this))
  }
  generateId(data){
    var country = data.pays||'XX'
    var region=data.region||'XX'
    var department = data.departement || 'XX'
    //var commune = data.commune || 'XX'
    //select 3 random numbers and random letter for up to 25,000 unique per department
    var chars='ABCDEFGHIJKLMNPQRSTUVWYZ'
    var numbers='0123456789'
    var randomArray=[]
    for(let i=0;i<3;i++){
      var rand = Math.floor(Math.random()*10)
      randomArray.push(numbers[rand])
    }
    randomArray.push('-')
    var rand = Math.floor(Math.random()*24)
    randomArray.push(chars[rand])
    var randomString=randomArray.join("");
    var fumaId=country+'-'+region+' '+department+'-'+randomString 
    return fumaId
  }


}
