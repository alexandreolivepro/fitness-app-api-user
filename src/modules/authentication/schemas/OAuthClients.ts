import { Schema } from 'mongoose';

import DataAccess = require('../../../helpers/lib/dataAccess/DataAccess');
import OAuthClientsModel from '../models/OAuthClientsModel';

// const mongoose = DataAccess.mongooseInstance;
const { mongooseConnection } = DataAccess;

class OAuthClientsSchema {
  get schema(): Schema<OAuthClientsModel> {
    return new Schema({
      clientId: { type: String },
      clientSecret: { type: String },
      redirectUris: { type: Array },
      grants: { type: Array },
    });
  }
}

const schema = mongooseConnection.model<OAuthClientsModel>(
  'OAuthClients',
  new OAuthClientsSchema().schema,
);
export = schema;
