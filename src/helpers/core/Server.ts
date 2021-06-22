import core = require('express-serve-static-core');
import express, { Express } from 'express';
import OAuthServer from 'express-oauth-server';
import { Logger } from '..';
import MiddlewaresBase from '../lib/middlewares/base/MiddlewaresBase';
import Constants from '../../config/constants/Constants';
import OAuthConfiguration from '../lib/authentication/OAuthConfiguration';

/**
 * Classe principale de l'application
 */
export default class Server {
  readonly logger: Logger = new Logger(Constants.LOG_CONF);

  readonly app = express();

  /**
   * Fonction principale de l'application
   */
  main(): void {
    this.expressConfiguration(this.app);
    this.loadOAuthConfiguration();

    this.runServer(
      this.app,
      Constants.PORT,
      Constants.ENV,
      Constants.URL_APP,
    );
  }

  loadOAuthConfiguration(): void {
    this.app.oauth = OAuthConfiguration.getConfiguration(this.app);
    this.app.set('oauth', this.app.oauth);
    OAuthConfiguration.loadRoutesOAuth(this.app);
    if (this.app.oauth) {
      this.logger.log('INFO', 'Configuration OAuth chargée');
    }
  }

  /**
   * Chargement des configurationss d'Express
   * @param  {any} app
   * @param  {any} basePath
   * @param  {Router} router
   */
  expressConfiguration(app: Express): void {
    app.use(MiddlewaresBase.configuration);
    this.logger.log('INFO', 'Configuration de Express chargée');
  }

  /**
   * Démarrage du serveur Express
   * @param  {String} url
   * @param  {number} port
   * @param  {String} env
   * @param  {String} url
   */
  runServer(app: Express, port: string, env: string, urlApp: string): void {
    if (port && env) {
      app.listen(port, () => {
        this.logger.log('INFO', `${'8--❥'} ✓ l'app Node s'exécute sur http://${urlApp}:${port}`);
      });
    } else {
      this.logger.log('ERROR', '✕ L\'application n\'est pas en cours d\'exécution');
    }
  }
}
