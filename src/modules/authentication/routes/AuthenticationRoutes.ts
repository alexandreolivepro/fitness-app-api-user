import express = require('express');

import OAuthServer from 'express-oauth-server';
import AuthenticationController = require('../controllers/AuthenticationController');

const router = express.Router();

const app = express();

class AuthenticationRoutes {
  private _authenticationController: AuthenticationController;

  constructor() {
    this._authenticationController = new AuthenticationController();
  }

  get routes(): express.Router {
    const authentificationController = this._authenticationController;

    router.post(
      '/client',
      authentificationController.createClientId,
    );

    return router;
  }
}

Object.seal(AuthenticationRoutes);
export = AuthenticationRoutes;
