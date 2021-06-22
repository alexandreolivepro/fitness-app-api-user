import { Schema, Types } from 'mongoose';

import DataAccess = require('../../../helpers/lib/dataAccess/DataAccess');
import UsersModel = require('../models/UsersModel');

// const mongoose = DataAccess.mongooseInstance;
const { mongooseConnection } = DataAccess;

class UsersSchema {
  get schema(): Schema<UsersModel> {
    return new Schema({
      firstname: {
        type: String,
        required: true,
      },
      lastname: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      role: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      locale: {
        type: String,
        default: 'en',
        required: true,
      },
      username: {
        type: String,
        required: true,
        unique: true,
      },
      createdAt: {
        type: Date,
        required: true,
        default: new Date(),
      },
      updatedAt: {
        type: Date,
        required: true,
        default: new Date(),
      },
    });
  }
}

const schema = mongooseConnection.model<UsersModel>(
  'Users',
  new UsersSchema().schema,
);
export = schema;
