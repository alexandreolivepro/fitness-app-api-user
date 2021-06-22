import { Request, Response } from 'express';
import Mongoose = require('mongoose');
import StatusAPI from '../../status/StatusAPI';

import Constants = require('../../../config/constants/Constants');
import { Logger } from '../../logger/Logger';

class DataAccess {
  static readonly logger: Logger = new Logger(Constants.LOG_CONF);

  static mongooseInstance: Promise<typeof Mongoose>;

  static mongooseConnection: Mongoose.Connection;

  constructor() {
    DataAccess.connect();
  }

  static connect(): Promise<typeof Mongoose> {
    if (this.mongooseInstance) return this.mongooseInstance;

    this.mongooseConnection = Mongoose.connection;
    this.mongooseConnection.once('open', () => {
      this.logger.log('INFO', 'Connexion mongodb effectué');
    });

    this.mongooseInstance = Mongoose.connect(
      Constants.MONGODB_CONNECTION_STRING,
      {
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
        // connectTimeoutMS: 1000,
        // autoReconnect: true,
        // reconnectInterval: 500,
        // reconnectTries: 1000,
        useUnifiedTopology: true,
      },
    );
    return this.mongooseInstance;
  }

  readyState = (req: Request, res: Response, next: () => void): Response | void => {
    const status = new StatusAPI();
    // mongoose.connection.readyState
    // 0: disconnected
    // 1: connected
    // 2: connecting
    // 3: disconnecting
    if (Mongoose.connection.readyState === 0 || Mongoose.connection.readyState === 2) {
      status.addMessage(
        'NOREADYSTATE',
        'error',
        'Une erreur est survenue lors de la connexion à la DB',
      );
      return res.status(401).send(status.returnStatus());
    }

    return next();
  }
}

DataAccess.connect();
export = DataAccess;
