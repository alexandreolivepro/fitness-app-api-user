interface OptionsRetrieveModel {
    skip: number;
    limit: number;
    sort?: { [x: string]: number };
}

export = OptionsRetrieveModel;
