import express = require('express');
import StatusAPI from '../../../helpers/status/StatusAPI';

import Constants = require('../../../config/constants/Constants');
import JsonValidator = require('../../../helpers/lib/schemaValidator/JsonValidator');

// Services
import UsersService = require('../services/UsersService');

// Interfaces
import IBaseController = require('../../../helpers/lib/controllers/base/BaseController');
import IUsersModel = require('../models/UsersModel');
import IOptionsRetrieveModel = require('../../../helpers/lib/repositories/models/OptionsRetrieveModel');
import IRetrieveFilterModel = require('../models/RetrieveFilterModel');
import IRangePagination = require('../../../helpers/lib/pagination/interfaces/RangePagination');

// Validators
import VcreateUsersValidator = require('../validator/createUsersValidator');
import VupdateUsersValidator = require('../validator/updateUsersValidator');
import VretrieveFilterUsers = require('../validator/retrieveFilterUsersValidator');
import UtilsService from '../../../helpers/utils/UtilsService';
import KeyValueObject from '../../../helpers/interfaces/KeyValueObject';

class UsersController {
  private _utilisateursService: UsersService;

  private _ajv = new JsonValidator();

  private _statusAPI = new StatusAPI();

  constructor() {
    this._utilisateursService = new UsersService();
    this._ajv = new JsonValidator();
    this._statusAPI = new StatusAPI();
  }

  /** Creer un utilisateur USI
   * @param  {express.Request} req requête express
   * @param  {express.Response} res réponse express
   * @returns Promise<void>
   */
  create = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
      const utilisateur = this._ajv.validate<IUsersModel>(
        VcreateUsersValidator,
        req.body as IUsersModel,
      );
      utilisateur.password = await this._utilisateursService.generateHashedPassword(utilisateur.password);
      const result = await this._utilisateursService.create(utilisateur);
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

  /** Récupère la liste des utilisateurs USI
  * @param  {express.Request} req requête express
  * @param  {express.Response} res réponse express
  * @returns Promise<void>
  */
  retrieve = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
      const {
        limit,
        index,
        sortBy,
      } = req.query;
      const { count, match } = req.users;

      const pipeline: unknown[] = [
        { $sort: UtilsService.getSortForPipeline('createdAt', sortBy ? sortBy.toString() : null) },
      ];

      if (Object.keys(match).length > 0) {
        pipeline.push({
          $match: match,
        });
      }
      pipeline.push({ $project: { password: 0 } });
      pipeline.push(
        { $skip: +index },
        { $limit: +limit },
      );

      const data = await this._utilisateursService.aggregate(pipeline);
      res.send({ pagination: UtilsService.buildPagination(count, +index, +limit), data });
    } catch (e) {
      this._statusAPI.addMessage(
        'RETIEVE_USER_ERROR',
        'error',
        'Une erreur est survenue lors de la recuperation des utilisateurs',
        e.message,
      );
      res.status(500).send(this._statusAPI.returnStatus());
    }
  }

  /** Met à jour un utilisateur USI
   * @param  {express.Request} req requête express
   * @param  {express.Response} res réponse express
   * @returns Promise<void>
   */
  update = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
      const { _id } = req.params;
      this._ajv.validate({ objectId: true }, _id);
      const utilisateur = this._ajv.validate<IUsersModel>(
        VupdateUsersValidator,
        req.body,
      );

      const result = await this._utilisateursService.update(_id, utilisateur);
      res.send(result);
    } catch (e) {
      this._statusAPI.addMessage(
        'UPDATE_ERROR',
        'error',
        'Une erreur est survenue lors de la création du compte',
        e.message,
      );
      res.status(500).send(this._statusAPI.returnStatus());
    }
  };

  /** Supprime un utilisateur
   * @param  {express.Request} req requête express
   * @param  {express.Response} res réponse express
   * @returns Promise<void>
   */
  delete = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
      const { _id } = req.params;
      this._ajv.validate({ objectId: true }, _id);
      const result = await this._utilisateursService.delete(_id);
      if (result === null) {
        throw new Error('NOTFOUND: This user could not be found in the database');
      }
      res.send(result);
    } catch (e) {
      this._statusAPI.addMessage(
        'DELETE_USER_ERROR',
        'error',
        'An error appeared while deleting the account',
        e.message,
      );
      res.status(500).send(this._statusAPI.returnStatus());
    }
  };

  /** Récupère un utilisateur par son id
   * @param  {express.Request} req requête express
   * @param  {express.Response} res réponse express
   * @returns void
   */
  findById = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
      const { _id } = req.params;
      this._ajv.validate({ objectId: true }, _id);

      const result = await this._utilisateursService.findById(_id, { password: 0 });
      res.send(result);
    } catch (e) {
      this._statusAPI.addMessage(
        'FINDBYID_USER_ERROR',
        'error',
        'Une erreur est survenue lors de la recuperation de l\'utilisateur',
        e,
      );
      res.status(500).send(this._statusAPI.returnStatus());
    }
  };

  /** Compte le nombre de documents correspondant aux «critères» dans la collection
  * @param  {express.Request} req requête express
  * @param  {express.Response} res réponse express
  * @returns Promise<void>
  */
 buildFilters = async (req: express.Request, res: express.Response, next: () => void): Promise<void> => {
   try {
     req.users = {
       match: this._utilisateursService.buildMatchQuery(req.query as KeyValueObject),
     };
     next();
   } catch (e) {
     this._statusAPI.addMessage(
       'COUNT_USER_ERROR',
       'error',
       'Une erreur est survenue lors de la recuperation de l\'utilisateur',
       e,
     );
     res.status(500).send(this._statusAPI.returnStatus());
   }
 }

  /** Compte le nombre de documents correspondant aux «critères» dans la collection
  * @param  {express.Request} req requête express
  * @param  {express.Response} res réponse express
  * @returns Promise<void>
  */
  count = async (req: express.Request, res: express.Response, next: () => void): Promise<void> => {
    const pipeline: unknown[] = [];
    if (Object.keys(req.users.match).length > 0) {
      pipeline.push({
        $match: req.users.match,
      });
    }
    pipeline.push({
      $count: 'count',
    });
    this._utilisateursService.aggregate(pipeline)
      .then((countResult) => {
        const [count] = countResult;
        req.users = {
          ...req.users,
          ...count,
        };
        if (!count) {
          req.users.count = 0;
        }
        next();
      });
  }
}

export = UsersController;
