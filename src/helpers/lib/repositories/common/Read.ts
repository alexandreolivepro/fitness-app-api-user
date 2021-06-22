import { DocumentDefinition } from 'mongoose';

import mongoose = require('mongoose');
import IOptionsRetrieveModel = require('../models/OptionsRetrieveModel');

interface Read<T> {
    retrieve: (options: IOptionsRetrieveModel) => Promise<DocumentDefinition<mongoose.Document>[]>;
    findById: (id: string, projection?: { [key: string]: number }) => Promise<mongoose.Document>;
}

export = Read;
