import IOptionsRetrieveModel = require('../../repositories/models/OptionsRetrieveModel');

interface Read<T> {
    retrieve: (options: IOptionsRetrieveModel, params: Record<string, unknown>) => Promise<T[]>;
    findById: (_id: string) => Promise<T>;
}

export = Read;
