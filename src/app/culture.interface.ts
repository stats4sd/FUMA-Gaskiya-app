// culture.interface.ts

export interface Culture {
    nom: string; // required
    description: string;
    variables: Variables[]; // une culture peut avoir une ou plusieurs données
}

export interface Variables {
    code_variable: string;  // required
    nom_variable: string;    // required
    type_variable: string; // required
    valeur_variable: string;
    unite: string;
    est_obligatoire: boolean; // required
    description_variable: string;
}