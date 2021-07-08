import express, { Express } from 'express';
import OAuthConfiguration from '../../../helpers/lib/authentication/OAuthConfiguration';
import AuthService from '../../../helpers/lib/authentication/services/AuthService';

import UsersController = require('../controllers/UsersController');

const router = express.Router();

class UsersRoutes {
  private _utilisateursController: UsersController;

  constructor() {
    this._utilisateursController = new UsersController();
  }

  get routes(): express.Router {
    const utilisateursController = this._utilisateursController;

    router.get(
      '/user',
      AuthService.authenticate,
      utilisateursController.buildFilters,
      utilisateursController.count,
      utilisateursController.retrieve,
    );

    router.get(
      '/user/:_id',
      AuthService.authenticate,
      utilisateursController.findById,
    );

    router.post(
      '/user',
      utilisateursController.create,
    );

    router.put(
      '/user/:_id',
      AuthService.authenticate,
      utilisateursController.update,
    );

    router.delete(
      '/user/:_id',
      AuthService.authenticate,
      utilisateursController.delete,
    );

    return router;
  }
}

Object.seal(UsersRoutes);
export = UsersRoutes;
