import compression from 'compression';

import core = require('express-serve-static-core');

import express = require('express');
import bodyParser = require('body-parser');

import MethodOverride = require('../MethodOverride');
import BaseRoutes = require('../../../../BaseRoutes');

class MiddlewaresBase {
  static get configuration(): core.Express {
    const app = express();
    app.use(bodyParser.json());
    app.use(MethodOverride.configuration());
    app.use(new BaseRoutes().routes);

    app.disable('x-powered-by');
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(compression());

    return app;
  }
}
Object.seal(MiddlewaresBase);
export = MiddlewaresBase;
