import { Component, NgZone } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
/*
import { HomePage } from './home/home';
import { CollectPage } from './collect/collect';
import { ResearchPage } from './research/research';
import { ProfilePage } from './profile/profile';
import { AdminPage } from './admin/admin';
*/
//import { FormViewPage } from '../form-view/form-view'
import { PouchdbProvider } from '../../providers/pouchdb-provider'
import { TranslateService  } from '@ngx-translate/core';
import { global } from '../../global-variables/variable'
/*
import { UnionsPage } from '../unions/unions'
import { OpPage } from '../op/op'
import { MembresPage } from '../membres/membres'
import { EssaiPage } from '../essai/essai';
*/
@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})  
export class TabsPage {
  
  // public showFormTab = false;

  // onShowForm(agreed: boolean) {
  //   this.showFormTab=true
  // }

  // include formview as unselectable tab to keep window open after form filled
  tab1Root: any = 'HomePage';
  tab2Root: any = 'Essai1Page';
  tab3Root: any = 'ResearchPage';
  //tab4Root: any = ProfilePage;
  tab4Root: any = 'MembresPage';
  tab5Root: any = 'AdminPage';
  tab6Root: any = 'FormViewPage';
  tab10Root: any = 'UnionsPage';
  tab11Root: any = 'OpPage';



  constructor(public translate: TranslateService, private database: PouchdbProvider, private zone: NgZone) {
    this.translate.setDefaultLang(global.langue)
  }

  public ionViewDidEnter() {
    this.translate.use(global.langue)
    //console.log('syncing database')
    //this.database.sync();
    this.initData();
    this.getConfig();
    this.database.getChangeListener().subscribe(data => {
      this.zone.run(() => {
        //this.items.push(data.doc);
      });
    });
  }


  getConfig(){
    this.database.getDocById('config-app').then((c) => {
      if(c){
          global.config_app.nom_structure = c.data.nom_structure;
          global.config_app.code_structure = c.data.code_structure
        }
    }).catch((err) => console.log(err));
  }

  initFilter(){
    this.database.getDocById('_design/filtrerDoc').then((c) => {
      if(!c){
          this.ajouterLoalDesignDoc()
        }
    }).catch((err) => this.ajouterLoalDesignDoc());
  }

