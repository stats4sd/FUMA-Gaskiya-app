//essais class
import {CultureType} from './culture-essai.class'
export class EssaiType {
    today: any = null;
    annee_essai: any = null;
    type: any = null;
    code_essai: any = null;
    //code_association: any = null;

    //info protocole
    code_protocole: any = null;
    nom_protocole: any = null;
    type_essais: any = null;
    type_culture: any = null;
    typologie: any = null;
    annee_typologie: any = null;

    //info producteur
    matricule_producteur: any = null;
    nom_producteur: any = null;
    surnom_producteur: any = null;
    sex_producteur: any = null;
    code_union: any = null;
    site_producteur: any = null;
    id_site_producteur: any = null;
    id_village_producteur: any = null; 
    village_producteur: any = null; 

    //info traitement
    traitement:any = null;
    id_traitement: any = null;
    code_traitement: any = null;
    nom_entree: any = null;
    nom_controle: any = null;
    //superficie_tr: any = null;
    superficie_standard: any = null;
    //superficie_essai: any = null;

    //info champ
    id_champs: any = null;
    nom_champs: any = null;
    type_sole: any = null;
    superficie: any = null;
    longitude:any = null;
    latitude: any = null;

    //info cultures
    cultures: Array<CultureType> = [];
    /********************* debu a commenter apres */
    //culture: any = null;// ---> migré dans culture essai
    //superficie_essai: any = null;// ---> migré dans culture essai
    //variete: any = null;// ---> migré dans culture essai
    //variables:any = [];// ---> migré dans culture essai
    /********************* fin a commenter apres */

    //info généraux
    systeme: any = null;
    bloc: any = null;
    parcelle: any = null;
    repetition: any = null;
    gerants: any = [];
    precedante_cultures: any [];
    objectif_essai: any = null;
    effort_personnel: boolean = false;
    classes_producteur: any = [];
    estValide: boolean = true;

    //info appareil et users
    deviceid: any = null;
    imei: any = null;
    phonenumber: any = null;
    update_deviceid: any = null;
    update_phonenumber: any = null;
    update_imei: any = null;
    start: any = null;
    end: any = null; 
}