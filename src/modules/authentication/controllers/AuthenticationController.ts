import express, { NextFunction, Request, Response } from 'express';
import StatusAPI from '../../../helpers/status/StatusAPI';
import OAuthClientsModel from '../models/OAuthClientsModel';
import JsonValidator = require('../../../helpers/lib/schemaValidator/JsonValidator');
import OAuthClientService = require('../services/OAuthClientService');
import OAuthClientCreateValidator from '../validators/OAuthClientCreateValidator';

class AuthentificationController {
  private _ajv = new JsonValidator();

  private _statusAPI = new StatusAPI();

  private _oAuthClientService = new OAuthClientService();

  constructor() {
    this._ajv = new JsonValidator();
    this._statusAPI = new StatusAPI();
  }

  createClientId = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
      const oAuthClient = this._ajv.validate<OAuthClientsModel>(
        OAuthClientCreateValidator,
        req.body as OAuthClientsModel,
      );
      const result = await this._oAuthClientService.create(oAuthClient);
      res.send(result);
    } catch (e) {
      this._statusAPI.addMessage(
        'CREATE_USER_ERROR',
        'error',
        'Une erreur est survenue lors de la création du compte',
        e.message,
      );
      res.status(500).send(this._statusAPI.returnStatus());
    }
  }
}

export = AuthentificationController;