  initData(){
    //ajouter pays
    this.database.getDocById('pays').then((c) => {
      if(!c){
        this.database.createSimpleDocReturn(global.pays)
        }
    }).catch((err) => this.database.createSimpleDocReturn(global.pays));
    
    //ajouter region
    this.database.getDocById('region').then((c) => {
      if(!c){
        this.database.createSimpleDocReturn(global.region)
        }
    }).catch((err) => this.database.createSimpleDocReturn(global.region));
    
    //ajouter departement
    this.database.getDocById('departement').then((c) => {
      if(!c){
        this.database.createSimpleDocReturn(global.departement)
        }
    }).catch((err) => this.database.createSimpleDocReturn(global.departement));
    
    //ajouter commune
    this.database.getDocById('commune').then((c) => {
      if(!c){
        this.database.createSimpleDocReturn(global.commune)
        }
    }).catch((err) => this.database.createSimpleDocReturn(global.commune));
    
    //ajouter village
    this.database.getDocById('village').then((c) => {
      if(!c){
        this.database.createSimpleDocReturn(global.village)
        }
    }).catch((err) => this.database.createSimpleDocReturn(global.village));
    
    //ajouter filtre
    this.database.getDocById('_design/filtrerDoc').then((c) => {
      if(!c){
          this.ajouterLoalDesignDoc()
        }
    }).catch((err) => this.ajouterLoalDesignDoc());
  }


  
  ajouterLoalDesignDoc(){
    let filter_doc: any = {
      //Prend en parametre un tableau contenant la liste des code des union
          _id: '_design/filtrerDoc',
          filters: {
            myfilter: function (doc, req) {
              var public_doc_type = ['pays', 'region', 'commune', 'departement', 'village', 'traitement', 'type-sole', 'protocole', 'variete', 'culture', 'config-app', 'culture-protocole'];
              var doc_pour_union_type = ['union', 'op', 'membre_op', 'champs', 'essai', 'typologie'];
              /*//tous le monde a acces au filtre
              if(doc._id == '_design/filtrerDoc'/* || doc._deleted*****){
                return 1;
              }else*/
              //seul l'admin à accès à la totalité des inforamtions de la base de donnée
              if(doc._id == '_design/filtrerDoc' || (req.query.roles && req.query.roles.length && (req.query.roles.indexOf('admin') != -1) || (req.query.roles.indexOf('_admin') != -1))){
                return 1
              }else{

                //localité et photos
                if(doc.type && doc.type != ''){
                  //acceder aux localités
                  if(public_doc_type.indexOf(doc.type) !== -1){
                    return 1;
                  }

                  //acceder aux photo des membres des unions autorisé
                  else if(doc.type == 'photo'){
                    if(req.query.codes_unions && req.query.codes_unions.length > 0 && doc.code_union){
                      return req.query.codes_unions.indexOf(doc.code_union) !== -1;
                    }/*else if(req.query.codes_unions && req.query.codes_unions.length > 0 && (!doc.code_union || doc.code_union == '')){
                      //pour les documement qu nom pas de code_union, les retoruner
                      return 1;
                    }*/
                  }else{
                    //return 'doc type probleme => '+doc._id
                    throw({forbidden: 'doc type probleme => '+doc._id})
                  }
                }
                
                
                //traitements, unions, ops, membres, champs et essais
                else if(doc.data && doc.data.type){
                  //acceder aux traitements, type de sole et variétés
                  if(public_doc_type.indexOf(doc.data.type) !== -1){
                    return 1;
                  }

                  //acceder aux unions, ops, membres, champs, essais et typologie autorisés à l'utilisateur à ltravers le code union
                  else if(doc_pour_union_type.indexOf(doc.data.type) != -1){
                      if(req.query.codes_unions && req.query.codes_unions.length > 0 && doc.data.code_union){
                        return req.query.codes_unions.indexOf(doc.data.code_union) !== -1;
                      }/*else if(req.query.codes_unions && req.query.codes_unions.length > 0 && (!doc.data.code_union || doc.data.code_union == '')){
                      //pour les documement qu nom pas de code_union, les retoruner
                      return 1;
                      }*/
                  }else{
                    throw({forbidden: 'doc.data ou doc.data.type => '+doc._id})
                    //return 'doc.data'
                  }
                }else{
                  //throw({forbidden: 'erreur incomprise => '+doc._id})
                }
                
              }
            }.toString()
          }
        }

        filter_doc._id = '_design/filtrerDoc';
        this.database.createSimpleDocReturn(filter_doc);//.then((res) => alert('Filter ajouté avec succes')).catch((err) => alert('erreur ajout du filter => '+err));

        /*
        this.database.getDocById('_design/filtrerDoc').then((doc) => {
          if(doc && doc._id){
            //doc existe
            //this.database.remote(doc)
            filter_doc._id = '_design/filtrerDoc';
            filter_doc._rev = doc._rev;
            this.database.createSimpleDocReturn(filter_doc);//.then((res) => alert('Filter mise à jour avec succes')).catch((err) => alert('erreur mise à jour du filter du filter => '+err));
          }else{
            //créer le filtre de base
            //this.ajouterDesignDoc();
            filter_doc._id = '_design/filtrerDoc';
            this.database.createSimpleDocReturn(filter_doc);//.then((res) => alert('Filter ajouté avec succes')).catch((err) => alert('erreur ajout du filter => '+err));
          }
          
        }).catch((err) => {
          //alert(err)
          //this.ajouterDesignDoc();
          filter_doc._id = '_design/filtrerDoc';
          this.database.createSimpleDocReturn(filter_doc).then((res) => alert('Filter ajouté avec succes')).catch((err) => alert('erreur ajout du filter '+err));
        });*/
    

        //global.remoteSaved.put(filter_doc).catch((err) => alert('erreur vers server '+err));
        //this.database.put(doc, doc._id).catch((err) => alert('erreur vers local '+err));
  }
}
