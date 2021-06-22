import core = require('express-serve-static-core');
import express = require('express');
import UsersRoute = require('./modules/users/routes/UsersRoute');
import AuthenticationRoutes = require('./modules/authentication/routes/AuthenticationRoutes');
import Constants = require('./config/constants/Constants');

const app = express();

class BaseRoutes {
  private _utilisateursRoute: UsersRoute;

  private _authenticationRoute: AuthenticationRoutes;

  constructor() {
    this._utilisateursRoute = new UsersRoute();
    this._authenticationRoute = new AuthenticationRoutes();
  }

  get routes(): core.Express {
    const v1 = Constants.BASE_PATH;

    app.use(v1, this._utilisateursRoute.routes);

    app.use(v1, this._authenticationRoute.routes);

    return app;
  }
}
export = BaseRoutes;
