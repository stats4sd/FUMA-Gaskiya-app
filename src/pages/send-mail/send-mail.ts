import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, } from 'ionic-angular';
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { EmailComposer } from '@ionic-native/email-composer';
//import * as sendmail  from 'sendmail';

/**
 * Generated class for the SendMailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-send-mail',
  templateUrl: 'send-mail.html',
})
export class SendMailPage {

  sendMailForm: any;
  constructor(public navCtrl: NavController, public viewCtl: ViewController, public emailComposer: EmailComposer, public navParams: NavParams, public formBuilder: FormBuilder,) {
    this.initForm()
  }

  /*ionViewDidLoad() {
    
  }*/


  initForm(){
    let maDate = new Date();
     this.sendMailForm = this.formBuilder.group({
      email:['', [Validators.required, Validators.email]],
      nom:['', Validators.required],
      objet:['', Validators.required],
      message:['', Validators.required],
      
    });
     
  }


  senMail(){

    let msg = this.sendMailForm.value;
    let email = {
      to: 'ml.projects@gmail.com',
      subject: msg.objet,
      body: '<b>From: '+msg.email+'</b>\n<b>Nom/Organisation: '+msg.nom+'</b>\n\n\n\n' +msg.message,
      isHtml: true
    };

    this.emailComposer.isAvailable().then((available: boolean) =>{
      if(available) {
        //Now we know we can send
        // Send a text message using default options
        this.emailComposer.open(email).then(() => alert('Votre message a été envoyé avec succes!\n Nous vous repondrons dans un brief délai.\nMerci d\'avoir choisi FRNA!'));
        this.viewCtl.dismiss();
      }
     }).catch((err) =>{
      alert('Echec d\'envoi du mail => '+err)
      this.viewCtl.dismiss();
     });
  }

  /*parSendMail(msg){
    sendmail({
      from: msg.email,
      to: 'ml.projects@gmail.com',
      subject: msg.objet,
      html: '<b>Nom/Organisation: '+msg.nom+'</b>\n\n\n\n' +msg.message
    }, function (err, reply) {
      console.log(err && err.stack)
      console.dir(reply)
    })
  }*/

  annuler(){
    this.viewCtl.dismiss();
  }
}
