interface RetrieveFilterModel {
    prenom?: RegExp;
    nom?: RegExp;
    email?: RegExp;
    dateCreation?: {
        $gte?: Date | string;
        $lte?: Date | string;
    };
    dateCreationDebut?: Date;
    dateCreationFin?: Date;
}

export = RetrieveFilterModel;
