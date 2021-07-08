import bcrypt from 'bcrypt';
import * as OAuth2Server from 'oauth2-server';
import express, { NextFunction, Request, Response } from 'express';
import { Query } from 'mongoose';
import OAuthTokens from '../schemas/OAuthToken';
import OAuthTokensModel from '../models/OAuthTokensModel';
import OAuthClientsModel from '../../../../modules/authentication/models/OAuthClientsModel';
import UsersModel from '../../../../modules/users/models/UsersModel';

class AuthService {
  public static async authenticate(req: Request, res: Response, next: NextFunction): Promise<OAuth2Server.Token> {
    return req.app.get('oauth').authenticate()(req, res, next);
  }

  /**
   * Gives error if not implemented. Only needed for Authorization Code Grant!
   */
  public static saveAuthorizationCode(code: string, client: OAuthClientsModel, user: UsersModel): void {
    /* Auth code not used */
  }

  public static getAccessToken(bearerToken: string): Promise<OAuthTokensModel> {
    return OAuthTokens.findOne({ accessToken: bearerToken }).lean().exec() as Promise<OAuthTokensModel>;
  }

  public static deleteToken(bearerToken: string): Promise<OAuthTokensModel> {
    return OAuthTokens.deleteOne({ accessToken: bearerToken }).lean().exec() as Promise<OAuthTokensModel>;
  }

  public static verifyScope(token: OAuthTokensModel, scope: string): boolean {
    if (!token.scope) {
      return false;
    }
    const requestedScopes = scope.split(' ');
    const authorizedScopes = token.scope.split(' ');
    return requestedScopes.every((s) => authorizedScopes.indexOf(s) >= 0);
  }

  public static saveToken(
    token: OAuthTokensModel,
    client: OAuthClientsModel,
    user: UsersModel,
  ): Promise<OAuthTokensModel> {
    const accessToken = new OAuthTokens({
      accessToken: token.accessToken,
      accessTokenExpiresAt: token.accessTokenExpiresAt,
      client,
      clientId: client.clientId,
      refreshToken: token.refreshToken,
      refreshTokenExpiresAt: token.refreshTokenExpiresAt,
      user,
      userId: user._id,
    });
    return new Promise((resolve, reject) => {
      accessToken.save((err, data) => {
        if (err) reject(err);
        else resolve(data);
      });
    }).then((saveResult: OAuthTokensModel) => {
      const result: OAuthTokensModel = saveResult;

      result.client = result.clientId;
      result.user = result.userId;

      return result;
    });
  }

  public static getRefreshToken(refreshToken: string): Query<typeof OAuthTokens, OAuthTokensModel> {
    return OAuthTokens.findOne({ refreshToken }).lean();
  }
}
export default AuthService;
