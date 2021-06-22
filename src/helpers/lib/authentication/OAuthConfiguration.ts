import OAuthServer from 'express-oauth-server';
import { Express } from 'express';
import AuthService from './services/AuthService';
import OAuthClientsRepository from '../../../modules/authentication/repositories/OAuthClientsRepository';
import UtilisateurService from '../../../modules/users/services/UsersService';
import { Logger } from '../..';
import Constants from '../../../config/constants/Constants';
import StatusAPI from '../../status/StatusAPI';

export default class OAuthConfiguration {
  static readonly logger: Logger = new Logger(Constants.LOG_CONF);

  static getConfiguration(app: Express): OAuthServer {
    return new OAuthServer({
      model: {
        getAccessToken: AuthService.getAccessToken,
        getClient: OAuthClientsRepository.getClient,
        getRefreshToken: AuthService.getRefreshToken,
        getUser: UtilisateurService.loginUser,
        saveToken: AuthService.saveToken,
        verifyScope: AuthService.verifyScope,
        saveAuthorizationCode: AuthService.saveAuthorizationCode,
      } as any,
    });
  }

  public static loadRoutesOAuth(app: Express): void {
    app.post(`${Constants.BASE_PATH}/oauth/token`, (req, res, next) => {
      req.body.client_id = req.headers['client-id'];
      req.body.client_secret = req.headers['client-secret'];
      req.body.grant_type = req.headers['grant-type'];
      next();
    }, app.oauth.token());

    app.get(`${Constants.BASE_PATH}/oauth/user`, app.oauth.authenticate(), async (req, res, next) => {
      const bearerToken = req.headers.authorization;
      const token = await AuthService.getAccessToken(bearerToken.split('Bearer ')[1]);
      if (token) {
        res.json(token.user);
      } else {
        const statusAPI = new StatusAPI();
        statusAPI.addMessage(
          'GET_USER_ERROR',
          'error',
          'No user match this access_token',
        );
        res.status(500).send(statusAPI.returnStatus());
      }
    });
  }
}
