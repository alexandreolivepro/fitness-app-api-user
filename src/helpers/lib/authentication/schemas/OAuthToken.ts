import { Schema } from 'mongoose';

import DataAccess = require('../../dataAccess/DataAccess');
import OAuthTokensModel from '../models/OAuthTokensModel';

// const mongoose = DataAccess.mongooseInstance;
const { mongooseConnection } = DataAccess;

class OAuthTokensSchema {
  get schema(): Schema<OAuthTokensModel> {
    return new Schema({
      accessToken: { type: String },
      accessTokenExpiresAt: { type: Date },
      client: { type: Object }, // `client` and `user` are required in multiple places, for example `getAccessToken()`
      clientId: { type: String },
      refreshToken: { type: String },
      refreshTokenExpiresAt: { type: Date },
      user: { type: Object },
      userId: { type: String },
    });
  }
}

const schema = mongooseConnection.model<OAuthTokensModel>(
  'OAuthTokens',
  new OAuthTokensSchema().schema,
);
export = schema;
