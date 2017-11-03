import { Component } from '@angular/core';
import { NavController, AlertController, NavParams, LoadingController, ToastController, ViewController, IonicPage } from 'ionic-angular';
import { PouchdbProvider } from '../../../providers/pouchdb-provider';
import { OpPage } from '../../op/op';
import { TranslateService } from '@ngx-translate/core';
import { global } from '../../../global-variables/variable';
import { Storage } from '@ionic/storage'

/*
  Generated class for the Admin page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

@IonicPage()
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

  constructor(public translate: TranslateService, public loadtingCtl: LoadingController, public viewCtl: ViewController, public storage: Storage, public alertCtl: AlertController, public navCtrl: NavController, public toastCtl: ToastController, public navParams: NavParams,  private database: PouchdbProvider) {
    this.translate.setDefaultLang(global.langue);
  }

  dismiss(){
    this.viewCtl.dismiss();
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
  culture(){
    this.navCtrl.push('CulturePage')
  }
  variete(){
    this.navCtrl.push('VarietePage')
  }

  fusionnerEssais(){
    let loading = this.loadtingCtl.create({
      content: 'Application des changeme,ts sur les essais en cours...'
    });
    loading.present();

    let tous_essais: any = [];
    let tous_essais2: any = [];
    //let tous_membres: any = [];
    let essais_membre: any = [];
    //let nb_essais_membres: any;
    //let nbm: any = 0;
    let essai1: any = {};
    let essai2: any = {};
    this.database.getPlageDocsRapide('fuma:op:membre', 'fuma:op:membre:\uffff').then((membres) => {
      if(membres){
        //tous_membres = membres;
        //this.servicePouchdb.getPlageDocsRapide('fuma:essai', 'fuma:essai:\uffff').then((essais) => {
        //  if(essais){
          //  tous_essais = essais;
            //tous_essais2 = essais;
            //alert('nbm l '+membres.length)
            //alert('nbe l '+essais.length)
            membres.map((membre) => {
              essais_membre = [];
              //nb_essais_membres = 0;
              this.database.getPlageDocsRapide('fuma:essai:'+membre.doc.data.matricule_Membre, 'fuma:essai:'+membre.doc.data.matricule_Membre+' \uffff').then((essais_mb) => {
                if(essais_mb){
                  essais_membre = essais_mb;

                  //if(essais_membre.length){
                  let nb_essais_membres: any = essais_membre.length;
                  //tous_essais = tous_essais2;
                  //}else{
                  //  nb_essais_membres = 0;
                  //}
                  
                  //if(nb_essais_membres > 1){
                    //alert('nb_essais_membres = '+nb_essais_membres)
                    while(nb_essais_membres > 1){
                      essai1 = essais_membre[0].doc;
                      //essai2 = '';
                      essais_membre.splice(0, 1);
                      nb_essais_membres--;
                      
                      if(essai1.data.nom_entree ===  'Boule NPK'){
                        for(let ii = 0; ii < essais_membre.length; ii++) {
                          //alert(essai1.data.nom_entree +' '+ essais_membre[ii].data.nom_entree)
                          if(essais_membre[ii].doc.data.nom_entree ===  'Semis ordinaire '){
                            //alert(essai1.data.nom_entree + '===> '+essais_membre[ii].data.nom_entree);
                            essai2 = essais_membre[ii].doc;
                            
                            essai1.data.NPL_controle = essai2.data.NPL;
                            essai1.data.NPR_controle = essai2.data.NPR;
                            essai1.data.PDE_controle = essai2.data.PDE;

                            this.database.updateDoc(essai1);
                            this.database.deleteDoc(essai2)
                            essais_membre.splice(ii, 1);
                            nb_essais_membres--;

                            //essai2 = '';

                            //ii = essais_membre.length;
                            break;
                          }
                        }

                      }else if(essai1.data.nom_entree ===  'Boule cendre'){
                        for(let ii = 0; ii < essais_membre.length; ii++) {
                          if(essais_membre[ii].doc.data.nom_entree ===  'Semis ordinaire '){
                           // alert(essai1.data.nom_entree + '===> '+essais_membre[ii].data.nom_entree)
                            essai2 = essais_membre[ii].doc;
                          
                            essai1.data.NPL_controle = essai2.data.NPL;
                            essai1.data.NPR_controle = essai2.data.NPR;
                            essai1.data.PDE_controle = essai2.data.PDE;

                            this.database.updateDoc(essai1);
                            this.database.deleteDoc(essai2);

                            essais_membre.splice(ii, 1);
                            nb_essais_membres--;

                            //essai2 = '';

                            //ii = essais_membre.length;
                            break;
                          }
                        }

                      
                      }else if(essai1.data.nom_entree ===  'Semis ordinaire '){
                        for(let ii = 0; ii < essais_membre.length; ii++) {
                          if(essais_membre[ii].doc.data.nom_entree ===  'Boule cendre' || essais_membre[ii].doc.data.nom_entree ===  'Boule NPK'){
                            essai2 = essais_membre[ii].doc;
                            //alert(essai1.data.nom_entree + '===> '+essais_membre[ii].data.nom_entree)
                            
                            essai2.data.NPL_controle = essai1.data.NPL;
                            essai2.data.NPR_controle = essai1.data.NPR;
                            essai2.data.PDE_controle = essai1.data.PDE;

                            this.database.updateDoc(essai2);
                            this.database.deleteDoc(essai1)
                            essais_membre.splice(ii, 1);
                            nb_essais_membres--;


                            //ii = essais_membre.length;
                            break;
                          }
                        }
                      }else if(essai1.data.nom_entree ===  'OGA'){
                        for(let ii = 0; ii < essais_membre.length; ii++) {
                          if(essais_membre[ii].doc.data.nom_entree ===  'SANS OGA'){
                            essai2 = essais_membre[ii].doc;
                            //alert(essai1.data.nom_entree + '===> '+essais_membre[ii].data.nom_entree)
                            
                            essai1.data.NPL_controle = essai2.data.NPL;
                            essai1.data.NPR_controle = essai2.data.NPR;
                            essai1.data.PDE_controle = essai2.data.PDE;

                            this.database.updateDoc(essai1);
                            this.database.deleteDoc(essai2);

                            essais_membre.splice(ii, 1);
                            nb_essais_membres--;


                            //ii = essais_membre.length;
                            break;
                          }
                        }                  
                      }else if(essai1.data.nom_entree ===  'SANS OGA'){
                        for(let ii = 0; ii < essais_membre.length; ii++) {
                          if(essais_membre[ii].doc.data.nom_entree ===  'OGA'){
                            essai2 = essais_membre[ii].doc;
                            //alert(essai1.data.nom_entree + '===> '+essais_membre[ii].data.nom_entree)
                            essai2.data.NPL_controle = essai1.data.NPL;
                            essai2.data.NPR_controle = essai1.data.NPR;
                            essai2.data.PDE_controle = essai1.data.PDE;

                            this.database.updateDoc(essai2);
                            this.database.deleteDoc(essai1);

                            essais_membre.splice(ii, 1);
                            nb_essais_membres--;

                            //ii = essais_membre.length;
                            break;
                          }
                        }
                      }
                    }
                    }
              });

              
             /* tous_essais.forEach((e, i) => {
                if(e.doc.data.matricule_producteur === membre.doc.data.matricule_Membre){
                  essais_membre.push(e.doc);
                  tous_essais2.splice(i, 1);
                }
              });*/
             

                
             // }
            // nbm++;
            });


            loading.dismissAll();

            //alert('nbm '+nbm)

             let toast = this.toastCtl.create({
                message: 'Changement bien appliqué!',
                position: 'top',
                duration: 3000
              });

              toast.present();
         // }
      //  });
      }
    });
  }

  reorganiser_coordonnees(){

    let loading = this.loadtingCtl.create({
      content: 'Application des changements sur les coordonnées en cours...'
    });
    loading.present();
    this.database.getPlageDocsRapide('fuma:essai', 'fuma:essai:\uffff').then((essais) => {
      if(essais){
        essais.map((ess) => {
          if(ess.doc.data.longitude && ess.doc.data.longitude !== ''){
            let tmp = ess.doc.data.longitude;
            ess.doc.data.longitude = ess.doc.data.latitude;
            ess.doc.data.latitude = tmp;
            this.database.updateDoc(ess.doc);

          }
        });
      }
    });
    
    
    this.database.getPlageDocsRapide('fuma:champs', 'fuma:champs:\uffff').then((champs) => {
      if(champs){
        champs.map((ch) => {
          if(ch.doc.data.longitude && ch.doc.data.longitude !== ''){
            let tmp = ch.doc.data.longitude;
            ch.doc.data.longitude = ch.doc.data.latitude;
            ch.doc.data.latitude = tmp;
            this.database.updateDoc(ch.doc);
          }

        });
       loading.dismissAll();
       this.affichierMsg('Coordonnées mises à jour') 
      }
    });
    
  }


    completer_controle_essai(){

    let loading = this.loadtingCtl.create({
      content: 'Application des changements sur les essais en cours...'
    });
    loading.present();
    this.database.getPlageDocsRapide('fuma:essai', 'fuma:essai:\uffff').then((essais) => {
      if(essais){
        essais.map((ess) => {
          ess.doc.data.date_semis_controle = ess.doc.data.date_semis;
          ess.doc.data.gestion_controle = ess.doc.data.gestion;
          ess.doc.data.mode_semis_controle = ess.doc.data.mode_semis;
          this.database.updateDoc(ess.doc);
        });

      loading.dismissAll();
       this.affichierMsg('Essais mis à jour') 
      }
    });
        
  }


  mise_a_jour_code_union_op(){

    let loading = this.loadtingCtl.create({
      content: 'Application des changements sur les ops en cours...'
    });
    loading.present();
    this.database.getPlageDocsRapide('fuma:union','fuma:union:\uffff').then((unions) => {
      if(unions){
        let ops: any = [];
        this.database.getPlageDocsRapide('fuma:op','fuma:op:\uffff').then((opsA) => {
          if(opsA){
            //opss = ops;
            opsA.forEach((o, index) => {
              if(!o.doc.data.op/* || o.data.op !== ''*/){
                ops.push(o)
              }
          });

          unions.forEach((union, i) => {
            ops.forEach((op, i) => {
              if(union.doc.data.num_aggrement === op.doc.data.union){
                op.doc.data.union_code = union.doc.data.code_union;
                this.database.updateDoc(op.doc);
              }
            })
          });
          loading.dismissAll();
          this.affichierMsg('Ops mis à jour')

        }
      });
      }
    });
    

  }

  mise_a_jour_mbr(){

    let loading = this.loadtingCtl.create({
      content: 'Application des changements sur les membres en cours...'
    });
    loading.present();
    this.database.getPlageDocsRapide('fuma:op:membre', 'fuma:op:membre:\uffff').then((membres) => {
      if(membres){
        let ops: any = [];
       this.database.getPlageDocsRapide('fuma:op','fuma:op:\uffff').then((opsA) => {
        if(opsA){
          //opss = ops;
          opsA.forEach((o, index) => {
            if(!o.doc.data.op/* || o.data.op !== ''*/){
              ops.push(o)
            }
         });

          let mbrs: any = [];
          let m: any = {};
          mbrs = membres;
          //ops.forEach((op) =>  {
           // if(op.doc.data.type === 'op'){
              
             membres.forEach((membre, i) => {

              if(membre.doc.data.op_code && membre.doc.data.op_code !== ''){
                m._id = 'fuma:op:membre:' + membre.doc.data.op_code + ':' + membre.doc.data.matricule_Membre;
                m.data = membre.doc.data;
                this.database.deleteDoc(membre.doc);
                this.database.updateDocReturn(m).then((res) => {
                  //this.database.deleteDoc(membre.doc);
                  //this.database.deleteDoc(membre.doc);
                }, err => {
                  //this.database.deleteDoc(membre.doc);
                  
                });

                //membres.splice(i, 1);
                m = {};
              }else{
                for(let j=0; j < ops.length; j++){
                  if(membre.doc.data.op === ops[j].doc.data.num_aggrement){
                    membre.doc.data.op_code = ops[j].doc.data.code_OP;

                    m._id = 'fuma:op:membre:' + membre.doc.data.op_code + ':' + membre.doc.data.matricule_Membre;
                    m.data = membre.doc.data;
                    this.database.deleteDoc(membre.doc);
                    this.database.updateDocReturn(m).then((res) => {
                      //this.database.deleteDoc(membre.doc);
                      //this.database.deleteDoc(membre.doc);
                    }, err => {
                      //this.database.deleteDoc(membre.doc);
                      
                    });

                    //membres.splice(i, 1);
                    m = {};
                    break;
                    
                  }
                }
              }
              /* for(let i = 0; i < ops.length; i++){
                  if(membre.doc.data.op === ops[i].doc.data.num_aggrement){
                    m._id = 'fuma:op:membre:' + ops[i].doc.data.code_OP + ':' + membre.doc.data.matricule_Membre;
                    m.data = membre.doc.data;
                    this.database.createDocReturn(m).then((res) => {
                      //this.database.deleteDoc(membre.doc);
                      //this.database.deleteDoc(membre.doc);
                    }, err => {
                      //this.database.deleteDoc(membre.doc);
                      
                    });

                    this.database.deleteDoc(membre.doc);

                    //membres.splice(i, 1);
                    m = {};

                    break;

                    /*this.database.createDocReturn(m).then((res) => {
                      this.database.remove(membre.doc._id);

                      //alert(membre.doc.data.op +' === '+op.doc.data.num_aggrement +' ===> '+membre.doc._id+'  => ' +res.id)
                      //mbrs.splice(i, 1);
                    // m = {};
                    });*/
                  //}

               //}

            });

            //membres = mbrs;
            }
          });

          loading.dismissAll();
          this.affichierMsg('Membres mis à jour')
        //}
       // });
      }
    })
  }


  affichierMsg(msg = 'Enregistrement mis à jour'){
    let toast = this.toastCtl.create({
      message: msg,
      position: 'top',
      duration: 2000,
      showCloseButton: true,
      closeButtonText: 'ok',
      dismissOnPageChange: true
    });

    toast.present();
  }

  connexion(){
    this.navCtrl.push('LoginPage');
  }

  register(){
    this.navCtrl.push('RegisterPage');
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
        this.navCtrl.push('ProfileUserPage');
      }
    });
    
  }

  deconnexion(){
    this.database.logout()
  }

  confLocaliteEnquetee(){
    this.navCtrl.push('ConfLocaliteEnquetePage');
  }

  changeLangue(){
    this.navCtrl.push('LanguePage');
  }

  gestionTypeSole(){
    this.navCtrl.push('TypeSolePage');
  }

  gestionChamps(){
    this.navCtrl.push('ChampsPage');
  }

  gestionEssai(){
    this.navCtrl.push('EssaiPage');
  }

  gestionTraitement(){
    this.navCtrl.push('TraitementPage');
  }

  calculNbOPUnion(){

    //on recupere toutes les unions
    //this.affichierMsg('Calcul du nombre d\'OPs par union encours...');
     let toast = this.toastCtl.create({
      message: 'Calcul du nombre d\'OPs par union encours...',
      position: 'top',
      duration: 2000,
      showCloseButton: true,
      closeButtonText: 'ok',
      dismissOnPageChange: true
    });

    toast.present();
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
      //this.affichierMsg('Calcul du nombre d\'OPs par union terminé avec succes!');
      
      //toast.dismiss();
      let toast1 = this.toastCtl.create({
        message: 'Calcul du nombre d\'OPs par union terminé avec succes!',
        position: 'top',
        duration: 2000,
        showCloseButton: true,
        closeButtonText: 'ok',
        dismissOnPageChange: true
      });
    toast1.present();
  }

  calculNbMembreOP(){
    //this.affichierMsg('Calcul du nombre de membre par OPs et par union encours...');   
     let toast = this.toastCtl.create({
      message: 'Calcul du nombre de membre par OPs et par union encours...',
      position: 'top',
      duration: 2000,
      showCloseButton: true,
      closeButtonText: 'ok',
      dismissOnPageChange: true
    });

    toast.present();               
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
    //this.affichierMsg('Calcul du nombre de membre apr OPs et par union terminé avec succes!');
    //toast.dismiss()
    let toast1 = this.toastCtl.create({
      message: 'Calcul du nombre de membre apr OPs et par union terminé avec succes!',
      position: 'top',
      duration: 2000,
      showCloseButton: true,
      closeButtonText: 'ok',
      dismissOnPageChange: true
    });
    toast1.present();
  }

  gestionOP(){
    this.navCtrl.push(OpPage);
  }

  gestionMembre(){
    this.navCtrl.push('MembresPage');
  }

  gestionUnion(){
    this.navCtrl.push('UnionsPage');
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


    infoDB(){
      this.storage.get('info_db').then((info_db) => {
      if(!info_db){
        //this.storage.set('ip_serveur', '127.0.0.1');
        info_db = global.info_db
      }//else{
        let alert = this.alertCtl.create({
        title: 'Information de connexion au du serveur',
        //cssClass: 'error',
        inputs: [
          {
            type: 'text',
            placeholder: 'Adrèsse hôte',
            name: 'ip',
            value: info_db.ip
          },
          {
            type: 'text',
            placeholder: 'Nom DB',
            name: 'nom_db',
            value: info_db.nom_db
          }
        ],
        buttons: [
          {
            //cssClass: 'error-border',
            text: 'Annuler',
            role: 'Cancel',
            handler: () => console.log('Changement ip serveur annuler')
          },
          {
            text: 'Valider',
            handler: (data) => {
              let i_db = {
                ip: data.ip.toString(),
                nom_db: data.nom_db.toString()
              }
              this.storage.set('info_db', i_db);
              global.info_db = i_db;
              //global.ip_serveur = data.ip_serveur;
              this.database.syncIinfoDB(data.ip.toString(), data.nom_db.toString());
              
              let toast = this.toastCtl.create({
                message: 'Info DB mises à jour avec succes...',
                duration: 2000,
                position: 'top',
                showCloseButton: true,
                closeButtonText: 'ok',
                dismissOnPageChange: true
              });
              toast.present();
              
            }
          }
        ]
      }); 

      alert.present();
 //       }
      });
  }

  reset(){
    let alert = this.alertCtl.create({
      title: 'Réinitialiser la base de données',
      message: 'Etes vous sûr de vouloir réinitialiser la base de données ?',
      buttons:[
        {
          text: 'Annuler',
          handler: () => console.log('suppression annulée')
 
        },
        {
          text: 'Confirmer',
          handler: () => {
            this.database.reset();
            /*let toast = this.toastCtl.create({
              message:'Base de données bien réinitialiser',
              position: 'top',
              duration: 1000
            });

            toast.present();
            this.navCtrl.setRoot('HomePage');*/
          }
        }
      ]
    });

    alert.present();
  }

    
  //}

}
